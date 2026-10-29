import { ChevronRight, Ellipsis } from 'lucide-react';
import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

/**
 * Marks up the trail as a navigation landmark.
 */
export const Breadcrumb = ({ ...props }: ComponentProps<'nav'>) => {
  return <nav aria-label="Breadcrumb" data-slot="breadcrumb" {...props} />;
};

export const BreadcrumbList = ({ className, ...props }: ComponentProps<'ol'>) => {
  return (
    <ol
      className={cn('flex flex-wrap items-center gap-1.5 text-body-sm break-words text-muted-foreground', className)}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
};

export const BreadcrumbItem = ({ className, ...props }: ComponentProps<'li'>) => {
  return <li className={cn('inline-flex items-center gap-1.5', className)} data-slot="breadcrumb-item" {...props} />;
};

interface BreadcrumbLinkProps extends ComponentProps<'a'> {
  asChild?: boolean;
}

/**
 * Links to an ancestor page; pass `asChild` to render your router's link.
 */
export const BreadcrumbLink = ({ asChild = false, className, ...props }: BreadcrumbLinkProps) => {
  const Component = asChild ? Slot.Root : 'a';

  return (
    <Component
      className={cn('rounded-sm transition-colors hover:text-foreground focus-ring', className)}
      data-slot="breadcrumb-link"
      {...props}
    />
  );
};

/**
 * Names the current page and marks it as such for assistive technology.
 */
export const BreadcrumbPage = ({ className, ...props }: ComponentProps<'span'>) => {
  return (
    <span
      aria-current="page"
      className={cn('font-medium text-foreground', className)}
      data-slot="breadcrumb-page"
      {...props}
    />
  );
};

export const BreadcrumbSeparator = ({ children, className, ...props }: ComponentProps<'li'>) => {
  return (
    <li
      aria-hidden
      className={cn('text-subtle [&>svg]:size-3.5', className)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};

/**
 * Stands in for collapsed middle crumbs.
 */
export const BreadcrumbEllipsis = ({ className, ...props }: ComponentProps<'span'>) => {
  return (
    <span
      className={cn('flex size-5 items-center justify-center', className)}
      data-slot="breadcrumb-ellipsis"
      {...props}
    >
      <Ellipsis aria-hidden className="size-4" role="presentation" />
      <span className="sr-only">More pages</span>
    </span>
  );
};
