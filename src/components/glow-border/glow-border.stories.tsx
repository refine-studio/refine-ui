import type { Meta, StoryObj } from '@storybook/react-vite';
import { Trophy } from 'lucide-react';

import { Button } from '../button/button';
import { GlowBorder } from './glow-border';

const meta = {
  args: {
    glow: true,
  },
  component: GlowBorder,
  title: 'Components/Glow Border',
} satisfies Meta<typeof GlowBorder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReleaseMoment: Story = {
  render: (args) => {
    return (
      <GlowBorder {...args} className="w-[26rem]">
        <div className="gap-4 p-8 flex flex-col">
          <span className="size-12 flex items-center justify-center rounded-full bg-gem-gradient text-gem-foreground">
            <Trophy aria-hidden className="size-6" />
          </span>
          <span className="eyebrow text-muted-foreground">Release 4.12 · shipped</span>
          <h3 className="font-black text-headline-lg">Pilot is live for Halden.</h3>
          <p className="text-body-sm text-muted-foreground">
            31 Diamonds, 412 pull requests and zero rollbacks. Take the evening off.
          </p>
          <Button className="self-start" variant="gem">
            Read the digest
          </Button>
        </div>
      </GlowBorder>
    );
  },
};

export const BorderOnly: Story = {
  args: {
    glow: false,
  },
  render: (args) => {
    return (
      <GlowBorder {...args} className="w-80">
        <div className="p-6 text-body-sm text-muted-foreground">Quiet, but alive: border without the halo.</div>
      </GlowBorder>
    );
  },
};
