import { memo, useState } from 'react';
import { Background, ConnectionMode, Controls, ReactFlow, SmoothStepEdge, Position } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';
import type { useDiagramBuilder } from '../hooks/useDiagramBuilder';
import { EdgeEditModal } from './EdgeEditModal';
import { NodeEditModal } from './NodeEditModal';

const INSET = 4;

const SnappedEdge = memo((props: EdgeProps) => {
  const { sourcePosition, targetPosition, sourceX, sourceY, targetX, targetY } = props;

  const sX = sourcePosition === Position.Right  ? sourceX - INSET
           : sourcePosition === Position.Left   ? sourceX + INSET
           : sourceX;
  const sY = sourcePosition === Position.Bottom ? sourceY - INSET
           : sourcePosition === Position.Top    ? sourceY + INSET
           : sourceY;

  const tX = targetPosition === Position.Left   ? targetX + INSET
           : targetPosition === Position.Right  ? targetX - INSET
           : targetX;
  const tY = targetPosition === Position.Top    ? targetY + INSET
           : targetPosition === Position.Bottom ? targetY - INSET
           : targetY;

  return <SmoothStepEdge {...props} sourceX={sX} sourceY={sY} targetX={tX} targetY={tY} />;
});
SnappedEdge.displayName = 'SnappedEdge';

const EDGE_TYPES = { smoothstep: SnappedEdge };

type DiagramBuilderState = ReturnType<typeof useDiagramBuilder>;

interface DiagramCanvasProps {
  builder: DiagramBuilderState;
}

export function DiagramCanvas({ builder }: DiagramCanvasProps) {
  const [isPanning, setIsPanning] = useState(false);

  return (
    <main
      className={`canvas-shell${isPanning ? ' canvas-shell--panning' : ''}`}
      onMouseDown={(e) => { if (e.button === 2) setIsPanning(true); }}
      onMouseUp={() => setIsPanning(false)}
      onMouseLeave={() => setIsPanning(false)}
    >
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
        onNodeDoubleClick={(_, node) => { if ((node.type as string) !== 'textNode') builder.openNodeEditor(node); }}
        onEdgeClick={(_, edge) => builder.selectEdge(edge)}
        onEdgeDoubleClick={(_, edge) => builder.openEdgeEditor(edge)}
        onNodeContextMenu={(e) => { if ((e.target as HTMLElement).tagName !== 'TEXTAREA') e.preventDefault(); }}
        onEdgeContextMenu={(e) => e.preventDefault()}
        onPaneClick={builder.clearSelection}
        onPaneContextMenu={(e) => e.preventDefault()}
        fitView
        connectionMode={ConnectionMode.Loose}
        panOnDrag={[2]}
        selectionOnDrag
        connectionLineStyle={{ strokeWidth: 3 }}
        defaultEdgeOptions={{ animated: true, type: 'smoothstep' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={18} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>

      <NodeEditModal node={builder.editingNode} onClose={builder.closeNodeEditor} onSave={builder.saveNodeEditor} />
      <EdgeEditModal edge={builder.editingEdge} onClose={builder.closeEdgeEditor} onSave={builder.saveEdgeEditor} />
    </main>
  );
}
