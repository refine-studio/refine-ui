'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { useFieldControl } from '../field/field';

export const inputShellVariants = cva(
  [
    // base
    'group/input relative flex w-full items-center gap-2 rounded-control border border-input bg-background text-foreground',
    'transition-[border-color,box-shadow,background-color] duration-150 ease-out-expo',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em]",
    // hover
    'hover:border-foreground/25',
    // focus
    'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/20',
    // invalid
    'has-aria-invalid:border-danger has-aria-invalid:focus-within:ring-danger/20',
    // disabled
    'has-disabled:cursor-not-allowed has-disabled:bg-muted has-disabled:opacity-60 has-disabled:hover:border-input',
  ],
  {
    variants: {
      size: {
        sm: 'h-control-sm px-2.5 text-body-sm',
        md: 'h-control-md px-3 text-body-sm',
        lg: 'h-control-lg px-4 text-body',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface InputProps extends Omit<ComponentProps<'input'>, 'size'>, VariantProps<typeof inputShellVariants> {
  leading?: ReactNode;
  trailing?: ReactNode;
}

/**
 * Renders a text input inside a bordered shell with optional `leading` and `trailing` adornments such as an icon, a unit or a shortcut.
 */
export const Input = ({ className, leading, size, trailing, type = 'text', ...props }: InputProps) => {
  const controlProps = useFieldControl(props);

  return (
    <div
      className={cn(inputShellVariants({ size }), { 'bg-muted': controlProps.readOnly }, className)}
      data-slot="input"
    >
      {leading && (
        <span className="flex items-center text-muted-foreground" data-slot="input-leading">
          {leading}
        </span>
      )}
      <input
        className={cn(
          'h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-subtle disabled:cursor-not-allowed',
          'file:mr-3 file:border-0 file:bg-transparent file:font-medium file:text-foreground',
        )}
        type={type}
        {...controlProps}
      />
      {trailing && (
        <span className="flex items-center text-muted-foreground" data-slot="input-trailing">
          {trailing}
        </span>
      )}
    </div>
  );
};
