import { useEffect, useState } from 'react';
import { PALETTE } from '../constants/diagram.constants';
import { NODE_KINDS, type NodeFormData, type SoftwareNode } from '../types/diagram.types';
import { buildNodeFormFromNode } from '../utils/diagramFactory';
import { CloseIcon, SaveIcon } from './icons/DiagramIcons';

interface NodeEditModalProps {
  node: SoftwareNode | null;
  onClose: () => void;
  onSave: (nodeId: string, formData: NodeFormData) => void;
}

export function NodeEditModal({ node, onClose, onSave }: NodeEditModalProps) {
  const [form, setForm] = useState<NodeFormData>({
    label: '',
    subtitle: '',
    description: '',
    kind: NODE_KINDS.BACKEND,
  });

  useEffect(() => {
    setForm(buildNodeFormFromNode(node));
  }, [node]);

  if (!node) return null;

  const updateField = <K extends keyof NodeFormData>(field: K, value: NodeFormData[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const save = () => {
    onSave(node.id, form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal modal--large">
        <div className="modal__header">
          <div>
            <h2 className="modal__title">Editar componente</h2>
            <p className="modal__subtitle">Modifica la información del nodo seleccionado.</p>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Cerrar editor">
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="form-grid">
          <label className="form-field">
            <span>Nombre</span>
            <input value={form.label} onChange={(event) => updateField('label', event.target.value)} className="form-control" autoFocus />
          </label>

          <label className="form-field">
            <span>Tecnología / subtítulo</span>
            <input value={form.subtitle} onChange={(event) => updateField('subtitle', event.target.value)} className="form-control" />
          </label>

          <label className="form-field">
            <span>Tipo de componente</span>
            <select value={form.kind} onChange={(event) => updateField('kind', event.target.value as NodeFormData['kind'])} className="form-control">
              {PALETTE.map((item) => (
                <option key={item.type} value={item.type}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Descripción funcional/técnica</span>
            <textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} rows={5} className="form-control" />
          </label>
        </div>

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
