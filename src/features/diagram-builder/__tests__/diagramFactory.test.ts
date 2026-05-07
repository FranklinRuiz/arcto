import { describe, expect, it, vi } from 'vitest';
import { NODE_KINDS } from '../types/diagram.types';
import { buildEdgeFormFromEdge, buildNodeFormFromNode, createAnimatedEdge, createNode, normalizeNodeData } from '../utils/diagramFactory';
import { INITIAL_EDGES, INITIAL_NODES } from '../constants/diagram.constants';

describe('diagramFactory', () => {
  it('creates a software node from a palette item', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1000);
    vi.spyOn(Math, 'random').mockReturnValue(0.123);

    const node = createNode({
      item: { type: NODE_KINDS.SECURITY, label: 'Firewall', subtitle: 'FortiGate', description: '' },
      position: { x: 10, y: 20 },
    });

    expect(node.type).toBe('softwareNode');
    expect(node.data.kind).toBe(NODE_KINDS.SECURITY);
    expect(node.data.label).toBe('Firewall');
    expect(node.position).toEqual({ x: 10, y: 20 });

    vi.restoreAllMocks();
  });

  it('creates an animated edge with default label', () => {
    const edge = createAnimatedEdge({ source: 'a', target: 'b' });

    expect(edge.source).toBe('a');
    expect(edge.target).toBe('b');
    expect(edge.animated).toBe(true);
    expect(edge.label).toBe('conexión');
  });

  it('normalizes invalid node data', () => {
    const normalized = normalizeNodeData({ label: '', subtitle: '', kind: 'unknown' as never });

    expect(normalized.kind).toBe(NODE_KINDS.BACKEND);
    expect(normalized.label).toBe('Componente sin nombre');
    expect(normalized.subtitle).toBe('Sin tecnología definida');
  });

  it('builds forms from node and edge', () => {
    expect(buildNodeFormFromNode(INITIAL_NODES[0]).label).toBe('Frontend Web');
    expect(buildEdgeFormFromEdge(INITIAL_EDGES[0]).label).toBe('HTTPS / JSON');
  });
});
