import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu';
import { RefineIconArchive, RefineIconClock, RefineIconCopy, RefineIconPin, RefineIconTrashFull } from '../../icons/refine-icons';

const meta = {
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Context Menu',
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    return (
      <ContextMenu {...args}>
        <ContextMenuTrigger className="h-48 w-80 flex items-center justify-center rounded-card border border-dashed border-input text-body-sm text-muted-foreground">
          Right-click this Tick entry
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>Entry · 2h 15m</ContextMenuLabel>
          <ContextMenuItem>
            <RefineIconCopy />
            Duplicate
            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <RefineIconPin />
            Pin to today
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <RefineIconClock />
              Move to
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Pilot · Frontend</ContextMenuItem>
              <ContextMenuItem>Refine UI · Design system</ContextMenuItem>
              <ContextMenuItem>Internal · Hiring</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem>
            <RefineIconArchive />
            Archive
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="danger">
            <RefineIconTrashFull />
            Delete entry
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
