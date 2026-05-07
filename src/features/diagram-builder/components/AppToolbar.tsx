import type { ChangeEvent } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, LayersIcon, ResetIcon, TrashIcon, UploadIcon } from './icons/DiagramIcons';

interface AppToolbarProps {
  isSidebarOpen: boolean;
  hasSelection: boolean;
  onToggleSidebar: () => void;
  deleteSelected: () => void;
  resetDiagram: () => void;
  exportJson: () => void;
  importJson: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function AppToolbar({
  isSidebarOpen,
  hasSelection,
  onToggleSidebar,
  deleteSelected,
  resetDiagram,
  exportJson,
  importJson,
}: AppToolbarProps) {
  return (
    <header className="app-toolbar">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="toolbar-toggle"
        title={isSidebarOpen ? 'Contraer panel de elementos' : 'Expandir panel de elementos'}
      >
        {isSidebarOpen ? <ChevronLeftIcon size={18} /> : <ChevronRightIcon size={18} />}
      </button>

      <div className="app-toolbar__sep" />

      <div className="app-toolbar__brand">
        <div className="app-toolbar__brand-icon">
          <LayersIcon size={17} />
        </div>
        <div className="app-toolbar__brand-text">
          <span className="app-toolbar__brand-name">Arcto</span>
          <span className="app-toolbar__brand-tagline">Architecture Diagrams</span>
        </div>
      </div>

      <div className="app-toolbar__spacer" />

      <div className="app-toolbar__actions">
        <button
          type="button"
          onClick={deleteSelected}
          disabled={!hasSelection}
          className="toolbar-action toolbar-action--danger"
          title="Eliminar selección (Supr)"
        >
          <TrashIcon size={14} />
          <span>Eliminar</span>
        </button>
        <button
          type="button"
          onClick={resetDiagram}
          className="toolbar-action"
          title="Restaurar diagrama inicial"
        >
          <ResetIcon size={14} />
          <span>Reset</span>
        </button>
        <div className="app-toolbar__sep" />
        <button
          type="button"
          onClick={exportJson}
          className="toolbar-action"
          title="Exportar como JSON"
        >
          <DownloadIcon size={14} />
          <span>Exportar</span>
        </button>
        <label className="toolbar-action" title="Importar desde JSON">
          <UploadIcon size={14} />
          <span>Importar</span>
          <input type="file" accept="application/json" className="visually-hidden" onChange={importJson} />
        </label>
      </div>
    </header>
  );
}
