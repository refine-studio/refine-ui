'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Tailwind's default breakpoints, the ones Refine UI lays itself out at, as their `min-width`.
 */
export const BREAKPOINTS = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Tells whether the screen is at least as wide as a Tailwind breakpoint, the way `md:` does, and answers again on each resize.
 * Answers `false` on the server, where there is no screen to measure.
 */
export const useBreakpoint = (breakpoint: Breakpoint) => {
  const query = `(min-width: ${BREAKPOINTS[breakpoint]})`;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);

      return () => {
        media.removeEventListener('change', onChange);
      };
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => {
      return window.matchMedia(query).matches;
    },
    () => {
      return false;
    },
  );
};
