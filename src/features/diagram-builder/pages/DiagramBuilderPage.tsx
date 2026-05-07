import { DiagramCanvas } from '../components/DiagramCanvas';
import { Sidebar } from '../components/Sidebar';
import { useDiagramBuilder } from '../hooks/useDiagramBuilder';

export function DiagramBuilderPage() {
  const builder = useDiagramBuilder();

  return (
    <div className="diagram-layout">
      <Sidebar
        selectedNode={builder.selectedNode}
        nodeLabel={builder.nodeLabel}
        nodeSubtitle={builder.nodeSubtitle}
        setNodeLabel={builder.setNodeLabel}
        setNodeSubtitle={builder.setNodeSubtitle}
        addQuickNode={builder.addQuickNode}
        onDragStart={builder.onDragStart}
        deleteSelected={builder.deleteSelected}
        resetDiagram={builder.resetDiagram}
        exportJson={builder.exportJson}
        importJson={builder.importJson}
      />
      <DiagramCanvas builder={builder} />
    </div>
  );
}
