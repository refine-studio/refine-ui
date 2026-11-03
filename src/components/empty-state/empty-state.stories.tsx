import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { EmptyState } from './empty-state';
import { RefineIconAddPlus, RefineIconClock, RefineIconFileSearch } from '../../icons/refine-icons';

const meta = {
  args: {
    description: 'Start a timer or log hours manually. Entries sync to the Pilot project they belong to.',
    title: 'No time tracked today',
  },
  component: EmptyState,
  decorators: [
    (Story) => {
      return (
        <div className="w-[40rem]">
          <Story />
        </div>
      );
    },
  ],
  title: 'Components/Empty State',
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    actions: (
      <>
        <Button variant="gem">
          <RefineIconClock />
          Start timer
        </Button>
        <Button variant="outline">
          <RefineIconAddPlus />
          Log manually
        </Button>
      </>
    ),
    icon: <RefineIconClock />,
  },
};

export const NoResults: Story = {
  args: {
    actions: (
      <Button size="sm" variant="ghost">
        Clear filters
      </Button>
    ),
    description: 'No tenant matches “Globex” with status “Failed”. Try a wider filter.',
    icon: <RefineIconFileSearch />,
    title: 'No matching tenants',
  },
};

export const Minimal: Story = {
  args: {
    description: undefined,
    title: 'Nothing here yet',
  },
};
