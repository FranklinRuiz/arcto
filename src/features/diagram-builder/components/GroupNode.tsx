import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import type { GroupNode } from '../types/diagram.types';

const LABEL_ALIGN_STYLE: Record<'left' | 'center' | 'right', React.CSSProperties> = {
  left:   { left: 10, right: 'auto', textAlign: 'left' },
  center: { left: '50%', right: 'auto', transform: 'translateX(-50%)', textAlign: 'center' },
  right:  { left: 'auto', right: 10, textAlign: 'right' },
};

export function GroupNodeComponent({ data, selected }: NodeProps<GroupNode>) {
  const isDashed = data.dashed !== false;
  const borderRadius = data.rounded !== false ? 12 : 4;
  const bg = data.filled ? data.color + '14' : 'transparent';
  const labelAlign = data.labelAlign ?? 'left';

  return (
    <div className="group-node-outer" style={{ '--resize-color': data.color } as React.CSSProperties}>
      <NodeResizer
        isVisible={selected}
        minWidth={180}
        minHeight={120}
        handleStyle={{ width: 6, height: 6, borderRadius: 2, background: data.color, border: '1.5px solid white' }}
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
          background: bg,
        }}
      >
        {data.label && (
          <div className="group-node__label" style={{ color: data.color, ...LABEL_ALIGN_STYLE[labelAlign] }}>
            {data.label}
          </div>
        )}
      </div>
    </div>
  );
}
