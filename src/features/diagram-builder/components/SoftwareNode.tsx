import { Handle, Position, type NodeProps } from '@xyflow/react';
import { NODE_KINDS, type SoftwareNode } from '../types/diagram.types';
import { iconMap, ServerIcon } from './icons/DiagramIcons';

const kindClassName = {
  [NODE_KINDS.FRONTEND]: 'software-node--frontend',
  [NODE_KINDS.BACKEND]: 'software-node--backend',
  [NODE_KINDS.DATABASE]: 'software-node--database',
  [NODE_KINDS.CLOUD]: 'software-node--cloud',
  [NODE_KINDS.SECURITY]: 'software-node--security',
  [NODE_KINDS.WORKER]: 'software-node--worker',
};

export function SoftwareNodeComponent({ data, selected }: NodeProps<SoftwareNode>) {
  const Icon = iconMap[data.icon] ?? ServerIcon;

  return (
    <div className={`software-node ${kindClassName[data.kind]} ${selected ? 'software-node--selected' : ''}`}>
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
        <div className="software-node__icon">
          <Icon size={23} />
        </div>
        <div className="software-node__text">
          <div className="software-node__title">{data.label}</div>
          <div className="software-node__subtitle">{data.subtitle}</div>
          {data.description ? <div className="software-node__description">{data.description}</div> : null}
        </div>
      </div>
    </div>
  );
}
