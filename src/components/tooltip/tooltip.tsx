'use client';

import { Tooltip as TooltipPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

/**
 * Shares the hover delay between tooltips, so moving across a toolbar opens the next one instantly.
 */
export const TooltipProvider = ({ delayDuration = 300, ...props }: ComponentProps<typeof TooltipPrimitive.Provider>) => {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
};

/**
 * Holds one tooltip; wraps itself in a provider so it also works on its own.
 */
export const Tooltip = (props: ComponentProps<typeof TooltipPrimitive.Root>) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
};

export const TooltipTrigger = (props: ComponentProps<typeof TooltipPrimitive.Trigger>) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
};

interface TooltipContentProps extends ComponentProps<typeof TooltipPrimitive.Content> {
  showArrow?: boolean;
}

/**
 * Portals a compact ink label beside the trigger; nested `<kbd>` elements render as inverted key caps.
 */
export const TooltipContent = ({
  children,
  className,
  showArrow = false,
  sideOffset = 6,
  ...props
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={cn(
          // base
          'z-50 inline-flex max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-2 rounded-control bg-primary px-2.5 py-1.5 text-caption font-medium text-balance text-primary-foreground',
          '[&_kbd]:rounded-sm [&_kbd]:bg-primary-foreground/15 [&_kbd]:px-1 [&_kbd]:font-mono [&_kbd]:text-caption',
          // animation
          'animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className,
        )}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        {showArrow && <TooltipPrimitive.Arrow className="fill-primary" height={5} width={10} />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};
