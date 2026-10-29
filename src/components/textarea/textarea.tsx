'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { useFieldControl } from '../field/field';

/**
 * Renders a multi-line input that grows with its content up to `max-h-64`, then scrolls.
 */
export const Textarea = ({ className, rows = 3, ...props }: ComponentProps<'textarea'>) => {
  const controlProps = useFieldControl(props);

  return (
    <textarea
      className={cn(
        // base
        'field-sizing-content max-h-64 min-h-20 w-full resize-y rounded-control border border-input bg-background px-3 py-2 text-body-sm text-foreground outline-none placeholder:text-subtle',
        'transition-[border-color,box-shadow] duration-150 ease-out-expo',
        // hover
        'hover:border-foreground/25',
        // focus
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20',
        // invalid
        'aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/20',
        // disabled
        'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:hover:border-input',
        // read-only
        'read-only:bg-muted',
        className,
      )}
      data-slot="textarea"
      rows={rows}
      {...controlProps}
    />
  );
};
