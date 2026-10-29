'use client';

import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Toaster as SonnerToaster } from 'sonner';

import { cn } from '../../lib/cn';
import { Spinner } from '../spinner/spinner';

export { toast } from 'sonner';

/**
 * Mounts the toast stack once per app, styled as Refine popover cards with status-coloured icons.
 */
export const Toaster = ({ className, toastOptions, ...props }: ComponentProps<typeof SonnerToaster>) => {
  return (
    <SonnerToaster
      className={cn('toaster group', className)}
      gap={10}
      icons={{
        error: <CircleAlert className="size-4 text-danger-ink" />,
        info: <Info className="size-4 text-info-ink" />,
        loading: <Spinner className="text-gem-ink" />,
        success: <CircleCheck className="size-4 text-success-ink" />,
        warning: <TriangleAlert className="size-4 text-warning-ink" />,
      }}
      position="bottom-right"
      toastOptions={{
        ...toastOptions,
        classNames: {
          actionButton:
            'ml-auto inline-flex h-control-xs shrink-0 items-center rounded-control bg-primary px-2.5 text-caption font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-ring',
          cancelButton:
            'inline-flex h-control-xs shrink-0 items-center rounded-control bg-secondary px-2.5 text-caption font-medium text-secondary-foreground transition-colors hover:bg-pressed focus-ring',
          closeButton:
            'absolute -top-2 -left-2 flex size-5 items-center justify-center rounded-full border bg-popover text-muted-foreground transition-colors hover:text-foreground focus-ring [&_svg]:size-3',
          content: 'flex min-w-0 flex-col gap-0.5',
          description: 'text-body-sm text-muted-foreground',
          icon: 'mt-0.5 flex size-4 shrink-0 items-center justify-center self-start',
          title: 'text-body-sm font-semibold text-foreground',
          toast:
            'flex w-full items-center gap-3 rounded-card border bg-popover p-4 font-sans text-popover-foreground shadow-float sm:w-(--width)',
          ...toastOptions?.classNames,
        },
        unstyled: true,
      }}
      {...props}
    />
  );
};
