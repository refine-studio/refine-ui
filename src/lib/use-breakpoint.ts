'use client';

import { useSyncExternalStore } from 'react';

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
 * Builds the `min-width` media query a Tailwind prefix such as `md:` applies at.
 */
const toQuery = (breakpoint: Breakpoint) => {
  return `(min-width: ${BREAKPOINTS[breakpoint]})`;
};

/**
 * Subscribes to one breakpoint's media query; defined once per breakpoint, so React keeps a stable subscription across renders.
 */
const createSubscribe = (breakpoint: Breakpoint) => {
  return (onChange: () => void) => {
    const media = window.matchMedia(toQuery(breakpoint));
    media.addEventListener('change', onChange);

    return () => {
      media.removeEventListener('change', onChange);
    };
  };
};

const SUBSCRIBERS = {
  sm: createSubscribe('sm'),
  md: createSubscribe('md'),
  lg: createSubscribe('lg'),
  xl: createSubscribe('xl'),
  '2xl': createSubscribe('2xl'),
} satisfies Record<Breakpoint, (onChange: () => void) => () => void>;

/**
 * Tells whether the screen is at least as wide as a Tailwind breakpoint, the way `md:` does, and answers again on each resize.
 * Answers `false` on the server, where there is no screen to measure.
 */
export const useBreakpoint = (breakpoint: Breakpoint) => {
  return useSyncExternalStore(
    SUBSCRIBERS[breakpoint],
    () => {
      return window.matchMedia(toQuery(breakpoint)).matches;
    },
    () => {
      return false;
    },
  );
};
