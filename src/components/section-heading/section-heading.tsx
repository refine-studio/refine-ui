import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { Eyebrow } from '../eyebrow/eyebrow';

const sectionHeadingTitleVariants = cva(
  [
    // base
    'relative font-display text-balance text-foreground',
  ],
  {
    variants: {
      size: {
        sm: 'font-black text-headline-lg',
        md: 'text-display-sm',
        lg: 'md:text-display-lg text-display-md',
        xl: 'md:text-display-xl text-display-lg',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

const sectionHeadingNumberVariants = cva(
  [
    // base
    'font-black tracking-tighter pointer-events-none absolute font-display leading-none text-muted-foreground/15 tabular-nums select-none dark:text-muted-foreground/25',
  ],
  {
    variants: {
      size: {
        sm: '-top-8 left-0 text-6xl',
        md: '-top-12 left-0 text-8xl',
        lg: '-top-16 left-0 text-9xl',
        xl: '-top-16 left-0 text-9xl',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

interface SectionHeadingProps
  extends Omit<ComponentProps<'div'>, 'title'>, VariantProps<typeof sectionHeadingTitleVariants> {
  align?: 'center' | 'start';
  as?: 'h1' | 'h2' | 'h3';
  description?: ReactNode;
  eyebrow?: ReactNode;
  number?: number | string;
  title: ReactNode;
}

/**
 * Sets a black-weight display headline over a giant faded section number, the way refine.studio numbers its sections.
 */
export const SectionHeading = ({
  align = 'start',
  as: Heading = 'h2',
  className,
  description,
  eyebrow,
  number,
  size,
  title,
  ...props
}: SectionHeadingProps) => {
  const formattedNumber = typeof number === 'number' ? number.toString().padStart(2, '0') : number;

  return (
    <div
      className={cn('gap-4 relative flex flex-col', { 'items-center text-center': align === 'center' }, className)}
      data-slot="section-heading"
      {...props}
    >
      {formattedNumber !== undefined && (
        <span
          aria-hidden
          className={cn(sectionHeadingNumberVariants({ size }), {
            'xl:left-1/2 left-1/2 -translate-x-1/2': align === 'center',
          })}
          role="presentation"
        >
          {formattedNumber}
        </span>
      )}
      {eyebrow && <Eyebrow number={formattedNumber}>{eyebrow}</Eyebrow>}
      <Heading className={sectionHeadingTitleVariants({ size })}>{title}</Heading>
      {description && <p className="relative max-w-[65ch] text-body-lg text-muted-foreground">{description}</p>}
    </div>
  );
};
