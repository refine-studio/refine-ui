import type { Meta, StoryObj } from '@storybook/react-vite';
import { Activity, GitPullRequest, Settings } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  args: {
    defaultValue: 'pulls',
  },
  component: Tabs,
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Renders the repository tabs in the given list variant.
 */
const renderRepositoryTabs = (variant: 'pill' | 'segmented' | 'underline') => {
  return (args: Story['args']) => {
    return (
      <Tabs {...args} className="w-[32rem]">
        <TabsList variant={variant}>
          <TabsTrigger count={12} value="pulls">
            <GitPullRequest />
            Pull requests
          </TabsTrigger>
          <TabsTrigger count={3} value="activity">
            <Activity />
            Activity
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings />
            Settings
          </TabsTrigger>
          <TabsTrigger disabled value="insights">
            Insights
          </TabsTrigger>
        </TabsList>
        <TabsContent className="text-body-sm text-muted-foreground" value="pulls">
          12 open pull requests across pilot-web and pilot_engine.
        </TabsContent>
        <TabsContent className="text-body-sm text-muted-foreground" value="activity">
          3 deploys today, the last one by the Diamonds at 09:42.
        </TabsContent>
        <TabsContent className="text-body-sm text-muted-foreground" value="settings">
          Branch protection, reviewers and the deploy pipeline.
        </TabsContent>
      </Tabs>
    );
  };
};

export const Underline: Story = {
  render: renderRepositoryTabs('underline'),
};

export const Pill: Story = {
  render: renderRepositoryTabs('pill'),
};

export const Segmented: Story = {
  render: (args) => {
    return (
      <Tabs {...args} defaultValue="week">
        <TabsList variant="segmented">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="quarter">Quarter</TabsTrigger>
        </TabsList>
      </Tabs>
    );
  },
};
