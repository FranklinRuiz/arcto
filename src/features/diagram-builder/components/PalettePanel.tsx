import type { DragEvent } from 'react';
import { PALETTE } from '../constants/diagram.constants';
import type { PaletteItem } from '../types/diagram.types';
import { iconMap, ServerIcon } from './icons/DiagramIcons';

interface PalettePanelProps {
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
}

export function PalettePanel({ onDragStart }: PalettePanelProps) {
  return (
    <section className="panel panel--muted">
      <div className="panel__title">Elementos</div>
      <div className="palette">
        {PALETTE.map((item) => {
          const Icon = iconMap[item.type] ?? ServerIcon;

          return (
            <button
              key={item.type}
              type="button"
              draggable
              onDragStart={(event) => onDragStart(event, item)}
              className="palette__item"
            >
              <div className="palette__icon">
                <Icon size={19} />
              </div>
              <div>
                <div className="palette__label">{item.label}</div>
                <div className="palette__subtitle">{item.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
