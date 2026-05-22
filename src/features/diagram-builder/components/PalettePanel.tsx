import { useEffect, useRef, useState } from 'react';
import { PALETTE } from '../constants/diagram.constants';
import { NODE_KINDS, type GroupFormData, type NodeFormData, type NodeKind, type SoftwareEdge, type SoftwareNode } from '../types/diagram.types';
import { buildNodeFormFromNode } from '../utils/diagramFactory';
import { iconMap } from './icons/DiagramIcons';

interface PalettePanelProps {
  selectedNode: SoftwareNode | null;
  selectedEdge: SoftwareEdge | null;
  toggleEdgeAsync: (edgeId: string) => void;
  liveUpdateNode: (nodeId: string, patch: Partial<NodeFormData>) => void;
  liveUpdateGroup: (nodeId: string, patch: Partial<GroupFormData>) => void;
  liveUpdateEdge: (edgeId: string, patch: { label?: string; color?: string; strokeWidth?: number }) => void;
}


const KIND_COLORS: Record<NodeKind, { color: string; bg: string }> = {
  [NODE_KINDS.DEFAULT]:   { color: '#334155', bg: '#f1f5f9' },
  [NODE_KINDS.USER]:      { color: '#0284c7', bg: '#f0f9ff' },
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

function SyncPreview() {
  return (
    <svg width="44" height="12" viewBox="0 0 44 12" fill="none">
      <line x1="0" y1="6" x2="36" y2="6" stroke="currentColor" strokeWidth="2" />
      <path d="M36 2 L44 6 L36 10 Z" fill="currentColor" />
    </svg>
  );
}

function AsyncPreview() {
  return (
    <svg width="44" height="12" viewBox="0 0 44 12" fill="none">
      <line x1="0" y1="6" x2="36" y2="6" stroke="currentColor" strokeWidth="2" strokeDasharray="5 3" />
      <path d="M36 2 L44 6 L36 10 Z" fill="currentColor" />
    </svg>
  );
}

const EDGE_COLORS = [
  { value: '#94a3b8', label: 'Gris' },
  { value: '#0f172a', label: 'Negro' },
  { value: '#3b82f6', label: 'Azul' },
  { value: '#22c55e', label: 'Verde' },
  { value: '#ef4444', label: 'Rojo' },
  { value: '#f97316', label: 'Naranja' },
  { value: '#a855f7', label: 'Violeta' },
];

const EDGE_WEIGHTS = [
  { value: 1.5, label: 'Delgada' },
  { value: 3,   label: 'Normal' },
  { value: 5,   label: 'Gruesa' },
];

function WeightLine({ width }: { width: number }) {
  return (
    <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
      <line x1="0" y1="5" x2="28" y2="5" stroke="currentColor" strokeWidth={width} strokeLinecap="round" />
    </svg>
  );
}

function EdgePropertiesPanel({ edge, onToggleAsync, onLiveUpdate }: {
  edge: SoftwareEdge;
  onToggleAsync: () => void;
  onLiveUpdate: (patch: { color?: string; strokeWidth?: number }) => void;
}) {
  const isAsync = Boolean(edge.data?.dashed) && (edge as { animated?: boolean }).animated;
  const edgeLabel = typeof edge.label === 'string' ? edge.label : '';
  const edgeColor = (edge.style as { stroke?: string } | undefined)?.stroke ?? '#94a3b8';
  const edgeWeight = (edge.style?.strokeWidth as number | undefined) ?? 3;

  return (
    <div className="node-props-panel">
      <div className="props-header">
        <div className="props-header__icon" style={{ background: edgeColor + '22', color: edgeColor }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="1" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M9 4.5 L13 7 L9 9.5 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="props-header__text">
          <div className="props-header__title">Conexión</div>
          <div className="props-header__subtitle">{edgeLabel || 'Sin etiqueta'}</div>
        </div>
      </div>
      <div className="props-body">
        <div className="form-grid">
          <div className="form-field">
            <span>Tipo</span>
            <div className="edge-type-row">
              <button type="button" className={`edge-type-btn${!isAsync ? ' edge-type-btn--active' : ''}`} onClick={() => { if (isAsync) onToggleAsync(); }}>
                <SyncPreview /><span>Síncrona</span>
              </button>
              <button type="button" className={`edge-type-btn${isAsync ? ' edge-type-btn--active' : ''}`} onClick={() => { if (!isAsync) onToggleAsync(); }}>
                <AsyncPreview /><span>Asíncrona</span>
              </button>
            </div>
          </div>

          <div className="form-field">
            <span>Color</span>
            <div className="edge-color-row">
              {EDGE_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`edge-color-swatch${edgeColor === c.value ? ' edge-color-swatch--active' : ''}`}
                  style={{ background: c.value }}
                  title={c.label}
                  onClick={() => onLiveUpdate({ color: c.value })}
                />
              ))}
              <input
                type="color"
                className="edge-color-custom"
                value={edgeColor}
                onChange={(e) => onLiveUpdate({ color: e.target.value })}
                title="Color personalizado"
              />
            </div>
          </div>

          <div className="form-field">
            <span>Grosor</span>
            <div className="edge-weight-row">
              {EDGE_WEIGHTS.map((w) => (
                <button
                  key={w.value}
                  type="button"
                  className={`edge-weight-btn${edgeWeight === w.value ? ' edge-weight-btn--active' : ''}`}
                  onClick={() => onLiveUpdate({ strokeWidth: w.value })}
                  title={w.label}
                >
                  <WeightLine width={w.value === 1.5 ? 1.5 : w.value === 3 ? 2.5 : 4} />
                  <span>{w.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
        <div className="edge-hint">Doble clic en la flecha para editar la etiqueta</div>
      </div>
    </div>
  );
}


function GroupPropertiesPanel({
  node,
  onLiveUpdate,
}: {
  node: SoftwareNode;
  onLiveUpdate: (nodeId: string, patch: Partial<GroupFormData>) => void;
}) {
  const data = node.data as unknown as { label: string; color: string };
  const [form, setForm] = useState<GroupFormData>({ label: data.label, color: data.color });
  const labelRef = useRef<HTMLInputElement>(null);
  const prevNodeIdRef = useRef(node.id);

  useEffect(() => {
    if (node.id === prevNodeIdRef.current) return;
    prevNodeIdRef.current = node.id;
    const d = node.data as unknown as { label: string; color: string };
    setForm({ label: d.label, color: d.color });
  }, [node]);

  const update = <K extends keyof GroupFormData>(field: K, value: GroupFormData[K]) => {
    setForm((p) => ({ ...p, [field]: value }));
    onLiveUpdate(node.id, { [field]: value } as Partial<GroupFormData>);
  };

  return (
    <div className="node-props-panel">
      <div className="props-header">
        <div className="props-header__icon" style={{ background: form.color + '22', color: form.color }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="1" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3.5" y="3.5" width="3" height="3" rx="1" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
        <div className="props-header__text">
          <div className="props-header__title">{form.label || 'Grupo'}</div>
          <div className="props-header__subtitle">Contenedor</div>
        </div>
      </div>
      <div className="props-body">
        <div className="form-grid">
          <label className="form-field">
            <span>Nombre</span>
            <input
              ref={labelRef}
              value={form.label}
              onChange={(e) => update('label', e.target.value)}
              className="form-control"
              placeholder="Ej: Client Network…"
              maxLength={28}
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
                  onClick={() => update('color', c.value)}
                />
              ))}
              <input
                type="color"
                className="group-color-custom"
                value={form.color}
                onChange={(e) => update('color', e.target.value)}
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
      </div>
    </div>
  );
}

function NodePropertiesPanel({
  node,
  onLiveUpdate,
}: {
  node: SoftwareNode;
  onLiveUpdate: (nodeId: string, patch: Partial<NodeFormData>) => void;
}) {
  const [form, setForm] = useState<NodeFormData>(() => buildNodeFormFromNode(node));
  const labelRef = useRef<HTMLInputElement>(null);
  const prevNodeIdRef = useRef(node.id);

  useEffect(() => {
    if (node.id === prevNodeIdRef.current) return;
    prevNodeIdRef.current = node.id;
    setForm(buildNodeFormFromNode(node));
  }, [node]);

  const update = <K extends keyof NodeFormData>(field: K, value: NodeFormData[K]) => {
    setForm((p) => ({ ...p, [field]: value }));
    onLiveUpdate(node.id, { [field]: value } as Partial<NodeFormData>);
  };

  const c = KIND_COLORS[form.kind];
  const KindIcon = iconMap[form.kind];

  return (
    <div className="node-props-panel">
      <div className="props-header">
        <div className="props-header__icon" style={{ color: c.color, background: c.bg }}>
          {KindIcon && <KindIcon size={14} />}
        </div>
        <div className="props-header__text">
          <div className="props-header__title">{form.label || 'Sin nombre'}</div>
          <div className="props-header__subtitle">{form.subtitle || 'Sin tecnología'}</div>
        </div>
      </div>
      <div className="props-body">
        <div className="form-grid">
          <label className="form-field">
            <span>Nombre</span>
            <input
              ref={labelRef}
              value={form.label}
              onChange={(e) => update('label', e.target.value)}
              className="form-control"
              placeholder="Ej: API Gateway…"
              maxLength={28}
            />
          </label>
          <label className="form-field">
            <span>Tecnología</span>
            <input
              value={form.subtitle}
              onChange={(e) => update('subtitle', e.target.value)}
              className="form-control"
              placeholder="Ej: React, Kafka…"
              maxLength={28}
            />
          </label>
          <div className="form-field">
            <span>Tipo</span>
            <div className="kind-select-row">
              <span className="kind-select-badge" style={{ color: c.color, background: c.bg }}>
                {KindIcon && <KindIcon size={14} />}
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
              rows={3}
              className="form-control"
              placeholder="Responsabilidad técnica del componente…"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export function PalettePanel({ selectedNode, selectedEdge, toggleEdgeAsync, liveUpdateNode, liveUpdateGroup, liveUpdateEdge }: PalettePanelProps) {
  const nodeType = selectedNode?.type as string | undefined;
  const isSoftwareSelected = nodeType === 'softwareNode' || nodeType === 'iconNode';
  const isGroupSelected = nodeType === 'groupNode';

  if (isGroupSelected && selectedNode) {
    return (
      <section className="palette-section">
        <GroupPropertiesPanel node={selectedNode} onLiveUpdate={liveUpdateGroup} />
      </section>
    );
  }

  if (isSoftwareSelected && selectedNode) {
    return (
      <section className="palette-section">
        <NodePropertiesPanel node={selectedNode} onLiveUpdate={liveUpdateNode} />
      </section>
    );
  }

  if (selectedEdge) {
    return (
      <section className="palette-section">
        <EdgePropertiesPanel
          edge={selectedEdge}
          onToggleAsync={() => toggleEdgeAsync(selectedEdge.id)}
          onLiveUpdate={(patch) => liveUpdateEdge(selectedEdge.id, patch)}
        />
      </section>
    );
  }

  return null;
}
