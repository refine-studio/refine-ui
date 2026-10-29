import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarClock } from 'lucide-react';

import { Button } from '../button/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from './popover';

const meta = {
  args: {
    defaultOpen: true,
  },
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Popover',
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    return (
      <div className="flex h-80 items-start justify-center pt-4">
        <Popover {...args}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarClock />
              Log time
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-body-sm font-semibold">Quick entry</p>
              <p className="text-body-sm text-muted-foreground">Logs to Refine UI · Design system in Tick.</p>
            </div>
            <div className="flex gap-2">
              {['0:30', '1:00', '2:00', '4:00'].map((duration) => {
                return (
                  <Button className="flex-1 font-mono" key={duration} size="sm" variant="secondary">
                    {duration}
                  </Button>
                );
              })}
            </div>
            <PopoverClose asChild>
              <Button size="sm" variant="ghost">
                Done
              </Button>
            </PopoverClose>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
