import type { Edge, Node } from '@xyflow/react';

export const NODE_KINDS = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DATABASE: 'database',
  CLOUD: 'cloud',
  SECURITY: 'security',
  WORKER: 'worker',
} as const;

export type NodeKind = (typeof NODE_KINDS)[keyof typeof NODE_KINDS];

export interface SoftwareNodeData extends Record<string, unknown> {
  label: string;
  subtitle: string;
  description: string;
  kind: NodeKind;
  icon: NodeKind;
}

export interface PaletteItem {
  type: NodeKind;
  label: string;
  subtitle: string;
}

export interface NodeFormData {
  label: string;
  subtitle: string;
  description: string;
  kind: NodeKind;
}

export interface EdgeFormData {
  label: string;
}

export type SoftwareNode = Node<SoftwareNodeData, 'softwareNode'>;
export type SoftwareEdge = Edge;

export interface DiagramPayload {
  nodes: SoftwareNode[];
  edges: SoftwareEdge[];
}
