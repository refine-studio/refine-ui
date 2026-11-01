import { type ComponentProps, Fragment, type ReactNode, useState } from 'react';

import {
  RefineIconArrowDownSM,
  RefineIconArrowDownUp,
  RefineIconArrowUpSM,
  RefineIconChevronDown,
} from '../../icons/refine-icons';
import { cn } from '../../lib/cn';
import type { SortDirection, SortValue } from './sort-rows';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../table/table';
import { sortRows } from './sort-rows';

export type { SortDirection } from './sort-rows';

export interface DataTableSort {
  columnId: string;
  direction: SortDirection;
}

export interface DataTableColumn<T> {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  cellClassName?: string;
  defaultSortDirection?: SortDirection;
  headClassName?: string;
  numeric?: boolean;
  sortValue?: (row: T) => SortValue;
}

const SORT_ICON_BY_DIRECTION = {
  ascending: RefineIconArrowUpSM,
  descending: RefineIconArrowDownSM,
} satisfies Record<SortDirection, unknown>;

interface TableHeadSortableProps extends ComponentProps<typeof TableHead> {
  direction: SortDirection | null;
  onSort: () => void;
}

/**
 * A header cell whose label is a sort button; `direction` is null while another column holds the sort.
 */
export const TableHeadSortable = ({
  children,
  className,
  direction,
  numeric,
  onSort,
  ...props
}: TableHeadSortableProps) => {
  const Icon = direction ? SORT_ICON_BY_DIRECTION[direction] : RefineIconArrowDownUp;
  return (
    <TableHead
      aria-sort={direction ?? 'none'}
      className={className}
      data-slot="table-head-sortable"
      numeric={numeric}
      {...props}
    >
      <button
        className={cn(
          'group/sort gap-1 inline-flex items-center rounded-inner uppercase focus-ring transition-colors hover:text-foreground',
          direction && 'text-foreground',
          numeric && 'flex-row-reverse',
        )}
        onClick={onSort}
        type="button"
      >
        {children}
        <Icon
          aria-hidden
          className={cn(
            'size-3.5 shrink-0 transition-opacity',
            !direction && 'opacity-0 group-hover/sort:opacity-60 group-focus-visible/sort:opacity-60',
          )}
        />
      </button>
    </TableHead>
  );
};

/**
 * Returns the direction a first click on the column sorts in: text A→Z, numbers largest first, unless the column says otherwise.
 */
const firstDirection = <T,>(column: DataTableColumn<T>) => {
  return column.defaultSortDirection ?? (column.numeric ? 'descending' : 'ascending');
};

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  'aria-label'?: string;
  className?: string;
  containerClassName?: string;
  defaultExpanded?: string[];
  defaultSort?: DataTableSort | null;
  empty?: ReactNode;
  expanded?: string[];
  expandMultiple?: boolean;
  footer?: ReactNode;
  onExpandedChange?: (expanded: string[]) => void;
  onSortChange?: (sort: DataTableSort) => void;
  renderDetail?: (row: T) => ReactNode;
  sort?: DataTableSort | null;
  stickyHeader?: boolean;
}

/**
 * Renders rows under sortable column headers; with `renderDetail`, each row gets a chevron that opens a full-width detail row beneath it.
 */
export const DataTable = <T,>({
  'aria-label': ariaLabel,
  className,
  columns,
  containerClassName,
  defaultExpanded = [],
  defaultSort = null,
  empty = 'Nothing to show.',
  expanded: controlledExpanded,
  expandMultiple = false,
  footer,
  getRowId,
  onExpandedChange,
  onSortChange,
  renderDetail,
  rows,
  sort: controlledSort,
  stickyHeader = false,
}: DataTableProps<T>) => {
  const [uncontrolledSort, setUncontrolledSort] = useState(defaultSort);
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const sort = controlledSort === undefined ? uncontrolledSort : controlledSort;
  const expanded = controlledExpanded ?? uncontrolledExpanded;
  const isExpandable = !!renderDetail;
  const columnCount = columns.length + (isExpandable ? 1 : 0);
  const sortColumn = columns.find((column) => {
    return column.id === sort?.columnId;
  });
  const sorted = sort && sortColumn?.sortValue ? sortRows(rows, sortColumn.sortValue, sort.direction) : rows;

  /**
   * Sorts by the column, flipping the direction when it already holds the sort.
   */
  const handleSort = (column: DataTableColumn<T>) => {
    const isSameColumn = sort?.columnId === column.id;
    let direction = firstDirection(column);
    if (isSameColumn) direction = sort.direction === 'ascending' ? 'descending' : 'ascending';
    const next = {
      columnId: column.id,
      direction,
    };
    if (controlledSort === undefined) setUncontrolledSort(next);
    onSortChange?.(next);
  };

  /**
   * Opens or closes one row; without `expandMultiple`, opening a row closes the one open before it.
   */
  const handleToggle = (id: string) => {
    const isOpen = expanded.includes(id);
    let next = expandMultiple ? [...expanded, id] : [id];
    if (isOpen) {
      next = expanded.filter((openId) => {
        return openId !== id;
      });
    }
    if (controlledExpanded === undefined) setUncontrolledExpanded(next);
    onExpandedChange?.(next);
  };

  return (
    <Table
      aria-label={ariaLabel}
      className={className}
      containerClassName={containerClassName}
      data-slot="data-table"
      stickyHeader={stickyHeader}
    >
      <TableHeader>
        <TableRow hoverable={false}>
          {isExpandable ? (
            <TableHead className="w-0 pr-0">
              <span className="sr-only">Details</span>
            </TableHead>
          ) : null}
          {columns.map((column) => {
            if (!column.sortValue) {
              return (
                <TableHead className={column.headClassName} key={column.id} numeric={column.numeric}>
                  {column.header}
                </TableHead>
              );
            }
            return (
              <TableHeadSortable
                className={column.headClassName}
                direction={sort?.columnId === column.id ? sort.direction : null}
                key={column.id}
                numeric={column.numeric}
                onSort={() => {
                  handleSort(column);
                }}
              >
                {column.header}
              </TableHeadSortable>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.length === 0 ? (
          <TableRow hoverable={false}>
            <TableCell className="h-24 text-center whitespace-normal text-muted-foreground" colSpan={columnCount}>
              {empty}
            </TableCell>
          </TableRow>
        ) : null}
        {sorted.map((row) => {
          const id = getRowId(row);
          const isOpen = isExpandable && expanded.includes(id);
          const detailId = `data-table-detail-${id}`;
          const toggleLabel = isOpen ? 'Hide details' : 'Show details';
          return (
            <Fragment key={id}>
              <TableRow data-state={isOpen ? 'selected' : undefined}>
                {isExpandable ? (
                  <TableCell className="w-0 pr-0">
                    <button
                      aria-controls={isOpen ? detailId : undefined}
                      aria-expanded={isOpen}
                      className="size-6 grid place-items-center rounded-inner text-muted-foreground focus-ring hover:bg-hover hover:text-foreground"
                      data-slot="data-table-toggle"
                      onClick={() => {
                        handleToggle(id);
                      }}
                      title={toggleLabel}
                      type="button"
                    >
                      <RefineIconChevronDown
                        aria-hidden
                        className={cn('size-4 transition-transform', !isOpen && '-rotate-90')}
                      />
                      <span className="sr-only">{toggleLabel}</span>
                    </button>
                  </TableCell>
                ) : null}
                {columns.map((column) => {
                  return (
                    <TableCell className={column.cellClassName} key={column.id} numeric={column.numeric}>
                      {column.cell(row)}
                    </TableCell>
                  );
                })}
              </TableRow>
              {isOpen ? (
                <TableRow className="[&>td]:bg-gem/5" data-slot="data-table-detail" hoverable={false} id={detailId}>
                  <TableCell className="px-3 py-4 h-auto whitespace-normal" colSpan={columnCount}>
                    {renderDetail(row)}
                  </TableCell>
                </TableRow>
              ) : null}
            </Fragment>
          );
        })}
      </TableBody>
      {footer ? <TableFooter>{footer}</TableFooter> : null}
    </Table>
  );
};
