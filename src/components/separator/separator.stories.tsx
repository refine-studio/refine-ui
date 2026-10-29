import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './separator';

const meta = {
  component: Separator,
  title: 'Components/Separator',
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => {
    return (
      <div className="flex w-80 flex-col gap-4 text-body-sm">
        <p>Sign in with your Refine Google account</p>
        <Separator {...args} />
        <p className="text-muted-foreground">Access is limited to Diamonds.</p>
      </div>
    );
  },
};

export const WithLabel: Story = {
  args: {
    label: 'or',
  },
  render: (args) => {
    return (
      <div className="w-80">
        <Separator {...args} />
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <div className="flex h-6 items-center gap-4 text-body-sm">
        <span>Tick</span>
        <Separator orientation="vertical" />
        <span>Vote</span>
        <Separator orientation="vertical" />
        <span>Atlas</span>
      </div>
    );
  },
};
