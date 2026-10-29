import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDown, Copy, ExternalLink, GitBranch, Pencil, Rocket, Trash2, UserPlus } from 'lucide-react';
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
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            <DropdownMenuLabel>Repository</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Pencil />
                Rename
                <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy />
                Copy clone URL
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Rocket />
                  Deploy to
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Stage</DropdownMenuItem>
                  <DropdownMenuItem>Production</DropdownMenuItem>
                  <DropdownMenuItem disabled>Preview (no PR)</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <UserPlus />
                Invite a Diamond
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink />
                Open on GitHub
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger">
              <Trash2 />
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
              <GitBranch />
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
