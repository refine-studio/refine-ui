import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

const CONIC_GRADIENT_CLASSES = [
  'pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2',
  'bg-[conic-gradient(from_0deg,transparent_0deg,oklch(0.775_var(--gem-c)_var(--gem-h))_60deg,oklch(0.6_var(--gem-c)_calc(var(--gem-h)+40))_120deg,transparent_180deg,transparent_360deg)]',
  'motion-safe:animate-spin motion-safe:[animation-duration:5s]',
];

interface GlowBorderProps extends ComponentProps<'div'> {
  glow?: boolean;
}

/**
 * Frames a "moment" surface with a rotating gem gradient border, optionally haloed; with reduced motion the border holds still.
 */
export const GlowBorder = ({ children, className, glow = true, ...props }: GlowBorderProps) => {
  return (
    <div className={cn('relative isolate rounded-card', className)} data-slot="glow-border" {...props}>
      {glow && (
        <div aria-hidden className="absolute -inset-1 -z-10 overflow-hidden rounded-card opacity-60 blur-xl" role="presentation">
          <div className={cn(CONIC_GRADIENT_CLASSES)} />
        </div>
      )}
      <div aria-hidden className="absolute inset-0 overflow-hidden rounded-card bg-border" role="presentation">
        <div className={cn(CONIC_GRADIENT_CLASSES)} />
      </div>
      <div className="relative m-px rounded-[calc(var(--radius-card)-1px)] bg-card text-card-foreground">{children}</div>
    </div>
  );
};
