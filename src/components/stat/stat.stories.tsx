import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardContent } from '../card/card';
import { Separator } from '../separator/separator';
import { Sparkline, Stat } from './stat';

const meta = {
  args: {
    delta: '+12.4% vs last sprint',
    index: '01',
    label: 'Deploys this week',
    size: 'md',
    trend: 'up',
    value: '148',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    trend: {
      control: 'inline-radio',
      options: ['up', 'down', 'flat'],
    },
  },
  component: Stat,
  title: 'Components/Stat',
} satisfies Meta<typeof Stat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Row: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => {
    return (
      <Card className="max-w-5xl">
        <CardContent className="grid grid-cols-1 gap-8 p-8 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <Stat
            delta="+18 since Monday"
            index="01"
            label="Tracked in Tick"
            sparkline={<Sparkline values={[22, 28, 25, 31, 34, 30, 38]} />}
            trend="up"
            unit="h"
            value="312"
          />
          <Separator orientation="vertical" />
          <Stat
            delta="−3 open incidents"
            index="02"
            label="Tenants live"
            sparkline={<Sparkline values={[14, 15, 15, 16, 17, 18, 18]} />}
            trend="up"
            value="18"
          />
          <Separator orientation="vertical" />
          <Stat
            delta="+0.8 s p95"
            index="03"
            label="Shop checkout p95"
            sparkline={<Sparkline className="text-danger" values={[1.9, 2.1, 2.0, 2.4, 2.6, 2.5, 2.7]} />}
            trend="down"
            unit="s"
            value="2.7"
          />
        </CardContent>
      </Card>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex items-end gap-12">
        {(['xs', 'sm', 'md', 'lg'] as const).map((size) => {
          return <Stat {...args} key={size} size={size} />;
        })}
      </div>
    );
  },
};

export const Trends: Story = {
  render: (args) => {
    return (
      <div className="flex items-end gap-12">
        {(['up', 'down', 'flat'] as const).map((trend) => {
          return <Stat {...args} delta={`${trend} vs last sprint`} key={trend} trend={trend} />;
        })}
      </div>
    );
  },
};

export const TileInCard: Story = {
  render: () => {
    return (
      <Card className="w-96">
        <CardContent className="grid grid-cols-2 gap-3">
          <Card className="gap-1 p-3.5" variant="sunken">
            <Stat delta="+4.1%" label="Billable hours" size="xs" trend="up" value="1,284" />
          </Card>
          <Card className="gap-1 p-3.5" variant="sunken">
            <Stat delta="−2.3%" label="Utilisation" size="xs" trend="down" unit="%" value="78" />
          </Card>
        </CardContent>
      </Card>
    );
  },
};
