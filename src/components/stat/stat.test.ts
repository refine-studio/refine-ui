import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const CSS = readFileSync(join(import.meta.dirname, '../../styles/refine-ui.css'), 'utf8');

/** the custom properties a selector's first block declares */
const tokensOf = (selector: string) => {
  const start = CSS.indexOf(`\n${selector} {`);
  const block = CSS.slice(start, CSS.indexOf('\n}', start));

  return Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => {
      return [name, value];
    }),
  );
};

/** linear sRGB channel, clipped to the gamut */
const clip = (value: number) => {
  return Math.min(Math.max(value, 0), 1);
};

/** relative luminance of an `oklch(L C H)` colour, through OKLab and linear sRGB */
const luminance = (oklch: string) => {
  const match = /oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/.exec(oklch);
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

const contrast = (one: string | undefined, two: string | undefined) => {
  const [first, second] = [luminance(String(one)), luminance(String(two))];

  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

describe('Stat trend pill', () => {
  it.each([
    { selector: ':root,\n.light', mode: 'light' },
    { selector: '.dark', mode: 'dark' },
  ])('keeps every trend ink at 4.5:1 or more on its pill in $mode mode', ({ selector }) => {
    const tokens = tokensOf(selector);

    for (const [background, ink] of [
      ['success-soft', 'success-ink'],
      ['danger-soft', 'danger-ink'],
      ['muted', 'muted-foreground'],
    ] as const) {
      expect(contrast(tokens[background], tokens[ink]), `${ink} on ${background}`).toBeGreaterThanOrEqual(4.5);
    }
  });
});
