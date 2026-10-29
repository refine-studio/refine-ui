import { describe, expect, it } from 'vitest';

import { sortRows } from './sort-rows';

const PEOPLE = [
  {
    hours: 12,
    name: 'Peter',
  },
  {
    hours: null,
    name: 'Clara',
  },
  {
    hours: 40,
    name: 'Tomas',
  },
  {
    hours: 3,
    name: 'item 10',
  },
  {
    hours: 7,
    name: 'item 9',
  },
];

describe('sortRows', () => {
  it('sorts numbers largest first when descending', () => {
    const sorted = sortRows(
      PEOPLE,
      (person) => {
        return person.hours;
      },
      'descending',
    );
    expect(
      sorted.map((person) => {
        return person.hours;
      }),
    ).toEqual([40, 12, 7, 3, null]);
  });

  it('keeps empty values last in both directions', () => {
    const sorted = sortRows(
      PEOPLE,
      (person) => {
        return person.hours;
      },
      'ascending',
    );
    expect(
      sorted.map((person) => {
        return person.hours;
      }),
    ).toEqual([3, 7, 12, 40, null]);
  });

  it('sorts text A to Z and reads digits as numbers', () => {
    const sorted = sortRows(
      PEOPLE,
      (person) => {
        return person.name;
      },
      'ascending',
    );
    expect(
      sorted.map((person) => {
        return person.name;
      }),
    ).toEqual(['Clara', 'item 9', 'item 10', 'Peter', 'Tomas']);
  });

  it('returns a copy and leaves the input order alone', () => {
    const before = PEOPLE.map((person) => {
      return person.name;
    });
    sortRows(
      PEOPLE,
      (person) => {
        return person.name;
      },
      'descending',
    );
    expect(
      PEOPLE.map((person) => {
        return person.name;
      }),
    ).toEqual(before);
  });
});
