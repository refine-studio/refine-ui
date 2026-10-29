import type { Meta, StoryObj } from '@storybook/react-vite';
import { Building2, Clock, Moon, Rocket, Rows3, Search, Sun, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '../button/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandMenu,
  CommandSeparator,
  CommandShortcut,
} from './command-menu';

const meta = {
  args: {
    defaultOpen: true,
  },
  component: CommandMenu,
  parameters: {
    docs: {
      story: {
        height: '560px',
        inline: false,
      },
    },
    layout: 'fullscreen',
  },
  title: 'Widgets/Command Menu',
} satisfies Meta<typeof CommandMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const CUSTOMERS = ['Acme Austria', 'Northwind Motors', 'Lumen', 'Vela', 'Orbit Bank', 'Kestrel'] as const;

/**
 * Lists the commands of the Refine internal tool palette.
 */
const RefinePaletteItems = () => {
  return (
    <>
      <CommandInput placeholder="Jump to a customer, run a deploy…" />
      <CommandList>
        <CommandEmpty>No command matches. Try “deploy” or a tenant name.</CommandEmpty>
        <CommandGroup heading="Customers">
          {CUSTOMERS.map((customer) => {
            return (
              <CommandItem key={customer} value={customer}>
                <Building2 />
                {customer}
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <Rocket />
            Deploy pilot-web to stage
            <CommandShortcut>⌘⇧D</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Clock />
            Start a Tick timer
            <CommandShortcut>T</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Users />
            Who is on call?
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem>
            <Sun />
            Light mode
          </CommandItem>
          <CommandItem>
            <Moon />
            Dark mode
          </CommandItem>
          <CommandItem>
            <Rows3 />
            Compact density
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
};

export const Palette: Story = {
  render: function PaletteStory(args) {
    const [open, setOpen] = useState(args.defaultOpen ?? false);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          setOpen((current) => {
            return !current;
          });
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    return (
      <div className="pt-8 flex min-h-[560px] items-start justify-center">
        <Button
          onClick={() => {
            setOpen(true);
          }}
          variant="outline"
        >
          <Search />
          Search
          <kbd className="ml-4 rounded-sm px-1.5 bg-muted font-mono text-caption text-muted-foreground">⌘K</kbd>
        </Button>
        <CommandMenu onOpenChange={setOpen} open={open}>
          <RefinePaletteItems />
        </CommandMenu>
      </div>
    );
  },
};

export const Inline: Story = {
  render: () => {
    return (
      <div className="p-8 flex min-h-[560px] items-start justify-center">
        <Command className="max-w-lg rounded-panel border shadow-soft">
          <RefinePaletteItems />
        </Command>
      </div>
    );
  },
};
