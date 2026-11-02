import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Chip } from './chip';

// Vitest blanks CSS imports, so the theme is read from disk.
const CSS = readFileSync(join(import.meta.dirname, '../../styles/refine-ui.css'), 'utf8');

type Rgb = readonly [number, number, number];

/**
 * The custom properties one colour-mode block declares, by name.
 */
const readMode = (selector: string) => {
  const start = CSS.indexOf(`${selector} {`);
  const block = CSS.slice(start, CSS.indexOf('}', start));

  return new Map(
    [...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => {
      return [String(name), String(value).trim()];
    }),
  );
};

const ROOT = readMode(':root');

/**
 * A linear sRGB colour from OKLCH through OKLab, clipped to the gamut.
 */
const toRgb = (l: number, c: number, h: number): Rgb => {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const long = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const medium = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const short = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const [red, green, blue] = [
    4.0767416621 * long - 3.3077115913 * medium + 0.2309699292 * short,
    -1.2684380046 * long + 2.6097574011 * medium - 0.3413193965 * short,
    -0.0041960863 * long - 0.7034186147 * medium + 1.707614701 * short,
  ].map((v) => {
    return Math.min(Math.max(v, 0), 1);
  });

  return [Number(red), Number(green), Number(blue)];
};

/**
 * Resolves a token of one mode to linear sRGB. The gem family is built from `--gem-*` numbers in `@theme`,
 * so its ink and soft are rebuilt here from the same numbers.
 */
const resolve = (mode: Map<string, string>, token: string): Rgb => {
  const number = (name: string) => {
    return Number(mode.get(name) ?? ROOT.get(name));
  };

  if (token === 'gem-ink') return toRgb(number('gem-ink-l'), number('gem-c'), number('gem-h'));
  if (token === 'gem-soft')
    return toRgb(number('gem-soft-l'), number('gem-c') * number('gem-soft-cf'), number('gem-h'));

  const match = /^oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)$/.exec(mode.get(token) ?? '');
  expect(match, `--${token}`).not.toBeNull();

  return toRgb(Number(match?.[1]), Number(match?.[2]), Number(match?.[3]));
};

/**
 * WCAG relative luminance of a linear sRGB colour.
 */
const luminance = ([red, green, blue]: Rgb) => {
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

/**
 * WCAG contrast ratio between two colours, in either order.
 */
const contrast = (one: Rgb, other: Rgb) => {
  const [lighter, darker] = [luminance(one), luminance(other)].sort((x, y) => {
    return y - x;
  });

  return (Number(lighter) + 0.05) / (Number(darker) + 0.05);
};

/**
 * Every tone a chip wears, as its text token on its ground token.
 */
const TONES = {
  danger: ['danger-ink', 'danger-soft'],
  gem: ['gem-ink', 'gem-soft'],
  info: ['info-ink', 'info-soft'],
  neutral: ['secondary-foreground', 'secondary'],
  orange: ['orange-ink', 'orange-soft'],
  outline: ['foreground', 'background'],
  success: ['success-ink', 'success-soft'],
  violet: ['violet-ink', 'violet-soft'],
  warning: ['warning-ink', 'warning-soft'],
} as const;

describe.each([
  ['light', readMode('.light')],
  ['dark', readMode('.dark')],
])('chip tones in %s mode', (_mode, mode) => {
  it.each(Object.entries(TONES))('%s text passes 4.5:1 on its ground', (_tone, [ink, ground]) => {
    expect(contrast(resolve(mode, ink), resolve(mode, ground))).toBeGreaterThanOrEqual(4.5);
  });
});

describe('Chip', () => {
  afterEach(cleanup);

  it('is a plain label with its icon before the text when nobody can click it', () => {
    const { container, queryByRole } = render(
      <Chip icon={<svg data-testid="icon" />} variant="success">
        live
      </Chip>,
    );

    expect(queryByRole('button')).toBeNull();
    expect(container.firstElementChild?.tagName).toBe('SPAN');
    expect(container.firstElementChild?.firstElementChild?.getAttribute('data-slot')).toBe('chip-icon');
    expect(container.firstElementChild?.textContent).toBe('live');
  });

  it('is a disabled button that nobody can press', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <Chip disabled onClick={onClick}>
        archived
      </Chip>,
    );

    await userEvent.click(getByRole('button', { name: 'archived' }));
    expect(getByRole('button', { name: 'archived' })).toHaveProperty('disabled', true);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('is a button that a click, Enter and Space all press', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Chip onClick={onClick}>beta</Chip>);
    const chip = getByRole('button', { name: 'beta' });

    expect(chip.getAttribute('type')).toBe('button');
    await userEvent.click(chip);
    await userEvent.tab();
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(chip);
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('tells a screen reader whether a filter pill is on', () => {
    const { getByRole } = render(
      <Chip aria-pressed onClick={() => {}}>
        mine
      </Chip>,
    );

    expect(getByRole('button', { name: 'mine', pressed: true })).toBeTruthy();
  });

  it('becomes the link it wraps and keeps the icon before the label', () => {
    const { getByRole } = render(
      <Chip asChild icon="🔖">
        <a href="/capabilities/search">search</a>
      </Chip>,
    );
    const link = getByRole('link', { name: 'search' });

    expect(link.getAttribute('data-slot')).toBe('chip');
    expect(link.firstElementChild?.getAttribute('data-slot')).toBe('chip-icon');
  });
});
