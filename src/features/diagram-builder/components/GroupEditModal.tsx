import { useEffect, useRef, useState } from 'react';
import type { GroupFormData, GroupNode } from '../types/diagram.types';
import { CloseIcon, SaveIcon } from './icons/DiagramIcons';

interface GroupEditModalProps {
  node: GroupNode | null;
  onClose: () => void;
  onSave: (nodeId: string, formData: GroupFormData) => void;
}

const PRESET_COLORS = [
  { value: '#0d9488', label: 'Verde azulado' },
  { value: '#2563eb', label: 'Azul' },
  { value: '#16a34a', label: 'Verde' },
  { value: '#ea580c', label: 'Naranja' },
  { value: '#7c3aed', label: 'Violeta' },
  { value: '#db2777', label: 'Rosa' },
  { value: '#475569', label: 'Gris' },
  { value: '#b45309', label: 'Ámbar' },
];

export function GroupEditModal({ node, onClose, onSave }: GroupEditModalProps) {
  const [form, setForm] = useState<GroupFormData>({ label: '', color: '#0d9488' });
  const labelRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (node) {
      setForm({ label: node.data.label, color: node.data.color });
      setTimeout(() => { labelRef.current?.focus(); labelRef.current?.select(); }, 50);
    }
  }, [node]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  if (!node) return null;

  const save = () => { if (form.label.trim()) onSave(node.id, form); };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal--animated" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Editar grupo</h2>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Cerrar">
            <CloseIcon size={16} />
          </button>
        </div>

        <div className="form-grid">
          <label className="form-field">
            <span>Nombre del grupo</span>
            <input
              ref={labelRef}
              value={form.label}
              onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
              className="form-control"
              placeholder="Ej: Client Network…"
              onKeyDown={(e) => e.key === 'Enter' && save()}
            />
          </label>

          <div className="form-field">
            <span>Color</span>
            <div className="group-color-grid">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`group-color-swatch${form.color === c.value ? ' group-color-swatch--active' : ''}`}
                  style={{ background: c.value }}
                  title={c.label}
                  onClick={() => setForm((p) => ({ ...p, color: c.value }))}
                />
              ))}
              <input
                type="color"
                className="group-color-custom"
                value={form.color}
                onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
                title="Color personalizado"
              />
            </div>
            <div
              className="group-color-preview"
              style={{ borderColor: form.color, background: form.color + '18' }}
            >
              <span className="group-color-preview__label" style={{ background: form.color }}>
                {form.label || 'Grupo'}
              </span>
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button type="button" onClick={onClose} className="button">Cancelar</button>
          <button type="button" onClick={save} className="button button--primary" disabled={!form.label.trim()}>
            <SaveIcon size={15} /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
