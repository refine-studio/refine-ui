import { describe, expect, it } from 'vitest';

import { contrast, CSS, MODES } from './css.test-utils';
import { distance, VISIONS } from './vision.test-utils';

const CHARTS = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6', 'chart-7', 'chart-8'] as const;

const SURFACES = ['canvas', 'background', 'card', 'popover'] as const;

const VALUES = new Map(
  [...CSS.matchAll(/--(chart-\d+):\s*([^;]+);/g)].map((match) => {
    return [String(match[1]), String(match[2]).trim()] as const;
  }),
);

const NEIGHBOURS = CHARTS.slice(1).map((chart, index) => {
  return [`chart-${index + 1}`, chart] as const;
});

describe('chart colours', () => {
  it.each(CHARTS)('%s ships a value and a utility', (chart) => {
    expect(VALUES.get(chart), `--${chart}`).toMatch(/^oklch\(/);
    expect(CSS, `--color-${chart}`).toContain(`--color-${chart}: var(--${chart});`);
  });

  it.each(VISIONS)('neighbours stay 10 OKLab units apart under %s vision', (vision) => {
    for (const [one, other] of NEIGHBOURS) {
      expect(distance(VALUES.get(one), VALUES.get(other), vision), `${one} → ${other}`).toBeGreaterThanOrEqual(10);
    }
  });

  describe.each(Object.entries(MODES))('in %s mode', (_mode, tokens) => {
    it.each(CHARTS)('%s passes 2:1 on every surface', (chart) => {
      for (const surface of SURFACES) {
        expect(contrast(VALUES.get(chart), tokens.get(surface)), `on ${surface}`).toBeGreaterThanOrEqual(2);
      }
    });
  });
});
