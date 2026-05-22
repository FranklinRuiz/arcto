import { useCallback, useEffect, useState } from 'react';
import { AppToolbar } from '../components/AppToolbar';
import { DiagramCanvas } from '../components/DiagramCanvas';
import { LibraryPanel } from '../components/LibraryPanel';
import { Sidebar } from '../components/Sidebar';
import { useDiagramBuilder } from '../hooks/useDiagramBuilder';

export function DiagramBuilderPage() {
  const builder = useDiagramBuilder();
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  useEffect(() => {
    const nodeType = builder.selectedNode?.type as string | undefined;
    const isPropertiesNode = nodeType === 'softwareNode' || nodeType === 'iconNode' || nodeType === 'groupNode';
    const hasEdge = !!builder.selectedEdge;
    setIsPropertiesOpen(isPropertiesNode || hasEdge);
  }, [builder.selectedNode, builder.selectedEdge]);

  const handleClearSelection = useCallback(() => {
    builder.clearSelection();
    setIsPropertiesOpen(false);
    setIsLibraryOpen(false);
  }, [builder.clearSelection]);

  const builderWithOverride = { ...builder, clearSelection: handleClearSelection };

  return (
    <div className="app-layout">
      <AppToolbar
        isLibraryOpen={isLibraryOpen}
        hasSelection={builder.hasSelection}
        onToggleLibrary={() => setIsLibraryOpen((v) => !v)}
        deleteSelected={builder.deleteSelected}
        clearDiagram={builder.clearDiagram}
        exportJson={builder.exportJson}
        importJson={builder.importJson}
      />
      <div className="diagram-layout">
        <Sidebar
          isOpen={isPropertiesOpen}
          selectedNode={builder.selectedNode}
          selectedEdge={builder.selectedEdge}
          toggleEdgeAsync={builder.toggleEdgeAsync}
          liveUpdateNode={builder.liveUpdateNode}
          liveUpdateGroup={builder.liveUpdateGroup}
          liveUpdateEdge={builder.liveUpdateEdge}
        />
        <LibraryPanel
          isOpen={isLibraryOpen}
          onClose={() => setIsLibraryOpen(false)}
          onDragStart={builder.onDragStart}
          onClickItem={builder.placeItem}
        />
        <DiagramCanvas builder={builderWithOverride} />
      </div>
    </div>
  );
}
