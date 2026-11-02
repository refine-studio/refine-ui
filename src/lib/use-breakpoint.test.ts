import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { mockScreenWidth } from './match-media.test-utils';
import { useBreakpoint } from './use-breakpoint';

describe('useBreakpoint', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it.each([
    { breakpoint: 'sm', expected: true, name: 'a phone in landscape is past sm', width: 42 },
    { breakpoint: 'md', expected: false, name: 'a phone in landscape is short of md', width: 42 },
    { breakpoint: 'md', expected: true, name: 'a screen exactly md wide is md', width: 48 },
    { breakpoint: '2xl', expected: false, name: 'a laptop is short of 2xl', width: 80 },
  ] as const)('$name', ({ breakpoint, expected, width }) => {
    mockScreenWidth(width);

    const { result } = renderHook(() => {
      return useBreakpoint(breakpoint);
    });

    expect(result.current).toEqual(expected);
  });

  it('answers again when the screen crosses the breakpoint', () => {
    const screen = mockScreenWidth(30);
    const { result } = renderHook(() => {
      return useBreakpoint('md');
    });
    expect(result.current).toEqual(false);

    act(() => {
      screen.resize(64);
    });
    expect(result.current).toEqual(true);

    act(() => {
      screen.resize(30);
    });
    expect(result.current).toEqual(false);
  });
});
