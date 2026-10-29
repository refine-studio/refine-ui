'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

export const DIALOG_OVERLAY_CLASS_NAME = cn(
  // base
  'fixed inset-0 z-50 bg-scrim backdrop-blur-sm',
  // animation
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
);

export const DIALOG_CLOSE_CLASS_NAME = cn(
  // base
  'absolute top-4 right-4 inline-flex size-control-sm items-center justify-center rounded-control text-muted-foreground transition-colors focus-ring',
  // hover
  'hover:bg-hover hover:text-foreground',
  // active
  'active:bg-pressed',
  // disabled
  'disabled:pointer-events-none disabled:opacity-45',
);

const dialogContentVariants = cva(
  [
    // base
    'fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden',
    'rounded-panel border bg-popover text-popover-foreground shadow-float outline-none',
    // animation
    'duration-200 ease-out-expo data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Holds the open state of a modal dialog.
 */
export const Dialog = (props: ComponentProps<typeof DialogPrimitive.Root>) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
};

/**
 * Opens the dialog; pass `asChild` to turn any button into the trigger.
 */
export const DialogTrigger = (props: ComponentProps<typeof DialogPrimitive.Trigger>) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

/**
 * Closes the dialog; pass `asChild` to turn any button into the close action.
 */
export const DialogClose = (props: ComponentProps<typeof DialogPrimitive.Close>) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
};

interface DialogContentProps
  extends ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  showClose?: boolean;
}

/**
 * Portals the dialog panel above a blurred scrim, with an optional corner close button.
 */
export const DialogContent = ({ children, className, showClose = true, size, ...props }: DialogContentProps) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={DIALOG_OVERLAY_CLASS_NAME} data-slot="dialog-overlay" />
      <DialogPrimitive.Content
        className={cn(dialogContentVariants({ size }), className)}
        data-slot="dialog-content"
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close className={DIALOG_CLOSE_CLASS_NAME} title="Close">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

/**
 * Stacks the title and description at the top of the panel.
 */
export const DialogHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={cn('flex flex-col gap-1.5 px-6 pt-6 pr-14', className)} data-slot="dialog-header" {...props} />;
};

/**
 * Scrolls the dialog's main content when it outgrows the viewport.
 */
export const DialogBody = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('min-h-0 flex-1 overflow-y-auto px-6 py-4 text-body-sm text-muted-foreground', className)}
      data-slot="dialog-body"
      {...props}
    />
  );
};

/**
 * Right-aligns the dialog's actions, stacking them on narrow screens.
 */
export const DialogFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 border-t bg-muted/50 px-6 py-4 sm:flex-row sm:justify-end',
        className,
      )}
      data-slot="dialog-footer"
      {...props}
    />
  );
};

export const DialogTitle = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) => {
  return (
    <DialogPrimitive.Title
      className={cn('text-headline-sm text-foreground', className)}
      data-slot="dialog-title"
      {...props}
    />
  );
};

export const DialogDescription = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) => {
  return (
    <DialogPrimitive.Description
      className={cn('text-body-sm text-muted-foreground', className)}
      data-slot="dialog-description"
      {...props}
    />
  );
};
