import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/cn';

interface EmptyStateProps extends Omit<ComponentProps<'div'>, 'title'> {
  actions?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
}

/**
 * Explains why a view has nothing to show and what to do next, over a faint hex field from the refine.studio backdrop.
 */
export const EmptyState = ({ actions, className, description, icon, title, ...props }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'relative isolate flex flex-col items-center justify-center gap-4 overflow-hidden rounded-card border border-dashed px-6 py-12 text-center',
        className,
      )}
      data-slot="empty-state"
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pattern-hex text-foreground/6"
        role="presentation"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-radial from-transparent from-30% to-background to-75%"
        role="presentation"
      />
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-card border bg-card text-gem-ink shadow-soft [&_svg:not([class*='size-'])]:size-6">
          {icon}
        </div>
      )}
      <div className="flex max-w-sm flex-col gap-1.5">
        <h3 className="text-headline-sm">{title}</h3>
        {description && <p className="text-body-sm text-pretty text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>}
    </div>
  );
};
