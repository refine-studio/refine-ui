import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeSwitcher } from '../components/theme-switcher/theme-switcher';
import { ThemeProvider, themeScript, useTheme } from './theme-provider';

const root = document.documentElement;

const stubSystemMode = (mode: 'dark' | 'light') => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => {
      return {
        addEventListener: vi.fn(),
        matches: mode === 'dark',
        removeEventListener: vi.fn(),
      };
    }),
  );
};

const runThemeScript = (script: string) => {
  new Function(script)();
};

const ModeReadout = () => {
  const { mode, resolvedMode } = useTheme();

  return (
    <output>
      {mode} {resolvedMode}
    </output>
  );
};

beforeEach(() => {
  root.className = '';
  delete root.dataset.density;
  window.localStorage.clear();
  stubSystemMode('light');
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('themeScript', () => {
  it('applies a stored dark choice before anything renders', () => {
    window.localStorage.setItem('refine-ui-theme', '{"mode":"dark","density":"compact"}');

    runThemeScript(themeScript());

    expect(root.classList.contains('dark')).toBe(true);
    expect(root.dataset.density).toBe('compact');
  });

  it('follows a dark system with no stored choice', () => {
    stubSystemMode('dark');

    runThemeScript(themeScript());

    expect(root.classList.contains('dark')).toBe(true);
  });

  it('falls back to the system for a corrupted entry', () => {
    stubSystemMode('dark');
    window.localStorage.setItem('refine-ui-theme', '{"mode":"midnight"');

    runThemeScript(themeScript());

    expect(root.classList.contains('dark')).toBe(true);
  });

  it('carries a legacy dark choice over to the new key once', () => {
    window.localStorage.setItem('atlas:dark', 'true');

    runThemeScript(
      themeScript({
        legacyStorageKey: 'atlas:dark',
      }),
    );

    expect(root.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('refine-ui-theme')).toBe('{"mode":"dark"}');
    expect(window.localStorage.getItem('atlas:dark')).toBeNull();
  });

  it('keeps an existing choice over a legacy one', () => {
    window.localStorage.setItem('refine-ui-theme', '{"mode":"light"}');
    window.localStorage.setItem('atlas:dark', 'true');

    runThemeScript(
      themeScript({
        legacyStorageKey: 'atlas:dark',
      }),
    );

    expect(root.classList.contains('light')).toBe(true);
    expect(window.localStorage.getItem('atlas:dark')).toBeNull();
  });
});

describe('ThemeProvider', () => {
  it('follows the system when the app passes no mode', () => {
    stubSystemMode('dark');

    const { getByRole } = render(
      <ThemeProvider mode={undefined}>
        <ModeReadout />
      </ThemeProvider>,
    );

    expect(getByRole('status').textContent).toBe('system dark');
  });

  it('keeps the choice the script migrated', () => {
    window.localStorage.setItem('atlas:dark', 'true');
    runThemeScript(
      themeScript({
        legacyStorageKey: 'atlas:dark',
      }),
    );

    const { getByRole } = render(
      <ThemeProvider>
        <ModeReadout />
      </ThemeProvider>,
    );

    expect(getByRole('status').textContent).toBe('dark dark');
  });

  it('stores a switcher choice that the script applies on the next load', () => {
    stubSystemMode('dark');
    const { getByRole, unmount } = render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );
    fireEvent.click(getByRole('radio', { name: 'Light' }));
    unmount();
    root.className = '';

    runThemeScript(themeScript());

    expect(root.classList.contains('light')).toBe(true);
  });
});
