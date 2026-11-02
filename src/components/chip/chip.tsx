import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { badgeVariants } from '../badge/badge';

/**
 * What a chip adds to the badge's tone table once a person can click it. Hover and press draw the
 * edge in the tone's own ink and never touch its ground, so the label keeps the contrast it has at
 * rest in every tone. A darker ground drops gem ink under 4.5:1 in light mode.
 */
export const chipVariants = cva('', {
  variants: {
    interactive: {
      false: '',
      true: [
        // base
        'cursor-pointer focus-ring select-none',
        'transition-[border-color,transform] duration-150 ease-out-expo',
        // hover
        'hover:not-aria-pressed:border-current/35',
        // active
        'active:scale-[0.97] active:not-aria-pressed:border-current/60',
        // pressed: a filter pill that is on
        'aria-pressed:border-current',
        // disabled
        'disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45',
      ],
    },
  },
  defaultVariants: {
    interactive: false,
  },
});

type ChipProps = Omit<ComponentProps<'button'>, 'type'> &
  Pick<VariantProps<typeof badgeVariants>, 'size' | 'variant'> & {
    asChild?: boolean;
    /** a mark before the label · an icon or an emoji */
    icon?: ReactNode;
  };

/**
 * A status, tone or filter pill. It wears the badge's tones and adds an `icon` before its label.
 * It becomes a button a person can click, hover and reach by keyboard when it has an `onClick`,
 * and a link when `asChild` wraps one; `aria-pressed` marks a filter pill that is on.
 */
export const Chip = ({
  asChild = false,
  children,
  className,
  icon,
  onClick,
  size = 'sm',
  variant,
  ...props
}: ChipProps) => {
  const interactive = asChild || onClick !== undefined;
  const Component = asChild ? Slot.Root : interactive ? 'button' : 'span';
  const mark = icon ? (
    <span aria-hidden className="inline-flex" data-slot="chip-icon">
      {icon}
    </span>
  ) : null;

  return (
    <Component
      className={cn(badgeVariants({ size, variant }), chipVariants({ interactive }), className)}
      data-slot="chip"
      onClick={onClick}
      {...(Component === 'button' ? { type: 'button' as const } : {})}
      {...props}
    >
      {mark}
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
    </Component>
  );
};
