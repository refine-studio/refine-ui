import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

interface TableProps extends ComponentProps<'table'> {
  containerClassName?: string;
  stickyHeader?: boolean;
}

/**
 * A dense data table inside a scroll container; `stickyHeader` pins the header row while the body scrolls.
 */
export const Table = ({ className, containerClassName, stickyHeader = false, ...props }: TableProps) => {
  return (
    <div
      className={cn('relative w-full overflow-auto', containerClassName)}
      data-slot="table-container"
      data-sticky={stickyHeader || undefined}
    >
      <table
        className={cn('group/table w-full caption-bottom border-collapse text-body-sm', className)}
        data-slot="table"
        data-sticky={stickyHeader || undefined}
        {...props}
      />
    </div>
  );
};

/**
 * The header row group.
 */
export const TableHeader = ({ className, ...props }: ComponentProps<'thead'>) => {
  return (
    <thead
      className={cn(
        '[&_tr]:border-b group-data-sticky/table:sticky group-data-sticky/table:top-0 group-data-sticky/table:z-10 group-data-sticky/table:bg-background/90 group-data-sticky/table:backdrop-blur',
        className,
      )}
      data-slot="table-header"
      {...props}
    />
  );
};

/**
 * The body row group.
 */
export const TableBody = ({ className, ...props }: ComponentProps<'tbody'>) => {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} data-slot="table-body" {...props} />;
};

/**
 * The totals row group.
 */
export const TableFooter = ({ className, ...props }: ComponentProps<'tfoot'>) => {
  return (
    <tfoot
      className={cn('border-t bg-muted/60 font-medium [&>tr]:last:border-b-0', className)}
      data-slot="table-footer"
      {...props}
    />
  );
};

/**
 * A row that highlights on hover and when `data-state="selected"`.
 */
export const TableRow = ({ className, ...props }: ComponentProps<'tr'>) => {
  return (
    <tr
      className={cn(
        'border-b transition-colors hover:bg-hover data-[state=selected]:bg-gem/10 data-[state=selected]:hover:bg-gem/15',
        className,
      )}
      data-slot="table-row"
      {...props}
    />
  );
};

interface TableCellProps extends ComponentProps<'td'> {
  numeric?: boolean;
}

interface TableHeadProps extends ComponentProps<'th'> {
  numeric?: boolean;
}

/**
 * A header cell in the mono eyebrow voice; `numeric` right-aligns it over a number column.
 */
export const TableHead = ({ className, numeric = false, ...props }: TableHeadProps) => {
  return (
    <th
      className={cn(
        'eyebrow h-control-md px-3 text-left align-middle whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:w-0 [&:has([role=checkbox])]:pr-0',
        {
          'text-right': numeric,
        },
        className,
      )}
      data-slot="table-head"
      {...props}
    />
  );
};

/**
 * A body cell; `numeric` right-aligns it with tabular figures so digits line up.
 */
export const TableCell = ({ className, numeric = false, ...props }: TableCellProps) => {
  return (
    <td
      className={cn(
        'h-control-lg px-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0',
        {
          'text-right font-mono tabular-nums': numeric,
        },
        className,
      )}
      data-slot="table-cell"
      {...props}
    />
  );
};

/**
 * A caption under the table.
 */
export const TableCaption = ({ className, ...props }: ComponentProps<'caption'>) => {
  return (
    <caption className={cn('mt-4 text-body-sm text-muted-foreground', className)} data-slot="table-caption" {...props} />
  );
};
