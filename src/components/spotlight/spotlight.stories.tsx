import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code2, Compass, PenTool } from 'lucide-react';

import { Spotlight } from './spotlight';

const SERVICES = [
  {
    description: 'Workshops, roadmaps and product strategy that survive contact with reality.',
    icon: Compass,
    title: 'Strategy',
  },
  {
    description: 'Interfaces and design systems with a voice, from first sketch to pixel.',
    icon: PenTool,
    title: 'Design',
  },
  {
    description: 'Next.js, Rails and the platform glue to run it for years.',
    icon: Code2,
    title: 'Development',
  },
];

const meta = {
  component: Spotlight,
  title: 'Components/Spotlight',
} satisfies Meta<typeof Spotlight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    return (
      <Spotlight {...args} className="flex w-96 flex-col gap-3 p-8">
        <span className="eyebrow text-muted-foreground">Move your pointer</span>
        <p className="text-headline-md">The glow follows you, and takes its colour from the refine teal.</p>
      </Spotlight>
    );
  },
};

export const ServiceCards: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => {
    return (
      <div className="grid max-w-5xl gap-4 md:grid-cols-3">
        {SERVICES.map(({ description, icon: Icon, title }, index) => {
          return (
            <Spotlight className="flex flex-col gap-4 p-6" key={title}>
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-control bg-gem-soft text-gem-ink">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="font-mono text-caption text-subtle tabular-nums">0{index + 1}</span>
              </div>
              <h3 className="text-headline-md font-black">{title}</h3>
              <p className="text-body-sm text-muted-foreground">{description}</p>
            </Spotlight>
          );
        })}
      </div>
    );
  },
};
