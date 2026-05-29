import type { Edge, Node } from '@xyflow/react';

export const NODE_KINDS = {
  DEFAULT: 'default',
  USER: 'user',
  FRONTEND: 'frontend',
  MOBILE: 'mobile',
  GATEWAY: 'gateway',
  BACKEND: 'backend',
  DATABASE: 'database',
  CACHE: 'cache',
  QUEUE: 'queue',
  SECURITY: 'security',
  CLOUD: 'cloud',
  EXTERNAL: 'external',
  WORKER: 'worker',
  ONPREMISE: 'onpremise',
  MAINFRAME: 'mainframe',
  AI_MODEL:  'ai_model',
  VECTOR_DB: 'vector_db',
  AI_AGENT:  'ai_agent',
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
  description: string;
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

export interface GroupNodeData extends Record<string, unknown> {
  label: string;
  color: string;
  dashed?: boolean;
  rounded?: boolean;
}

export interface GroupFormData {
  label: string;
  color: string;
  dashed?: boolean;
  rounded?: boolean;
}

export type SoftwareNode = Node<SoftwareNodeData, 'softwareNode'>;
export type IconNode = Node<SoftwareNodeData, 'iconNode'>;
export type GroupNode = Node<GroupNodeData, 'groupNode'>;
export type CircleGroupNode = Node<GroupNodeData, 'circleGroupNode'>;
export type EdgeShape = 'smooth' | 'straight';
export type AlignAxis = 'center-h' | 'center-v';
export type SoftwareEdge = Edge<{ dashed?: boolean; shape?: EdgeShape }>;

export interface TextNodeData extends Record<string, unknown> {
  text: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontSize: number;
  color: string;
  fontFamily: 'inter' | 'jetbrains';
}
export type TextNode = Node<TextNodeData, 'textNode'>;

export interface LabelNodeData extends Record<string, unknown> {
  text: string;
  color: string;
  rotation: number;
  bold?: boolean;
}
export interface LabelFormData {
  text: string;
  color: string;
  rotation: number;
  bold: boolean;
}
export type LabelNode = Node<LabelNodeData, 'labelNode'>;

export interface AnnotationNodeData extends Record<string, unknown> {
  icon: string;
  label: string;
  color: string;
  bg: string;
}
export type AnnotationNode = Node<AnnotationNodeData, 'annotationNode'>;

export type DiagramNode = SoftwareNode | TextNode | IconNode | GroupNode | CircleGroupNode | LabelNode | AnnotationNode;

export interface DiagramPayload {
  title?: string;
  nodes: DiagramNode[];
  edges: SoftwareEdge[];
}
