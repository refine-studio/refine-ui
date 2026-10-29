'use client';

import { Popover as PopoverPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

export const FLOATING_ANIMATION_CLASS_NAME = cn(
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
);

/**
 * Holds the open state of a non-modal floating panel anchored to its trigger.
 */
export const Popover = (props: ComponentProps<typeof PopoverPrimitive.Root>) => {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
};

export const PopoverTrigger = (props: ComponentProps<typeof PopoverPrimitive.Trigger>) => {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
};

export const PopoverAnchor = (props: ComponentProps<typeof PopoverPrimitive.Anchor>) => {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
};

export const PopoverClose = (props: ComponentProps<typeof PopoverPrimitive.Close>) => {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
};

/**
 * Portals the floating panel next to its trigger, flipping sides when space runs out.
 */
export const PopoverContent = ({
  align = 'center',
  className,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className={cn(
          // base
          'z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-card border bg-popover p-4 text-popover-foreground shadow-float outline-none',
          // animation
          FLOATING_ANIMATION_CLASS_NAME,
          className,
        )}
        data-slot="popover-content"
        sideOffset={sideOffset}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};
