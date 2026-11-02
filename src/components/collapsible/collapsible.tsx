'use client';

import { ChevronDown } from 'lucide-react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

/**
 * Holds one fold-out section: a trigger that opens and shuts the content under it.
 */
export const Collapsible = ({ className, ...props }: ComponentProps<typeof CollapsiblePrimitive.Root>) => {
  return <CollapsiblePrimitive.Root className={cn('w-full', className)} data-slot="collapsible" {...props} />;
};

/**
 * Toggles its section and turns the chevron to show the state.
 */
export const CollapsibleTrigger = ({
  children,
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Trigger>) => {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        // base
        'group/collapsible flex w-full items-center justify-between gap-4 rounded-control py-4 text-left text-body font-medium transition-colors focus-ring',
        // hover
        'hover:text-gem-ink',
        // disabled
        'disabled:pointer-events-none disabled:opacity-45',
        className,
      )}
      data-slot="collapsible-trigger"
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out-expo group-data-[state=open]/collapsible:rotate-180"
        role="presentation"
      />
    </CollapsiblePrimitive.Trigger>
  );
};

/**
 * Reveals its section with a height animation.
 */
export const CollapsibleContent = ({
  children,
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Content>) => {
  return (
    <CollapsiblePrimitive.Content
      className="overflow-hidden text-body-sm text-muted-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
      data-slot="collapsible-content"
      {...props}
    >
      <div className={cn('pb-4', className)}>{children}</div>
    </CollapsiblePrimitive.Content>
  );
};
