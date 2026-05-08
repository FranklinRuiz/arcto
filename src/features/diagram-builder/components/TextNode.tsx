import { useEffect, useRef, useState } from 'react';
import { useReactFlow, type NodeProps } from '@xyflow/react';
import type { TextNode } from '../types/diagram.types';


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

  // Ajusta el ancho del textarea al texto más ancho de cada línea
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

  const textStyle: React.CSSProperties = {
    fontSize: data.fontSize,
    fontWeight: data.bold ? '700' : '400',
    fontStyle: data.italic ? 'italic' : 'normal',
    textDecoration: data.underline ? 'underline' : 'none',
    color: data.color,
  };

  // Línea más larga para medir el ancho necesario
  const widestLine = draft.split('\n').reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <div className={`text-node${selected ? ' text-node--selected' : ''}`}>
      {/* Span oculto que mide el ancho real del texto */}
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
          onKeyDown={(e) => { if (e.key === 'Escape') setEditing(false); }}
        />
      ) : (
        <span className="text-node__text" style={textStyle} onDoubleClick={startEdit}>
          {data.text}
        </span>
      )}
    </div>
  );
}
