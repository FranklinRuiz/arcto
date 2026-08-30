import { useEffect, useMemo, useRef, useState } from 'react';
import { Background, BackgroundVariant, ConnectionMode, Controls, ReactFlow, useViewport } from '@xyflow/react';
import type { useDiagramBuilder } from '../hooks/useDiagramBuilder';
import { EdgeEditContext } from './EdgeEditContext';
import { InlineEditableEdge } from './InlineEditableEdge';

export type SizeMode = 'compact' | 'standard' | 'presentation';

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const EDGE_TYPES = { smoothstep: InlineEditableEdge };
const EMPTY_SET: ReadonlySet<string> = new Set();

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

  const activeNodeId = builder.presentationMode ? (builder.selectedNode?.id ?? null) : null;
  // Only the selected node gets the continuous beacon ring (it's the one "transmitting").
  // Destination nodes stay still and only flash at the instant the flow dot lands on them —
  // this reads as a request arriving, not as an already-active endpoint.
  const { activeNodeIds, activeEdgeIds, arrivalNodeIds } = useMemo(() => {
    if (!activeNodeId) return { activeNodeIds: EMPTY_SET, activeEdgeIds: EMPTY_SET, arrivalNodeIds: EMPTY_SET };
    const edgeIds = new Set<string>();
    const targetIds = new Set<string>();
    for (const edge of builder.edges) {
      if (edge.source === activeNodeId) {
        edgeIds.add(edge.id);
        targetIds.add(edge.target);
      }
    }
    return { activeNodeIds: new Set<string>([activeNodeId]), activeEdgeIds: edgeIds, arrivalNodeIds: targetIds };
  }, [activeNodeId, builder.edges]);

  const edgeEditContext = useMemo(() => ({
    editingEdgeId: builder.editingEdge?.id ?? null,
    onCommit: builder.commitInlineEdgeEdit,
    onCancel: builder.closeEdgeEditor,
    activeNodeIds,
    activeEdgeIds,
    arrivalNodeIds,
    presentationMode: builder.presentationMode,
  }), [builder.editingEdge?.id, builder.commitInlineEdgeEdit, builder.closeEdgeEditor, activeNodeIds, activeEdgeIds, arrivalNodeIds, builder.presentationMode]);

  const sizeClass = sizeMode !== 'standard' ? `canvas--size-${sizeMode}` : '';

  return (
    <main
      ref={shellRef as React.RefObject<HTMLElement>}
      className={`canvas-shell${isPanning ? ' canvas-shell--panning' : ''}${sizeClass ? ` ${sizeClass}` : ''}${builder.presentationMode ? ' canvas-shell--presenting' : ''}`}
      onMouseDown={(e) => { if (e.button === 2) setIsPanning(true); }}
      onMouseUp={() => setIsPanning(false)}
      onMouseLeave={() => setIsPanning(false)}
    >
      <EdgeEditContext.Provider value={edgeEditContext}>
        <ReactFlow
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
          onEdgeContextMenu={(e) => { if ((e.target as HTMLElement).tagName !== 'INPUT') e.preventDefault(); }}
          onPaneClick={builder.clearSelection}
          onPaneContextMenu={(e) => e.preventDefault()}
          fitView
          connectionMode={ConnectionMode.Loose}
          panOnDrag={isTouch ? true : [2]}
          selectionOnDrag={!isTouch}
          connectionLineStyle={{ strokeWidth: 1.9 }}
          defaultEdgeOptions={{ animated: false, type: 'smoothstep' }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={!builder.presentationMode}
          nodesConnectable={!builder.presentationMode}
          edgesReconnectable={!builder.presentationMode}
          deleteKeyCode={builder.presentationMode ? [] : ['Delete', 'Backspace']}
        >
          <Background variant={BackgroundVariant.Lines} gap={27} lineWidth={1} color="#e5e9f0" style={{ backgroundColor: '#ffffff' }} />
          <Controls showInteractive={false} />
          <ViewportObserver shellRef={shellRef} />
        </ReactFlow>
      </EdgeEditContext.Provider>
    </main>
  );
}
