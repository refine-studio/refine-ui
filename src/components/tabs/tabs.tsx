'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { type ComponentProps, createContext, use } from 'react';

import { cn } from '../../lib/cn';

type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>['variant']>;

const tabsListVariants = cva(
  [
    // base
    'inline-flex w-fit shrink-0 items-center text-muted-foreground',
  ],
  {
    variants: {
      variant: {
        underline: 'gap-6 border-b',
        pill: 'gap-1',
        segmented: 'gap-0.5 rounded-control bg-muted p-0.5',
      },
    },
    defaultVariants: {
      variant: 'underline',
    },
  },
);

const tabsTriggerVariants = cva(
  [
    // base
    'group/tab relative inline-flex shrink-0 items-center justify-center gap-2 text-body-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] duration-150 focus-ring',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // hover
    'hover:text-foreground',
    // disabled
    'disabled:pointer-events-none disabled:opacity-45',
  ],
  {
    variants: {
      variant: {
        underline: [
          'h-control-md rounded-t-control px-0.5',
          'after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-transparent after:transition-colors',
          'data-[state=active]:text-foreground data-[state=active]:after:bg-gem',
        ],
        pill: [
          'h-control-sm rounded-full px-3.5',
          'hover:bg-hover',
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
        ],
        segmented: [
          'h-[calc(var(--spacing-control-sm)-0.25rem)] flex-1 rounded-inner px-3',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-soft',
        ],
      },
    },
    defaultVariants: {
      variant: 'underline',
    },
  },
);

const TabsVariantContext = createContext<TabsVariant>('underline');

/**
 * Holds the active tab; reads `defaultValue` or the controlled `value`.
 */
export const Tabs = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) => {
  return <TabsPrimitive.Root className={cn('flex flex-col gap-4', className)} data-slot="tabs" {...props} />;
};

type TabsListProps = ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>;

/**
 * Lays out the triggers and hands its `variant` down to them.
 */
export const TabsList = ({ className, variant = 'underline', ...props }: TabsListProps) => {
  return (
    <TabsVariantContext value={variant ?? 'underline'}>
      <TabsPrimitive.List
        className={cn(tabsListVariants({ variant }), className)}
        data-slot="tabs-list"
        data-variant={variant}
        {...props}
      />
    </TabsVariantContext>
  );
};

interface TabsTriggerProps extends ComponentProps<typeof TabsPrimitive.Trigger> {
  count?: number | string;
}

/**
 * Activates its panel; an optional `count` renders as a small tally after the label.
 */
export const TabsTrigger = ({ children, className, count, ...props }: TabsTriggerProps) => {
  const variant = use(TabsVariantContext);

  return (
    <TabsPrimitive.Trigger
      className={cn(tabsTriggerVariants({ variant }), className)}
      data-slot="tabs-trigger"
      {...props}
    >
      {children}
      {count !== undefined && (
        <span
          className={cn(
            'min-w-5 rounded-full bg-muted px-1.5 text-center font-mono text-caption tabular-nums text-muted-foreground transition-colors',
            {
              'group-data-[state=active]/tab:bg-gem-soft group-data-[state=active]/tab:text-gem-ink': variant !== 'pill',
              'group-data-[state=active]/tab:bg-primary-foreground/15 group-data-[state=active]/tab:text-primary-foreground':
                variant === 'pill',
            },
          )}
        >
          {count}
        </span>
      )}
    </TabsPrimitive.Trigger>
  );
};

export const TabsContent = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content
      className={cn('flex-1 outline-none focus-ring', className)}
      data-slot="tabs-content"
      {...props}
    />
  );
};
