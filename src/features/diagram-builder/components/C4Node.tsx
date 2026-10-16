import { useContext } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { C4Node } from '../types/diagram.types';
import { c4HasTechnology, formatC4Meta, getC4NodeSize } from '../constants/c4.constants';
import { C4ShapeSvg, c4TextInsets } from './c4/C4ShapeSvg';
import { EdgeEditContext } from './EdgeEditContext';

const HANDLES: { id: string; position: Position; style: React.CSSProperties }[] = [
  ...['10%', '30%', '50%', '70%', '90%'].map((left, i) => ({ id: `top-${i + 1}`, position: Position.Top, style: { left } })),
  ...['25%', '50%', '75%'].map((top, i) => ({ id: `right-${i + 1}`, position: Position.Right, style: { top } })),
  ...['10%', '30%', '50%', '70%', '90%'].map((left, i) => ({ id: `bottom-${i + 1}`, position: Position.Bottom, style: { left } })),
  ...['25%', '50%', '75%'].map((top, i) => ({ id: `left-${i + 1}`, position: Position.Left, style: { top } })),
];

export function C4NodeComponent({ id, data, selected, width, height }: NodeProps<C4Node>) {
  const { activeNodeIds, arrivalNodeIds } = useContext(EdgeEditContext);
  const fallback = getC4NodeSize(data.shape);
  const w = width ?? fallback.width;
  const h = height ?? fallback.height;
  const insets = c4TextInsets(data.shape, w, h);
  const meta = formatC4Meta(data.c4Type, c4HasTechnology(data.shape, data.c4Type) ? data.technology : '');
  const isBeacon = activeNodeIds.has(id);
  const isArrival = arrivalNodeIds.has(id);

  return (
    <div
      className={`c4-node${selected ? ' c4-node--selected' : ''}${isBeacon ? ' c4-node--beacon' : ''}${isArrival ? ' c4-node--arrival' : ''}`}
      style={{ color: data.color }}
    >
      {HANDLES.map((handle) => (
        <Handle key={handle.id} id={handle.id} type="source" position={handle.position} style={handle.style} className="software-node__handle" />
      ))}
      <C4ShapeSvg shape={data.shape} width={w} height={h} color={data.color} className="c4-node__shape" />
      <div
        className="c4-node__text"
        style={{ top: insets.top, right: insets.right, bottom: insets.bottom, left: insets.left }}
      >
        <div className="c4-node__name">{data.label}</div>
        {meta && <div className="c4-node__meta">{meta}</div>}
        {data.description && <div className="c4-node__desc">{data.description}</div>}
      </div>
    </div>
  );
}
