import { describe, expect, it } from 'vitest';
import { C4_PALETTE, findC4Entry, formatC4Meta } from '../constants/c4.constants';
import { createC4Boundary, createC4Edge, createC4Node } from '../utils/diagramFactory';

describe('C4 elements', () => {
  it('formats the bracketed type line', () => {
    expect(formatC4Meta('Container', 'Java and Spring Boot')).toBe('[Container: Java and Spring Boot]');
    expect(formatC4Meta('Software System', '')).toBe('[Software System]');
    expect(formatC4Meta('', '')).toBe('');
  });

  it('creates an element node from a palette entry', () => {
    const node = createC4Node({ entry: findC4Entry('person')!, position: { x: 5, y: 6 } });

    expect(node?.type).toBe('c4Node');
    expect(node?.data.shape).toBe('person');
    expect(node?.data.c4Type).toBe('Person');
    expect(node?.width).toBe(200);
    expect(node?.height).toBe(200);
  });

  it('creates a boundary node that sits behind elements', () => {
    const node = createC4Boundary({ entry: findC4Entry('deployment-node')!, position: { x: 0, y: 0 } });

    expect(node?.type).toBe('c4Boundary');
    expect(node?.data.variant).toBe('deployment');
    expect(node?.zIndex).toBe(-1);
  });

  it('only builds the node kind an entry describes', () => {
    expect(createC4Node({ entry: findC4Entry('group')!, position: { x: 0, y: 0 } })).toBeNull();
    expect(createC4Boundary({ entry: findC4Entry('person')!, position: { x: 0, y: 0 } })).toBeNull();
  });

  it('gives every palette entry exactly one of node or boundary', () => {
    for (const entry of C4_PALETTE) {
      expect(Boolean(entry.node) !== Boolean(entry.boundary)).toBe(true);
    }
  });

  it('creates a dashed grey straight relationship', () => {
    const edge = createC4Edge({ source: 'a', target: 'b' });

    expect(edge.data?.c4).toBe(true);
    expect(edge.data?.dashed).toBe(true);
    expect(edge.data?.shape).toBe('straight');
    expect((edge.style as { stroke?: string }).stroke).toBe('#444444');
  });
});
