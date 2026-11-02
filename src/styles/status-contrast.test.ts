import { describe, expect, it } from 'vitest';

import { contrast, CSS, MODES } from './css.test-utils';

const STATUSES = ['success', 'warning', 'orange', 'danger', 'info', 'violet'] as const;

const STEPS = ['', '-soft', '-ink', '-foreground'] as const;

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
