import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

const marqueeTrackVariants = cva(
  [
    // base
    'flex w-max',
    // animation
    'motion-safe:animate-marquee',
  ],
  {
    variants: {
      speed: {
        slow: '[--marquee-duration:60s]',
        normal: '[--marquee-duration:35s]',
        fast: '[--marquee-duration:18s]',
      },
      direction: {
        left: '',
        right: '[animation-direction:reverse]',
      },
      pauseOnHover: {
        true: 'group-hover/marquee:[animation-play-state:paused]',
        false: '',
      },
    },
    defaultVariants: {
      direction: 'left',
      pauseOnHover: true,
      speed: 'normal',
    },
  },
);

interface MarqueeProps extends ComponentProps<'div'>, VariantProps<typeof marqueeTrackVariants> {
  fade?: boolean;
}

/**
 * Scrolls its children in an endless strip by rendering them twice; with reduced motion it becomes a plain scrollable row.
 */
export const Marquee = ({
  children,
  className,
  direction,
  fade = true,
  pauseOnHover,
  speed,
  ...props
}: MarqueeProps) => {
  return (
    <div
      className={cn(
        'group/marquee relative flex overflow-hidden motion-reduce:overflow-x-auto',
        {
          'mask-fade-x': fade,
        },
        className,
      )}
      data-slot="marquee"
      {...props}
    >
      <div className={marqueeTrackVariants({ direction, pauseOnHover, speed })}>
        <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-12 pr-12 motion-reduce:hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
