import { describe, expect, it } from 'vitest';
import { NODE_KINDS } from '../types/diagram.types';
import { iconMap } from '../components/icons/DiagramIcons';
import { KIND_CATEGORY, PALETTE } from '../constants/diagram.constants';

describe('element kinds', () => {
  const kinds = Object.values(NODE_KINDS);

  it('gives every kind an icon', () => {
    expect(kinds.filter((kind) => typeof iconMap[kind] !== 'function')).toEqual([]);
  });

  it('gives every kind a category and a palette entry', () => {
    expect(kinds.filter((kind) => !KIND_CATEGORY[kind])).toEqual([]);
    expect(kinds.filter((kind) => !PALETTE.some((item) => item.type === kind))).toEqual([]);
  });
});
