'use client';

import { ChevronDown } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

/**
 * Stacks collapsible sections; `type="single"` keeps one open, `type="multiple"` lets several open.
 */
export const Accordion = ({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Root>) => {
  return <AccordionPrimitive.Root className={cn('w-full', className)} data-slot="accordion" {...props} />;
};

export const AccordionItem = ({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) => {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b last:border-b-0', className)}
      data-slot="accordion-item"
      {...props}
    />
  );
};

/**
 * Toggles its section and turns the chevron to show the state.
 */
export const AccordionTrigger = ({ children, className, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          // base
          'group/accordion flex flex-1 items-center justify-between gap-4 rounded-control py-4 text-left text-body font-medium transition-colors focus-ring',
          // hover
          'hover:text-gem-ink',
          // disabled
          'disabled:pointer-events-none disabled:opacity-45',
          className,
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out-expo group-data-[state=open]/accordion:rotate-180"
          role="presentation"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

/**
 * Reveals its section with a height animation.
 */
export const AccordionContent = ({ children, className, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) => {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-body-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      data-slot="accordion-content"
      {...props}
    >
      <div className={cn('pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
};
