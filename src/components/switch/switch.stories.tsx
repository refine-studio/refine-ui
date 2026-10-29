import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '../label/label';
import { Switch } from './switch';

const meta = {
  args: {
    disabled: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
  },
  component: Switch,
  title: 'Components/Switch',
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const SETTINGS = [
  {
    description: 'Ping #deploys when a release reaches production.',
    id: 'switch-slack',
    isOn: true,
    label: 'Slack announcements',
  },
  {
    description: 'Require a second Diamond to approve production deploys.',
    id: 'switch-approval',
    isOn: false,
    label: 'Four-eyes approval',
  },
  {
    description: 'Managed by the platform team.',
    id: 'switch-maintenance',
    isDisabled: true,
    isOn: false,
    label: 'Maintenance mode',
  },
];

export const SettingsList: Story = {
  render: (args) => {
    return (
      <div className="w-96 divide-y rounded-card border bg-card">
        {SETTINGS.map((setting) => {
          return (
            <div className="flex items-center justify-between gap-6 p-4" key={setting.id}>
              <div className="grid gap-0.5">
                <Label htmlFor={setting.id}>{setting.label}</Label>
                <span className="text-body-sm text-muted-foreground">{setting.description}</span>
              </div>
              <Switch {...args} defaultChecked={setting.isOn} disabled={setting.isDisabled} id={setting.id} />
            </div>
          );
        })}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-4">
        <Switch defaultChecked size="sm" />
        <Switch defaultChecked size="md" />
        <Switch aria-invalid />
        <Switch disabled />
        <Switch defaultChecked disabled />
      </div>
    );
  },
};
