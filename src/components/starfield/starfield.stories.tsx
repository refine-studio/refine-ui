import type { Meta, StoryObj } from '@storybook/react-vite';

import { LogoMark } from '../logo/logo';
import { Starfield } from './starfield';

const meta = {
  args: {
    density: 260,
    seed: 1688,
    twinkleEvery: 7,
  },
  argTypes: {
    density: {
      control: {
        max: 1200,
        min: 20,
        step: 20,
        type: 'range',
      },
    },
    twinkleEvery: {
      control: {
        max: 40,
        min: 0,
        type: 'range',
      },
    },
  },
  component: Starfield,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Starfield',
} satisfies Meta<typeof Starfield>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    return (
      <div className="h-96 relative overflow-hidden bg-background">
        <Starfield {...args} className="inset-0 absolute" />
      </div>
    );
  },
};

export const NightSky: Story = {
  globals: {
    mode: 'dark',
  },
  render: (args) => {
    return (
      <div className="gap-6 relative flex h-[32rem] flex-col items-center justify-center overflow-hidden bg-background bg-gem-radiance">
        <Starfield {...args} className="inset-0 absolute mask-fade-b text-foreground/60" density={520} />
        <LogoMark className="h-16 relative text-foreground" />
        <h2 className="relative text-center text-display-lg">
          Where Diamonds
          <br />
          <span className="text-gem-gradient">craft Diamonds.</span>
        </h2>
      </div>
    );
  },
};

export const GemStars: Story = {
  render: (args) => {
    return (
      <div className="h-72 relative overflow-hidden rounded-panel bg-canvas">
        <Starfield {...args} className="inset-0 absolute text-gem" density={400} twinkleEvery={3} />
      </div>
    );
  },
};
