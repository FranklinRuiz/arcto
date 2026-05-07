import type { ChangeEvent } from 'react';
import type { SoftwareNode } from '../types/diagram.types';
import { DownloadIcon, ResetIcon, TrashIcon, UploadIcon } from './icons/DiagramIcons';

interface DiagramActionsProps {
  selectedNode: SoftwareNode | null;
  deleteSelected: () => void;
  resetDiagram: () => void;
  exportJson: () => void;
  importJson: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function DiagramActions({ selectedNode, deleteSelected, resetDiagram, exportJson, importJson }: DiagramActionsProps) {
  return (
    <section className="actions-grid">
      <button type="button" onClick={deleteSelected} disabled={!selectedNode} className="button button--danger">
        <TrashIcon size={16} /> Borrar
      </button>
      <button type="button" onClick={resetDiagram} className="button">
        <ResetIcon size={16} /> Reset
      </button>
      <button type="button" onClick={exportJson} className="button">
        <DownloadIcon size={16} /> JSON
      </button>
      <label className="button button--file">
        <UploadIcon size={16} /> Importar
        <input type="file" accept="application/json" className="visually-hidden" onChange={importJson} />
      </label>
    </section>
  );
}
