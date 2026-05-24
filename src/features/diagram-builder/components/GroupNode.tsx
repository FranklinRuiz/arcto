import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import type { GroupNode } from '../types/diagram.types';

export function GroupNodeComponent({ data, selected }: NodeProps<GroupNode>) {
  const isDashed = data.dashed !== false;
  const borderRadius = data.rounded !== false ? 16 : 4;

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
          borderStyle: isDashed ? 'dashed' : 'solid',
          borderRadius,
          background: data.color + '0a',
        }}
      >
        {data.label && (
          <div className="group-node__label" style={{ background: `color-mix(in srgb, ${data.color} 12%, white)`, color: data.color, border: `0.5px solid color-mix(in srgb, ${data.color} 35%, transparent)` }}>
            {data.label}
          </div>
        )}
      </div>
    </div>
  );
}
