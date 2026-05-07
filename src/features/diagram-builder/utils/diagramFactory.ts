import { MarkerType, type XYPosition } from '@xyflow/react';
import { NODE_KINDS, type EdgeFormData, type NodeFormData, type NodeKind, type PaletteItem, type SoftwareEdge, type SoftwareNode, type SoftwareNodeData } from '../types/diagram.types';

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
    animated: true,
    label: params.label?.trim() || 'conexión',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 3 },
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
