import { Background, ConnectionMode, Controls, ReactFlow } from '@xyflow/react';
import type { useDiagramBuilder } from '../hooks/useDiagramBuilder';
import { EdgeEditModal } from './EdgeEditModal';
import { NodeEditModal } from './NodeEditModal';

type DiagramBuilderState = ReturnType<typeof useDiagramBuilder>;

interface DiagramCanvasProps {
  builder: DiagramBuilderState;
}

export function DiagramCanvas({ builder }: DiagramCanvasProps) {
  return (
    <main className="canvas-shell">
      <ReactFlow
        nodes={builder.nodes}
        edges={builder.edges}
        nodeTypes={builder.nodeTypes}
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
        onNodeContextMenu={(e) => e.preventDefault()}
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
        <Controls />
      </ReactFlow>

      <NodeEditModal node={builder.editingNode} onClose={builder.closeNodeEditor} onSave={builder.saveNodeEditor} />
      <EdgeEditModal edge={builder.editingEdge} onClose={builder.closeEdgeEditor} onSave={builder.saveEdgeEditor} />
    </main>
  );
}
