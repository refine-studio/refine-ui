import type { Meta, StoryObj } from '@storybook/react-vite';

import { Kbd, KbdGroup } from './kbd';
import { RefineIconCommand } from '../../icons/refine-icons';

const meta = {
  args: {
    children: 'K',
  },
  component: Kbd,
  title: 'Components/Kbd',
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Shortcuts: Story = {
  render: () => {
    return (
      <dl className="grid grid-cols-[auto_auto] items-center gap-x-8 gap-y-3 text-body-sm">
        <dt className="text-muted-foreground">Open command menu</dt>
        <dd>
          <KbdGroup>
            <Kbd>
              <RefineIconCommand />
            </Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </dd>
        <dt className="text-muted-foreground">Start Tick timer</dt>
        <dd>
          <KbdGroup>
            <Kbd>⇧</Kbd>
            <Kbd>T</Kbd>
          </KbdGroup>
        </dd>
        <dt className="text-muted-foreground">Close panel</dt>
        <dd>
          <Kbd>Esc</Kbd>
        </dd>
      </dl>
    );
  },
};
