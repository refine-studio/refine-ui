import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Logo, LogoMark } from './logo';

describe('Logo', () => {
  it('reads Refine Studio by default', () => {
    const { getByRole } = render(<Logo />);

    expect(getByRole('img', { name: 'Refine Studio' })).toBeTruthy();
  });

  it('sets any segment name as text in the colour of Refine', () => {
    const { container, getByRole } = render(<Logo segment="Tick" />);
    const text = container.querySelector('text');

    expect(getByRole('img', { name: 'Refine Tick' })).toBeTruthy();
    expect(text?.textContent).toBe('Tick');
    expect(text?.closest('g')?.querySelector('path')).toBeTruthy();
  });

  it('draws the ink plate only with plate', () => {
    expect(render(<Logo />).container.querySelector('rect')).toBeNull();
    expect(render(<Logo plate />).container.querySelector('rect')).toBeTruthy();
  });
});

describe('LogoMark', () => {
  it('draws the diamond without a word', () => {
    const { container } = render(<LogoMark />);

    expect(container.querySelector('text')).toBeNull();
  });
});
