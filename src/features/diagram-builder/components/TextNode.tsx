import { useEffect, useRef, useState } from 'react';
import { useReactFlow, type NodeProps } from '@xyflow/react';
import type { TextNode } from '../types/diagram.types';

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48];
const COLORS = [
  { value: '#0f172a', label: 'Negro' },
  { value: '#334155', label: 'Gris oscuro' },
  { value: '#64748b', label: 'Gris' },
  { value: '#6366f1', label: 'Índigo' },
  { value: '#0ea5e9', label: 'Azul' },
  { value: '#16a34a', label: 'Verde' },
  { value: '#dc2626', label: 'Rojo' },
  { value: '#ea580c', label: 'Naranja' },
];

function autoResize(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

export function TextNodeComponent({ id, data, selected }: NodeProps<TextNode>) {
  const { updateNodeData } = useReactFlow();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      autoResize(ref.current);
      ref.current.setSelectionRange(ref.current.value.length, ref.current.value.length);
    }
  }, [editing]);

  const update = (patch: Partial<TextNode['data']>) => updateNodeData(id, patch);

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraft(data.text);
    setEditing(true);
  };

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed) update({ text: trimmed });
    setEditing(false);
  };

  const textStyle: React.CSSProperties = {
    fontSize: data.fontSize,
    fontWeight: data.bold ? '700' : '400',
    fontStyle: data.italic ? 'italic' : 'normal',
    textDecoration: data.underline ? 'underline' : 'none',
    color: data.color,
  };

  return (
    <div className={`text-node${selected ? ' text-node--selected' : ''}`}>
      {selected && !editing && (
        <div className="text-fmt-bar" onMouseDown={(e) => e.preventDefault()}>
          <button
            type="button"
            className={`text-fmt-btn${data.bold ? ' is-active' : ''}`}
            onClick={() => update({ bold: !data.bold })}
            title="Negrita"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className={`text-fmt-btn${data.italic ? ' is-active' : ''}`}
            onClick={() => update({ italic: !data.italic })}
            title="Cursiva"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className={`text-fmt-btn${data.underline ? ' is-active' : ''}`}
            onClick={() => update({ underline: !data.underline })}
            title="Subrayado"
          >
            <span style={{ textDecoration: 'underline' }}>U</span>
          </button>

          <div className="text-fmt-sep" />

          <select
            className="text-fmt-select"
            value={data.fontSize}
            onChange={(e) => update({ fontSize: Number(e.target.value) })}
            title="Tamaño de texto"
          >
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>

          <div className="text-fmt-sep" />

          <div className="text-fmt-colors">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`text-color-swatch${data.color === c.value ? ' is-active' : ''}`}
                style={{ background: c.value }}
                onClick={() => update({ color: c.value })}
                title={c.label}
              />
            ))}
          </div>
        </div>
      )}

      {editing ? (
        <textarea
          ref={ref}
          className="text-node__input"
          style={textStyle}
          value={draft}
          onChange={(e) => { setDraft(e.target.value); autoResize(e.target); }}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Escape') { setEditing(false); }
          }}
        />
      ) : (
        <span
          className="text-node__text"
          style={textStyle}
          onDoubleClick={startEdit}
        >
          {data.text}
        </span>
      )}
    </div>
  );
}
