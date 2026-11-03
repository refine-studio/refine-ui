import { describe, expect, it } from 'vitest';

import { contrast, CSS, MODES } from './css.test-utils';

const LIFECYCLE = ['status-todo', 'status-doing', 'status-done', 'status-ended'] as const;

const STEPS = ['', '-soft', '-ink', '-foreground'] as const;

const ALIASES = { 'status-doing': 'info', 'status-done': 'success' } as const;

/**
 * The `oklch()` literal a token holds in one mode, following `var()` aliases.
 */
const resolve = (tokens: Map<string, string>, name: string): string => {
  const value = tokens.get(name) ?? '';
  const alias = /^var\(--([\w-]+)\)$/.exec(value);

  return alias ? resolve(tokens, String(alias[1])) : value;
};

/**
 * The OKLCH lightness of an `oklch()` literal.
 */
const lightness = (oklch: string) => {
  return Number(/^oklch\(([\d.]+)/.exec(oklch)?.[1]);
};

describe.each(Object.entries(MODES))('lifecycle colours in %s mode', (_mode, tokens) => {
  it.each(LIFECYCLE)('%s ships every step', (status) => {
    for (const step of STEPS) {
      expect(resolve(tokens, `${status}${step}`), `--${status}${step}`).toMatch(/^oklch\(/);
      expect(CSS, `--color-${status}${step}`).toContain(`--color-${status}${step}: var(--${status}${step});`);
    }
  });

  it.each(Object.entries(ALIASES))('%s aliases the %s tone', (status, tone) => {
    for (const step of STEPS) {
      expect(tokens.get(`${status}${step}`)).toBe(`var(--${tone}${step})`);
    }
  });

  it.each(LIFECYCLE)('%s-foreground passes 4.5:1 on its solid fill', (status) => {
    expect(contrast(resolve(tokens, `${status}-foreground`), resolve(tokens, status))).toBeGreaterThanOrEqual(4.5);
  });

  it.each(['status-todo', 'status-ended'])('%s-ink passes 4.5:1 on its soft', (status) => {
    expect(contrast(resolve(tokens, `${status}-ink`), resolve(tokens, `${status}-soft`))).toBeGreaterThanOrEqual(4.5);
  });

  it('ended is more muted than to do: its fill sits closer to the background', () => {
    const background = lightness(resolve(tokens, 'background'));
    const todo = Math.abs(lightness(resolve(tokens, 'status-todo')) - background);
    const ended = Math.abs(lightness(resolve(tokens, 'status-ended')) - background);

    expect(ended).toBeLessThan(todo);
  });
});

describe('in-progress animation', () => {
  it('is a utility that stops under reduced motion', () => {
    const start = CSS.indexOf('@utility in-progress {');
    const block = CSS.slice(start, CSS.indexOf('\n}', start));

    expect(start).toBeGreaterThan(-1);
    expect(block).toContain('animation: var(--animate-in-progress);');
    expect(block).toMatch(/@media \(prefers-reduced-motion: reduce\) \{\s*animation: none;/);
  });
});
