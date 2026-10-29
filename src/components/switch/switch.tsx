'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Switch as SwitchPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { useFieldControl } from '../field/field';

const switchVariants = cva(
  [
    // base
    'peer inline-flex shrink-0 items-center rounded-full border border-transparent bg-input p-0.5',
    'transition-colors duration-200 ease-out-expo',
    'focus-ring',
    // hover
    'hover:bg-foreground/25',
    // checked
    'data-[state=checked]:bg-gem data-[state=checked]:hover:bg-gem/85',
    // invalid
    'aria-invalid:border-danger',
    // disabled
    'disabled:cursor-not-allowed disabled:opacity-45',
  ],
  {
    variants: {
      size: {
        sm: 'h-4.5 w-8',
        md: 'h-6 w-11',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const switchThumbVariants = cva(
  [
    // base
    'pointer-events-none block rounded-full bg-background shadow-sm',
    // animation
    'transition-transform duration-200 ease-spring data-[state=unchecked]:translate-x-0',
  ],
  {
    variants: {
      size: {
        sm: 'size-3.5 data-[state=checked]:translate-x-3.5',
        md: 'size-5 data-[state=checked]:translate-x-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface SwitchProps extends ComponentProps<typeof SwitchPrimitive.Root>, VariantProps<typeof switchVariants> {}

/**
 * Toggles a setting on or off immediately, filling with the current gem when on.
 */
export const Switch = ({ className, size, ...props }: SwitchProps) => {
  const controlProps = useFieldControl(props);

  return (
    <SwitchPrimitive.Root className={cn(switchVariants({ size }), className)} data-slot="switch" {...controlProps}>
      <SwitchPrimitive.Thumb className={switchThumbVariants({ size })} />
    </SwitchPrimitive.Root>
  );
};
