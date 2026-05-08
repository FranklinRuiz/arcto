import type { DragEvent } from 'react';
import { PALETTE, PALETTE_GROUPS } from '../constants/diagram.constants';
import { NODE_KINDS, type NodeKind, type PaletteItem, type SoftwareNode, type TextNodeData } from '../types/diagram.types';
import { iconMap, ServerIcon, TypeIcon } from './icons/DiagramIcons';

interface PalettePanelProps {
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
  selectedNode: SoftwareNode | null;
  updateTextNodeData: (nodeId: string, patch: Partial<TextNodeData>) => void;
}

const iconStyle: Record<NodeKind, { background: string; color: string }> = {
  [NODE_KINDS.DEFAULT]:   { background: '#f1f5f9', color: '#64748b' },
  [NODE_KINDS.FRONTEND]:  { background: '#e0f2fe', color: '#0369a1' },
  [NODE_KINDS.MOBILE]:    { background: '#cffafe', color: '#0e7490' },
  [NODE_KINDS.GATEWAY]:   { background: '#ffedd5', color: '#c2410c' },
  [NODE_KINDS.BACKEND]:   { background: '#ede9fe', color: '#6d28d9' },
  [NODE_KINDS.DATABASE]:  { background: '#d1fae5', color: '#065f46' },
  [NODE_KINDS.CACHE]:     { background: '#dcfce7', color: '#166534' },
  [NODE_KINDS.QUEUE]:     { background: '#fce7f3', color: '#9d174d' },
  [NODE_KINDS.SECURITY]:  { background: '#fef3c7', color: '#92400e' },
  [NODE_KINDS.CLOUD]:     { background: '#e0e7ff', color: '#3730a3' },
  [NODE_KINDS.ONPREMISE]: { background: '#dbeafe', color: '#1e3a8a' },
  [NODE_KINDS.EXTERNAL]:  { background: '#f1f5f9', color: '#475569' },
  [NODE_KINDS.MAINFRAME]: { background: '#e7e5e4', color: '#1c1917' },
  [NODE_KINDS.WORKER]:    { background: '#ffe4e6', color: '#be123c' },
};

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48];
const TEXT_COLORS = [
  { value: '#0f172a', label: 'Negro' },
  { value: '#334155', label: 'Gris oscuro' },
  { value: '#64748b', label: 'Gris' },
  { value: '#6366f1', label: 'Índigo' },
  { value: '#0ea5e9', label: 'Azul' },
  { value: '#16a34a', label: 'Verde' },
  { value: '#dc2626', label: 'Rojo' },
  { value: '#ea580c', label: 'Naranja' },
];

const heroItem = PALETTE.find((p) => p.type === NODE_KINDS.DEFAULT)!;

interface TextEditPanelProps {
  data: TextNodeData;
  onUpdate: (patch: Partial<TextNodeData>) => void;
}

function TextEditPanel({ data, onUpdate }: TextEditPanelProps) {
  return (
    <div className="text-edit-panel">
      <div className="text-edit-panel__row">
        <div className="text-edit-panel__fmt">
          <button
            type="button"
            className={`text-edit-btn${data.bold ? ' text-edit-btn--active' : ''}`}
            onClick={() => onUpdate({ bold: !data.bold })}
            title="Negrita"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className={`text-edit-btn${data.italic ? ' text-edit-btn--active' : ''}`}
            onClick={() => onUpdate({ italic: !data.italic })}
            title="Cursiva"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className={`text-edit-btn${data.underline ? ' text-edit-btn--active' : ''}`}
            onClick={() => onUpdate({ underline: !data.underline })}
            title="Subrayado"
          >
            <span style={{ textDecoration: 'underline' }}>U</span>
          </button>
        </div>

        <div className="select-wrapper select-wrapper--sm">
          <select
            className="form-control form-control--select text-edit-panel__size"
            value={data.fontSize}
            onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
            title="Tamaño"
          >
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-edit-panel__colors">
        {TEXT_COLORS.map((c) => (
          <button
            key={c.value}
            type="button"
            className={`text-edit-swatch${data.color === c.value ? ' text-edit-swatch--active' : ''}`}
            style={{ background: c.value }}
            onClick={() => onUpdate({ color: c.value })}
            title={c.label}
          />
        ))}
      </div>
    </div>
  );
}

export function PalettePanel({ onDragStart, selectedNode, updateTextNodeData }: PalettePanelProps) {
  const HeroIcon = iconMap[heroItem.type] ?? ServerIcon;

  const isTextSelected = selectedNode !== null && (selectedNode.type as string) === 'textNode';
  const textData = isTextSelected ? (selectedNode!.data as unknown as TextNodeData) : null;

  return (
    <section className="palette-section">
      <div className="panel__title">Elementos</div>

      <button
        type="button"
        draggable
        onDragStart={(e) => onDragStart(e, heroItem)}
        className="palette__hero"
      >
        <div className="palette__icon" style={iconStyle[heroItem.type]}>
          <HeroIcon size={20} />
        </div>
        <div className="palette__hero-text">
          <div className="palette__label">{heroItem.label}</div>
          <div className="palette__subtitle">{heroItem.subtitle}</div>
        </div>
      </button>

      <div className="palette__group">
        <div className="palette__group-label">Anotaciones</div>
        <button
          type="button"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/reactflow', JSON.stringify({ __isText: true }));
            e.dataTransfer.effectAllowed = 'move';
            const ghost = document.createElement('div');
            ghost.style.cssText =
              'position:fixed;top:-200px;left:-200px;padding:6px 14px;background:#0f172a;color:white;' +
              'border-radius:10px;font:700 13px/1.4 Inter,sans-serif;white-space:nowrap;pointer-events:none;' +
              'box-shadow:0 8px 24px rgba(15,23,42,0.35);';
            ghost.textContent = 'Texto';
            document.body.appendChild(ghost);
            e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, 20);
            requestAnimationFrame(() => document.body.removeChild(ghost));
          }}
          className="palette__text-item"
        >
          <div className="palette__icon" style={{ background: '#f8fafc', color: '#64748b' }}>
            <TypeIcon size={17} />
          </div>
          <div>
            <div className="palette__label">Texto</div>
            <div className="palette__subtitle">Texto libre con formato</div>
          </div>
        </button>

        {isTextSelected && textData && selectedNode && (
          <TextEditPanel
            data={textData}
            onUpdate={(patch) => updateTextNodeData(selectedNode!.id, patch)}
          />
        )}
      </div>

      {PALETTE_GROUPS.map((group) => (
        <div key={group.label} className="palette__group">
          <div className="palette__group-label">{group.label}</div>
          <div className="palette__group-grid">
            {group.items.map((item) => {
              const Icon = iconMap[item.type] ?? ServerIcon;
              return (
                <button
                  key={item.type}
                  type="button"
                  draggable
                  onDragStart={(e) => onDragStart(e, item)}
                  className="palette__item"
                >
                  <div className="palette__icon" style={iconStyle[item.type]}>
                    <Icon size={15} />
                  </div>
                  <div className="palette__label">{item.label}</div>
                  <div className="palette__subtitle">{item.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
