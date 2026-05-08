import { useEffect, useRef, useState } from 'react';
import { PALETTE } from '../constants/diagram.constants';
import { NODE_KINDS, type NodeFormData, type NodeKind, type SoftwareNode } from '../types/diagram.types';
import { buildNodeFormFromNode } from '../utils/diagramFactory';
import { CloseIcon, SaveIcon, iconMap } from './icons/DiagramIcons';

interface NodeEditModalProps {
  node: SoftwareNode | null;
  onClose: () => void;
  onSave: (nodeId: string, formData: NodeFormData) => void;
}

const KIND_COLORS: Record<NodeKind, { color: string; bg: string }> = {
  [NODE_KINDS.DEFAULT]:   { color: '#334155', bg: '#f1f5f9' },
  [NODE_KINDS.FRONTEND]:  { color: '#075985', bg: '#e0f2fe' },
  [NODE_KINDS.MOBILE]:    { color: '#0e7490', bg: '#cffafe' },
  [NODE_KINDS.GATEWAY]:   { color: '#c2410c', bg: '#ffedd5' },
  [NODE_KINDS.BACKEND]:   { color: '#5b21b6', bg: '#ede9fe' },
  [NODE_KINDS.DATABASE]:  { color: '#047857', bg: '#d1fae5' },
  [NODE_KINDS.CACHE]:     { color: '#166534', bg: '#dcfce7' },
  [NODE_KINDS.QUEUE]:     { color: '#9d174d', bg: '#fce7f3' },
  [NODE_KINDS.SECURITY]:  { color: '#92400e', bg: '#fef3c7' },
  [NODE_KINDS.CLOUD]:     { color: '#3730a3', bg: '#e0e7ff' },
  [NODE_KINDS.EXTERNAL]:  { color: '#475569', bg: '#e2e8f0' },
  [NODE_KINDS.WORKER]:    { color: '#be123c', bg: '#ffe4e6' },
  [NODE_KINDS.ONPREMISE]: { color: '#1e3a8a', bg: '#dbeafe' },
  [NODE_KINDS.MAINFRAME]: { color: '#1c1917', bg: '#e7e5e4' },
};

export function NodeEditModal({ node, onClose, onSave }: NodeEditModalProps) {
  const [form, setForm] = useState<NodeFormData>({
    label: '',
    subtitle: '',
    description: '',
    kind: NODE_KINDS.BACKEND,
  });
  const labelRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setForm(buildNodeFormFromNode(node)); }, [node]);
  useEffect(() => { if (node) setTimeout(() => labelRef.current?.focus(), 50); }, [node]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  if (!node) return null;

  const update = <K extends keyof NodeFormData>(field: K, value: NodeFormData[K]) =>
    setForm((p) => ({ ...p, [field]: value }));

  const save = () => { if (form.label.trim()) onSave(node.id, form); };

  const c = KIND_COLORS[form.kind];
  const KindIcon = iconMap[form.kind];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal--animated" onClick={(e) => e.stopPropagation()}>

        <div className="modal__header">
          <h2 className="modal__title">Editar componente</h2>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Cerrar">
            <CloseIcon size={16} />
          </button>
        </div>

        <div className="form-grid">

          <div className="form-row-2">
            <label className="form-field">
              <span>Nombre</span>
              <input
                ref={labelRef}
                value={form.label}
                onChange={(e) => update('label', e.target.value)}
                className="form-control"
                placeholder="Ej: API Gateway…"
                onKeyDown={(e) => e.key === 'Enter' && save()}
              />
            </label>
            <label className="form-field">
              <span>Tecnología / subtítulo</span>
              <input
                value={form.subtitle}
                onChange={(e) => update('subtitle', e.target.value)}
                className="form-control"
                placeholder="Ej: React, Kafka…"
                onKeyDown={(e) => e.key === 'Enter' && save()}
              />
            </label>
          </div>

          <div className="form-field">
            <span>Tipo</span>
            <div className="kind-select-row">
              <span className="kind-select-badge" style={{ color: c.color, background: c.bg }}>
                <KindIcon size={16} />
              </span>
              <div className="select-wrapper">
                <select
                  value={form.kind}
                  onChange={(e) => update('kind', e.target.value as NodeKind)}
                  className="form-control form-control--select"
                >
                  {PALETTE.map((item) => (
                    <option key={item.type} value={item.type}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <label className="form-field">
            <span>Descripción</span>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={2}
              className="form-control"
              placeholder="Responsabilidad técnica del componente…"
            />
          </label>

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
