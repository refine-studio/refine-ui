'use client';

import type { ComponentProps, PointerEvent } from 'react';

import { cn } from '../../lib/cn';

interface SpotlightProps extends ComponentProps<'div'> {
  surface?: boolean;
}

/**
 * Wraps content in a surface whose gem glow follows the pointer, without re-rendering on every move.
 */
export const Spotlight = ({ children, className, onPointerMove, surface = true, ...props }: SpotlightProps) => {
  /**
   * Writes the pointer position relative to the element into its `--spot-x` and `--spot-y` custom properties.
   */
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // Writing custom properties straight to the element keeps a 60fps pointer stream out of React state; it is the one sanctioned inline style.
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  };

  return (
    <div
      className={cn('group/spotlight relative isolate overflow-hidden', { 'card-surface': surface }, className)}
      data-slot="spotlight"
      onPointerMove={handlePointerMove}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          // base
          'pointer-events-none absolute inset-0 -z-10 opacity-0',
          'bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,0%),oklch(var(--gem-l)_var(--gem-c)_var(--gem-h)/0.22),transparent_65%)]',
          // hover
          'group-hover/spotlight:opacity-100',
          // animation
          'transition-opacity duration-300',
        )}
        role="presentation"
      />
      {children}
    </div>
  );
};
