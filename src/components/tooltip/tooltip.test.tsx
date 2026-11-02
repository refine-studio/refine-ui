import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Vitest blanks CSS imports, so the theme is read from disk.
const CSS = readFileSync(join(import.meta.dirname, '../../styles/refine-ui.css'), 'utf8');

/**
 * Reads one mode's `--token: oklch(L C H)` declarations from the theme stylesheet.
 */
const readTokens = (selector: RegExp) => {
  const block = selector.exec(CSS)?.[1] ?? '';

  return Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/g)].map(([, name, l, c, h]) => {
      return [name, [Number(l), Number(c), Number(h)] as const];
    }),
  );
};

/**
 * WCAG relative luminance of an OKLCH colour, through linear sRGB.
 */
const luminance = ([l, c, h]: readonly [number, number, number]) => {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const lms = [
    l + 0.3963377774 * a + 0.2158037573 * b,
    l - 0.1055613458 * a - 0.0638541728 * b,
    l - 0.0894841775 * a - 1.291485548 * b,
  ].map((value) => {
    return value ** 3;
  });
  const [lc, mc, sc] = lms as [number, number, number];
  const rgb = [
    4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc,
    -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc,
    -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc,
  ].map((value) => {
    return Math.min(1, Math.max(0, value));
  });
  const [r, g, bl] = rgb as [number, number, number];

  return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
};

const contrast = (foreground: readonly [number, number, number], background: readonly [number, number, number]) => {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((x, y) => {
    return y - x;
  }) as [number, number];

  return (lighter + 0.05) / (darker + 0.05);
};

describe('Tooltip surface tokens', () => {
  it.each([
    ['light', /:root,\s*\.light\s*\{([^}]*)\}/],
    ['dark', /\.dark\s*\{([^}]*)\}/],
  ])('keeps label and key cap text at 4.5:1 or more in %s mode', (_mode, selector) => {
    const tokens = readTokens(selector);
    const ink = tokens['popover-foreground'];
    const surface = tokens.popover;
    const keyCap = tokens.muted;

    expect(ink && surface && keyCap).toBeTruthy();
    expect(contrast(ink!, surface!)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(ink!, keyCap!)).toBeGreaterThanOrEqual(4.5);
  });
});
