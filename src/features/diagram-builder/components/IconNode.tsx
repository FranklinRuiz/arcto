import { useContext } from 'react';
import { Check } from 'lucide-react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { IconNode } from '../types/diagram.types';
import { iconMap, ServerIcon } from './icons/DiagramIcons';
import { getKindStyle } from '../constants/diagram.constants';
import { EdgeEditContext } from './EdgeEditContext';

export function IconNodeComponent({ id, data, selected }: NodeProps<IconNode>) {
  const Icon = iconMap[data.icon] ?? ServerIcon;
  const { color, border } = getKindStyle(data.kind);
  const { activeNodeIds, arrivalNodeIds, scenePlaybackActive, completedNodeIds } = useContext(EdgeEditContext);
  const isBeacon = activeNodeIds.has(id);
  const isArrival = arrivalNodeIds.has(id);
  const isCompleted = completedNodeIds.has(id);

  return (
    <div className={`icon-node${selected ? ' icon-node--selected' : ''}${isBeacon ? ' icon-node--beacon' : ''}${isBeacon && scenePlaybackActive ? ' icon-node--beacon-once' : ''}${isArrival ? ' icon-node--arrival' : ''}${isArrival && scenePlaybackActive ? ' icon-node--arrival-once' : ''}`}>
      {isCompleted && (
        <span className="icon-node__check-badge">
          <Check size={13} strokeWidth={3} />
        </span>
      )}
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
