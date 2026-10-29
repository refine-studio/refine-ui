import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, FieldDescription, FieldError, FieldLabel } from '../field/field';
import { Label } from '../label/label';
import { RadioGroup, RadioGroupItem } from './radio-group';

const ENVIRONMENTS = [
  {
    description: 'Every merge to develop lands here.',
    label: 'Stage',
    value: 'stage',
  },
  {
    description: 'Customer acceptance, refreshed nightly.',
    label: 'Preview',
    value: 'preview',
  },
  {
    description: 'Members see it immediately.',
    label: 'Production',
    value: 'production',
  },
];

const meta = {
  args: {
    defaultValue: 'stage',
    disabled: false,
  },
  component: RadioGroup,
  render: (args) => {
    return (
      <Field>
        <FieldLabel>Target environment</FieldLabel>
        <RadioGroup {...args}>
          {ENVIRONMENTS.map((environment) => {
            return (
              <div className="gap-3 flex items-start" key={environment.value}>
                <RadioGroupItem className="mt-0.5" id={`environment-${environment.value}`} value={environment.value} />
                <div className="gap-0.5 grid">
                  <Label htmlFor={`environment-${environment.value}`}>{environment.label}</Label>
                  <span className="text-body-sm text-muted-foreground">{environment.description}</span>
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </Field>
    );
  },
  title: 'Components/Radio Group',
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  render: (args) => {
    return (
      <Field>
        <FieldLabel>Billing cadence</FieldLabel>
        <RadioGroup {...args} className="gap-5 flex" defaultValue="monthly" orientation="horizontal">
          {['Weekly', 'Monthly', 'Quarterly'].map((cadence) => {
            return (
              <div className="gap-2 flex items-center" key={cadence}>
                <RadioGroupItem id={`cadence-${cadence}`} value={cadence.toLowerCase()} />
                <Label htmlFor={`cadence-${cadence}`}>{cadence}</Label>
              </div>
            );
          })}
        </RadioGroup>
        <FieldDescription>Invoices go out on the first working day.</FieldDescription>
      </Field>
    );
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: undefined,
  },
  render: (args) => {
    return (
      <Field required>
        <FieldLabel>Rollout strategy</FieldLabel>
        <RadioGroup {...args}>
          {['All tenants at once', 'Canary: Acme first', 'Manual per tenant'].map((strategy) => {
            return (
              <div className="gap-2 flex items-center" key={strategy}>
                <RadioGroupItem id={`strategy-${strategy}`} value={strategy} />
                <Label htmlFor={`strategy-${strategy}`}>{strategy}</Label>
              </div>
            );
          })}
        </RadioGroup>
        <FieldError>Pick a rollout strategy before you deploy.</FieldError>
      </Field>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
