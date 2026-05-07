import type { DragEvent } from 'react';
import { PALETTE, PALETTE_GROUPS } from '../constants/diagram.constants';
import { NODE_KINDS, type NodeKind, type PaletteItem } from '../types/diagram.types';
import { iconMap, ServerIcon } from './icons/DiagramIcons';

interface PalettePanelProps {
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
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

const heroItem = PALETTE.find((p) => p.type === NODE_KINDS.DEFAULT)!;

export function PalettePanel({ onDragStart }: PalettePanelProps) {
  const HeroIcon = iconMap[heroItem.type] ?? ServerIcon;

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
                    <Icon size={17} />
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

