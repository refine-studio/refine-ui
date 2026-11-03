import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { RefineIconRocket } from '../../icons/refine-icons';

const meta = {
  args: {
    defaultOpen: true,
    modal: true,
  },
  component: Dialog,
  parameters: {
    docs: {
      story: {
        height: '520px',
        inline: false,
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Dialog',
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Renders a deploy confirmation dialog at the given panel size.
 */
const renderDeployDialog = (size: 'full' | 'lg' | 'md' | 'sm' | 'xl') => {
  return (args: Story['args']) => {
    return (
      <div className="flex min-h-[520px] items-center justify-center">
        <Dialog {...args}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <RefineIconRocket />
              Deploy to stage
            </Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Deploy pilot-web to stage?</DialogTitle>
              <DialogDescription>
                Branch feature/pil-1024 will replace what is on stage for Acme and Northwind.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <ul className="gap-2 flex flex-col">
                <li>12 commits since the last stage deploy</li>
                <li>2 migrations will run against the stage database</li>
                <li>The Diamonds channel gets a Slack note when it lands</li>
              </ul>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="gem">
                <RefineIconRocket />
                Deploy
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
};

export const Playground: Story = {
  render: renderDeployDialog('md'),
};

export const Small: Story = {
  render: renderDeployDialog('sm'),
};

export const ExtraLarge: Story = {
  render: renderDeployDialog('xl'),
};

export const Closed: Story = {
  args: {
    defaultOpen: false,
  },
  render: renderDeployDialog('md'),
};
