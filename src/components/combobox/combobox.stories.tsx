import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import type { ComboboxOption } from './combobox';

import { Combobox } from './combobox';

const TICKETS: ComboboxOption[] = [
  {
    group: 'Your tickets',
    hint: 'PIL-101',
    label: 'Design system library',
    value: 'PIL-101',
  },
  {
    group: 'Your tickets',
    hint: 'PIL-102',
    label: 'Add a combobox and a sortable data table',
    value: 'PIL-102',
  },
  {
    group: 'Board',
    hint: 'PIL-87',
    keywords: ['standup', 'meeting'],
    label: 'Weekly sync',
    value: 'PIL-87',
  },
  {
    group: 'Board',
    hint: 'PIL-93',
    label: 'Office move checklist',
    value: 'PIL-93',
  },
  {
    disabled: true,
    group: 'Board',
    hint: 'PIL-64',
    label: 'Archived: Q2 planning',
    value: 'PIL-64',
  },
];

interface ComboboxDemoProps {
  canCreate?: boolean;
  disabled?: boolean;
  initialValue?: string | null;
  size?: 'lg' | 'md' | 'sm';
}

/**
 * Holds the picked value and any created tickets, so each story behaves like a real field.
 */
const ComboboxDemo = ({ canCreate = false, disabled = false, initialValue = null, size = 'md' }: ComboboxDemoProps) => {
  const [value, setValue] = useState(initialValue);
  const [options, setOptions] = useState(TICKETS);

  /**
   * Adds a ticket for the typed query and picks it.
   */
  const handleCreate = (query: string) => {
    const created = {
      group: 'Created',
      hint: `RS-${2000 + options.length}`,
      label: query,
      value: `RS-${2000 + options.length}`,
    };
    setOptions([...options, created]);
    setValue(created.value);
  };

  return (
    <Combobox
      aria-label="Ticket"
      disabled={disabled}
      onCreate={canCreate ? handleCreate : undefined}
      onValueChange={setValue}
      options={options}
      placeholder={canCreate ? 'Search a ticket or type to create one' : 'Search a ticket'}
      size={size}
      value={value}
    />
  );
};

const meta = {
  component: ComboboxDemo,
  decorators: [
    (Story) => {
      return (
        <div className="w-96">
          <Story />
        </div>
      );
    },
  ],
  title: 'Components/Combobox',
} satisfies Meta<typeof ComboboxDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    canCreate: false,
    disabled: false,
    size: 'md',
  },
};

export const CreateFromQuery: Story = {
  args: {
    canCreate: true,
  },
};

export const WithValue: Story = {
  args: {
    initialValue: 'PIL-101',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initialValue: 'PIL-101',
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="gap-3 flex flex-col">
        <ComboboxDemo size="sm" />
        <ComboboxDemo size="md" />
        <ComboboxDemo size="lg" />
      </div>
    );
  },
};
