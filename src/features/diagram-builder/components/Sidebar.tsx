import type { ChangeEvent, DragEvent } from 'react';
import type { PaletteItem, SoftwareNode } from '../types/diagram.types';
import { AppHeader } from './AppHeader';
import { DiagramActions } from './DiagramActions';
import { PalettePanel } from './PalettePanel';
import { QuickCreatePanel } from './QuickCreatePanel';

interface SidebarProps {
  selectedNode: SoftwareNode | null;
  nodeLabel: string;
  nodeSubtitle: string;
  setNodeLabel: (value: string) => void;
  setNodeSubtitle: (value: string) => void;
  addQuickNode: () => void;
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
  deleteSelected: () => void;
  resetDiagram: () => void;
  exportJson: () => void;
  importJson: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Sidebar(props: SidebarProps) {
  return (
    <aside className="sidebar">
      <AppHeader />
      <PalettePanel onDragStart={props.onDragStart} />
      <QuickCreatePanel
        nodeLabel={props.nodeLabel}
        nodeSubtitle={props.nodeSubtitle}
        setNodeLabel={props.setNodeLabel}
        setNodeSubtitle={props.setNodeSubtitle}
        addQuickNode={props.addQuickNode}
      />
      <DiagramActions
        selectedNode={props.selectedNode}
        deleteSelected={props.deleteSelected}
        resetDiagram={props.resetDiagram}
        exportJson={props.exportJson}
        importJson={props.importJson}
      />
    </aside>
  );
}
