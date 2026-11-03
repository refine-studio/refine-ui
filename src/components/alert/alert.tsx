'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps, type ReactNode, useState } from 'react';

import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import {
  RefineIconCircleCheck,
  RefineIconCircleWarning,
  RefineIconCloseMD,
  RefineIconInfo,
  RefineIconSparkles,
  RefineIconTriangleWarning,
} from '../../icons/refine-icons';

export const alertVariants = cva(
  [
    // base
    'relative flex w-full items-start gap-3 rounded-card border p-4 text-body-sm',
    "[&>svg]:mt-0.5 [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-[1.15em]",
  ],
  {
    variants: {
      variant: {
        neutral: 'border-border bg-muted text-foreground [&>svg]:text-muted-foreground',
        gem: 'border-gem/30 bg-gem-soft text-gem-ink',
        info: 'border-info/25 bg-info-soft text-info-ink',
        success: 'border-success/25 bg-success-soft text-success-ink',
        warning: 'border-warning/35 bg-warning-soft text-warning-ink',
        danger: 'border-danger/25 bg-danger-soft text-danger-ink',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
);

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

const ICON_BY_VARIANT = {
  danger: RefineIconCircleWarning,
  gem: RefineIconSparkles,
  info: RefineIconInfo,
  neutral: RefineIconInfo,
  success: RefineIconCircleCheck,
  warning: RefineIconTriangleWarning,
} satisfies Record<AlertVariant, typeof RefineIconInfo>;

interface AlertProps extends ComponentProps<'div'>, VariantProps<typeof alertVariants> {
  action?: ReactNode;
  dismissible?: boolean;
  icon?: ReactNode | false;
  onDismiss?: () => void;
}

/**
 * A callout for status the reader should notice; danger and warning announce themselves as alerts, the rest as status.
 */
export const Alert = ({
  action,
  children,
  className,
  dismissible = false,
  icon,
  onDismiss,
  variant = 'neutral',
  ...props
}: AlertProps) => {
  const [isDismissed, setIsDismissed] = useState(false);
  if (isDismissed) return null;

  const resolvedVariant = variant ?? 'neutral';
  const DefaultIcon = ICON_BY_VARIANT[resolvedVariant];
  const isUrgent = resolvedVariant === 'danger' || resolvedVariant === 'warning';

  /**
   * Hides the alert and tells the owner.
   */
  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      role={isUrgent ? 'alert' : 'status'}
      {...props}
    >
      {icon === undefined ? <DefaultIcon aria-hidden role="presentation" /> : icon}
      <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>
      {action && <div className="flex shrink-0 items-center gap-2 self-center">{action}</div>}
      {dismissible && (
        <Button
          className="-mt-1 -mr-1 text-current"
          size="icon-sm"
          title="Dismiss"
          variant="ghost"
          onClick={handleDismiss}
        >
          <RefineIconCloseMD />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  );
};

/**
 * The alert's heading line.
 */
export const AlertTitle = ({ className, ...props }: ComponentProps<'p'>) => {
  return <p className={cn('font-semibold', className)} data-slot="alert-title" {...props} />;
};

/**
 * The alert's explanatory copy, a step quieter than the title.
 */
export const AlertDescription = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={cn('text-pretty opacity-85 [&_p]:leading-relaxed', className)} data-slot="alert-description" {...props} />
  );
};
