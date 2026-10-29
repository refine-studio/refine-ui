'use client';

import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { useFieldControl } from '../field/field';
import { inputShellVariants } from '../input/input';

export const Select = SelectPrimitive.Root;

export const SelectGroup = SelectPrimitive.Group;

/**
 * Shows the selected option inside the trigger; Radix drops its className, so the item text styles its own row.
 */
export const SelectValue = (props: ComponentProps<typeof SelectPrimitive.Value>) => {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
};

interface SelectTriggerProps extends ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: 'lg' | 'md' | 'sm';
}

/**
 * Renders the closed select as an input-shaped button that shows the current value and a chevron.
 */
export const SelectTrigger = ({ children, className, size, ...props }: SelectTriggerProps) => {
  const controlProps = useFieldControl(props);

  return (
    <SelectPrimitive.Trigger
      className={cn(
        inputShellVariants({ size }),
        'justify-between text-left outline-none',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20',
        'aria-invalid:border-danger data-placeholder:text-subtle',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60',
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        className,
      )}
      data-slot="select-trigger"
      {...controlProps}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="text-muted-foreground transition-transform duration-200 group-data-[state=open]/input:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

/**
 * Floats the option list in a portal, sized to the trigger, with scroll buttons for long lists.
 */
export const SelectContent = ({
  children,
  className,
  position = 'popper',
  sideOffset = 6,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          // base
          'relative z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-hidden rounded-card border bg-popover text-popover-foreground shadow-float',
          'origin-(--radix-select-content-transform-origin)',
          // animation
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center text-muted-foreground">
          <ChevronUp className="size-4" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center text-muted-foreground">
          <ChevronDown className="size-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

/**
 * Titles a `SelectGroup`.
 */
export const SelectLabel = ({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) => {
  return (
    <SelectPrimitive.Label
      className={cn('eyebrow px-2.5 pt-2.5 pb-1.5 text-muted-foreground', className)}
      data-slot="select-label"
      {...props}
    />
  );
};

/**
 * Renders one option, with a check mark when it is the selected value.
 */
export const SelectItem = ({ children, className, ...props }: ComponentProps<typeof SelectPrimitive.Item>) => {
  return (
    <SelectPrimitive.Item
      className={cn(
        // base
        'relative flex min-h-control-sm w-full cursor-default items-center gap-2 rounded-inner py-1.5 pr-8 pl-2.5 text-body-sm outline-none select-none',
        "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        // hover
        'data-highlighted:bg-hover',
        // selected
        'data-[state=checked]:font-medium',
        // disabled
        'data-disabled:pointer-events-none data-disabled:opacity-45',
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemText>
        {/* Radix strips className from ItemText and portals this span into the trigger, keeping icon and text inline in both. */}
        <span className="flex min-w-0 items-center gap-2 truncate">{children}</span>
      </SelectPrimitive.ItemText>
      <span className="absolute right-2.5 flex items-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="text-gem-ink" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
};

/**
 * Draws a hairline between groups of options.
 */
export const SelectSeparator = ({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) => {
  return (
    <SelectPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-border', className)} data-slot="select-separator" {...props} />
  );
};
