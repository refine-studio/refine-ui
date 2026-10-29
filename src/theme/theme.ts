export const MODES = ['light', 'dark', 'system'] as const;
export const DENSITIES = ['compact', 'comfortable', 'spacious'] as const;

export type Mode = (typeof MODES)[number];
export type Density = (typeof DENSITIES)[number];

export interface ThemeSettings {
  density: Density;
  mode: Mode;
}

export const DEFAULT_THEME = {
  density: 'comfortable',
  mode: 'system',
} satisfies ThemeSettings;

/**
 * Resolves `system` to the colour mode the operating system currently prefers, and passes `light` and `dark` through.
 */
export const resolveMode = (mode: Mode) => {
  if (mode !== 'system') return mode;
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Writes the theme onto an element as a `light`/`dark` class and a `data-density` attribute.
 */
export const applyTheme = (element: HTMLElement, settings: Partial<ThemeSettings>) => {
  if (settings.mode) {
    const resolvedMode = resolveMode(settings.mode);
    element.classList.toggle('dark', resolvedMode === 'dark');
    element.classList.toggle('light', resolvedMode === 'light');
  }

  if (settings.density) element.dataset.density = settings.density;
};
