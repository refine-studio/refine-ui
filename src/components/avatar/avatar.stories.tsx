import type { Meta, StoryObj } from '@storybook/react-vite';

import { PEOPLE } from '../../docs/assets/avatars';
import { Avatar, AvatarGroup } from './avatar';

const DIAMONDS = [
  PEOPLE.elena,
  PEOPLE.marco,
  PEOPLE.clara,
  {
    fallback: 'DR',
  },
  PEOPLE.tomas,
  {
    fallback: 'MT',
  },
  PEOPLE.peter,
];

const meta = {
  args: {
    fallback: PEOPLE.elena.fallback,
    shape: 'round',
    size: 'md',
    src: PEOPLE.elena.src,
  },
  argTypes: {
    shape: {
      control: 'inline-radio',
      options: ['round', 'square'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'away', 'busy', 'offline'],
    },
  },
  component: Avatar,
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="gap-4 flex items-end">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => {
          return <Avatar {...args} key={size} size={size} />;
        })}
      </div>
    );
  },
};

export const FallbackAndShapes: Story = {
  render: () => {
    return (
      <div className="gap-4 flex items-center">
        <Avatar fallback="DR" />
        <Avatar fallback="MT" shape="square" />
        <Avatar fallback="BR" src="https://invalid.refine.studio/broken.png" />
        <Avatar fallback={PEOPLE.tomas.fallback} shape="square" src={PEOPLE.tomas.src} />
      </div>
    );
  },
};

export const Status: Story = {
  render: () => {
    return (
      <div className="gap-4 flex items-center">
        <Avatar fallback={PEOPLE.elena.fallback} size="lg" src={PEOPLE.elena.src} status="online" />
        <Avatar fallback={PEOPLE.marco.fallback} size="lg" src={PEOPLE.marco.src} status="away" />
        <Avatar fallback={PEOPLE.clara.fallback} size="lg" src={PEOPLE.clara.src} status="busy" />
        <Avatar fallback="DR" size="lg" status="offline" />
      </div>
    );
  },
};

export const Group: Story = {
  render: () => {
    return (
      <div className="gap-4 flex flex-col">
        <AvatarGroup max={4}>
          {DIAMONDS.map((diamond) => {
            return (
              <Avatar
                fallback={diamond.fallback}
                key={diamond.fallback}
                src={'src' in diamond ? diamond.src : undefined}
              />
            );
          })}
        </AvatarGroup>
        <AvatarGroup max={3} size="sm">
          {DIAMONDS.map((diamond) => {
            return (
              <Avatar
                fallback={diamond.fallback}
                key={diamond.fallback}
                size="sm"
                src={'src' in diamond ? diamond.src : undefined}
              />
            );
          })}
        </AvatarGroup>
      </div>
    );
  },
};
