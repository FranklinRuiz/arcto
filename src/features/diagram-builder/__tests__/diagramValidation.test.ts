import { describe, expect, it } from 'vitest';
import { INITIAL_EDGES, INITIAL_NODES } from '../constants/diagram.constants';
import { isValidDiagramPayload } from '../utils/diagramValidation';

describe('diagramValidation', () => {
  it('accepts a valid diagram payload', () => {
    expect(isValidDiagramPayload({ nodes: INITIAL_NODES, edges: INITIAL_EDGES })).toBe(true);
  });

  it('rejects an invalid diagram payload', () => {
    expect(isValidDiagramPayload({ nodes: {}, edges: [] })).toBe(false);
    expect(isValidDiagramPayload(null)).toBe(false);
  });
});
