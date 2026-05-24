import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { LayoutGrid } from 'lucide-react';
import { AppToolbar } from '../components/AppToolbar';
import { DiagramCanvas } from '../components/DiagramCanvas';
import { LibraryPanel } from '../components/LibraryPanel';
import { Sidebar } from '../components/Sidebar';
import { useDiagramBuilder } from '../hooks/useDiagramBuilder';

const LIBRARY_PANEL_WIDTH = 272;

export function DiagramBuilderPage() {
  const builder = useDiagramBuilder();
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [diagramTitle, setDiagramTitle] = useState('Arquitectura sin título');

  useEffect(() => {
    const nodeType = builder.selectedNode?.type as string | undefined;
    const isPropertiesNode = nodeType === 'softwareNode' || nodeType === 'iconNode' || nodeType === 'groupNode' || nodeType === 'circleGroupNode' || nodeType === 'labelNode';
    const hasEdge = !!builder.selectedEdge;
    setIsPropertiesOpen(isPropertiesNode || hasEdge);
  }, [builder.selectedNode, builder.selectedEdge]);

  const handleClearSelection = useCallback(() => {
    builder.clearSelection();
    setIsPropertiesOpen(false);
    setIsLibraryOpen(false);
  }, [builder.clearSelection]);

  const toggleLibrary = useCallback(() => setIsLibraryOpen((v) => !v), []);

  const handleImport = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      builder.importJson(event, setDiagramTitle);
    },
    [builder.importJson],
  );

  const builderWithOverride = { ...builder, clearSelection: handleClearSelection };

  return (
    <div className="app-layout">
      <AppToolbar
        isLibraryOpen={isLibraryOpen}
        hasSelection={builder.hasSelection}
        canUndo={builder.canUndo}
        saveStatus={builder.saveStatus}
        diagramTitle={diagramTitle}
        onTitleChange={setDiagramTitle}
        onToggleLibrary={toggleLibrary}
        undo={builder.undo}
        deleteSelected={builder.deleteSelected}
        clearDiagram={builder.clearDiagram}
        exportJson={builder.exportJson}
        importJson={handleImport}
      />
      <div className="diagram-layout">
        <Sidebar
          isOpen={isPropertiesOpen}
          selectedNode={builder.selectedNode}
          selectedEdge={builder.selectedEdge}
          toggleEdgeAsync={builder.toggleEdgeAsync}
          liveUpdateNode={builder.liveUpdateNode}
          liveUpdateGroup={builder.liveUpdateGroup}
          liveUpdateLabel={builder.liveUpdateLabel}
          liveUpdateEdge={builder.liveUpdateEdge}
        />
        <LibraryPanel
          isOpen={isLibraryOpen}
          onClose={() => setIsLibraryOpen(false)}
          onDragStart={builder.onDragStart}
          onClickItem={builder.placeItem}
        />

        {/* Side tab — always visible, slides with the panel */}
        <button
          type="button"
          className={`library-tab${isLibraryOpen ? ' library-tab--open' : ''}`}
          style={{ right: isLibraryOpen ? LIBRARY_PANEL_WIDTH : 0 }}
          onClick={toggleLibrary}
          title={isLibraryOpen ? 'Cerrar elementos' : 'Abrir elementos'}
        >
          <LayoutGrid size={14} strokeWidth={2} />
          <span className="library-tab__label">Elementos</span>
        </button>

        <DiagramCanvas builder={builderWithOverride} />
      </div>
    </div>
  );
}
