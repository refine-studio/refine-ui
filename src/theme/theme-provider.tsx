'use client';

import { createContext, type ReactNode, use, useEffect, useState, useSyncExternalStore } from 'react';

import { applyTheme, DEFAULT_THEME, DENSITIES, MODES, type ThemeSettings } from './theme';

interface ThemeContextValue extends ThemeSettings {
  resolvedMode: 'dark' | 'light';
  setTheme: (settings: Partial<ThemeSettings>) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DEFAULT_STORAGE_KEY = 'refine-ui-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

interface ThemeProviderProps extends Partial<ThemeSettings> {
  children: ReactNode;
  storageKey?: string | false;
}

/**
 * Reads the stored theme once on mount, keeping only the values `MODES` and `DENSITIES` allow.
 */
const readStoredTheme = (storageKey: string | false) => {
  if (!storageKey || typeof window === 'undefined') return {};

  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '{}') as Record<string, unknown> | null;
    const settings: Partial<ThemeSettings> = {};
    if (
      MODES.some((mode) => {
        return mode === stored?.mode;
      })
    )
      settings.mode = stored?.mode as ThemeSettings['mode'];
    if (
      DENSITIES.some((density) => {
        return density === stored?.density;
      })
    ) {
      settings.density = stored?.density as ThemeSettings['density'];
    }

    return settings;
  } catch {
    // A corrupted entry falls back to the defaults rather than breaking the app.
    return {};
  }
};

interface ThemeScriptOptions extends Partial<ThemeSettings> {
  /** A key that holds `true` for dark or `false` for light. Its choice moves to `storageKey` once, then the key is removed. */
  legacyStorageKey?: string;
  storageKey?: string | false;
}

/**
 * Returns an inline `<script>` body for the page head that applies the stored or the system theme before the first paint.
 * Pass the same `storageKey`, `mode` and `density` as to `ThemeProvider`.
 */
export const themeScript = ({
  density = DEFAULT_THEME.density,
  legacyStorageKey,
  mode = DEFAULT_THEME.mode,
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeScriptOptions = {}) => {
  const args = [storageKey, legacyStorageKey ?? null, mode, density, MODES, DENSITIES, DARK_QUERY]
    .map((value) => {
      return JSON.stringify(value).replace(/</g, '\\u003c');
    })
    .join(',');

  return `(function(key,legacyKey,mode,density,modes,densities,darkQuery){var stored={};try{var storage=window.localStorage;if(key){var legacy=legacyKey&&storage.getItem(key)===null?storage.getItem(legacyKey):null;if(legacy==='true'||legacy==='false')storage.setItem(key,JSON.stringify({mode:legacy==='true'?'dark':'light'}));if(legacyKey)storage.removeItem(legacyKey);stored=JSON.parse(storage.getItem(key)||'{}')||{};}}catch(error){}if(modes.indexOf(stored.mode)>-1)mode=stored.mode;if(densities.indexOf(stored.density)>-1)density=stored.density;if(mode==='system')mode=window.matchMedia(darkQuery).matches?'dark':'light';var root=document.documentElement;root.classList.toggle('dark',mode==='dark');root.classList.toggle('light',mode==='light');root.dataset.density=density;})(${args});`;
};

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
export const ThemeProvider = ({
  children,
  density = DEFAULT_THEME.density,
  mode = DEFAULT_THEME.mode,
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    return {
      density,
      mode,
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
