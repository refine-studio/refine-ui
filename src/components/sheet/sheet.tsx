'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Dialog as SheetPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { DIALOG_CLOSE_CLASS_NAME, DIALOG_OVERLAY_CLASS_NAME } from '../dialog/dialog';
import { RefineIconCloseMD } from '../../icons/refine-icons';

const sheetContentVariants = cva(
  [
    // base
    'fixed z-50 flex flex-col bg-popover text-popover-foreground shadow-float outline-none',
    // animation
    'ease-out-expo data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=open]:duration-300',
  ],
  {
    variants: {
      side: {
        right:
          'inset-y-0 right-0 h-full w-[calc(100vw-2rem)] border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        left: 'inset-y-0 left-0 h-full w-[calc(100vw-2rem)] border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        top: 'inset-x-0 top-0 max-h-[85dvh] border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 max-h-[85dvh] rounded-t-panel border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      {
        side: ['left', 'right'],
        size: 'sm',
        className: 'max-w-sm',
      },
      {
        side: ['left', 'right'],
        size: 'md',
        className: 'max-w-lg',
      },
      {
        side: ['left', 'right'],
        size: 'lg',
        className: 'max-w-3xl',
      },
    ],
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  },
);

/**
 * Holds the open state of a panel that slides in from an edge of the screen.
 */
export const Sheet = (props: ComponentProps<typeof SheetPrimitive.Root>) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

export const SheetTrigger = (props: ComponentProps<typeof SheetPrimitive.Trigger>) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};

export const SheetClose = (props: ComponentProps<typeof SheetPrimitive.Close>) => {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
};

interface SheetContentProps
  extends ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {
  showClose?: boolean;
}

/**
 * Portals the sliding panel above a blurred scrim, from the given `side`.
 */
export const SheetContent = ({ children, className, showClose = true, side, size, ...props }: SheetContentProps) => {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className={DIALOG_OVERLAY_CLASS_NAME} data-slot="sheet-overlay" />
      <SheetPrimitive.Content
        className={cn(sheetContentVariants({ side, size }), className)}
        data-slot="sheet-content"
        {...props}
      >
        {children}
        {showClose && (
          <SheetPrimitive.Close className={DIALOG_CLOSE_CLASS_NAME} title="Close">
            <RefineIconCloseMD className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
};

export const SheetHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={cn('flex flex-col gap-1.5 border-b p-6 pr-14', className)} data-slot="sheet-header" {...props} />
  );
};

/**
 * Scrolls the sheet's main content between its header and footer.
 */
export const SheetBody = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={cn('min-h-0 flex-1 overflow-y-auto p-6', className)} data-slot="sheet-body" {...props} />;
};

export const SheetFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('mt-auto flex flex-col-reverse gap-2 border-t p-6 sm:flex-row sm:justify-end', className)}
      data-slot="sheet-footer"
      {...props}
    />
  );
};

export const SheetTitle = ({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) => {
  return (
    <SheetPrimitive.Title
      className={cn('text-headline-sm text-foreground', className)}
      data-slot="sheet-title"
      {...props}
    />
  );
};

export const SheetDescription = ({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) => {
  return (
    <SheetPrimitive.Description
      className={cn('text-body-sm text-muted-foreground', className)}
      data-slot="sheet-description"
      {...props}
    />
  );
};
