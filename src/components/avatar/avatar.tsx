import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { Children, type ComponentProps } from 'react';

import { cn } from '../../lib/cn';

export const avatarVariants = cva(
  [
    // base
    'relative inline-flex shrink-0 items-center justify-center bg-muted font-semibold text-muted-foreground select-none',
  ],
  {
    variants: {
      size: {
        xs: 'size-6 text-caption',
        sm: 'size-8 text-caption',
        md: 'size-10 text-body-sm',
        lg: 'size-12 text-body',
        xl: 'size-16 text-headline-sm',
      },
      shape: {
        round: 'rounded-full',
        square: 'rounded-control',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'round',
    },
  },
);

const STATUS_CLASS_BY_STATUS = {
  away: 'bg-warning',
  busy: 'bg-danger',
  offline: 'bg-subtle',
  online: 'bg-success',
} satisfies Record<string, string>;

interface AvatarProps
  extends Omit<ComponentProps<typeof AvatarPrimitive.Root>, 'children'>, VariantProps<typeof avatarVariants> {
  alt?: string;
  fallback: string;
  src?: string;
  status?: keyof typeof STATUS_CLASS_BY_STATUS;
}

/**
 * Shows a person's picture, falling back to their initials while it loads or when it fails, with an optional presence dot.
 */
export const Avatar = ({ alt, className, fallback, shape, size, src, status, ...props }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root className={cn(avatarVariants({ shape, size }), className)} data-slot="avatar" {...props}>
      <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
        {src && <AvatarPrimitive.Image alt={alt ?? fallback} className="size-full object-cover" src={src} />}
        <AvatarPrimitive.Fallback className="flex size-full items-center justify-center" delayMs={src ? 400 : 0}>
          {fallback}
        </AvatarPrimitive.Fallback>
      </span>
      {status && (
        <span
          className={cn(
            'absolute right-0 bottom-0 size-[28%] min-h-2 min-w-2 rounded-full ring-2 ring-background',
            STATUS_CLASS_BY_STATUS[status],
          )}
          title={status}
        >
          <span className="sr-only">{status}</span>
        </span>
      )}
    </AvatarPrimitive.Root>
  );
};

interface AvatarGroupProps extends ComponentProps<'div'> {
  max?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
}

/**
 * Stacks avatars with an overlap and collapses everything past `max` into a "+n" counter.
 */
export const AvatarGroup = ({ children, className, max = 4, size, ...props }: AvatarGroupProps) => {
  const avatars = Children.toArray(children);
  const hiddenCount = avatars.length - max;

  return (
    <div
      className={cn('flex items-center -space-x-2 *:ring-2 *:ring-background', className)}
      data-slot="avatar-group"
      {...props}
    >
      {avatars.slice(0, max)}
      {hiddenCount > 0 && (
        <span className={cn(avatarVariants({ size }), 'bg-secondary text-secondary-foreground')} title={`${hiddenCount} more`}>
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};
