import type { DiagramPayload } from '../types/diagram.types';

export function isValidDiagramPayload(payload: unknown): payload is DiagramPayload {
  if (!payload || typeof payload !== 'object') return false;

  const candidate = payload as Partial<DiagramPayload>;

  return Boolean(
    Array.isArray(candidate.nodes) &&
      Array.isArray(candidate.edges) &&
      candidate.nodes.every((node) => node.id && node.type && node.position && node.data) &&
      candidate.edges.every((edge) => edge.id && edge.source && edge.target),
  );
}
