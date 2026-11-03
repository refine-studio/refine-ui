import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge';
import { RefineIconPath, RefineIconRocket } from '../../icons/refine-icons';

const VARIANTS = ['neutral', 'gem', 'outline', 'success', 'warning', 'orange', 'danger', 'info', 'violet'] as const;

const meta = {
  args: {
    children: 'Deployed',
    dot: false,
    size: 'md',
    variant: 'gem',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
  component: Badge,
  title: 'Components/Badge',
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => {
    return (
      <div className="gap-4 flex flex-col">
        {(['md', 'sm'] as const).map((size) => {
          return (
            <div className="gap-2 flex flex-wrap items-center" key={size}>
              {VARIANTS.map((variant) => {
                return (
                  <Badge {...args} key={variant} size={size} variant={variant}>
                    {variant}
                  </Badge>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
};

export const WithDot: Story = {
  render: (args) => {
    return (
      <div className="gap-2 flex flex-wrap items-center">
        <Badge {...args} dot variant="success">
          Live on Acme
        </Badge>
        <Badge {...args} dot variant="warning">
          Pending review
        </Badge>
        <Badge {...args} dot variant="danger">
          Build failed
        </Badge>
        <Badge {...args} dot variant="outline">
          Draft
        </Badge>
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: (args) => {
    return (
      <div className="gap-2 flex flex-wrap items-center">
        <Badge {...args} variant="gem">
          <RefineIconRocket />
          v2.14.0
        </Badge>
        <Badge {...args} variant="outline">
          <RefineIconPath />
          feature/pil-1024
        </Badge>
      </div>
    );
  },
};
