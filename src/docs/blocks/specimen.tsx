import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { useDocsTheme } from './use-docs-theme';

interface SpecimenProps extends ComponentProps<'div'> {
  caption?: ReactNode;
}

/**
 * Frames a live specimen on its own themed surface, so it follows the toolbar mode instead of the docs theme.
 */
export const Specimen = ({ caption, children, className, ...props }: SpecimenProps) => {
  useDocsTheme();

  return (
    <figure className="sb-unstyled my-6 flex flex-col gap-2">
      <div
        className={cn('rounded-card border bg-background p-6 font-sans text-body text-foreground', className)}
        {...props}
      >
        {children}
      </div>
      {caption && <figcaption className="font-mono text-caption text-zinc-400">{caption}</figcaption>}
    </figure>
  );
};

interface TokenProps extends ComponentProps<'code'> {
  children: ReactNode;
}

/**
 * Prints a class or token name in the mono face.
 */
export const Token = ({ children, className, ...props }: TokenProps) => {
  return (
    <code className={cn('font-mono text-caption text-muted-foreground', className)} {...props}>
      {children}
    </code>
  );
};
