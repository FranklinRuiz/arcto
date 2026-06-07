import { useEffect, useRef, useState } from 'react';
import { PALETTE } from '../constants/diagram.constants';
import { NODE_KINDS, type GroupFormData, type LabelFormData, type NodeFormData, type NodeKind, type SoftwareEdge, type SoftwareNode } from '../types/diagram.types';
import { buildNodeFormFromNode } from '../utils/diagramFactory';
import { iconMap } from './icons/DiagramIcons';

interface PalettePanelProps {
  selectedNode: SoftwareNode | null;
  selectedEdge: SoftwareEdge | null;
  toggleEdgeAsync: (edgeId: string) => void;
  liveUpdateNode: (nodeId: string, patch: Partial<NodeFormData>) => void;
  liveUpdateGroup: (nodeId: string, patch: Partial<GroupFormData>) => void;
  liveUpdateLabel: (nodeId: string, patch: Partial<LabelFormData>) => void;
  liveUpdateEdge: (edgeId: string, patch: { label?: string; color?: string; strokeWidth?: number; shape?: 'smooth' | 'straight' }) => void;
}


const KIND_COLORS: Record<NodeKind, { color: string; bg: string }> = {
  // Core
  [NODE_KINDS.DEFAULT]:        { color: '#334155', bg: '#f1f5f9' },
  [NODE_KINDS.USER]:           { color: '#0284c7', bg: '#f0f9ff' },
  [NODE_KINDS.FRONTEND]:       { color: '#075985', bg: '#e0f2fe' },
  [NODE_KINDS.MOBILE]:         { color: '#0e7490', bg: '#cffafe' },
  [NODE_KINDS.GATEWAY]:        { color: '#c2410c', bg: '#ffedd5' },
  [NODE_KINDS.BACKEND]:        { color: '#5b21b6', bg: '#ede9fe' },
  [NODE_KINDS.DATABASE]:       { color: '#047857', bg: '#d1fae5' },
  [NODE_KINDS.CACHE]:          { color: '#166534', bg: '#dcfce7' },
  [NODE_KINDS.QUEUE]:          { color: '#9d174d', bg: '#fce7f3' },
  [NODE_KINDS.SECURITY]:       { color: '#92400e', bg: '#fef3c7' },
  [NODE_KINDS.CLOUD]:          { color: '#3730a3', bg: '#e0e7ff' },
  [NODE_KINDS.EXTERNAL]:       { color: '#475569', bg: '#e2e8f0' },
  [NODE_KINDS.WORKER]:         { color: '#be123c', bg: '#ffe4e6' },
  [NODE_KINDS.ONPREMISE]:      { color: '#1e3a8a', bg: '#dbeafe' },
  [NODE_KINDS.MAINFRAME]:      { color: '#1c1917', bg: '#e7e5e4' },
  [NODE_KINDS.AI_MODEL]:       { color: '#7c3aed', bg: '#f5f3ff' },
  [NODE_KINDS.VECTOR_DB]:      { color: '#059669', bg: '#ecfdf5' },
  [NODE_KINDS.AI_AGENT]:       { color: '#a21caf', bg: '#fdf4ff' },
  // Integration
  [NODE_KINDS.EVENT_BUS]:      { color: '#92400e', bg: '#fffbeb' },
  [NODE_KINDS.PUBSUB]:         { color: '#92400e', bg: '#fffbeb' },
  [NODE_KINDS.WEBHOOK]:        { color: '#92400e', bg: '#fffbeb' },
  [NODE_KINDS.ETL]:            { color: '#92400e', bg: '#fffbeb' },
  [NODE_KINDS.SERVICE_MESH]:   { color: '#92400e', bg: '#fffbeb' },
  // Infrastructure
  [NODE_KINDS.KUBERNETES]:     { color: '#0369a1', bg: '#f0f9ff' },
  [NODE_KINDS.CONTAINER]:      { color: '#0369a1', bg: '#f0f9ff' },
  [NODE_KINDS.LOAD_BALANCER]:  { color: '#0369a1', bg: '#f0f9ff' },
  [NODE_KINDS.CDN]:            { color: '#0369a1', bg: '#f0f9ff' },
  [NODE_KINDS.OBJECT_STORAGE]: { color: '#0369a1', bg: '#f0f9ff' },
  [NODE_KINDS.FILE_STORAGE]:   { color: '#0369a1', bg: '#f0f9ff' },
  // Observability
  [NODE_KINDS.LOGGING]:        { color: '#6d28d9', bg: '#f5f3ff' },
  [NODE_KINDS.METRICS]:        { color: '#6d28d9', bg: '#f5f3ff' },
  [NODE_KINDS.MONITORING]:     { color: '#6d28d9', bg: '#f5f3ff' },
  [NODE_KINDS.TRACING]:        { color: '#6d28d9', bg: '#f5f3ff' },
  [NODE_KINDS.ALERTING]:       { color: '#6d28d9', bg: '#f5f3ff' },
  // Security ext
  [NODE_KINDS.IAM]:            { color: '#9f1239', bg: '#fff1f2' },
  [NODE_KINDS.OAUTH2]:         { color: '#9f1239', bg: '#fff1f2' },
  [NODE_KINDS.KEY_VAULT]:      { color: '#9f1239', bg: '#fff1f2' },
  [NODE_KINDS.SECRETS]:        { color: '#9f1239', bg: '#fff1f2' },
  [NODE_KINDS.API_SECURITY]:   { color: '#9f1239', bg: '#fff1f2' },
  // AI extended
  [NODE_KINDS.MCP_SERVER]:       { color: '#7c3aed', bg: '#f5f3ff' },
  [NODE_KINDS.AI_TOOL]:          { color: '#7c3aed', bg: '#f5f3ff' },
  [NODE_KINDS.PROMPT_TEMPLATE]:  { color: '#7c3aed', bg: '#f5f3ff' },
  [NODE_KINDS.KNOWLEDGE_BASE]:   { color: '#7c3aed', bg: '#f5f3ff' },
  [NODE_KINDS.RAG_PIPELINE]:     { color: '#7c3aed', bg: '#f5f3ff' },
  [NODE_KINDS.GUARDRAILS]:       { color: '#7c3aed', bg: '#f5f3ff' },
  [NODE_KINDS.AI_WORKFLOW]:      { color: '#7c3aed', bg: '#f5f3ff' },
};

const PRESET_COLORS = [
  { value: '#0F6E56', label: 'Teal' },
  { value: '#185FA5', label: 'Azul' },
  { value: '#3A7D44', label: 'Verde' },
  { value: '#993C1D', label: 'Coral' },
  { value: '#3C3489', label: 'Púrpura' },
  { value: '#993556', label: 'Rosa' },
  { value: '#4A4845', label: 'Gris' },
  { value: '#6B4FA0', label: 'Violeta' },
  { value: '#888780', label: 'Neutro' },
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

const EDGE_SHAPES = [
  { value: 'smooth' as const, label: 'Suave',
    icon: (
      <svg width="44" height="16" viewBox="0 0 44 16" fill="none">
        <path d="M2 14 C10 14 14 2 22 2 C30 2 34 14 42 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  { value: 'straight' as const, label: 'Recta',
    icon: (
      <svg width="44" height="16" viewBox="0 0 44 16" fill="none">
        <line x1="2" y1="14" x2="42" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function EdgePropertiesPanel({ edge, onToggleAsync, onLiveUpdate }: {
  edge: SoftwareEdge;
  onToggleAsync: () => void;
  onLiveUpdate: (patch: { color?: string; strokeWidth?: number; shape?: 'smooth' | 'straight' }) => void;
}) {
  const isAsync = Boolean(edge.data?.dashed) && (edge as { animated?: boolean }).animated;
  const edgeLabel = typeof edge.label === 'string' ? edge.label : '';
  const edgeColor = (edge.style as { stroke?: string } | undefined)?.stroke ?? '#94a3b8';
  const edgeWeight = (edge.style?.strokeWidth as number | undefined) ?? 3;
  const edgeShape = edge.data?.shape ?? 'smooth';

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

          <div className="form-field">
            <span>Forma</span>
            <div className="edge-shape-row">
              {EDGE_SHAPES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={`edge-shape-btn${edgeShape === s.value ? ' edge-shape-btn--active' : ''}`}
                  onClick={() => onLiveUpdate({ shape: s.value })}
                  title={s.label}
                >
                  {s.icon}
                  <span>{s.label}</span>
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


function CircleGroupPropertiesPanel({
  node,
  onLiveUpdate,
}: {
  node: SoftwareNode;
  onLiveUpdate: (nodeId: string, patch: Partial<GroupFormData>) => void;
}) {
  const data = node.data as unknown as { label: string; color: string; dashed?: boolean; filled?: boolean };
  const [label, setLabel] = useState(data.label);
  const [color, setColor] = useState(data.color);
  const [dashed, setDashed] = useState(data.dashed !== false);
  const [filled, setFilled] = useState(data.filled === true);
  const labelRef = useRef<HTMLInputElement>(null);
  const prevNodeIdRef = useRef(node.id);

  useEffect(() => {
    if (node.id === prevNodeIdRef.current) return;
    prevNodeIdRef.current = node.id;
    const d = node.data as unknown as { label: string; color: string; dashed?: boolean; filled?: boolean };
    setLabel(d.label);
    setColor(d.color);
    setDashed(d.dashed !== false);
    setFilled(d.filled === true);
  }, [node]);

  const updateLabel = (value: string) => {
    setLabel(value);
    onLiveUpdate(node.id, { label: value });
  };

  const updateColor = (value: string) => {
    setColor(value);
    onLiveUpdate(node.id, { color: value });
  };

  const updateDashed = (value: boolean) => {
    setDashed(value);
    onLiveUpdate(node.id, { dashed: value });
  };

  const updateFilled = (value: boolean) => {
    setFilled(value);
    onLiveUpdate(node.id, { filled: value });
  };

  return (
    <div className="node-props-panel">
      <div className="props-header">
        <div className="props-header__icon" style={{ background: color + '22', color }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray={dashed ? '3 2' : undefined} />
          </svg>
        </div>
        <div className="props-header__text">
          <div className="props-header__title">{label || 'Contenedor circular'}</div>
          <div className="props-header__subtitle">Agrupa elementos</div>
        </div>
      </div>
      <div className="props-body">
        <div className="form-grid">
          <label className="form-field">
            <span>Título</span>
            <input
              ref={labelRef}
              value={label}
              onChange={(e) => updateLabel(e.target.value)}
              className="form-control"
              placeholder="Ej: Microservicios…"
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
                  className={`group-color-swatch${color === c.value ? ' group-color-swatch--active' : ''}`}
                  style={{ background: c.value }}
                  title={c.label}
                  onClick={() => updateColor(c.value)}
                />
              ))}
              <input
                type="color"
                className="group-color-custom"
                value={color}
                onChange={(e) => updateColor(e.target.value)}
                title="Color personalizado"
              />
            </div>
          </div>
          <div className="form-field">
            <span>Estilo</span>
            <div className="style-grid">
              <button
                type="button"
                className={`style-btn${!dashed ? ' style-btn--active' : ''}`}
                onClick={() => updateDashed(false)}
                title="Borde sólido"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <circle cx="16" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>Sólido</span>
              </button>
              <button
                type="button"
                className={`style-btn${dashed ? ' style-btn--active' : ''}`}
                onClick={() => updateDashed(true)}
                title="Borde entrecortado"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <circle cx="16" cy="9" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
                </svg>
                <span>Entrecortado</span>
              </button>
            </div>
          </div>
          <div className="form-field">
            <span>Fondo</span>
            <div className="style-grid">
              <button
                type="button"
                className={`style-btn${!filled ? ' style-btn--active' : ''}`}
                onClick={() => updateFilled(false)}
                title="Sin fondo"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <circle cx="16" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                  <line x1="10" y1="3" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Sin fondo</span>
              </button>
              <button
                type="button"
                className={`style-btn${filled ? ' style-btn--active' : ''}`}
                onClick={() => updateFilled(true)}
                title="Con fondo"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <circle cx="16" cy="9" r="7" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
                </svg>
                <span>Con fondo</span>
              </button>
            </div>
          </div>
        </div>
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
  const data = node.data as unknown as { label: string; color: string; dashed?: boolean; rounded?: boolean; filled?: boolean };
  const [form, setForm] = useState<GroupFormData>({
    label: data.label,
    color: data.color,
    dashed: data.dashed !== false,
    rounded: data.rounded !== false,
    filled: data.filled === true,
  });
  const labelRef = useRef<HTMLInputElement>(null);
  const prevNodeIdRef = useRef(node.id);

  useEffect(() => {
    if (node.id === prevNodeIdRef.current) return;
    prevNodeIdRef.current = node.id;
    const d = node.data as unknown as { label: string; color: string; dashed?: boolean; rounded?: boolean; filled?: boolean };
    setForm({ label: d.label, color: d.color, dashed: d.dashed !== false, rounded: d.rounded !== false, filled: d.filled === true });
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
            <rect x="1" y="1" width="11" height="11" rx={form.rounded !== false ? '2.5' : '0.5'} stroke="currentColor" strokeWidth="1.5" strokeDasharray={form.dashed !== false ? '3 2' : undefined} />
          </svg>
        </div>
        <div className="props-header__text">
          <div className="props-header__title">{form.label || 'Sin título'}</div>
          <div className="props-header__subtitle">Contenedor</div>
        </div>
      </div>
      <div className="props-body">
        <div className="form-grid">
          <label className="form-field">
            <span>Título</span>
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
          </div>
          <div className="form-field">
            <span>Estilo</span>
            <div className="style-grid">
              <button
                type="button"
                className={`style-btn${form.dashed === false ? ' style-btn--active' : ''}`}
                onClick={() => update('dashed', false)}
                title="Borde sólido"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <rect x="1.5" y="1.5" width="29" height="15" rx="4" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>Sólido</span>
              </button>
              <button
                type="button"
                className={`style-btn${form.dashed !== false ? ' style-btn--active' : ''}`}
                onClick={() => update('dashed', true)}
                title="Borde entrecortado"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <rect x="1.5" y="1.5" width="29" height="15" rx="4" stroke="currentColor" strokeWidth="2" strokeDasharray="5 3" />
                </svg>
                <span>Entrecortado</span>
              </button>
              <button
                type="button"
                className={`style-btn${form.rounded !== false ? ' style-btn--active' : ''}`}
                onClick={() => update('rounded', true)}
                title="Esquinas ovaladas"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <rect x="1.5" y="1.5" width="29" height="15" rx="7" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>Ovaladas</span>
              </button>
              <button
                type="button"
                className={`style-btn${form.rounded === false ? ' style-btn--active' : ''}`}
                onClick={() => update('rounded', false)}
                title="Esquinas rectas"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <rect x="1.5" y="1.5" width="29" height="15" rx="1" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>Rectas</span>
              </button>
            </div>
          </div>
          <div className="form-field">
            <span>Fondo</span>
            <div className="style-grid">
              <button
                type="button"
                className={`style-btn${!form.filled ? ' style-btn--active' : ''}`}
                onClick={() => update('filled', false)}
                title="Sin fondo"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <rect x="1.5" y="1.5" width="29" height="15" rx="4" stroke="currentColor" strokeWidth="2" />
                  <line x1="5" y1="2" x2="27" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Sin fondo</span>
              </button>
              <button
                type="button"
                className={`style-btn${form.filled ? ' style-btn--active' : ''}`}
                onClick={() => update('filled', true)}
                title="Con fondo"
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <rect x="1.5" y="1.5" width="29" height="15" rx="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
                </svg>
                <span>Con fondo</span>
              </button>
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
        </div>
      </div>
    </div>
  );
}

function LabelPropertiesPanel({
  node,
  onLiveUpdate,
}: {
  node: SoftwareNode;
  onLiveUpdate: (nodeId: string, patch: Partial<LabelFormData>) => void;
}) {
  const data = node.data as unknown as { text: string; color: string; rotation: number; bold?: boolean };
  const [form, setForm] = useState<LabelFormData>({ text: data.text, color: data.color, rotation: data.rotation ?? 0, bold: data.bold ?? false });
  const prevNodeIdRef = useRef(node.id);

  useEffect(() => {
    if (node.id === prevNodeIdRef.current) return;
    prevNodeIdRef.current = node.id;
    const d = node.data as unknown as { text: string; color: string; rotation: number; bold?: boolean };
    setForm({ text: d.text, color: d.color, rotation: d.rotation ?? 0, bold: d.bold ?? false });
  }, [node]);

  const update = <K extends keyof LabelFormData>(field: K, value: LabelFormData[K]) => {
    setForm((p) => ({ ...p, [field]: value }));
    onLiveUpdate(node.id, { [field]: value } as Partial<LabelFormData>);
  };

  return (
    <div className="node-props-panel">
      <div className="props-header">
        <div className="props-header__icon" style={{ background: form.color + '22', color: form.color }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="3" width="11" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="props-header__text">
          <div className="props-header__title">{form.text || 'Etiqueta'}</div>
          <div className="props-header__subtitle">Caja de texto</div>
        </div>
      </div>
      <div className="props-body">
        <div className="form-grid">
          <label className="form-field">
            <span>Texto</span>
            <div className="label-text-row">
              <input
                value={form.text}
                onChange={(e) => update('text', e.target.value)}
                className="form-control"
                placeholder="Ej: Validar usuario…"
                maxLength={40}
              />
              <button
                type="button"
                className={`label-bold-btn${form.bold ? ' label-bold-btn--active' : ''}`}
                onClick={() => update('bold', !form.bold)}
                title="Negrita"
              >
                <b>B</b>
              </button>
            </div>
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
          </div>
          <div className="form-field">
            <span>Rotación</span>
            <div className="rotation-presets">
              {[-90, -45, 0, 45, 90].map((angle) => (
                <button
                  key={angle}
                  type="button"
                  className={`rotation-preset-btn${form.rotation === angle ? ' rotation-preset-btn--active' : ''}`}
                  onClick={() => update('rotation', angle)}
                >
                  {angle}°
                </button>
              ))}
            </div>
            <div className="rotation-slider-row">
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                value={form.rotation}
                onChange={(e) => update('rotation', Number(e.target.value))}
                className="rotation-slider"
              />
              <input
                type="number"
                min="-180"
                max="180"
                value={form.rotation}
                onChange={(e) => update('rotation', Math.min(180, Math.max(-180, Number(e.target.value))))}
                className="rotation-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PalettePanel({ selectedNode, selectedEdge, toggleEdgeAsync, liveUpdateNode, liveUpdateGroup, liveUpdateLabel, liveUpdateEdge }: PalettePanelProps) {
  const nodeType = selectedNode?.type as string | undefined;
  const isSoftwareSelected = nodeType === 'softwareNode' || nodeType === 'iconNode';
  const isGroupSelected = nodeType === 'groupNode';
  const isCircleGroupSelected = nodeType === 'circleGroupNode';
  const isLabelSelected = nodeType === 'labelNode';

  if (isLabelSelected && selectedNode) {
    return (
      <section className="palette-section">
        <LabelPropertiesPanel node={selectedNode} onLiveUpdate={liveUpdateLabel} />
      </section>
    );
  }

  if (isCircleGroupSelected && selectedNode) {
    return (
      <section className="palette-section">
        <CircleGroupPropertiesPanel node={selectedNode} onLiveUpdate={liveUpdateGroup} />
      </section>
    );
  }

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
