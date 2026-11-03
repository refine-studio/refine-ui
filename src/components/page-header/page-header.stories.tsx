import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { PageHeader } from './page-header';
import { RefineIconAddPlus, RefineIconChevronRight, RefineIconDownload } from '../../icons/refine-icons';

const meta = {
  args: {
    description: 'Every Diamond, their projects and how their week is shaping up.',
    eyebrow: 'Workspace',
    number: 2,
    title: 'Diamonds',
  },
  component: PageHeader,
  decorators: [
    (Story) => {
      return (
        <div className="w-full max-w-5xl p-8">
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Widgets/Page Header',
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Complete: Story = {
  args: {
    actions: (
      <>
        <Button variant="outline">
          <RefineIconDownload />
          Export CSV
        </Button>
        <Button variant="gem">
          <RefineIconAddPlus />
          Invite Diamond
        </Button>
      </>
    ),
    breadcrumb: (
      <nav className="flex items-center gap-1.5">
        <a className="rounded-sm focus-ring hover:text-foreground" href="#workspace">
          Tick
        </a>
        <RefineIconChevronRight aria-hidden className="size-3.5" />
        <span className="text-foreground">Diamonds</span>
      </nav>
    ),
    tabs: (
      <div className="flex gap-6 text-body-sm">
        {['Members', 'Teams', 'Invitations'].map((tab, index) => {
          return (
            <button
              aria-current={index === 0 ? 'page' : undefined}
              className="border-b-2 border-transparent pb-3 text-muted-foreground focus-ring hover:text-foreground aria-[current=page]:border-gem aria-[current=page]:text-foreground"
              key={tab}
              type="button"
            >
              {tab}
            </button>
          );
        })}
      </div>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    description: undefined,
    eyebrow: undefined,
    title: 'Settings',
  },
};
