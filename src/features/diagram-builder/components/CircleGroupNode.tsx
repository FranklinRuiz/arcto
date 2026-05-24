import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import type { CircleGroupNode } from '../types/diagram.types';

export function CircleGroupNodeComponent({ data, selected }: NodeProps<CircleGroupNode>) {
  return (
    <div className="circle-group-outer">
      <NodeResizer
        isVisible={selected}
        minWidth={100}
        minHeight={100}
        handleStyle={{ width: 10, height: 10, borderRadius: 3, background: data.color, border: '2px solid white' }}
        lineStyle={{ borderColor: data.color, borderWidth: 1.5, borderStyle: 'dashed' }}
      />
      <Handle id="top"    type="source" position={Position.Top}    className="group-node__handle" />
      <Handle id="right"  type="source" position={Position.Right}  className="group-node__handle" />
      <Handle id="bottom" type="source" position={Position.Bottom} className="group-node__handle" />
      <Handle id="left"   type="source" position={Position.Left}   className="group-node__handle" />
      <div
        className={`circle-group${selected ? ' circle-group--selected' : ''}`}
        style={{
          borderColor: data.color,
          borderStyle: data.dashed !== false ? 'dashed' : 'solid',
          background: data.color + '18',
        }}
      />
    </div>
  );
}
