'use client';

import { Command as CommandPrimitive } from 'cmdk';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../dialog/dialog';
import { RefineIconSearchMagnifyingGlass } from '../../icons/refine-icons';

/**
 * Filters and navigates a list of commands with the keyboard; use it inline or inside `CommandMenu`.
 */
export const Command = ({ className, ...props }: ComponentProps<typeof CommandPrimitive>) => {
  return (
    <CommandPrimitive
      className={cn('flex size-full flex-col overflow-hidden bg-popover text-popover-foreground', className)}
      data-slot="command"
      {...props}
    />
  );
};

interface CommandMenuProps extends ComponentProps<typeof Dialog> {
  description?: string;
  title?: string;
}

/**
 * Wraps a `Command` palette in a dialog, the ⌘K pattern; the title and description are announced but not shown.
 */
export const CommandMenu = ({
  children,
  description = 'Search for a command to run.',
  title = 'Command palette',
  ...props
}: CommandMenuProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="top-[20dvh] translate-y-0 p-0" showClose={false} size="lg">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <Command className="max-h-[min(32rem,70dvh)]">{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Renders the search field with a leading magnifier.
 */
export const CommandInput = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) => {
  return (
    <div className="flex items-center gap-3 border-b px-4" data-slot="command-input-wrapper">
      <RefineIconSearchMagnifyingGlass
        aria-hidden
        className="size-4 shrink-0 text-muted-foreground"
        role="presentation"
      />
      <CommandPrimitive.Input
        className={cn(
          'flex h-control-xl w-full bg-transparent text-body outline-none placeholder:text-subtle disabled:cursor-not-allowed disabled:opacity-45',
          className,
        )}
        data-slot="command-input"
        {...props}
      />
    </div>
  );
};

export const CommandList = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) => {
  return (
    <CommandPrimitive.List
      className={cn('max-h-96 scroll-py-2 overflow-x-hidden overflow-y-auto p-2', className)}
      data-slot="command-list"
      {...props}
    />
  );
};

/**
 * Shows when nothing matches the query.
 */
export const CommandEmpty = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) => {
  return (
    <CommandPrimitive.Empty
      className={cn('py-10 text-center text-body-sm text-muted-foreground', className)}
      data-slot="command-empty"
      {...props}
    />
  );
};

export const CommandGroup = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) => {
  return (
    <CommandPrimitive.Group
      className={cn(
        'overflow-hidden py-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:eyebrow [&_[cmdk-group-heading]]:text-subtle',
        className,
      )}
      data-slot="command-group"
      {...props}
    />
  );
};

export const CommandSeparator = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>) => {
  return (
    <CommandPrimitive.Separator
      className={cn('-mx-2 my-1 h-px bg-border', className)}
      data-slot="command-separator"
      {...props}
    />
  );
};

/**
 * Runs a command; the highlighted item takes a gem tint.
 */
export const CommandItem = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) => {
  return (
    <CommandPrimitive.Item
      className={cn(
        // base
        'relative flex cursor-default items-center gap-3 rounded-control px-2.5 py-2 text-body-sm outline-none select-none',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        // hover
        'data-[selected=true]:bg-gem-soft data-[selected=true]:text-foreground data-[selected=true]:[&_svg:not([class*="text-"])]:text-gem-ink',
        // disabled
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-45',
        className,
      )}
      data-slot="command-item"
      {...props}
    />
  );
};

/**
 * Right-aligns a keyboard shortcut hint inside an item.
 */
export const CommandShortcut = ({ className, ...props }: ComponentProps<'span'>) => {
  return (
    <span
      className={cn('ml-auto font-mono text-caption tracking-wide text-subtle', className)}
      data-slot="command-shortcut"
      {...props}
    />
  );
};
