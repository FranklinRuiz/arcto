import type { ChangeEvent } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, LayersIcon, TrashIcon, UploadIcon } from './icons/DiagramIcons';

interface AppToolbarProps {
  isSidebarOpen: boolean;
  hasSelection: boolean;
  onToggleSidebar: () => void;
  deleteSelected: () => void;
  clearDiagram: () => void;
  exportJson: () => void;
  importJson: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function AppToolbar({
  isSidebarOpen,
  hasSelection,
  onToggleSidebar,
  deleteSelected,
  clearDiagram,
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
          onClick={clearDiagram}
          className="toolbar-action"
          title="Limpiar lienzo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
          </svg>
          <span>Limpiar</span>
        </button>
        <div className="app-toolbar__sep" />
        <label className="toolbar-action" title="Importar desde JSON">
          <UploadIcon size={14} />
          <span>Importar</span>
          <input type="file" accept="application/json" className="visually-hidden" onChange={importJson} />
        </label>
        <button
          type="button"
          onClick={exportJson}
          className="toolbar-action toolbar-action--primary"
          title="Exportar como JSON"
        >
          <DownloadIcon size={14} />
          <span>Exportar</span>
        </button>
      </div>
    </header>
  );
}
