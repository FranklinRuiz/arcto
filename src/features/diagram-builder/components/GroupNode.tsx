import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import type { GroupNode } from '../types/diagram.types';

export function GroupNodeComponent({ data, selected }: NodeProps<GroupNode>) {
  return (
    <div className="group-node-outer">
      <NodeResizer
        isVisible={selected}
        minWidth={180}
        minHeight={120}
        handleStyle={{ width: 10, height: 10, borderRadius: 3, background: data.color, border: '2px solid white' }}
        lineStyle={{ borderColor: data.color, borderWidth: 1.5, borderStyle: 'dashed' }}
      />
      <Handle id="top"    type="source" position={Position.Top}    className="group-node__handle" />
      <Handle id="right"  type="source" position={Position.Right}  className="group-node__handle" />
      <Handle id="bottom" type="source" position={Position.Bottom} className="group-node__handle" />
      <Handle id="left"   type="source" position={Position.Left}   className="group-node__handle" />
      <div
        className={`group-node${selected ? ' group-node--selected' : ''}`}
        style={{
          borderColor: data.color,
          background: data.color + '18',
        }}
      >
        <div className="group-node__label" style={{ background: data.color }}>
          {data.label}
        </div>
      </div>
    </div>
  );
}
