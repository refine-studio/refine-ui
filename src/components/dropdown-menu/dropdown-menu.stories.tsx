import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { RefineIconChevronDown, RefineIconCopy, RefineIconEditPencil01, RefineIconExternalLink, RefineIconPath, RefineIconRocket, RefineIconTrashFull, RefineIconUserAdd } from '../../icons/refine-icons';

const meta = {
  args: {
    defaultOpen: true,
    modal: false,
  },
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Dropdown Menu',
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    return (
      <div className="pt-4 flex h-[440px] items-start">
        <DropdownMenu {...args}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              pilot-web
              <RefineIconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            <DropdownMenuLabel>Repository</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <RefineIconEditPencil01 />
                Rename
                <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefineIconCopy />
                Copy clone URL
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <RefineIconRocket />
                  Deploy to
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Stage</DropdownMenuItem>
                  <DropdownMenuItem>Production</DropdownMenuItem>
                  <DropdownMenuItem disabled>Preview (no PR)</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <RefineIconUserAdd />
                Invite a Diamond
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefineIconExternalLink />
                Open on GitHub
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger">
              <RefineIconTrashFull />
              Archive repository
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

export const CheckboxesAndRadios: Story = {
  render: function CheckboxesAndRadiosStory(args) {
    const [showMerged, setShowMerged] = useState(true);
    const [showDrafts, setShowDrafts] = useState(false);
    const [sort, setSort] = useState('updated');

    return (
      <div className="pt-4 flex h-[400px] items-start">
        <DropdownMenu {...args}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <RefineIconPath />
              Pull requests
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Show</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={showMerged} onCheckedChange={setShowMerged}>
              Merged
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showDrafts} onCheckedChange={setShowDrafts}>
              Drafts
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuRadioGroup onValueChange={setSort} value={sort}>
              <DropdownMenuRadioItem value="updated">Recently updated</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="created">Newest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="review">Waiting for review</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
