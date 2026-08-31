import { useContext } from 'react';
import { Check } from 'lucide-react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { SoftwareNode } from '../types/diagram.types';
import { iconMap, ServerIcon } from './icons/DiagramIcons';
import { getKindStyle } from '../constants/diagram.constants';
import { EdgeEditContext } from './EdgeEditContext';

type CSSVarProps = React.CSSProperties & { '--cat-border'?: string; '--cat-bg'?: string; '--icon-bg'?: string };

export function SoftwareNodeComponent({ id, data, selected }: NodeProps<SoftwareNode>) {
  const Icon = iconMap[data.icon] ?? ServerIcon;
  const style = getKindStyle(data.kind);
  const { activeNodeIds, arrivalNodeIds, scenePlaybackActive, completedNodeIds } = useContext(EdgeEditContext);
  const isBeacon = activeNodeIds.has(id);
  const isArrival = arrivalNodeIds.has(id);
  const isCompleted = completedNodeIds.has(id);

  return (
    <div
      className={`software-node${selected ? ' software-node--selected' : ''}${isBeacon ? ' software-node--beacon' : ''}${isBeacon && scenePlaybackActive ? ' software-node--beacon-once' : ''}${isArrival ? ' software-node--arrival' : ''}${isArrival && scenePlaybackActive ? ' software-node--arrival-once' : ''}`}
      style={{ '--cat-border': style.border, '--cat-bg': style.bg } as CSSVarProps}
    >
      {isCompleted && (
        <span className="software-node__check-badge">
          <Check size={13} strokeWidth={3} />
        </span>
      )}
      <Handle id="top-1" type="source" position={Position.Top}    style={{ left: '10%' }} className="software-node__handle" />
      <Handle id="top-2" type="source" position={Position.Top}    style={{ left: '30%' }} className="software-node__handle" />
      <Handle id="top-3" type="source" position={Position.Top}    style={{ left: '50%' }} className="software-node__handle" />
      <Handle id="top-4" type="source" position={Position.Top}    style={{ left: '70%' }} className="software-node__handle" />
      <Handle id="top-5" type="source" position={Position.Top}    style={{ left: '90%' }} className="software-node__handle" />

      <Handle id="right-1" type="source" position={Position.Right} style={{ top: '25%' }} className="software-node__handle" />
      <Handle id="right-2" type="source" position={Position.Right} style={{ top: '50%' }} className="software-node__handle" />
      <Handle id="right-3" type="source" position={Position.Right} style={{ top: '75%' }} className="software-node__handle" />

      <Handle id="bottom-1" type="source" position={Position.Bottom} style={{ left: '10%' }} className="software-node__handle" />
      <Handle id="bottom-2" type="source" position={Position.Bottom} style={{ left: '30%' }} className="software-node__handle" />
      <Handle id="bottom-3" type="source" position={Position.Bottom} style={{ left: '50%' }} className="software-node__handle" />
      <Handle id="bottom-4" type="source" position={Position.Bottom} style={{ left: '70%' }} className="software-node__handle" />
      <Handle id="bottom-5" type="source" position={Position.Bottom} style={{ left: '90%' }} className="software-node__handle" />

      <Handle id="left-1" type="source" position={Position.Left} style={{ top: '25%' }} className="software-node__handle" />
      <Handle id="left-2" type="source" position={Position.Left} style={{ top: '50%' }} className="software-node__handle" />
      <Handle id="left-3" type="source" position={Position.Left} style={{ top: '75%' }} className="software-node__handle" />
      <div className="software-node__content">
        <div className="software-node__icon" style={{ '--icon-bg': style.bg, color: style.color } as CSSVarProps}>
          <Icon size="100%" />
        </div>
        <div className="software-node__text">
          <div className="software-node__title">{data.label}</div>
          <div className="software-node__subtitle">{data.subtitle}</div>
        </div>
      </div>
    </div>
  );
}
