import { useState } from 'react';
import { AppToolbar } from '../components/AppToolbar';
import { DiagramCanvas } from '../components/DiagramCanvas';
import { Sidebar } from '../components/Sidebar';
import { useDiagramBuilder } from '../hooks/useDiagramBuilder';

export function DiagramBuilderPage() {
  const builder = useDiagramBuilder();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-layout">
      <AppToolbar
        isSidebarOpen={isSidebarOpen}
        hasSelection={builder.hasSelection}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        deleteSelected={builder.deleteSelected}
        resetDiagram={builder.resetDiagram}
        exportJson={builder.exportJson}
        importJson={builder.importJson}
      />
      <div className="diagram-layout">
        <Sidebar
          isOpen={isSidebarOpen}
          onDragStart={builder.onDragStart}
          selectedNode={builder.selectedNode}
          updateTextNodeData={builder.updateTextNodeData}
        />
        <DiagramCanvas builder={builder} />
      </div>
    </div>
  );
}
