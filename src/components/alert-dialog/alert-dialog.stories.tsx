import type { Meta, StoryObj } from '@storybook/react-vite';
import { Trash2 } from 'lucide-react';

import { Button } from '../button/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

const meta = {
  args: {
    defaultOpen: true,
  },
  component: AlertDialog,
  parameters: {
    docs: {
      story: {
        height: '420px',
        inline: false,
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Alert Dialog',
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Destructive: Story = {
  render: (args) => {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <AlertDialog {...args}>
          <AlertDialogTrigger asChild>
            <Button variant="danger">
              <Trash2 />
              Delete tenant
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogIcon>
                <Trash2 />
              </AlertDialogIcon>
              <AlertDialogTitle>Delete the Vela tenant?</AlertDialogTitle>
              <AlertDialogDescription>
                Its theme, 1,284 members and every points ledger go with it. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep tenant</AlertDialogCancel>
              <AlertDialogAction>Delete tenant</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
};

export const Confirm: Story = {
  render: (args) => {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <AlertDialog {...args}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Close this week in Tick?</AlertDialogTitle>
              <AlertDialogDescription>
                Your 38.5 hours lock and go to Harvest export. You can reopen them until Friday.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Not yet</AlertDialogCancel>
              <AlertDialogAction variant="gem">Close week</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
};
