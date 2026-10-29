'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Toggle as TogglePrimitive, ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { type ComponentProps, createContext, use } from 'react';

import { cn } from '../../lib/cn';

export const toggleVariants = cva(
  [
    // base
    'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-control font-medium whitespace-nowrap text-muted-foreground select-none',
    'transition-[background-color,color,box-shadow] duration-150 ease-out-expo',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em]",
    'focus-ring',
    // hover
    'hover:bg-hover hover:text-foreground',
    // active
    'active:scale-[0.98]',
    // disabled
    'disabled:pointer-events-none disabled:opacity-45',
  ],
  {
    variants: {
      variant: {
        ghost: 'data-[state=on]:bg-pressed data-[state=on]:text-foreground',
        outline: 'border border-input data-[state=on]:border-foreground/30 data-[state=on]:bg-pressed data-[state=on]:text-foreground',
        segmented:
          'data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm data-[state=on]:hover:bg-background',
      },
      size: {
        sm: 'h-control-xs px-2 text-caption',
        md: 'h-control-sm px-3 text-body-sm',
        lg: 'h-control-md px-4 text-body-sm',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  },
);

type ToggleVariantProps = VariantProps<typeof toggleVariants>;

interface ToggleProps extends ComponentProps<typeof TogglePrimitive.Root>, ToggleVariantProps {}

/**
 * Renders a two-state button that stays pressed while on, such as "Billable only".
 */
export const Toggle = ({ className, size, variant, ...props }: ToggleProps) => {
  return (
    <TogglePrimitive.Root className={cn(toggleVariants({ size, variant }), className)} data-slot="toggle" {...props} />
  );
};

const ToggleGroupContext = createContext<ToggleVariantProps>({
  size: 'md',
  variant: 'segmented',
});

type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleVariantProps;

/**
 * Groups toggles; the default `segmented` variant sits the items in a muted track, as a view switcher.
 */
export const ToggleGroup = ({ className, size = 'md', variant = 'segmented', ...props }: ToggleGroupProps) => {
  return (
    <ToggleGroupContext
      value={{
        size,
        variant,
      }}
    >
      <ToggleGroupPrimitive.Root
        className={cn(
          'inline-flex w-fit items-center gap-1',
          {
            'rounded-control bg-muted p-1': variant === 'segmented',
          },
          className,
        )}
        data-slot="toggle-group"
        data-variant={variant}
        {...props}
      />
    </ToggleGroupContext>
  );
};

/**
 * Renders one option of a `ToggleGroup`, inheriting the group's size and variant.
 */
export const ToggleGroupItem = ({ className, size, variant, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleVariantProps) => {
  const group = use(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      className={cn(toggleVariants({ size: size ?? group.size, variant: variant ?? group.variant }), className)}
      data-slot="toggle-group-item"
      {...props}
    />
  );
};
