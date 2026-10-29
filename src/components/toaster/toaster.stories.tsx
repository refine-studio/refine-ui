import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';

import { Button } from '../button/button';
import { toast, Toaster } from './toaster';

const meta = {
  component: Toaster,
  parameters: {
    docs: {
      story: {
        height: '420px',
        inline: false,
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Toaster',
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Resolves after the given delay, standing in for a deploy request.
 */
const wait = (durationMs: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
};

export const Playground: Story = {
  render: function PlaygroundStory(args) {
    useEffect(() => {
      toast.success('Deployed to stage', {
        description: 'pilot-web · feature/pil-1024',
        id: 'deployed-to-stage',
      });
    }, []);

    return (
      <div className="gap-3 p-8 flex min-h-[420px] flex-wrap content-start">
        <Button
          onClick={() => {
            toast.success('Theme synced', {
              description: 'Acme, Northwind and Lumen picked up the new tokens.',
            });
          }}
          variant="outline"
        >
          Success
        </Button>
        <Button
          onClick={() => {
            toast.error('Deploy failed', {
              description: 'Migration 2026_10_26 timed out on stage.',
            });
          }}
          variant="outline"
        >
          Error
        </Button>
        <Button
          onClick={() => {
            toast('Week closed in Tick', {
              action: {
                label: 'Undo',
                onClick: () => {
                  toast.info('Week reopened');
                },
              },
              description: '38.5 hours sent to the export.',
            });
          }}
          variant="outline"
        >
          With action
        </Button>
        <Button
          onClick={() => {
            toast.promise(wait(2000), {
              error: 'Deploy failed',
              loading: 'Deploying to production…',
              success: 'Production is live',
            });
          }}
          variant="gem"
        >
          Promise
        </Button>
        <Toaster {...args} />
      </div>
    );
  },
};
