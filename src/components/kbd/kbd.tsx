import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

/**
 * Renders a single keyboard key.
 */
export const Kbd = ({ className, ...props }: ComponentProps<'kbd'>) => {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-b-2 border-input bg-muted px-1 font-mono text-caption font-medium text-muted-foreground select-none',
        "[&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      data-slot="kbd"
      {...props}
    />
  );
};

/**
 * Groups keys that are pressed together, such as a shortcut.
 */
export const KbdGroup = ({ className, ...props }: ComponentProps<'span'>) => {
  return <span className={cn('inline-flex items-center gap-1', className)} data-slot="kbd-group" {...props} />;
};
