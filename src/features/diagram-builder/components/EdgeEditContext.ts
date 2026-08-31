import { createContext } from 'react';

export interface EdgeEditContextValue {
  editingEdgeId: string | null;
  onCommit: (edgeId: string, label: string) => void;
  onCancel: () => void;
  /** Ids of nodes that should show the "beacon" pulse (the selected node + its direct neighbors). */
  activeNodeIds: ReadonlySet<string>;
  /** Ids of edges connected to the selected node — these play the flow animation. */
  activeEdgeIds: ReadonlySet<string>;
  /** Ids of nodes that are the destination of an active outgoing edge — these flash when the flow dot arrives. */
  arrivalNodeIds: ReadonlySet<string>;
  /** True while presentation mode is active — nodes must not be draggable, resizable or editable. */
  presentationMode: boolean;
  /** True while a Scene is auto-playing — beacon/arrival/dot animations play once per step instead of looping, so a node with no further step (e.g. the end of the sequence) settles instead of pulsing forever. */
  scenePlaybackActive: boolean;
}

const EMPTY_SET: ReadonlySet<string> = new Set();

export const EdgeEditContext = createContext<EdgeEditContextValue>({
  editingEdgeId: null,
  onCommit: () => {},
  onCancel: () => {},
  activeNodeIds: EMPTY_SET,
  activeEdgeIds: EMPTY_SET,
  arrivalNodeIds: EMPTY_SET,
  presentationMode: false,
  scenePlaybackActive: false,
});
