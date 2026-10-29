'use client';

import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { useField, useFieldControl } from '../field/field';

/**
 * Lays out a set of mutually exclusive `RadioGroupItem`s with roving arrow-key focus.
 */
export const RadioGroup = ({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  const field = useField();
  const controlProps = useFieldControl(props);

  return (
    <RadioGroupPrimitive.Root
      aria-labelledby={field?.labelId}
      className={cn('grid gap-3', className)}
      data-slot="radio-group"
      {...controlProps}
    />
  );
};

/**
 * Renders one option of a `RadioGroup` as a ring that fills with a dot when selected.
 */
export const RadioGroupItem = ({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Item>) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        // base
        'peer inline-flex size-4.5 shrink-0 items-center justify-center rounded-full border border-input bg-background',
        'transition-[border-color,background-color] duration-150 ease-out-expo',
        'focus-ring',
        // hover
        'hover:border-foreground/40',
        // checked
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
        // invalid
        'aria-invalid:border-danger',
        // active
        'active:scale-90',
        // disabled
        'disabled:cursor-not-allowed disabled:opacity-45',
        className,
      )}
      data-slot="radio-group-item"
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-primary-foreground animate-in zoom-in-0 duration-150" />
    </RadioGroupPrimitive.Item>
  );
};
