import type { Meta, StoryObj } from '@storybook/react-vite';
import { Clock, Globe, Search } from 'lucide-react';

import { Field, FieldDescription, FieldError, FieldLabel } from '../field/field';
import { Input } from './input';

const meta = {
  args: {
    disabled: false,
    placeholder: 'Search customers…',
    readOnly: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  component: Input,
  decorators: [
    (Story) => {
      return (
        <div className="w-80">
          <Story />
        </div>
      );
    },
  ],
  title: 'Components/Input',
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="gap-3 grid">
        <Input {...args} placeholder="Small" size="sm" />
        <Input {...args} placeholder="Medium" size="md" />
        <Input {...args} placeholder="Large" size="lg" />
      </div>
    );
  },
};

export const Adornments: Story = {
  render: (args) => {
    return (
      <div className="gap-3 grid">
        <Input
          {...args}
          leading={<Search />}
          placeholder="Search tenants…"
          trailing={<kbd className="rounded px-1.5 border bg-muted font-mono text-caption">⌘K</kbd>}
        />
        <Input {...args} inputMode="decimal" leading={<Clock />} placeholder="7.5" trailing="hours" />
        <Input {...args} leading={<Globe />} placeholder="acme" trailing=".pilot.example.com" />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div className="gap-5 grid">
        <Field>
          <FieldLabel>Project</FieldLabel>
          <Input placeholder="Pilot · Acme" />
          <FieldDescription>Time is booked against this project in Tick.</FieldDescription>
        </Field>
        <Field required>
          <FieldLabel>Hours</FieldLabel>
          <Input defaultValue="27" trailing="hours" />
          <FieldError>A single entry cannot exceed 24 hours.</FieldError>
        </Field>
        <Field>
          <FieldLabel>Tenant slug</FieldLabel>
          <Input defaultValue="vela" readOnly />
          <FieldDescription>Slugs are fixed once a tenant is live.</FieldDescription>
        </Field>
        <Field disabled>
          <FieldLabel>Invoice number</FieldLabel>
          <Input placeholder="Generated on export" />
        </Field>
      </div>
    );
  },
};
