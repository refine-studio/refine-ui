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

const STATUSES = ['success', 'warning', 'danger', 'info'] as const;

const GEM_HUE = Number(/--gem-h:\s*([\d.]+);/.exec(CSS)?.[1]);

/**
 * The OKLCH hue of an `oklch()` literal.
 */
const hue = (oklch = '') => {
  return Number(/^oklch\([\d.]+ [\d.]+ ([\d.]+)\)$/.exec(oklch)?.[1]);
};

/**
 * The shorter way round the hue circle between two hues, in degrees.
 */
const hueGap = (one: number, other: number) => {
  const gap = Math.abs(one - other) % 360;

  return Math.min(gap, 360 - gap);
};

const PAIRS = CHARTS.flatMap((one, index) => {
  return CHARTS.slice(index + 1).map((other) => {
    return [one, other] as const;
  });
});

/**
 * The least OKLab distance any two chart colours keep. The five hues left after the status
 * and gem gaps share the blue-yellow axis that tritanopia loses, so it gets 7 instead of 10.
 */
const PAIR_DISTANCE = {
  deuteranopia: 10,
  protanopia: 10,
  tritanopia: 7,
  typical: 10,
} as const;

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

  it.each(VISIONS)('every pair stays apart under %s vision', (vision) => {
    for (const [one, other] of PAIRS) {
      expect(distance(VALUES.get(one), VALUES.get(other), vision), `${one} ↔ ${other}`).toBeGreaterThanOrEqual(
        PAIR_DISTANCE[vision],
      );
    }
  });

  it.each(CHARTS)('%s keeps 25° of hue from the gem teal', (chart) => {
    expect(hueGap(hue(VALUES.get(chart)), GEM_HUE)).toBeGreaterThanOrEqual(25);
  });

  describe.each(Object.entries(MODES))('in %s mode', (_mode, tokens) => {
    it.each(CHARTS)('%s keeps 25° of hue from every status colour', (chart) => {
      for (const status of STATUSES) {
        expect(hueGap(hue(VALUES.get(chart)), hue(tokens.get(status))), status).toBeGreaterThanOrEqual(25);
      }
    });

    it.each(CHARTS)('%s passes 2:1 on every surface', (chart) => {
      for (const surface of SURFACES) {
        expect(contrast(VALUES.get(chart), tokens.get(surface)), `on ${surface}`).toBeGreaterThanOrEqual(2);
      }
    });
  });
});
