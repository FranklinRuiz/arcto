import { useEffect, useMemo, useRef, useState } from 'react';
import { Background, ConnectionMode, Controls, ReactFlow, useViewport } from '@xyflow/react';
import type { useDiagramBuilder } from '../hooks/useDiagramBuilder';
import { EdgeEditContext } from './EdgeEditContext';
import { InlineEditableEdge } from './InlineEditableEdge';

export type SizeMode = 'compact' | 'standard' | 'presentation';

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const EDGE_TYPES = { smoothstep: InlineEditableEdge };

type DiagramBuilderState = ReturnType<typeof useDiagramBuilder>;

interface DiagramCanvasProps {
  builder: DiagramBuilderState;
  sizeMode: SizeMode;
}

function getLodClass(zoom: number): string {
  if (zoom < 0.2) return 'canvas--lod-minimal';
  if (zoom < 0.4) return 'canvas--lod-low';
  if (zoom < 0.7) return 'canvas--lod-medium';
  return '';
}

/** Lives inside the ReactFlow context so it can read useViewport. */
function ViewportObserver({ shellRef }: { shellRef: React.RefObject<HTMLElement | null> }) {
  const { zoom } = useViewport();

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const lod = getLodClass(zoom);
    el.classList.toggle('canvas--lod-medium',  lod === 'canvas--lod-medium');
    el.classList.toggle('canvas--lod-low',     lod === 'canvas--lod-low');
    el.classList.toggle('canvas--lod-minimal', lod === 'canvas--lod-minimal');
  }, [zoom, shellRef]);

  return null;
}

export function DiagramCanvas({ builder, sizeMode }: DiagramCanvasProps) {
  const [isPanning, setIsPanning] = useState(false);
  const shellRef = useRef<HTMLElement>(null);

  const edgeEditContext = useMemo(() => ({
    editingEdgeId: builder.editingEdge?.id ?? null,
    onCommit: builder.commitInlineEdgeEdit,
    onCancel: builder.closeEdgeEditor,
  }), [builder.editingEdge?.id, builder.commitInlineEdgeEdit, builder.closeEdgeEditor]);

  const sizeClass = sizeMode !== 'standard' ? `canvas--size-${sizeMode}` : '';

  return (
    <main
      ref={shellRef as React.RefObject<HTMLElement>}
      className={`canvas-shell${isPanning ? ' canvas-shell--panning' : ''}${sizeClass ? ` ${sizeClass}` : ''}`}
      onMouseDown={(e) => { if (e.button === 2) setIsPanning(true); }}
      onMouseUp={() => setIsPanning(false)}
      onMouseLeave={() => setIsPanning(false)}
    >
      <EdgeEditContext.Provider value={edgeEditContext}>
        <ReactFlow
          deleteKeyCode={['Delete', 'Backspace']}
          nodes={builder.nodes}
          edges={builder.edges}
          nodeTypes={builder.nodeTypes}
          edgeTypes={EDGE_TYPES}
          onNodesChange={builder.onNodesChange}
          onEdgesChange={builder.onEdgesChange}
          onConnect={builder.onConnect}
          onInit={builder.setRfInstance}
          onDrop={builder.onDrop}
          onDragOver={builder.onDragOver}
          onNodeClick={(_, node) => builder.selectNode(node)}
          onEdgeClick={(_, edge) => builder.selectEdge(edge)}
          onEdgeDoubleClick={(_, edge) => builder.openEdgeEditor(edge)}
          onReconnect={builder.onReconnect}
          reconnectRadius={20}
          onNodeContextMenu={(e) => { if ((e.target as HTMLElement).tagName !== 'TEXTAREA') e.preventDefault(); }}
          onEdgeContextMenu={(e) => e.preventDefault()}
          onPaneClick={builder.clearSelection}
          onPaneContextMenu={(e) => e.preventDefault()}
          fitView
          connectionMode={ConnectionMode.Loose}
          panOnDrag={isTouch ? true : [2]}
          selectionOnDrag={!isTouch}
          connectionLineStyle={{ strokeWidth: 2.4 }}
          defaultEdgeOptions={{ animated: true, type: 'smoothstep' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={18} size={1} />
          <Controls showInteractive={false} />
          <ViewportObserver shellRef={shellRef} />
        </ReactFlow>
      </EdgeEditContext.Provider>
    </main>
  );
}
