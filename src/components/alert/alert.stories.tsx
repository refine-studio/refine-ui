import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { Alert, AlertDescription, AlertTitle } from './alert';

const VARIANTS = ['neutral', 'gem', 'info', 'success', 'warning', 'danger'] as const;

const COPY_BY_VARIANT = {
  danger: {
    description: 'pilot-api-lumen failed its health check and was rolled back to v1.21.4.',
    title: 'Deploy rolled back',
  },
  gem: {
    description: 'Refine UI now ships a dark mode. Flip it from the toolbar.',
    title: 'New in Refine UI',
  },
  info: {
    description: 'Stage is refreshed from production every night at 02:00.',
    title: 'Heads up',
  },
  neutral: {
    description: 'This tenant uses the default theme until its brand tokens land.',
    title: 'Default theme',
  },
  success: {
    description: 'All 18 tenants are running v2.14.0.',
    title: 'Rollout complete',
  },
  warning: {
    description: 'You have logged 3 hours this week. Tick reminds everyone on Fridays.',
    title: 'Timesheet incomplete',
  },
} satisfies Record<(typeof VARIANTS)[number], { description: string; title: string }>;

const meta = {
  args: {
    dismissible: false,
    variant: 'gem',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
  component: Alert,
  decorators: [
    (Story) => {
      return (
        <div className="w-[36rem]">
          <Story />
        </div>
      );
    },
  ],
  title: 'Components/Alert',
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const copy = COPY_BY_VARIANT[args.variant ?? 'neutral'];

    return (
      <Alert {...args}>
        <AlertTitle>{copy.title}</AlertTitle>
        <AlertDescription>{copy.description}</AlertDescription>
      </Alert>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className="gap-3 flex flex-col">
        {VARIANTS.map((variant) => {
          return (
            <Alert key={variant} variant={variant}>
              <AlertTitle>{COPY_BY_VARIANT[variant].title}</AlertTitle>
              <AlertDescription>{COPY_BY_VARIANT[variant].description}</AlertDescription>
            </Alert>
          );
        })}
      </div>
    );
  },
};

export const WithActionAndDismiss: Story = {
  render: () => {
    return (
      <Alert
        action={
          <Button size="sm" variant="outline">
            Open Tick
          </Button>
        }
        dismissible
        variant="warning"
      >
        <AlertTitle>{COPY_BY_VARIANT.warning.title}</AlertTitle>
        <AlertDescription>{COPY_BY_VARIANT.warning.description}</AlertDescription>
      </Alert>
    );
  },
};

export const TitleOnly: Story = {
  render: () => {
    return (
      <Alert icon={false} variant="info">
        <AlertTitle>Stage is read-only during the nightly refresh.</AlertTitle>
      </Alert>
    );
  },
};
