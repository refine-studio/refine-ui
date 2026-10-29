import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RefineIconBell, RefineIconHeartSolid } from './refine-icons';

describe('Refine icons', () => {
  it('draws at the 1.75 stroke that matches lucide', () => {
    const { container } = render(<RefineIconBell />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('stroke-width')).toBe('1.75');
    expect(svg?.getAttribute('stroke')).toBe('currentColor');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('takes a stroke width override like a lucide icon', () => {
    const { container } = render(<RefineIconBell strokeWidth={1} />);

    expect(container.querySelector('svg')?.getAttribute('stroke-width')).toBe('1');
  });

  it('keeps a filled icon filled in currentColor', () => {
    const { container } = render(<RefineIconHeartSolid />);

    expect(container.querySelector('path')?.getAttribute('fill')).toBe('currentColor');
  });
});
