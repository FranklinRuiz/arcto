import { createContext } from 'react';

export interface EdgeEditContextValue {
  editingEdgeId: string | null;
  onCommit: (edgeId: string, label: string) => void;
  onCancel: () => void;
}

export const EdgeEditContext = createContext<EdgeEditContextValue>({
  editingEdgeId: null,
  onCommit: () => {},
  onCancel: () => {},
});
