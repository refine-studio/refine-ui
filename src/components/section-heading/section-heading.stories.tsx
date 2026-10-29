import type { Meta, StoryObj } from '@storybook/react-vite';

import { SectionHeading } from './section-heading';

const meta = {
  args: {
    description:
      'We turn visions into high quality applications, building the product step by step with all parties involved.',
    eyebrow: 'Services',
    number: 1,
    size: 'lg',
    title: 'Strategy, design and development under one roof.',
  },
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['start', 'center'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
  component: SectionHeading,
  decorators: [
    (Story) => {
      return (
        <div className="w-full max-w-4xl px-8 pt-24 pb-8 xl:pl-32">
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Section Heading',
} satisfies Meta<typeof SectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Hero: Story = {
  args: {
    as: 'h1',
    description: undefined,
    eyebrow: undefined,
    number: undefined,
    size: 'xl',
    title: (
      <>
        Where Diamonds <span className="text-gem-gradient">craft Diamonds.</span>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    align: 'center',
    eyebrow: 'About',
    number: 2,
    title: 'Where we belong.',
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col gap-28">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size, index) => {
          return (
            <SectionHeading
              {...args}
              description={undefined}
              key={size}
              number={index + 1}
              size={size}
              title={`Size ${size}: Some of our customers.`}
            />
          );
        })}
      </div>
    );
  },
};
