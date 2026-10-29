import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { Button } from '../button/button';

/**
 * Marks up the page links as a navigation landmark.
 */
export const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => {
  return (
    <nav
      aria-label="Pagination"
      className={cn('flex w-full justify-center', className)}
      data-slot="pagination"
      {...props}
    />
  );
};

export const PaginationContent = ({ className, ...props }: ComponentProps<'ul'>) => {
  return <ul className={cn('flex items-center gap-1', className)} data-slot="pagination-content" {...props} />;
};

export const PaginationItem = (props: ComponentProps<'li'>) => {
  return <li data-slot="pagination-item" {...props} />;
};

interface PaginationLinkProps extends ComponentProps<'a'> {
  isActive?: boolean;
  size?: 'icon' | 'md';
}

/**
 * Links to one page; the active page is outlined and announced as current.
 */
export const PaginationLink = ({ className, isActive = false, size = 'icon', ...props }: PaginationLinkProps) => {
  return (
    <Button
      asChild
      className={cn('font-mono tabular-nums', className)}
      size={size}
      variant={isActive ? 'outline' : 'ghost'}
    >
      <a aria-current={isActive ? 'page' : undefined} data-active={isActive} data-slot="pagination-link" {...props} />
    </Button>
  );
};

/**
 * Links to the previous page.
 */
export const PaginationPrevious = ({ children = 'Previous', className, ...props }: ComponentProps<'a'>) => {
  return (
    <PaginationLink className={cn('gap-1 pl-2.5 font-sans', className)} size="md" {...props}>
      <ChevronLeft />
      <span className="hidden sm:inline">{children}</span>
    </PaginationLink>
  );
};

/**
 * Links to the next page.
 */
export const PaginationNext = ({ children = 'Next', className, ...props }: ComponentProps<'a'>) => {
  return (
    <PaginationLink className={cn('gap-1 pr-2.5 font-sans', className)} size="md" {...props}>
      <span className="hidden sm:inline">{children}</span>
      <ChevronRight />
    </PaginationLink>
  );
};

/**
 * Stands in for the pages between the visible ones.
 */
export const PaginationEllipsis = ({ className, ...props }: ComponentProps<'span'>) => {
  return (
    <span
      className={cn('flex size-control-md items-center justify-center text-subtle', className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <Ellipsis aria-hidden className="size-4" role="presentation" />
      <span className="sr-only">More pages</span>
    </span>
  );
};
