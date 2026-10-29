import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

interface SpinnerProps extends ComponentProps<'span'> {
  label?: string;
}

/**
 * A spinning diamond facet that announces `label` to assistive technology while work is pending.
 */
export const Spinner = ({ className, label = 'Loading', ...props }: SpinnerProps) => {
  return (
    <span className={cn('inline-flex size-[1em] items-center justify-center', className)} data-slot="spinner" role="status" {...props}>
      <svg aria-hidden className="size-full animate-facet-spin" fill="none" role="presentation" viewBox="0 0 24 24">
        <path d="M12 2 21 9.5 12 22 3 9.5Z" opacity="0.3" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M12 2 21 9.5 12 22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
};
