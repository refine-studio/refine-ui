'use client';

import { createContext, type ReactNode, use, useEffect, useState, useSyncExternalStore } from 'react';

import { applyTheme, DEFAULT_THEME, type ThemeSettings } from './theme';

interface ThemeContextValue extends ThemeSettings {
  resolvedMode: 'dark' | 'light';
  setTheme: (settings: Partial<ThemeSettings>) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps extends Partial<ThemeSettings> {
  children: ReactNode;
  storageKey?: string | false;
}

/**
 * Reads the stored theme once on mount.
 */
const readStoredTheme = (storageKey: string | false) => {
  if (!storageKey || typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? '{}') as Partial<ThemeSettings>;
  } catch {
    // A corrupted entry falls back to the defaults rather than breaking the app.
    return {};
  }
};

const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Subscribes to changes of the operating system's colour preference.
 */
const subscribeToSystemMode = (onChange: () => void) => {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener('change', onChange);

  return () => {
    query.removeEventListener('change', onChange);
  };
};

/**
 * Owns the document theme: applies mode and density to `<html>`, follows the OS in `system` mode, and persists changes under `storageKey`.
 */
export const ThemeProvider = ({ children, storageKey = 'refine-ui-theme', ...initialSettings }: ThemeProviderProps) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    return {
      ...DEFAULT_THEME,
      ...initialSettings,
      ...readStoredTheme(storageKey),
    };
  });
  const systemMode = useSyncExternalStore(
    subscribeToSystemMode,
    () => {
      return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
    },
    () => {
      return 'light' as const;
    },
  );
  const resolvedMode = settings.mode === 'system' ? systemMode : settings.mode;

  useEffect(() => {
    applyTheme(document.documentElement, {
      ...settings,
      mode: resolvedMode,
    });
    if (storageKey) window.localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [resolvedMode, settings, storageKey]);

  /**
   * Merges a partial theme into the current one.
   */
  const setTheme = (nextSettings: Partial<ThemeSettings>) => {
    setSettings((current) => {
      return {
        ...current,
        ...nextSettings,
      };
    });
  };

  return <ThemeContext value={{ ...settings, resolvedMode, setTheme }}>{children}</ThemeContext>;
};

/**
 * Returns the current theme and its setter; throws outside a `ThemeProvider`.
 */
export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside a ThemeProvider.');

  return context;
};
