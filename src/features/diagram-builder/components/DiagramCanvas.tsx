import { Background, ConnectionMode, Controls, MiniMap, Panel, ReactFlow } from '@xyflow/react';
import type { useDiagramBuilder } from '../hooks/useDiagramBuilder';
import { ContextMenu } from './ContextMenu';
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
        onNodeContextMenu={(e, node) => { e.preventDefault(); builder.selectNode(node); builder.openContextMenu(e.clientX, e.clientY, 'node'); }}
        onEdgeContextMenu={(e, edge) => { e.preventDefault(); builder.selectEdge(edge); builder.openContextMenu(e.clientX, e.clientY, 'edge'); }}
        onPaneClick={builder.clearSelection}
        onPaneContextMenu={(e) => e.preventDefault()}
        fitView
        connectionMode={ConnectionMode.Loose}
        panOnDrag={[2]}
        selectionOnDrag
        connectionLineStyle={{ strokeWidth: 3 }}
        defaultEdgeOptions={{ animated: true, type: 'smoothstep' }}
      >
        <Background gap={18} size={1} />
        <Controls />
        <MiniMap pannable zoomable />
        <Panel position="top-center">
          <div className="canvas-message">Arrastra elementos al lienzo</div>
        </Panel>
        <Panel position="bottom-center">
          <div className="canvas-help">
            {builder.selectedNode ? `Nodo seleccionado: ${builder.selectedNode.data.label}` : 'Haz doble clic en un nodo o conexión para editar.'}
          </div>
        </Panel>
      </ReactFlow>

      <NodeEditModal node={builder.editingNode} onClose={builder.closeNodeEditor} onSave={builder.saveNodeEditor} />
      <EdgeEditModal edge={builder.editingEdge} onClose={builder.closeEdgeEditor} onSave={builder.saveEdgeEditor} />
      {builder.contextMenu && (
        <ContextMenu
          x={builder.contextMenu.x}
          y={builder.contextMenu.y}
          type={builder.contextMenu.type}
          onDelete={builder.deleteSelected}
          onClose={builder.closeContextMenu}
        />
      )}
    </main>
  );
}
