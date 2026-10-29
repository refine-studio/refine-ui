import { cva, type VariantProps } from 'class-variance-authority';
import { Progress as ProgressPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

export const progressVariants = cva(
  [
    // base
    'relative w-full overflow-hidden rounded-full bg-muted',
  ],
  {
    variants: {
      size: {
        xs: 'h-1',
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface ProgressProps
  extends Omit<ComponentProps<typeof ProgressPrimitive.Root>, 'children'>, VariantProps<typeof progressVariants> {
  tone?: 'danger' | 'gem' | 'success' | 'warning';
}

const INDICATOR_CLASS_BY_TONE = {
  danger: 'bg-danger',
  gem: 'bg-gem-gradient',
  success: 'bg-success',
  warning: 'bg-warning',
} satisfies Record<NonNullable<ProgressProps['tone']>, string>;

/**
 * Shows how far a task has come; a `null` value sweeps a short bar across the track instead of filling it.
 */
export const Progress = ({ className, max = 100, size, tone = 'gem', value = null, ...props }: ProgressProps) => {
  const isIndeterminate = value === null;
  const percentage = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <ProgressPrimitive.Root
      className={cn(progressVariants({ size }), className)}
      data-slot="progress"
      max={max}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn('h-full rounded-full transition-transform duration-500 ease-out-expo', INDICATOR_CLASS_BY_TONE[tone], {
          'w-full origin-left animate-indeterminate': isIndeterminate,
        })}
        style={isIndeterminate ? undefined : { transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};
