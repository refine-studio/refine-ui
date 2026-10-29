import { describe, expect, it } from 'vitest';

import { applyTheme } from './theme';

describe('applyTheme', () => {
  it('writes mode as a class and density as a data attribute', () => {
    const element = document.createElement('div');

    applyTheme(element, {
      density: 'compact',
      mode: 'dark',
    });

    expect(element.classList.contains('dark')).toBe(true);
    expect(element.classList.contains('light')).toBe(false);
    expect(element.dataset.density).toBe('compact');
  });

  it('switches from dark to light without leaving the old class behind', () => {
    const element = document.createElement('div');

    applyTheme(element, {
      mode: 'dark',
    });
    applyTheme(element, {
      mode: 'light',
    });

    expect(element.className).toBe('light');
  });

  it('leaves settings it is not given untouched', () => {
    const element = document.createElement('div');
    element.dataset.density = 'spacious';

    applyTheme(element, {
      mode: 'light',
    });

    expect(element.dataset.density).toBe('spacious');
  });
});
