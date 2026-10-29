import type { Meta, StoryObj } from '@storybook/react-vite';

import { Eyebrow } from './eyebrow';

const meta = {
  args: {
    children: 'Services',
    number: 1,
  },
  component: Eyebrow,
  title: 'Components/Eyebrow',
} satisfies Meta<typeof Eyebrow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sequence: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <Eyebrow number={1}>Services</Eyebrow>
        <Eyebrow number={2}>About</Eyebrow>
        <Eyebrow number={3}>Blog</Eyebrow>
        <Eyebrow>Without a number</Eyebrow>
        <Eyebrow number="v0.1">Release</Eyebrow>
      </div>
    );
  },
};
