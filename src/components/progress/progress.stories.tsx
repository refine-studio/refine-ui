import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './progress';

const PROGRESS_ITEMS = [
  {
    label: 'Migrating Vela ledger',
    tone: 'gem',
    value: 72,
  },
  {
    label: 'Sprint capacity used',
    tone: 'warning',
    value: 91,
  },
  {
    label: 'E2E suite passing',
    tone: 'success',
    value: 100,
  },
  {
    label: 'Error budget burnt',
    tone: 'danger',
    value: 38,
  },
] as const;

const meta = {
  args: {
    size: 'md',
    tone: 'gem',
    value: 64,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    tone: {
      control: 'inline-radio',
      options: ['gem', 'success', 'warning', 'danger'],
    },
    value: {
      control: {
        max: 100,
        min: 0,
        type: 'range',
      },
    },
  },
  component: Progress,
  decorators: [
    (Story) => {
      return (
        <div className="w-96">
          <Story />
        </div>
      );
    },
  ],
  title: 'Components/Progress',
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Showcase: Story = {
  render: () => {
    return (
      <div className="gap-6 flex flex-col text-body-sm">
        {PROGRESS_ITEMS.map((item) => {
          return (
            <div className="gap-2 flex flex-col" key={item.label}>
              <div className="flex justify-between">
                <span>{item.label}</span>
                <span className="font-mono text-muted-foreground tabular-nums">{item.value}%</span>
              </div>
              <Progress size="sm" tone={item.tone} value={item.value} />
            </div>
          );
        })}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="gap-4 flex flex-col">
        {(['xs', 'sm', 'md', 'lg'] as const).map((size) => {
          return <Progress key={size} size={size} value={48} />;
        })}
      </div>
    );
  },
};

export const Indeterminate: Story = {
  args: {
    value: null,
  },
};
