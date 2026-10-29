import { Separator as SeparatorPrimitive } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/cn';

interface SeparatorProps extends Omit<ComponentProps<typeof SeparatorPrimitive.Root>, 'children'> {
  label?: ReactNode;
}

/**
 * A hairline divider; a horizontal one can carry a centred mono `label` such as "or" or a date.
 */
export const Separator = ({
  className,
  decorative = true,
  label,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) => {
  if (label && orientation === 'horizontal') {
    return (
      <div className={cn('flex items-center gap-3', className)} data-slot="separator">
        <SeparatorPrimitive.Root className="h-px flex-1 bg-border" decorative />
        <span className="eyebrow text-muted-foreground">{label}</span>
        <SeparatorPrimitive.Root className="h-px flex-1 bg-border" decorative />
      </div>
    );
  }

  return (
    <SeparatorPrimitive.Root
      className={cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
};
