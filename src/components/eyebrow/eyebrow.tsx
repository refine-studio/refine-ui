import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

interface EyebrowProps extends ComponentProps<'p'> {
  number?: number | string;
}

/**
 * Renders the website's mono label, prefixing a zero-padded `number` and a dash when one is given ("01 — Services").
 */
export const Eyebrow = ({ children, className, number, ...props }: EyebrowProps) => {
  const formattedNumber = typeof number === 'number' ? number.toString().padStart(2, '0') : number;

  return (
    <p className={cn('eyebrow inline-flex items-center gap-2 text-muted-foreground', className)} data-slot="eyebrow" {...props}>
      {formattedNumber !== undefined && (
        <>
          <span className="text-gem-ink tabular-nums">{formattedNumber}</span>
          <span aria-hidden className="h-px w-5 bg-current opacity-40" role="presentation" />
        </>
      )}
      {children}
    </p>
  );
};
