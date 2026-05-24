import type { NodeProps } from '@xyflow/react';
import type { LabelNode } from '../types/diagram.types';

export function LabelNodeComponent({ data, selected }: NodeProps<LabelNode>) {
  return (
    <div
      className={`label-node${selected ? ' label-node--selected' : ''}`}
      style={{
        borderColor: data.color,
        background: data.color + '15',
        transform: `rotate(${data.rotation ?? 0}deg)`,
      }}
    >
      <span className="label-node__text" style={{ fontWeight: data.bold ? 700 : 600 }}>{data.text}</span>
    </div>
  );
}
