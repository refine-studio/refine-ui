import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const CSS = readFileSync(join(import.meta.dirname, 'refine-ui.css'), 'utf8');

const STATUSES = ['success', 'warning', 'orange', 'danger', 'info', 'violet'] as const;

const STEPS = ['', '-soft', '-ink', '-foreground'] as const;

/**
 * The custom properties one colour-mode block declares, by name.
 */
const readMode = (selector: string) => {
  const start = CSS.indexOf(`${selector} {`);
  const block = CSS.slice(start, CSS.indexOf('}', start));
  const tokens = new Map<string, string>();

  for (const match of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    tokens.set(String(match[1]), String(match[2]).trim());
  }

  return tokens;
};

const MODES = {
  dark: readMode('.dark'),
  light: readMode('.light'),
};

/**
 * A linear sRGB channel, clipped to the gamut.
 */
const clip = (value: number) => {
  return Math.min(Math.max(value, 0), 1);
};

/**
 * WCAG relative luminance of an `oklch(L C H)` literal, through OKLab and linear sRGB.
 */
const luminance = (oklch: string) => {
  const match = /^oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)$/.exec(oklch);
  const [l, c, h] = [Number(match?.[1]), Number(match?.[2]), Number(match?.[3])];
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const long = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const medium = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const short = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const red = clip(4.0767416621 * long - 3.3077115913 * medium + 0.2309699292 * short);
  const green = clip(-1.2684380046 * long + 2.6097574011 * medium - 0.3413193965 * short);
  const blue = clip(-0.0041960863 * long - 0.7034186147 * medium + 1.707614701 * short);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

/**
 * WCAG contrast ratio between two `oklch()` literals, in either order.
 */
const contrast = (one = '', other = '') => {
  const lighter = Math.max(luminance(one), luminance(other));
  const darker = Math.min(luminance(one), luminance(other));

  return (lighter + 0.05) / (darker + 0.05);
};

describe.each(Object.entries(MODES))('status colours in %s mode', (_mode, tokens) => {
  it.each(STATUSES)('%s ships every step', (status) => {
    for (const step of STEPS) {
      expect(tokens.get(`${status}${step}`), `--${status}${step}`).toMatch(/^oklch\(/);
      expect(CSS, `--color-${status}${step}`).toContain(`--color-${status}${step}: var(--${status}${step});`);
    }
  });

  it.each(STATUSES)('%s-foreground passes 4.5:1 on its solid fill', (status) => {
    expect(contrast(tokens.get(`${status}-foreground`), tokens.get(status))).toBeGreaterThanOrEqual(4.5);
  });

  it.each(['orange', 'violet'])('%s-ink passes 4.5:1 on its soft', (status) => {
    expect(contrast(tokens.get(`${status}-ink`), tokens.get(`${status}-soft`))).toBeGreaterThanOrEqual(4.5);
  });
});
