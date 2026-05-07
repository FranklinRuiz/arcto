import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setForm(buildEdgeFormFromEdge(edge));
  }, [edge]);

  if (!edge) return null;

  const save = () => {
    onSave(edge.id, form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal__header">
          <div>
            <h2 className="modal__title">Editar conexión</h2>
            <p className="modal__subtitle">Modifica el texto que aparece sobre la línea.</p>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Cerrar editor de conexión">
            <CloseIcon size={18} />
          </button>
        </div>

        <label className="form-field">
          <span>Texto de la conexión</span>
          <input
            value={form.label}
            onChange={(event) => setForm({ label: event.target.value })}
            className="form-control"
            placeholder="Ejemplo: HTTPS, REST, JDBC, API Gateway..."
            autoFocus
          />
        </label>

        <div className="modal__footer">
          <button type="button" onClick={onClose} className="button">
            Cancelar
          </button>
          <button type="button" onClick={save} className="button button--primary">
            <SaveIcon size={16} /> Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
