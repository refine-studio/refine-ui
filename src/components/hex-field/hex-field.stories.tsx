import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { HexField } from './hex-field';

const meta = {
  args: {
    animated: true,
    columns: 32,
    fade: 'radial',
    rows: 16,
  },
  argTypes: {
    fade: {
      control: 'inline-radio',
      options: ['none', 'bottom', 'radial'],
    },
  },
  component: HexField,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Hex Field',
} satisfies Meta<typeof HexField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    return (
      <div className="relative h-[28rem] overflow-hidden bg-background">
        <HexField {...args} className="inset-0 absolute" />
      </div>
    );
  },
};

export const HeroBackdrop: Story = {
  render: (args) => {
    return (
      <div className="gap-6 px-6 relative flex h-[34rem] flex-col items-center justify-center overflow-hidden bg-background text-center">
        <HexField {...args} className="inset-0 absolute text-gem" />
        <span className="relative eyebrow text-muted-foreground">01 — Pilot</span>
        <h2 className="max-w-3xl relative text-display-lg">Loyalty that feels like a product, not a programme.</h2>
        <div className="gap-3 relative flex">
          <Button size="lg" variant="gem">
            See the platform
          </Button>
          <Button size="lg" variant="outline">
            Talk to us
          </Button>
        </div>
      </div>
    );
  },
};

export const StillAndFaded: Story = {
  args: {
    animated: false,
    fade: 'bottom',
  },
  render: (args) => {
    return (
      <div className="h-80 relative overflow-hidden rounded-panel bg-canvas">
        <HexField {...args} className="inset-0 absolute" />
      </div>
    );
  },
};
