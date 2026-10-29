import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

export const cardVariants = cva(
  [
    // base
    '@container/card relative flex flex-col overflow-hidden rounded-card border text-card-foreground',
  ],
  {
    variants: {
      variant: {
        default: 'border-border bg-card shadow-soft',
        flat: 'border-border bg-card',
        sunken: 'border-transparent bg-muted',
        gem: 'border-gem/40 bg-gem-soft',
      },
      interactive: {
        true: [
          // base
          'cursor-pointer transition-[transform,box-shadow,border-color] duration-200 ease-out-expo focus-ring',
          // hover
          'hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-float',
          // active
          'active:translate-y-0 active:scale-[0.995]',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  },
);

interface CardProps extends ComponentProps<'div'>, VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

/**
 * A raised surface that groups related content; pass `asChild` with a link and `interactive` to make the whole card clickable.
 */
export const Card = ({ asChild = false, className, interactive, variant, ...props }: CardProps) => {
  const Component = asChild ? Slot.Root : 'div';

  return <Component className={cn(cardVariants({ interactive, variant }), className)} data-slot="card" {...props} />;
};

/**
 * Lays out the eyebrow, title, description and an optional trailing action.
 */
export const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'grid auto-rows-min grid-cols-1 items-start gap-x-4 gap-y-1.5 p-6 pb-0 last:pb-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className,
      )}
      data-slot="card-header"
      {...props}
    />
  );
};

/**
 * Pins a button or menu to the top-right of the header.
 */
export const CardAction = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('col-start-2 row-span-3 row-start-1 self-start justify-self-end', className)}
      data-slot="card-action"
      {...props}
    />
  );
};

/**
 * The mono numbered line above a title, the "01 Services" voice of refine.studio.
 */
export const CardEyebrow = ({ className, ...props }: ComponentProps<'p'>) => {
  return <p className={cn('eyebrow text-muted-foreground', className)} data-slot="card-eyebrow" {...props} />;
};

/**
 * The card's heading.
 */
export const CardTitle = ({ className, ...props }: ComponentProps<'h3'>) => {
  return <h3 className={cn('text-headline-sm text-foreground', className)} data-slot="card-title" {...props} />;
};

/**
 * Supporting copy under the title.
 */
export const CardDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  return (
    <p className={cn('text-body-sm text-pretty text-muted-foreground', className)} data-slot="card-description" {...props} />
  );
};

/**
 * The card's main body.
 */
export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={cn('flex-1 p-6 text-body-sm', className)} data-slot="card-content" {...props} />;
};

/**
 * Actions or meta at the bottom edge, separated by a hairline.
 */
export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex items-center gap-3 border-t px-6 py-4 empty:hidden', className)}
      data-slot="card-footer"
      {...props}
    />
  );
};

/**
 * A full-bleed image or illustration area at the top of the card.
 */
export const CardMedia = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('relative aspect-video overflow-hidden bg-muted *:size-full *:object-cover', className)}
      data-slot="card-media"
      {...props}
    />
  );
};
