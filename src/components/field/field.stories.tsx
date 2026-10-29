import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../input/input';
import { Field, FieldDescription, FieldError, FieldLabel } from './field';

const meta = {
  args: {
    disabled: false,
    invalid: false,
    required: true,
  },
  component: Field,
  decorators: [
    (Story) => {
      return (
        <div className="w-80">
          <Story />
        </div>
      );
    },
  ],
  render: (args) => {
    return (
      <Field {...args}>
        <FieldLabel>Customer name</FieldLabel>
        <Input placeholder="Acme Motors GmbH" />
        <FieldDescription>Shown in the tenant switcher and invoices.</FieldDescription>
      </Field>
    );
  },
  title: 'Components/Field',
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithError: Story = {
  render: (args) => {
    return (
      <Field {...args}>
        <FieldLabel>Support e-mail</FieldLabel>
        <Input defaultValue="support@acme" type="email" />
        <FieldDescription>Members reach this address from the help page.</FieldDescription>
        <FieldError>Enter a full e-mail address, such as support@acme.example.</FieldError>
      </Field>
    );
  },
};

export const Optional: Story = {
  args: {
    required: false,
  },
  render: (args) => {
    return (
      <Field {...args}>
        <FieldLabel optional>Jira project key</FieldLabel>
        <Input placeholder="HAP" />
      </Field>
    );
  },
};
