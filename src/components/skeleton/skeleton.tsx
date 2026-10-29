import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

/**
 * A shimmering placeholder block; size and shape it with classes to mirror the content that is loading.
 */
export const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      aria-hidden
      className={cn('animate-shimmer rounded-control skeleton-shimmer', className)}
      data-slot="skeleton"
      role="presentation"
      {...props}
    />
  );
};
