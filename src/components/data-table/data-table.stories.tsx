import type { Meta, StoryObj } from '@storybook/react-vite';

import type { DataTableColumn } from './data-table';

import { DataTable } from './data-table';

interface Person {
  flexHours: number;
  id: string;
  loggedHours: number;
  name: string;
  vacationDays: number | null;
}

const PEOPLE: Person[] = [
  {
    flexHours: 6.5,
    id: 'p1',
    loggedHours: 38.5,
    name: 'Elena Vogt',
    vacationDays: 12,
  },
  {
    flexHours: -2,
    id: 'p2',
    loggedHours: 31,
    name: 'Marco Lind',
    vacationDays: 4,
  },
  {
    flexHours: 0,
    id: 'p3',
    loggedHours: 40,
    name: 'Clara Weiss',
    vacationDays: null,
  },
  {
    flexHours: 11.25,
    id: 'p4',
    loggedHours: 42.75,
    name: 'Peter Holm',
    vacationDays: 21,
  },
];

const COLUMNS: DataTableColumn<Person>[] = [
  {
    cell: (person) => {
      return person.name;
    },
    header: 'Name',
    id: 'name',
    sortValue: (person) => {
      return person.name;
    },
  },
  {
    cell: (person) => {
      return `${person.loggedHours} h`;
    },
    header: 'Logged',
    id: 'logged',
    numeric: true,
    sortValue: (person) => {
      return person.loggedHours;
    },
  },
  {
    cell: (person) => {
      return `${person.flexHours > 0 ? '+' : ''}${person.flexHours} h`;
    },
    header: 'Flex',
    id: 'flex',
    numeric: true,
    sortValue: (person) => {
      return person.flexHours;
    },
  },
  {
    cell: (person) => {
      return person.vacationDays ?? '—';
    },
    header: 'Vacation left',
    id: 'vacation',
    numeric: true,
    sortValue: (person) => {
      return person.vacationDays;
    },
  },
];

/**
 * Shows the detail row a lead opens: the person's days for the week.
 */
const renderPersonDays = (person: Person) => {
  return (
    <p className="text-body-sm text-muted-foreground">
      {person.name} logged {person.loggedHours} hours across five days this week.
    </p>
  );
};

const meta = {
  args: {
    'aria-label': 'Team hours',
    columns: COLUMNS,
    defaultSort: {
      columnId: 'name',
      direction: 'ascending',
    },
    getRowId: (person) => {
      return person.id;
    },
    rows: PEOPLE,
  },
  component: DataTable<Person>,
  title: 'Components/Data Table',
} satisfies Meta<typeof DataTable<Person>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ExpandableRows: Story = {
  args: {
    renderDetail: renderPersonDays,
  },
};

export const ExpandMultiple: Story = {
  args: {
    defaultExpanded: ['p1', 'p3'],
    expandMultiple: true,
    renderDetail: renderPersonDays,
  },
};

export const Empty: Story = {
  args: {
    empty: 'Nobody logged time this week.',
    rows: [],
  },
};
