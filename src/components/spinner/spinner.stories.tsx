import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './spinner';

const meta = {
  args: {
    label: 'Loading',
  },
  component: Spinner,
  title: 'Components/Spinner',
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    className: 'size-8 text-gem',
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-6 text-foreground">
        <Spinner className="text-body-sm" />
        <Spinner className="text-body-lg" />
        <Spinner className="size-8" />
        <Spinner className="size-12 text-gem" />
      </div>
    );
  },
};

export const Inline: Story = {
  render: () => {
    return (
      <p className="flex items-center gap-2 text-body-sm text-muted-foreground">
        <Spinner label="Syncing" />
        Syncing Tick entries with Personio…
      </p>
    );
  },
};
