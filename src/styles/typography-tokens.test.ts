import { describe, expect, it } from 'vitest';

import { contrast, CSS, MODES } from './css.test-utils';

const HEADING_STEPS = [
  'display-2xl',
  'display-xl',
  'display-lg',
  'display-md',
  'display-sm',
  'headline-lg',
  'headline-md',
  'headline-sm',
] as const;

describe('heading weight', () => {
  it('defaults to 700', () => {
    expect(CSS).toMatch(/:root \{\s*--heading-weight: 700;\s*\}/);
  });

  it.each(HEADING_STEPS)('text-%s reads its weight from --heading-weight', (step) => {
    expect(CSS).toContain(`--text-${step}--font-weight: var(--heading-weight);`);
  });

  it('no type step sets a weight of its own', () => {
    expect(CSS).not.toMatch(/--text-[\w-]+--font-weight: \d+;/);
  });
});

describe('micro step', () => {
  it('is 10 px with a 14 px line height', () => {
    expect(CSS).toContain('--text-micro: 0.625rem;');
    expect(CSS).toContain('--text-micro--line-height: 1.4;');
  });
});

describe.each(Object.entries(MODES))('disabled text in %s mode', (_mode, tokens) => {
  it('is a colour utility', () => {
    expect(tokens.get('disabled')).toMatch(/^oklch\(/);
    expect(CSS).toContain('--color-disabled: var(--disabled);');
  });

  it('sits clearly below subtle on the background, and stays visible', () => {
    const disabled = contrast(tokens.get('disabled'), tokens.get('background'));
    const subtle = contrast(tokens.get('subtle'), tokens.get('background'));

    expect(subtle / disabled).toBeGreaterThanOrEqual(1.5);
    expect(disabled).toBeGreaterThanOrEqual(2);
  });
});
