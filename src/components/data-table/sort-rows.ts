export type SortDirection = 'ascending' | 'descending';

export type SortValue = Date | number | string | null | undefined;

/**
 * Compares two sort values ascending: numbers and dates by size, text by locale with digits read as numbers.
 */
const compareValues = (a: SortValue, b: SortValue) => {
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
};

/**
 * Returns true for a value the table treats as empty, which always sorts last.
 */
const isEmptyValue = (value: SortValue) => {
  return value === null || value === undefined || value === '';
};

/**
 * Returns a sorted copy of the rows; empty values go last in both directions, and ties keep their input order.
 */
export const sortRows = <T>(rows: T[], sortValue: (row: T) => SortValue, direction: SortDirection) => {
  const sign = direction === 'ascending' ? 1 : -1;
  return [...rows].sort((rowA, rowB) => {
    const a = sortValue(rowA);
    const b = sortValue(rowB);
    if (isEmptyValue(a) || isEmptyValue(b)) return Number(isEmptyValue(a)) - Number(isEmptyValue(b));
    return compareValues(a, b) * sign;
  });
};
