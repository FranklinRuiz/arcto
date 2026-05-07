import type { ChangeEvent } from 'react';
import { DownloadIcon, ResetIcon, TrashIcon, UploadIcon } from './icons/DiagramIcons';

interface DiagramActionsProps {
  hasSelection: boolean;
  deleteSelected: () => void;
  resetDiagram: () => void;
  exportJson: () => void;
  importJson: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function DiagramActions({ hasSelection, deleteSelected, resetDiagram, exportJson, importJson }: DiagramActionsProps) {
  return (
    <div className="diagram-toolbar">
      <span className="toolbar-label">Diagrama</span>
      <div className="toolbar-spacer" />
      <button
        type="button"
        onClick={deleteSelected}
        disabled={!hasSelection}
        className="toolbar-btn toolbar-btn--danger"
        title="Eliminar selección (Supr)"
      >
        <TrashIcon size={15} />
      </button>
      <button
        type="button"
        onClick={resetDiagram}
        className="toolbar-btn"
        title="Restaurar diagrama inicial"
      >
        <ResetIcon size={15} />
      </button>
      <div className="toolbar-divider" />
      <button
        type="button"
        onClick={exportJson}
        className="toolbar-btn"
        title="Exportar JSON"
      >
        <DownloadIcon size={15} />
      </button>
      <label className="toolbar-btn" title="Importar JSON">
        <UploadIcon size={15} />
        <input type="file" accept="application/json" className="visually-hidden" onChange={importJson} />
      </label>
    </div>
  );
}
