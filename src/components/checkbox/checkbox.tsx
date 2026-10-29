'use client';

import { Check, Minus } from 'lucide-react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { useFieldControl } from '../field/field';

/**
 * Renders a checkbox with checked, unchecked and indeterminate (`checked="indeterminate"`) states.
 */
export const Checkbox = ({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) => {
  const controlProps = useFieldControl(props);

  return (
    <CheckboxPrimitive.Root
      className={cn(
        // base
        'peer inline-flex size-4.5 shrink-0 items-center justify-center rounded-inner border border-input bg-background text-primary-foreground',
        'transition-[background-color,border-color] duration-150 ease-out-expo',
        'focus-ring',
        // hover
        'hover:border-foreground/40',
        // checked
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary',
        // invalid
        'aria-invalid:border-danger',
        // active
        'active:scale-90',
        // disabled
        'disabled:cursor-not-allowed disabled:opacity-45',
        className,
      )}
      data-slot="checkbox"
      {...controlProps}
    >
      <CheckboxPrimitive.Indicator className="group/indicator flex items-center justify-center animate-in zoom-in-50 duration-150">
        <Check className="size-3.5 group-data-[state=indeterminate]/indicator:hidden" strokeWidth={3} />
        <Minus className="hidden size-3.5 group-data-[state=indeterminate]/indicator:block" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
