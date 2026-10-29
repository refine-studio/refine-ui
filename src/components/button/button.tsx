import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { Spinner } from '../spinner/spinner';

export const buttonVariants = cva(
  [
    // base
    'relative inline-flex shrink-0 items-center justify-center gap-2 rounded-control border border-transparent font-medium whitespace-nowrap select-none',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out-expo',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
    'focus-ring',
    // active
    'active:scale-[0.98]',
    // disabled
    'disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/85',
        gem: 'bg-gem-gradient text-gem-foreground hover:shadow-glow',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-pressed',
        outline: 'border-input bg-background/40 text-foreground hover:border-foreground/25 hover:bg-hover',
        ghost: 'text-foreground hover:bg-hover active:bg-pressed',
        danger: 'bg-danger text-white hover:bg-danger/85',
        link: 'h-auto px-0 text-gem-ink underline-offset-4 hover:underline active:scale-100',
      },
      size: {
        xs: 'h-control-xs px-2 text-caption',
        sm: 'h-control-sm px-3 text-body-sm',
        md: 'h-control-md px-4 text-body-sm',
        lg: 'h-control-lg px-6 text-body',
        xl: 'h-control-xl px-8 text-body-lg font-semibold',
        'icon-sm': 'size-control-sm text-body-sm',
        icon: 'size-control-md text-body',
        'icon-lg': 'size-control-lg text-body-lg',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        size: ['xs', 'sm', 'md', 'lg', 'xl'],
        className: 'h-auto px-0',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

/**
 * Renders an action; while `loading` it keeps its width, swaps its content for a spinner and refuses clicks.
 */
export const Button = ({
  asChild = false,
  children,
  className,
  disabled,
  loading = false,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ size, variant }), className)}
      data-slot="button"
      disabled={disabled || loading}
      type={asChild ? undefined : type}
      {...props}
    >
      {loading && !asChild ? (
        <>
          <span className="invisible inline-flex items-center gap-2">{children}</span>
          <Spinner className="absolute" />
        </>
      ) : (
        children
      )}
    </Component>
  );
};
