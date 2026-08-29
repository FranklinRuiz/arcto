import { createContext } from 'react';

export interface EdgeEditContextValue {
  editingEdgeId: string | null;
  onCommit: (edgeId: string, label: string) => void;
  onCancel: () => void;
  /** Ids of nodes that should show the "beacon" pulse (the selected node + its direct neighbors). */
  activeNodeIds: ReadonlySet<string>;
  /** Ids of edges connected to the selected node — these play the flow animation. */
  activeEdgeIds: ReadonlySet<string>;
}

const EMPTY_SET: ReadonlySet<string> = new Set();

export const EdgeEditContext = createContext<EdgeEditContextValue>({
  editingEdgeId: null,
  onCommit: () => {},
  onCancel: () => {},
  activeNodeIds: EMPTY_SET,
  activeEdgeIds: EMPTY_SET,
});
