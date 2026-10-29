import type { C4BoundaryData, C4NodeData, C4TitleData, GroupFormData, LabelFormData, NodeFormData, SoftwareEdge, SoftwareNode } from '../types/diagram.types';
import { PalettePanel } from './PalettePanel';

interface SidebarProps {
  isOpen: boolean;
  selectedNode: SoftwareNode | null;
  selectedEdge: SoftwareEdge | null;
  toggleEdgeAsync: (edgeId: string) => void;
  liveUpdateNode: (nodeId: string, patch: Partial<NodeFormData>) => void;
  liveUpdateGroup: (nodeId: string, patch: Partial<GroupFormData>) => void;
  liveUpdateLabel: (nodeId: string, patch: Partial<LabelFormData>) => void;
  liveUpdateC4: (nodeId: string, patch: Partial<C4NodeData> | Partial<C4BoundaryData> | Partial<C4TitleData>) => void;
  liveUpdateEdge: (edgeId: string, patch: { label?: string; technology?: string; color?: string; strokeWidth?: number; shape?: 'smooth' | 'straight' }) => void;
}

export function Sidebar({ isOpen, selectedNode, selectedEdge, toggleEdgeAsync, liveUpdateNode, liveUpdateGroup, liveUpdateLabel, liveUpdateC4, liveUpdateEdge }: SidebarProps) {
  return (
    <aside className={`sidebar${isOpen ? '' : ' sidebar--collapsed'}`}>
      <div className="sidebar__inner">
        <PalettePanel
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          toggleEdgeAsync={toggleEdgeAsync}
          liveUpdateNode={liveUpdateNode}
          liveUpdateGroup={liveUpdateGroup}
          liveUpdateLabel={liveUpdateLabel}
          liveUpdateC4={liveUpdateC4}
          liveUpdateEdge={liveUpdateEdge}
        />
      </div>
    </aside>
  );
}
