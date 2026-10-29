import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { Eyebrow } from '../eyebrow/eyebrow';

interface PageHeaderProps extends Omit<ComponentProps<'header'>, 'title'> {
  actions?: ReactNode;
  breadcrumb?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  number?: number | string;
  tabs?: ReactNode;
  title: ReactNode;
}

/**
 * Opens a page with breadcrumb, numbered eyebrow, title, description and actions, and docks optional tabs along its bottom edge.
 */
export const PageHeader = ({
  actions,
  breadcrumb,
  className,
  description,
  eyebrow,
  number,
  tabs,
  title,
  ...props
}: PageHeaderProps) => {
  return (
    <header className={cn('flex flex-col gap-5', { 'border-b border-border': tabs }, className)} data-slot="page-header" {...props}>
      {breadcrumb && <div className="text-body-sm text-muted-foreground">{breadcrumb}</div>}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          {eyebrow && <Eyebrow number={number}>{eyebrow}</Eyebrow>}
          <h1 className="font-display text-headline-lg font-black text-balance md:text-display-sm">{title}</h1>
          {description && <p className="max-w-[65ch] text-body text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {tabs && <div className="-mb-px">{tabs}</div>}
    </header>
  );
};
