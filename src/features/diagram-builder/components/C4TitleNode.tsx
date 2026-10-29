import type { NodeProps } from '@xyflow/react';
import type { C4TitleNode } from '../types/diagram.types';

/** "System Context View: …" title block placed under a C4 diagram, as on c4model.com. */
export function C4TitleNodeComponent({ data, selected }: NodeProps<C4TitleNode>) {
  return (
    <div className={`c4-title${selected ? ' c4-title--selected' : ''}`}>
      <div className="c4-title__name">{data.label}</div>
      {data.description && <div className="c4-title__desc">{data.description}</div>}
    </div>
  );
}
