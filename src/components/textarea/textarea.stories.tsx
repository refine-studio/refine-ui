import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, FieldDescription, FieldError, FieldLabel } from '../field/field';
import { Textarea } from './textarea';

const meta = {
  args: {
    disabled: false,
    placeholder: 'What did you work on?',
    readOnly: false,
  },
  component: Textarea,
  decorators: [
    (Story) => {
      return (
        <div className="w-96">
          <Story />
        </div>
      );
    },
  ],
  title: 'Components/Textarea',
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AutoGrow: Story = {
  args: {
    defaultValue:
      'Reviewed the Northwind onboarding flow.\nPaired with backend on the points ledger migration.\nFixed the Vela reward redemption bug.\nKeep typing — the field grows with its content.',
  },
};

export const States: Story = {
  render: () => {
    return (
      <div className="gap-5 grid">
        <Field>
          <FieldLabel optional>Release notes</FieldLabel>
          <Textarea placeholder="Shown in the deploy announcement." />
          <FieldDescription>Markdown is supported.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Rollback reason</FieldLabel>
          <Textarea defaultValue="tbd" />
          <FieldError>Explain the rollback in at least 20 characters.</FieldError>
        </Field>
        <Field disabled>
          <FieldLabel>Audit comment</FieldLabel>
          <Textarea defaultValue="Locked after the release was cut." />
        </Field>
      </div>
    );
  },
};
