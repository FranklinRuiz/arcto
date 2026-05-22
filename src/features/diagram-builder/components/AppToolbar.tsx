import type { ChangeEvent } from 'react';
import { BrushCleaning, Download, Layers, LayoutGrid, Trash2, Upload } from 'lucide-react';

interface AppToolbarProps {
  isLibraryOpen: boolean;
  hasSelection: boolean;
  onToggleLibrary: () => void;
  deleteSelected: () => void;
  clearDiagram: () => void;
  exportJson: () => void;
  importJson: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function AppToolbar({
  isLibraryOpen,
  hasSelection,
  onToggleLibrary,
  deleteSelected,
  clearDiagram,
  exportJson,
  importJson,
}: AppToolbarProps) {
  return (
    <header className="app-toolbar">
      <div className="app-toolbar__brand">
        <div className="app-toolbar__brand-icon">
          <Layers size={17} />
        </div>
        <div className="app-toolbar__brand-text">
          <span className="app-toolbar__brand-name">Arcto</span>
          <span className="app-toolbar__brand-tagline">Architecture Diagrams</span>
        </div>
      </div>

      <div className="app-toolbar__sep" />

      <div className="app-toolbar__actions">
        <button
          type="button"
          onClick={deleteSelected}
          disabled={!hasSelection}
          className="toolbar-action toolbar-action--danger"
          title="Eliminar selección (Supr)"
        >
          <Trash2 size={15} />
          <span>Eliminar</span>
        </button>
        <button
          type="button"
          onClick={clearDiagram}
          className="toolbar-action toolbar-action--danger-muted"
          title="Limpiar todo el diagrama"
        >
          <BrushCleaning size={15} />
          <span>Limpiar</span>
        </button>
        <div className="app-toolbar__sep" />
        <label className="toolbar-action toolbar-action--outlined" title="Importar desde JSON">
          <Upload size={15} />
          <span>Importar</span>
          <input type="file" accept="application/json" className="visually-hidden" onChange={importJson} />
        </label>
        <button
          type="button"
          onClick={exportJson}
          className="toolbar-action toolbar-action--primary"
          title="Exportar como JSON"
        >
          <Download size={15} />
          <span>Exportar</span>
        </button>
        <div className="app-toolbar__sep" />
        <button
          type="button"
          onClick={onToggleLibrary}
          className={`toolbar-toggle${isLibraryOpen ? ' toolbar-toggle--active' : ''}`}
          title={isLibraryOpen ? 'Cerrar librería' : 'Abrir librería de elementos'}
        >
          <LayoutGrid size={16} />
        </button>
      </div>
    </header>
  );
}
