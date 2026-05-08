import { useEffect, useRef, useState } from 'react';
import type { EdgeFormData, SoftwareEdge } from '../types/diagram.types';
import { buildEdgeFormFromEdge } from '../utils/diagramFactory';
import { CloseIcon, SaveIcon } from './icons/DiagramIcons';

interface EdgeEditModalProps {
  edge: SoftwareEdge | null;
  onClose: () => void;
  onSave: (edgeId: string, formData: EdgeFormData) => void;
}

export function EdgeEditModal({ edge, onClose, onSave }: EdgeEditModalProps) {
  const [form, setForm] = useState<EdgeFormData>({ label: '' });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setForm(buildEdgeFormFromEdge(edge)); }, [edge]);
  useEffect(() => { if (edge) setTimeout(() => inputRef.current?.focus(), 50); }, [edge]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  if (!edge) return null;

  const save = () => onSave(edge.id, form);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal--animated" onClick={(e) => e.stopPropagation()}>

        <div className="modal__header">
          <h2 className="modal__title">Editar conexión</h2>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Cerrar">
            <CloseIcon size={16} />
          </button>
        </div>

        <label className="form-field">
          <span>Protocolo / etiqueta</span>
          <input
            ref={inputRef}
            value={form.label}
            onChange={(e) => setForm({ label: e.target.value })}
            className="form-control"
            placeholder="Ej: HTTPS, REST, Kafka…"
            onKeyDown={(e) => e.key === 'Enter' && save()}
          />
        </label>

        <div className="modal__footer">
          <button type="button" onClick={onClose} className="button">Cancelar</button>
          <button type="button" onClick={save} className="button button--primary">
            <SaveIcon size={15} /> Guardar
          </button>
        </div>

      </div>
    </div>
  );
}
