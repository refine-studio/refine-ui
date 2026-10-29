import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '../checkbox/checkbox';
import { Label } from './label';

const meta = {
  args: {
    children: 'Billable hours',
  },
  component: Label,
  title: 'Components/Label',
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithControl: Story = {
  render: () => {
    return (
      <div className="grid gap-3">
        <div className="flex items-center gap-2">
          <Checkbox defaultChecked id="label-billable" />
          <Label htmlFor="label-billable">Only show billable entries</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox disabled id="label-locked" />
          <Label htmlFor="label-locked">Lock October timesheet (disabled)</Label>
        </div>
      </div>
    );
  },
};
