import type { DragEvent } from 'react';
import type { PaletteItem, SoftwareNode, TextNodeData } from '../types/diagram.types';
import { PalettePanel } from './PalettePanel';

interface SidebarProps {
  isOpen: boolean;
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
  selectedNode: SoftwareNode | null;
  updateTextNodeData: (nodeId: string, patch: Partial<TextNodeData>) => void;
}

export function Sidebar({ isOpen, onDragStart, selectedNode, updateTextNodeData }: SidebarProps) {
  return (
    <aside className={`sidebar${isOpen ? '' : ' sidebar--collapsed'}`}>
      <div className="sidebar__inner">
        <PalettePanel
          onDragStart={onDragStart}
          selectedNode={selectedNode}
          updateTextNodeData={updateTextNodeData}
        />
      </div>
    </aside>
  );
}
