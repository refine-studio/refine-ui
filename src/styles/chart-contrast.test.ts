import { describe, expect, it } from 'vitest';

import { contrast, CSS, MODES, toUnclippedLinearRgb } from './css.test-utils';

const STEPS = ['chart-1', 'chart-2', 'chart-3', 'chart-4'] as const;

const NEUTRALS = ['chart-other', 'chart-other-line'] as const;

const CHARTS = [...STEPS, ...NEUTRALS] as const;

const SURFACES = ['canvas', 'card'] as const;

const GEM_HUE = Number(/--gem-h:\s*([\d.]+);/.exec(CSS)?.[1]);

/**
 * How far a step's hue may stray from the gem hue, in OKLCH degrees.
 */
const HUE_TOLERANCE = 5;

/**
 * The least OKLab lightness gap between neighbouring steps.
 */
const LIGHTNESS_GAP = 0.08;

/**
 * How far an sRGB channel may stray from 0–1 before the value counts as out of gamut, to absorb rounding.
 */
const GAMUT_TOLERANCE = 0.002;

/**
 * The least contrast the two quiet neutrals keep on card and canvas. They are exempt from 2:1 on purpose.
 */
const NEUTRAL_MIN_CONTRAST = 1.3;

/**
 * The lightness, chroma and hue of an `oklch()` literal. OKLCH lightness is OKLab lightness.
 */
const channels = (oklch = '') => {
  const match = /^oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)$/.exec(oklch);

  return {
    chroma: Number(match?.[2]),
    hue: Number(match?.[3]),
    lightness: Number(match?.[1]),
  };
};

/**
 * The shorter way round the hue circle between two hues, in degrees.
 */
const hueGap = (one: number, other: number) => {
  const gap = Math.abs(one - other) % 360;

  return Math.min(gap, 360 - gap);
};

const NEIGHBOURS = STEPS.slice(1).map((step, index) => {
  return [STEPS[index] ?? '', step] as const;
});

describe('chart colours', () => {
  it.each(Object.entries(MODES))('%s mode ships exactly four steps and two neutrals', (_mode, tokens) => {
    expect(
      [...tokens.keys()].filter((name) => {
        return name.startsWith('chart-');
      }),
    ).toEqual([...CHARTS]);
  });

  it.each(CHARTS)('%s ships a utility', (chart) => {
    expect(CSS, `--color-${chart}`).toContain(`--color-${chart}: var(--${chart});`);
  });

  describe.each(Object.entries(MODES))('in %s mode', (mode, tokens) => {
    it.each(STEPS)(`%s keeps the gem hue within ${HUE_TOLERANCE}°`, (step) => {
      expect(hueGap(channels(tokens.get(step)).hue, GEM_HUE)).toBeLessThanOrEqual(HUE_TOLERANCE);
    });

    it.each(NEIGHBOURS)(`%s and %s stay ${LIGHTNESS_GAP} apart in lightness`, (one, other) => {
      const gap = Math.abs(channels(tokens.get(one)).lightness - channels(tokens.get(other)).lightness);

      expect(gap).toBeGreaterThanOrEqual(LIGHTNESS_GAP - 1e-9);
    });

    it.each(NEIGHBOURS)('%s is more saturated than %s', (one, other) => {
      expect(channels(tokens.get(one)).chroma).toBeGreaterThan(channels(tokens.get(other)).chroma);
    });

    it.each(STEPS)('%s passes 2:1 on card and canvas', (step) => {
      for (const surface of SURFACES) {
        expect(contrast(tokens.get(step), tokens.get(surface)), `on ${surface}`).toBeGreaterThanOrEqual(2);
      }
    });

    it.each(CHARTS)('%s sits inside sRGB', (chart) => {
      for (const channel of toUnclippedLinearRgb(tokens.get(chart) ?? '')) {
        expect(channel).toBeGreaterThanOrEqual(-GAMUT_TOLERANCE);
        expect(channel).toBeLessThanOrEqual(1 + GAMUT_TOLERANCE);
      }
    });

    it.each(NEUTRALS)(`%s keeps ${NEUTRAL_MIN_CONTRAST}:1 on card and canvas`, (neutral) => {
      for (const surface of SURFACES) {
        expect(contrast(tokens.get(neutral), tokens.get(surface)), `${mode} ${surface}`).toBeGreaterThanOrEqual(
          NEUTRAL_MIN_CONTRAST,
        );
      }
    });

    it('chart-other is quieter than chart-4, and chart-other-line sits between them', () => {
      const onCard = (token: string) => {
        return contrast(tokens.get(token), tokens.get('card'));
      };

      expect(onCard('chart-other')).toBeLessThan(onCard('chart-other-line'));
      expect(onCard('chart-other-line')).toBeLessThan(onCard('chart-4'));
    });
  });
});
