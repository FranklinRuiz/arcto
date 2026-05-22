import type { GroupFormData, NodeFormData, SoftwareEdge, SoftwareNode } from '../types/diagram.types';
import { PalettePanel } from './PalettePanel';

interface SidebarProps {
  isOpen: boolean;
  selectedNode: SoftwareNode | null;
  selectedEdge: SoftwareEdge | null;
  toggleEdgeAsync: (edgeId: string) => void;
  liveUpdateNode: (nodeId: string, patch: Partial<NodeFormData>) => void;
  liveUpdateGroup: (nodeId: string, patch: Partial<GroupFormData>) => void;
  liveUpdateEdge: (edgeId: string, patch: { label?: string; color?: string; strokeWidth?: number }) => void;
}

export function Sidebar({ isOpen, selectedNode, selectedEdge, toggleEdgeAsync, liveUpdateNode, liveUpdateGroup, liveUpdateEdge }: SidebarProps) {
  return (
    <aside className={`sidebar${isOpen ? '' : ' sidebar--collapsed'}`}>
      <div className="sidebar__inner">
        <PalettePanel
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          toggleEdgeAsync={toggleEdgeAsync}
          liveUpdateNode={liveUpdateNode}
          liveUpdateGroup={liveUpdateGroup}
          liveUpdateEdge={liveUpdateEdge}
        />
      </div>
    </aside>
  );
}
