'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import { DIALOG_OVERLAY_CLASS_NAME } from '../dialog/dialog';

/**
 * Holds the open state of a confirmation that must be answered before the user continues.
 */
export const AlertDialog = (props: ComponentProps<typeof AlertDialogPrimitive.Root>) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
};

export const AlertDialogTrigger = (props: ComponentProps<typeof AlertDialogPrimitive.Trigger>) => {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
};

/**
 * Portals the confirmation panel above a blurred scrim; it cannot be dismissed by clicking outside.
 */
export const AlertDialogContent = ({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Content>) => {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className={DIALOG_OVERLAY_CLASS_NAME} data-slot="alert-dialog-overlay" />
      <AlertDialogPrimitive.Content
        className={cn(
          // base
          'fixed top-1/2 left-1/2 z-50 flex w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-panel border bg-popover p-6 text-popover-foreground shadow-float outline-none',
          // animation
          'duration-200 ease-out-expo data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          className,
        )}
        data-slot="alert-dialog-content"
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
};

/**
 * Lays an optional icon beside the title and description.
 */
export const AlertDialogHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'grid gap-1.5 has-data-[slot=alert-dialog-icon]:grid-cols-[auto_1fr] has-data-[slot=alert-dialog-icon]:gap-x-4',
        className,
      )}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
};

interface AlertDialogIconProps extends ComponentProps<'div'> {
  tone?: 'danger' | 'gem' | 'warning';
}

const ICON_TONE_CLASS_NAME_BY_TONE = {
  danger: 'bg-danger-soft text-danger-ink',
  gem: 'bg-gem-soft text-gem-ink',
  warning: 'bg-warning-soft text-warning-ink',
} satisfies Record<NonNullable<AlertDialogIconProps['tone']>, string>;

/**
 * Frames an icon in a tinted tile that spans the title and description rows.
 */
export const AlertDialogIcon = ({ className, tone = 'danger', ...props }: AlertDialogIconProps) => {
  return (
    <div
      aria-hidden
      className={cn(
        'row-span-2 flex size-10 items-center justify-center rounded-control [&_svg]:size-5',
        ICON_TONE_CLASS_NAME_BY_TONE[tone],
        className,
      )}
      data-slot="alert-dialog-icon"
      role="presentation"
      {...props}
    />
  );
};

export const AlertDialogFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
};

export const AlertDialogTitle = ({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Title>) => {
  return (
    <AlertDialogPrimitive.Title
      className={cn('text-headline-sm text-foreground', className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
};

export const AlertDialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) => {
  return (
    <AlertDialogPrimitive.Description
      className={cn('text-body-sm text-muted-foreground', className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
};

type AlertDialogButtonProps = ComponentProps<typeof Button>;

/**
 * Confirms the action; defaults to the danger button.
 */
export const AlertDialogAction = ({ variant = 'danger', ...props }: AlertDialogButtonProps) => {
  return (
    <AlertDialogPrimitive.Action asChild>
      <Button data-slot="alert-dialog-action" variant={variant} {...props} />
    </AlertDialogPrimitive.Action>
  );
};

/**
 * Dismisses the confirmation; receives focus first so a stray Enter never confirms.
 */
export const AlertDialogCancel = ({ variant = 'outline', ...props }: AlertDialogButtonProps) => {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Button data-slot="alert-dialog-cancel" variant={variant} {...props} />
    </AlertDialogPrimitive.Cancel>
  );
};
