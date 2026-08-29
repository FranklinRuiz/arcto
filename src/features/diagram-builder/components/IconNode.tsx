import { useContext } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { NODE_KINDS, type NodeKind, type IconNode } from '../types/diagram.types';
import { iconMap, ServerIcon } from './icons/DiagramIcons';
import { EdgeEditContext } from './EdgeEditContext';

const kindColors: Record<NodeKind, { color: string; border: string }> = {
  // Core
  [NODE_KINDS.DEFAULT]:        { color: '#64748b', border: '#cbd5e1' },
  [NODE_KINDS.USER]:           { color: '#0284c7', border: '#7dd3fc' },
  [NODE_KINDS.FRONTEND]:       { color: '#0369a1', border: '#7dd3fc' },
  [NODE_KINDS.MOBILE]:         { color: '#0e7490', border: '#67e8f9' },
  [NODE_KINDS.GATEWAY]:        { color: '#c2410c', border: '#fdba74' },
  [NODE_KINDS.BACKEND]:        { color: '#6d28d9', border: '#c4b5fd' },
  [NODE_KINDS.DATABASE]:       { color: '#047857', border: '#6ee7b7' },
  [NODE_KINDS.CACHE]:          { color: '#6E7A1F', border: '#C7CE85' },
  [NODE_KINDS.QUEUE]:          { color: '#9d174d', border: '#f9a8d4' },
  [NODE_KINDS.SECURITY]:       { color: '#92400e', border: '#fcd34d' },
  [NODE_KINDS.CLOUD]:          { color: '#3730a3', border: '#a5b4fc' },
  [NODE_KINDS.EXTERNAL]:       { color: '#475569', border: '#94a3b8' },
  [NODE_KINDS.WORKER]:         { color: '#be123c', border: '#fda4af' },
  [NODE_KINDS.ONPREMISE]:      { color: '#1e3a8a', border: '#93c5fd' },
  [NODE_KINDS.MAINFRAME]:      { color: '#1c1917', border: '#a8a29e' },
  [NODE_KINDS.AI_MODEL]:       { color: '#7c3aed', border: '#c4b5fd' },
  [NODE_KINDS.VECTOR_DB]:      { color: '#059669', border: '#6ee7b7' },
  [NODE_KINDS.AI_AGENT]:       { color: '#a21caf', border: '#e879f9' },
  // Integration
  [NODE_KINDS.EVENT_BUS]:      { color: '#8A6018', border: '#E0BE72' },
  [NODE_KINDS.PUBSUB]:         { color: '#8A6018', border: '#E0BE72' },
  [NODE_KINDS.WEBHOOK]:        { color: '#8A6018', border: '#E0BE72' },
  [NODE_KINDS.ETL]:            { color: '#8A6018', border: '#E0BE72' },
  [NODE_KINDS.SERVICE_MESH]:   { color: '#8A6018', border: '#E0BE72' },
  // Infrastructure
  [NODE_KINDS.KUBERNETES]:     { color: '#0E6E7C', border: '#7FC7D0' },
  [NODE_KINDS.CONTAINER]:      { color: '#0E6E7C', border: '#7FC7D0' },
  [NODE_KINDS.LOAD_BALANCER]:  { color: '#0E6E7C', border: '#7FC7D0' },
  [NODE_KINDS.CDN]:            { color: '#0E6E7C', border: '#7FC7D0' },
  [NODE_KINDS.OBJECT_STORAGE]: { color: '#0E6E7C', border: '#7FC7D0' },
  [NODE_KINDS.FILE_STORAGE]:   { color: '#0E6E7C', border: '#7FC7D0' },
  // Observability
  [NODE_KINDS.LOGGING]:        { color: '#7A3A8A', border: '#D3AEDD' },
  [NODE_KINDS.METRICS]:        { color: '#7A3A8A', border: '#D3AEDD' },
  [NODE_KINDS.MONITORING]:     { color: '#7A3A8A', border: '#D3AEDD' },
  [NODE_KINDS.TRACING]:        { color: '#7A3A8A', border: '#D3AEDD' },
  [NODE_KINDS.ALERTING]:       { color: '#7A3A8A', border: '#D3AEDD' },
  // Security ext
  [NODE_KINDS.IAM]:            { color: '#9f1239', border: '#fda4af' },
  [NODE_KINDS.OAUTH2]:         { color: '#9f1239', border: '#fda4af' },
  [NODE_KINDS.KEY_VAULT]:      { color: '#9f1239', border: '#fda4af' },
  [NODE_KINDS.SECRETS]:        { color: '#9f1239', border: '#fda4af' },
  [NODE_KINDS.API_SECURITY]:   { color: '#9f1239', border: '#fda4af' },
  // AI extended
  [NODE_KINDS.MCP_SERVER]:       { color: '#7c3aed', border: '#c4b5fd' },
  [NODE_KINDS.AI_TOOL]:          { color: '#7c3aed', border: '#c4b5fd' },
  [NODE_KINDS.PROMPT_TEMPLATE]:  { color: '#7c3aed', border: '#c4b5fd' },
  [NODE_KINDS.KNOWLEDGE_BASE]:   { color: '#7c3aed', border: '#c4b5fd' },
  [NODE_KINDS.RAG_PIPELINE]:     { color: '#7c3aed', border: '#c4b5fd' },
  [NODE_KINDS.GUARDRAILS]:       { color: '#7c3aed', border: '#c4b5fd' },
  [NODE_KINDS.AI_WORKFLOW]:      { color: '#7c3aed', border: '#c4b5fd' },
};

export function IconNodeComponent({ id, data, selected }: NodeProps<IconNode>) {
  const Icon = iconMap[data.icon] ?? ServerIcon;
  const { color, border } = kindColors[data.kind] ?? kindColors[NODE_KINDS.DEFAULT];
  const { activeNodeIds } = useContext(EdgeEditContext);
  const isBeacon = activeNodeIds.has(id);

  return (
    <div className={`icon-node${selected ? ' icon-node--selected' : ''}${isBeacon ? ' icon-node--beacon' : ''}`}>
      <Handle id="top"    type="source" position={Position.Top}    className="icon-node__handle" />
      <Handle id="right"  type="source" position={Position.Right}  className="icon-node__handle" />
      <Handle id="bottom" type="source" position={Position.Bottom} className="icon-node__handle" />
      <Handle id="left"   type="source" position={Position.Left}   className="icon-node__handle" />
      <div
        className="icon-node__icon"
        style={{ color, borderColor: border, '--beacon-color': border } as React.CSSProperties}
      >
        <Icon size="100%" />
      </div>
      <div className="icon-node__label" style={{ color: '#1e293b' }}>{data.label}</div>
      {data.subtitle ? <div className="icon-node__subtitle">{data.subtitle}</div> : null}
    </div>
  );
}
