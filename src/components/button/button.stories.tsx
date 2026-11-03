import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import { RefineIconAddPlus, RefineIconArrowRightMD, RefineIconSparkles, RefineIconTrashFull } from '../../icons/refine-icons';

const meta = {
  args: {
    children: 'Get in touch',
    disabled: false,
    loading: false,
    size: 'md',
    variant: 'primary',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'icon-sm', 'icon', 'icon-lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'gem', 'secondary', 'outline', 'ghost', 'danger', 'link'],
    },
  },
  component: Button,
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button {...args} variant="primary">
          Primary
        </Button>
        <Button {...args} variant="gem">
          <RefineIconSparkles />
          Gem
        </Button>
        <Button {...args} variant="secondary">
          Secondary
        </Button>
        <Button {...args} variant="outline">
          Outline
        </Button>
        <Button {...args} variant="ghost">
          Ghost
        </Button>
        <Button {...args} variant="danger">
          <RefineIconTrashFull />
          Danger
        </Button>
        <Button {...args} variant="link">
          Link
        </Button>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => {
          return (
            <Button {...args} key={size} size={size}>
              Size {size}
              <RefineIconArrowRightMD />
            </Button>
          );
        })}
      </div>
    );
  },
};

export const IconOnly: Story = {
  render: (args) => {
    return (
      <div className="flex items-center gap-3">
        {(['icon-sm', 'icon', 'icon-lg'] as const).map((size) => {
          return (
            <Button {...args} key={size} size={size} title="Add item" variant="outline">
              <RefineIconAddPlus />
              <span className="sr-only">Add item</span>
            </Button>
          );
        })}
      </div>
    );
  },
};

export const States: Story = {
  render: (args) => {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button {...args}>Resting</Button>
        <Button {...args} loading>
          Saving changes
        </Button>
        <Button {...args} disabled>
          Disabled
        </Button>
        <Button {...args} loading variant="gem">
          Deploying
        </Button>
      </div>
    );
  },
};

export const AsLink: Story = {
  render: (args) => {
    return (
      <Button {...args} asChild variant="outline">
        <a href="https://refine.studio">
          Visit refine.studio
          <RefineIconArrowRightMD />
        </a>
      </Button>
    );
  },
};
