import { MarkerType, type XYPosition } from '@xyflow/react';
import { NODE_KINDS, type AnnotationNode, type CircleGroupNode, type EdgeFormData, type GroupNode, type IconNode, type LabelNode, type NodeFormData, type NodeKind, type PaletteItem, type SoftwareEdge, type SoftwareNode, type SoftwareNodeData } from '../types/diagram.types';

function isNodeKind(value: unknown): value is NodeKind {
  return Object.values(NODE_KINDS).includes(value as NodeKind);
}

export function normalizeNodeData(data: Partial<SoftwareNodeData> = {}): SoftwareNodeData {
  const kind = isNodeKind(data.kind) ? data.kind : NODE_KINDS.BACKEND;

  return {
    label: data.label?.trim() || 'Componente sin nombre',
    subtitle: data.subtitle?.trim() || 'Sin tecnología definida',
    description: data.description?.trim() || 'Sin descripción registrada.',
    kind,
    icon: kind,
  };
}

export function createNode(params: {
  item: PaletteItem;
  position: XYPosition;
  customLabel?: string;
  customSubtitle?: string;
}): SoftwareNode {
  const kind = params.item.type || NODE_KINDS.BACKEND;

  return {
    id: `${kind}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'softwareNode',
    position: params.position,
    data: {
      label: params.customLabel?.trim() || params.item.label || 'Nuevo componente',
      subtitle: params.customSubtitle?.trim() || params.item.subtitle || 'Descripción técnica',
      description: params.item.description || 'Describe aquí la responsabilidad técnica de este componente.',
      kind,
      icon: kind,
    },
  };
}

export function createAnimatedEdge(params: {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  label?: string;
}): SoftwareEdge {
  return {
    id: `edge-${params.source}-${params.target}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    source: params.source,
    target: params.target,
    sourceHandle: params.sourceHandle,
    targetHandle: params.targetHandle,
    type: 'smoothstep',
    animated: false,
    label: params.label?.trim() || 'conexión',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2.4 },
    data: { dashed: false, shape: 'smooth' as const },
  };
}

export function createIconNode(params: {
  item: PaletteItem;
  position: XYPosition;
}): IconNode {
  const kind = params.item.type || NODE_KINDS.BACKEND;
  return {
    id: `icon-${kind}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'iconNode',
    position: params.position,
    data: {
      label: params.item.label,
      subtitle: params.item.subtitle,
      description: params.item.description,
      kind,
      icon: kind,
    },
  };
}

export function createGroupNode(params: { position: XYPosition }): GroupNode {
  return {
    id: `group-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'groupNode',
    position: params.position,
    style: { width: 460, height: 320 },
    zIndex: -1,
    data: { label: 'Zona / Dominio', color: '#1D5A96', dashed: true, rounded: true },
  };
}

export function createCircleGroupNode(params: { position: XYPosition }): CircleGroupNode {
  return {
    id: `circle-group-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'circleGroupNode',
    position: params.position,
    style: { width: 320, height: 320 },
    zIndex: -1,
    data: { label: 'Nombre del grupo', color: '#5B6472', dashed: true },
  };
}

export function createLabelNode(params: { position: XYPosition }): LabelNode {
  return {
    id: `label-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'labelNode',
    position: params.position,
    data: { text: 'Etiqueta', color: '#7A5A22', rotation: 0, bold: false },
  };
}

export function createAnnotationNode(params: {
  position: XYPosition;
  icon: string;
  label: string;
  color: string;
  bg: string;
}): AnnotationNode {
  return {
    id: `annotation-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'annotationNode',
    position: params.position,
    data: { icon: params.icon, label: params.label, color: params.color, bg: params.bg },
  };
}

export function buildNodeFormFromNode(node: SoftwareNode | null): NodeFormData {
  return {
    label: node?.data?.label || '',
    subtitle: node?.data?.subtitle || '',
    description: node?.data?.description || '',
    kind: node?.data?.kind || NODE_KINDS.BACKEND,
  };
}

export function buildEdgeFormFromEdge(edge: SoftwareEdge | null): EdgeFormData {
  return {
    label: typeof edge?.label === 'string' ? edge.label : '',
  };
}
