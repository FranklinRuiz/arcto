import type { DragEvent } from 'react';
import type { PaletteItem } from '../types/diagram.types';
import { PalettePanel } from './PalettePanel';

interface SidebarProps {
  isOpen: boolean;
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
}

export function Sidebar({ isOpen, onDragStart }: SidebarProps) {
  return (
    <aside className={`sidebar${isOpen ? '' : ' sidebar--collapsed'}`}>
      <div className="sidebar__inner">
        <PalettePanel onDragStart={onDragStart} />
      </div>
    </aside>
  );
}
