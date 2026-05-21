import { useEffect, useRef, useState } from 'react';
import { useReactFlow, type NodeProps } from '@xyflow/react';
import type { TextNode } from '../types/diagram.types';

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48];
const TB_COLORS = ['#0f172a', '#64748b', '#6366f1', '#0ea5e9', '#16a34a', '#dc2626', '#ea580c', '#f59e0b'];

function autoHeight(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

export function TextNodeComponent({ id, data, selected }: NodeProps<TextNode>) {
  const { updateNodeData } = useReactFlow();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const sizerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      autoHeight(ref.current);
      ref.current.setSelectionRange(ref.current.value.length, ref.current.value.length);
    }
  }, [editing]);

  useEffect(() => {
    if (editing && ref.current && sizerRef.current) {
      ref.current.style.width = `${sizerRef.current.offsetWidth + 4}px`;
    }
  }, [draft, editing]);

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

  const resolvedFont = data.fontFamily === 'jetbrains'
    ? "'JetBrains Mono', monospace"
    : "Inter, ui-sans-serif, system-ui, sans-serif";

  const textStyle: React.CSSProperties = {
    fontSize: data.fontSize,
    fontWeight: data.bold ? '700' : '400',
    fontStyle: data.italic ? 'italic' : 'normal',
    textDecoration: data.underline ? 'underline' : 'none',
    color: data.color,
    fontFamily: resolvedFont,
  };

  const widestLine = draft.split('\n').reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <div className={`text-node${selected ? ' text-node--selected' : ''}`}>

      {/* Toolbar flotante — visible al seleccionar, oculto al editar */}
      {selected && !editing && (
        <div className="text-node__toolbar nodrag nopan">
          <button
            className={`text-node__tb-btn${data.bold ? ' text-node__tb-btn--active' : ''}`}
            onMouseDown={(e) => { e.preventDefault(); update({ bold: !data.bold }); }}
            title="Negrita"
          ><strong>B</strong></button>
          <button
            className={`text-node__tb-btn${data.italic ? ' text-node__tb-btn--active' : ''}`}
            onMouseDown={(e) => { e.preventDefault(); update({ italic: !data.italic }); }}
            title="Cursiva"
          ><em>I</em></button>
          <button
            className={`text-node__tb-btn${data.underline ? ' text-node__tb-btn--active' : ''}`}
            onMouseDown={(e) => { e.preventDefault(); update({ underline: !data.underline }); }}
            title="Subrayado"
          ><span style={{ textDecoration: 'underline' }}>U</span></button>

          <div className="text-node__tb-sep" />

          <select
            className="text-node__tb-size"
            value={data.fontFamily ?? 'inter'}
            onChange={(e) => update({ fontFamily: e.target.value as 'inter' | 'jetbrains' })}
            title="Fuente"
          >
            <option value="inter">Inter</option>
            <option value="jetbrains">JetBrains Mono</option>
          </select>

          <div className="text-node__tb-sep" />

          <select
            className="text-node__tb-size"
            value={data.fontSize}
            onChange={(e) => update({ fontSize: Number(e.target.value) })}
          >
            {FONT_SIZES.map((s) => <option key={s} value={s}>{s}px</option>)}
          </select>

          <div className="text-node__tb-sep" />

          {TB_COLORS.map((c) => (
            <button
              key={c}
              className={`text-node__tb-color${data.color === c ? ' text-node__tb-color--active' : ''}`}
              style={{ background: c }}
              onMouseDown={(e) => { e.preventDefault(); update({ color: c }); }}
              title={c}
            />
          ))}
        </div>
      )}

      {editing && (
        <span ref={sizerRef} className="text-node__sizer" style={textStyle} aria-hidden="true">
          {widestLine || ' '}
        </span>
      )}

      {editing ? (
        <textarea
          ref={ref}
          className="text-node__input"
          style={textStyle}
          value={draft}
          onChange={(e) => { setDraft(e.target.value); autoHeight(e.target); }}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
            if (e.key === 'Escape') { e.preventDefault(); setEditing(false); }
          }}
        />
      ) : (
        <span
          className={`text-node__text${!data.text ? ' text-node__text--placeholder' : ''}`}
          style={data.text ? textStyle : undefined}
          onDoubleClick={startEdit}
        >
          {data.text || 'Doble clic para escribir...'}
        </span>
      )}
    </div>
  );
}
