import { useContext } from 'react';
import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import type { C4BoundaryNode } from '../types/diagram.types';
import { formatC4Meta } from '../constants/c4.constants';
import { EdgeEditContext } from './EdgeEditContext';

export function C4BoundaryNodeComponent({ data, selected }: NodeProps<C4BoundaryNode>) {
  const { presentationMode } = useContext(EdgeEditContext);
  const meta = formatC4Meta(data.c4Type, data.technology);
  const instances = data.variant === 'deployment' ? (data.instances ?? '').trim() : '';

  return (
    <div className="group-node-outer" style={{ '--resize-color': data.color } as React.CSSProperties}>
      <NodeResizer
        isVisible={selected && !presentationMode}
        minWidth={180}
        minHeight={120}
        handleStyle={{ width: 6, height: 6, borderRadius: 2, background: data.color, border: '1.5px solid white' }}
      />
      <Handle id="top"    type="source" position={Position.Top}    className="group-node__handle" />
      <Handle id="right"  type="source" position={Position.Right}  className="group-node__handle" />
      <Handle id="bottom" type="source" position={Position.Bottom} className="group-node__handle" />
      <Handle id="left"   type="source" position={Position.Left}   className="group-node__handle" />
      <div
        className={`c4-boundary c4-boundary--${data.variant}${instances ? ' c4-boundary--stacked' : ''}${selected ? ' c4-boundary--selected' : ''}`}
        style={{ borderColor: data.color, color: data.color }}
      >
        <div className="c4-boundary__label">
          {data.label && <div className="c4-boundary__name">{data.label}</div>}
          {meta && data.variant !== 'group' && <div className="c4-boundary__meta">{meta}</div>}
        </div>
        {instances && <div className="c4-boundary__instances">{instances}</div>}
      </div>
    </div>
  );
}
