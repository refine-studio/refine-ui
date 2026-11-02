import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

export const badgeVariants = cva(
  [
    // base
    'inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border font-medium whitespace-nowrap',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em]",
  ],
  {
    variants: {
      variant: {
        neutral: 'border-transparent bg-secondary text-secondary-foreground',
        gem: 'border-transparent bg-gem-soft text-gem-ink',
        outline: 'border-border bg-background text-foreground',
        success: 'border-transparent bg-success-soft text-success-ink',
        warning: 'border-transparent bg-warning-soft text-warning-ink',
        orange: 'border-transparent bg-orange-soft text-orange-ink',
        danger: 'border-transparent bg-danger-soft text-danger-ink',
        info: 'border-transparent bg-info-soft text-info-ink',
        violet: 'border-transparent bg-violet-soft text-violet-ink',
      },
      size: {
        sm: 'h-5 px-2 text-caption',
        md: 'h-6 px-2.5 text-body-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  },
);

interface BadgeProps extends ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  dot?: boolean;
}

/**
 * Labels a status or category as a pill; `dot` prefixes it with a small marker in the current text colour.
 */
export const Badge = ({ asChild = false, children, className, dot = false, size, variant, ...props }: BadgeProps) => {
  const Component = asChild ? Slot.Root : 'span';

  return (
    <Component className={cn(badgeVariants({ size, variant }), className)} data-slot="badge" {...props}>
      {dot && !asChild && <span aria-hidden className="size-1.5 rounded-full bg-current" role="presentation" />}
      {children}
    </Component>
  );
};
