import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('lets a later Refine UI text token replace an earlier one', () => {
    expect(cn('text-body-sm', 'text-display-xl')).toBe('text-display-xl');
  });

  it('keeps a text colour next to a Refine UI text size', () => {
    expect(cn('text-display-xl text-muted-foreground')).toBe('text-display-xl text-muted-foreground');
  });

  it('resolves control heights and radius tokens', () => {
    expect(cn('h-control-md rounded-control', 'h-control-lg rounded-card')).toBe('h-control-lg rounded-card');
  });

  it('resolves shadow tokens', () => {
    expect(cn('shadow-soft', 'shadow-glow')).toBe('shadow-glow');
  });
});
