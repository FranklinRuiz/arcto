import { useEffect, useRef, useState } from 'react';
import { useReactFlow, Handle, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import type { CircleGroupNode } from '../types/diagram.types';

export function CircleGroupNodeComponent({ id, data, selected }: NodeProps<CircleGroupNode>) {
  const { updateNodeData } = useReactFlow();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraft(data.label);
    setEditing(true);
  };

  const commit = () => {
    const trimmed = draft.trim();
    updateNodeData(id, { label: trimmed || 'Nombre del grupo' });
    setEditing(false);
  };

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
          background: data.filled ? data.color + '0a' : 'transparent',
        }}
      >
        {editing ? (
          <input
            ref={inputRef}
            className="circle-group__label-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); commit(); }
              if (e.key === 'Escape') setEditing(false);
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ background: `color-mix(in srgb, ${data.color} 12%, white)`, color: data.color, border: `0.5px solid color-mix(in srgb, ${data.color} 35%, transparent)` }}
          />
        ) : (
          <div
            className="circle-group__label"
            style={{ background: `color-mix(in srgb, ${data.color} 12%, white)`, color: data.color, border: `0.5px solid color-mix(in srgb, ${data.color} 35%, transparent)` }}
            onDoubleClick={startEdit}
          >
            {data.label || 'Nombre del grupo'}
          </div>
        )}
      </div>
    </div>
  );
}
