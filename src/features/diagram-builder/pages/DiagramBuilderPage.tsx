import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { LayoutGrid } from 'lucide-react';
import { AppToolbar } from '../components/AppToolbar';
import { DiagramCanvas, type SizeMode } from '../components/DiagramCanvas';
import { LibraryPanel } from '../components/LibraryPanel';
import { Sidebar } from '../components/Sidebar';
import { useDiagramBuilder } from '../hooks/useDiagramBuilder';

const LIBRARY_PANEL_WIDTH = 272;
const TITLE_STORAGE_KEY = 'arcto-diagram-title';
const SIZE_MODE_STORAGE_KEY = 'arcto-size-mode';

function useIsWide(breakpoint = 900) {
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.innerWidth > breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint + 1}px)`);
    const handler = (e: MediaQueryListEvent) => setWide(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return wide;
}

export function DiagramBuilderPage() {
  const builder = useDiagramBuilder();
  const isWide = useIsWide();
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [diagramTitle, setDiagramTitle] = useState(() => {
    try { return localStorage.getItem(TITLE_STORAGE_KEY) || 'Arquitectura sin título'; } catch { return 'Arquitectura sin título'; }
  });
  const [sizeMode, setSizeMode] = useState<SizeMode>(() => {
    try { return (localStorage.getItem(SIZE_MODE_STORAGE_KEY) as SizeMode) || 'standard'; } catch { return 'standard'; }
  });

  useEffect(() => {
    try { localStorage.setItem(TITLE_STORAGE_KEY, diagramTitle); } catch { /* storage unavailable */ }
  }, [diagramTitle]);

  useEffect(() => {
    try { localStorage.setItem(SIZE_MODE_STORAGE_KEY, sizeMode); } catch { /* storage unavailable */ }
  }, [sizeMode]);

  useEffect(() => {
    if (builder.presentationMode) { setIsPropertiesOpen(false); return; }
    const nodeType = builder.selectedNode?.type as string | undefined;
    const isPropertiesNode = nodeType === 'softwareNode' || nodeType === 'iconNode' || nodeType === 'groupNode' || nodeType === 'labelNode';
    const hasEdge = !!builder.selectedEdge;
    setIsPropertiesOpen(isPropertiesNode || hasEdge);
  }, [builder.selectedNode, builder.selectedEdge, builder.presentationMode]);

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
        selectedNodesCount={builder.selectedNodesCount}
        canUndo={builder.canUndo}
        saveStatus={builder.saveStatus}
        diagramTitle={diagramTitle}
        onTitleChange={setDiagramTitle}
        onToggleLibrary={toggleLibrary}
        undo={builder.undo}
        deleteSelected={builder.deleteSelected}
        alignNodes={builder.alignNodes}
        clearDiagram={builder.clearDiagram}
        exportJson={builder.exportJson}
        exportPng={builder.exportPng}
        importJson={handleImport}
        sizeMode={sizeMode}
        onSizeModeChange={setSizeMode}
        presentationMode={builder.presentationMode}
        onTogglePresentationMode={builder.togglePresentationMode}
      />
      <div className="diagram-layout">
        {/* Mobile backdrop — closes whichever panel is open */}
        {(isPropertiesOpen || isLibraryOpen) && (
          <div
            className="panel-backdrop"
            onClick={handleClearSelection}
            aria-hidden
          />
        )}

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

        {/* Side tab — desktop only, hidden via CSS on mobile */}
        <button
          type="button"
          className={`library-tab${isLibraryOpen ? ' library-tab--open' : ''}`}
          style={{ right: isLibraryOpen ? LIBRARY_PANEL_WIDTH : 0, display: isWide ? undefined : 'none' }}
          onClick={toggleLibrary}
          title={isLibraryOpen ? 'Cerrar elementos' : 'Abrir elementos'}
        >
          <LayoutGrid size={14} strokeWidth={2} />
          <span className="library-tab__label">Elementos</span>
        </button>

        <DiagramCanvas builder={builderWithOverride} sizeMode={sizeMode} />
      </div>
    </div>
  );
}
