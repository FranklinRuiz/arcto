import { useMemo, useState } from 'react';
import { Background, ConnectionMode, Controls, ReactFlow } from '@xyflow/react';
import type { useDiagramBuilder } from '../hooks/useDiagramBuilder';
import { EdgeEditContext } from './EdgeEditContext';
import { InlineEditableEdge } from './InlineEditableEdge';

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const EDGE_TYPES = { smoothstep: InlineEditableEdge };

type DiagramBuilderState = ReturnType<typeof useDiagramBuilder>;

interface DiagramCanvasProps {
  builder: DiagramBuilderState;
}

export function DiagramCanvas({ builder }: DiagramCanvasProps) {
  const [isPanning, setIsPanning] = useState(false);

  const edgeEditContext = useMemo(() => ({
    editingEdgeId: builder.editingEdge?.id ?? null,
    onCommit: builder.commitInlineEdgeEdit,
    onCancel: builder.closeEdgeEditor,
  }), [builder.editingEdge?.id, builder.commitInlineEdgeEdit, builder.closeEdgeEditor]);

  return (
    <main
      className={`canvas-shell${isPanning ? ' canvas-shell--panning' : ''}`}
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
          connectionLineStyle={{ strokeWidth: 3 }}
          defaultEdgeOptions={{ animated: true, type: 'smoothstep' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={18} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </EdgeEditContext.Provider>

    </main>
  );
}
