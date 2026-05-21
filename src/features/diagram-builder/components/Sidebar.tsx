import type { DragEvent } from 'react';
import type { PaletteItem, SoftwareEdge, SoftwareNode, TextNodeData } from '../types/diagram.types';
import { PalettePanel } from './PalettePanel';

interface SidebarProps {
  isOpen: boolean;
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
  selectedNode: SoftwareNode | null;
  updateTextNodeData: (nodeId: string, patch: Partial<TextNodeData>) => void;
  selectedEdge: SoftwareEdge | null;
  toggleEdgeAsync: (edgeId: string) => void;
}

export function Sidebar({ isOpen, onDragStart, selectedNode, updateTextNodeData, selectedEdge, toggleEdgeAsync }: SidebarProps) {
  return (
    <aside className={`sidebar${isOpen ? '' : ' sidebar--collapsed'}`}>
      <div className="sidebar__inner">
        <PalettePanel
          onDragStart={onDragStart}
          selectedNode={selectedNode}
          updateTextNodeData={updateTextNodeData}
          selectedEdge={selectedEdge}
          toggleEdgeAsync={toggleEdgeAsync}
        />
      </div>
    </aside>
  );
}
