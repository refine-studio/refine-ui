'use client';

import type { VariantProps } from 'class-variance-authority';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import {
  MENU_CONTENT_CLASS_NAME,
  MENU_INDICATOR_CLASS_NAME,
  MENU_INDICATOR_ITEM_CLASS_NAME,
  MENU_LABEL_CLASS_NAME,
  MENU_SEPARATOR_CLASS_NAME,
  MENU_SHORTCUT_CLASS_NAME,
  menuItemVariants,
} from './menu-styles';

/**
 * Holds the open state of a menu of actions opened from a trigger.
 */
export const DropdownMenu = (props: ComponentProps<typeof DropdownMenuPrimitive.Root>) => {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
};

export const DropdownMenuTrigger = (props: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
};

export const DropdownMenuGroup = (props: ComponentProps<typeof DropdownMenuPrimitive.Group>) => {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
};

export const DropdownMenuRadioGroup = (props: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) => {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
};

export const DropdownMenuSub = (props: ComponentProps<typeof DropdownMenuPrimitive.Sub>) => {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
};

/**
 * Portals the menu panel next to its trigger.
 */
export const DropdownMenuContent = ({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(MENU_CONTENT_CLASS_NAME, 'origin-(--radix-dropdown-menu-content-transform-origin)', className)}
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item> & VariantProps<typeof menuItemVariants>;

/**
 * Runs an action; the `danger` variant marks destructive ones.
 */
export const DropdownMenuItem = ({ className, inset, variant, ...props }: DropdownMenuItemProps) => {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(menuItemVariants({ inset, variant }), className)}
      data-slot="dropdown-menu-item"
      {...props}
    />
  );
};

/**
 * Toggles a setting and shows a check while it is on.
 */
export const DropdownMenuCheckboxItem = ({
  children,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(MENU_INDICATOR_ITEM_CLASS_NAME, className)}
      data-slot="dropdown-menu-checkbox-item"
      {...props}
    >
      <span className={MENU_INDICATOR_CLASS_NAME}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="size-4 text-gem-ink" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
};

/**
 * Picks one option of its radio group and marks it with a dot.
 */
export const DropdownMenuRadioItem = ({
  children,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(MENU_INDICATOR_ITEM_CLASS_NAME, className)}
      data-slot="dropdown-menu-radio-item"
      {...props}
    >
      <span className={MENU_INDICATOR_CLASS_NAME}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="size-2 fill-current text-gem-ink" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
};

export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) => {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(MENU_LABEL_CLASS_NAME, { 'pl-8': inset }, className)}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
};

export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) => {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn(MENU_SEPARATOR_CLASS_NAME, className)}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
};

/**
 * Right-aligns a keyboard shortcut hint inside an item.
 */
export const DropdownMenuShortcut = ({ className, ...props }: ComponentProps<'span'>) => {
  return <span className={cn(MENU_SHORTCUT_CLASS_NAME, className)} data-slot="dropdown-menu-shortcut" {...props} />;
};

/**
 * Opens a nested menu and points at it with a chevron.
 */
export const DropdownMenuSubTrigger = ({
  children,
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(menuItemVariants({ inset }), className)}
      data-slot="dropdown-menu-sub-trigger"
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
};

export const DropdownMenuSubContent = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        className={cn(MENU_CONTENT_CLASS_NAME, 'origin-(--radix-dropdown-menu-content-transform-origin)', className)}
        data-slot="dropdown-menu-sub-content"
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
};
