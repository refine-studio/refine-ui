import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold, Italic, Link2, Underline } from 'lucide-react';

import { Button } from '../button/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const meta = {
  args: {
    defaultOpen: true,
  },
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Tooltip',
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    return (
      <div className="p-16">
        <Tooltip {...args}>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent showArrow>Syncs every tenant theme from Figma</TooltipContent>
        </Tooltip>
      </div>
    );
  },
};

/**
 * The same tooltip in dark mode: it sits on the dark popover surface, as menus do.
 */
export const DarkMode: Story = {
  globals: {
    mode: 'dark',
  },
  render: Playground.render,
};

export const WithShortcut: Story = {
  render: (args) => {
    return (
      <div className="p-16">
        <Tooltip {...args}>
          <TooltipTrigger asChild>
            <Button variant="gem">Command palette</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Open anywhere
            <kbd>⌘K</kbd>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  },
};

const TOOLBAR_ACTIONS = [
  {
    icon: Bold,
    label: 'Bold',
    shortcut: '⌘B',
  },
  {
    icon: Italic,
    label: 'Italic',
    shortcut: '⌘I',
  },
  {
    icon: Underline,
    label: 'Underline',
    shortcut: '⌘U',
  },
  {
    icon: Link2,
    label: 'Link',
    shortcut: '⌘K',
  },
] as const;

export const Toolbar: Story = {
  args: {
    defaultOpen: false,
  },
  render: () => {
    return (
      <TooltipProvider delayDuration={150}>
        <div className="flex gap-1 rounded-card border bg-card p-1">
          {TOOLBAR_ACTIONS.map(({ icon: Icon, label, shortcut }) => {
            return (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button size="icon-sm" title={label} variant="ghost">
                    <Icon />
                    <span className="sr-only">{label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {label}
                  <kbd>{shortcut}</kbd>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    );
  },
};
