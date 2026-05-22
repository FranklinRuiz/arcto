import { Handle, Position, type NodeProps } from '@xyflow/react';
import { NODE_KINDS, type NodeKind, type IconNode } from '../types/diagram.types';
import { iconMap, ServerIcon } from './icons/DiagramIcons';

const kindColors: Record<NodeKind, { color: string; border: string }> = {
  [NODE_KINDS.DEFAULT]:   { color: '#64748b', border: '#cbd5e1' },
  [NODE_KINDS.USER]:      { color: '#0284c7', border: '#7dd3fc' },
  [NODE_KINDS.FRONTEND]:  { color: '#0369a1', border: '#7dd3fc' },
  [NODE_KINDS.MOBILE]:    { color: '#0e7490', border: '#67e8f9' },
  [NODE_KINDS.GATEWAY]:   { color: '#c2410c', border: '#fdba74' },
  [NODE_KINDS.BACKEND]:   { color: '#6d28d9', border: '#c4b5fd' },
  [NODE_KINDS.DATABASE]:  { color: '#047857', border: '#6ee7b7' },
  [NODE_KINDS.CACHE]:     { color: '#166534', border: '#86efac' },
  [NODE_KINDS.QUEUE]:     { color: '#9d174d', border: '#f9a8d4' },
  [NODE_KINDS.SECURITY]:  { color: '#92400e', border: '#fcd34d' },
  [NODE_KINDS.CLOUD]:     { color: '#3730a3', border: '#a5b4fc' },
  [NODE_KINDS.EXTERNAL]:  { color: '#475569', border: '#94a3b8' },
  [NODE_KINDS.WORKER]:    { color: '#be123c', border: '#fda4af' },
  [NODE_KINDS.ONPREMISE]: { color: '#1e3a8a', border: '#93c5fd' },
  [NODE_KINDS.MAINFRAME]: { color: '#1c1917', border: '#a8a29e' },
  [NODE_KINDS.AI_MODEL]:  { color: '#7c3aed', border: '#c4b5fd' },
  [NODE_KINDS.VECTOR_DB]: { color: '#059669', border: '#6ee7b7' },
  [NODE_KINDS.AI_AGENT]:  { color: '#a21caf', border: '#e879f9' },
};

export function IconNodeComponent({ data, selected }: NodeProps<IconNode>) {
  const Icon = iconMap[data.icon] ?? ServerIcon;
  const { color, border } = kindColors[data.kind] ?? kindColors[NODE_KINDS.DEFAULT];

  return (
    <div className={`icon-node${selected ? ' icon-node--selected' : ''}`}>
      <Handle id="top"    type="source" position={Position.Top}    className="icon-node__handle" />
      <Handle id="right"  type="source" position={Position.Right}  className="icon-node__handle" />
      <Handle id="bottom" type="source" position={Position.Bottom} className="icon-node__handle" />
      <Handle id="left"   type="source" position={Position.Left}   className="icon-node__handle" />
      <div
        className="icon-node__icon"
        style={{ color, borderColor: border }}
      >
        <Icon size="100%" />
      </div>
      <div className="icon-node__label" style={{ color: '#1e293b' }}>{data.label}</div>
      {data.subtitle ? <div className="icon-node__subtitle">{data.subtitle}</div> : null}
    </div>
  );
}
