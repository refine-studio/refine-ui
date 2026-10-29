'use client';

import type { VariantProps } from 'class-variance-authority';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { ContextMenu as ContextMenuPrimitive } from 'radix-ui';
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
} from '../dropdown-menu/menu-styles';

/**
 * Holds the open state of a menu of actions opened by right-clicking or long-pressing its trigger area.
 */
export const ContextMenu = (props: ComponentProps<typeof ContextMenuPrimitive.Root>) => {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
};

export const ContextMenuTrigger = (props: ComponentProps<typeof ContextMenuPrimitive.Trigger>) => {
  return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />;
};

export const ContextMenuGroup = (props: ComponentProps<typeof ContextMenuPrimitive.Group>) => {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />;
};

export const ContextMenuRadioGroup = (props: ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) => {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
};

export const ContextMenuSub = (props: ComponentProps<typeof ContextMenuPrimitive.Sub>) => {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
};

/**
 * Portals the menu panel at the pointer.
 */
export const ContextMenuContent = ({ className, ...props }: ComponentProps<typeof ContextMenuPrimitive.Content>) => {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(MENU_CONTENT_CLASS_NAME, 'origin-(--radix-context-menu-content-transform-origin)', className)}
        data-slot="context-menu-content"
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
};

type ContextMenuItemProps = ComponentProps<typeof ContextMenuPrimitive.Item> & VariantProps<typeof menuItemVariants>;

/**
 * Runs an action; the `danger` variant marks destructive ones.
 */
export const ContextMenuItem = ({ className, inset, variant, ...props }: ContextMenuItemProps) => {
  return (
    <ContextMenuPrimitive.Item
      className={cn(menuItemVariants({ inset, variant }), className)}
      data-slot="context-menu-item"
      {...props}
    />
  );
};

/**
 * Toggles a setting and shows a check while it is on.
 */
export const ContextMenuCheckboxItem = ({
  children,
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) => {
  return (
    <ContextMenuPrimitive.CheckboxItem
      className={cn(MENU_INDICATOR_ITEM_CLASS_NAME, className)}
      data-slot="context-menu-checkbox-item"
      {...props}
    >
      <span className={MENU_INDICATOR_CLASS_NAME}>
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="size-4 text-gem-ink" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
};

/**
 * Picks one option of its radio group and marks it with a dot.
 */
export const ContextMenuRadioItem = ({
  children,
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.RadioItem>) => {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(MENU_INDICATOR_ITEM_CLASS_NAME, className)}
      data-slot="context-menu-radio-item"
      {...props}
    >
      <span className={MENU_INDICATOR_CLASS_NAME}>
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="size-2 fill-current text-gem-ink" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
};

export const ContextMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) => {
  return (
    <ContextMenuPrimitive.Label
      className={cn(MENU_LABEL_CLASS_NAME, { 'pl-8': inset }, className)}
      data-slot="context-menu-label"
      {...props}
    />
  );
};

export const ContextMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Separator>) => {
  return (
    <ContextMenuPrimitive.Separator
      className={cn(MENU_SEPARATOR_CLASS_NAME, className)}
      data-slot="context-menu-separator"
      {...props}
    />
  );
};

/**
 * Right-aligns a keyboard shortcut hint inside an item.
 */
export const ContextMenuShortcut = ({ className, ...props }: ComponentProps<'span'>) => {
  return <span className={cn(MENU_SHORTCUT_CLASS_NAME, className)} data-slot="context-menu-shortcut" {...props} />;
};

/**
 * Opens a nested menu and points at it with a chevron.
 */
export const ContextMenuSubTrigger = ({
  children,
  className,
  inset,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) => {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(menuItemVariants({ inset }), className)}
      data-slot="context-menu-sub-trigger"
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
};

export const ContextMenuSubContent = ({
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.SubContent>) => {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        className={cn(MENU_CONTENT_CLASS_NAME, 'origin-(--radix-context-menu-content-transform-origin)', className)}
        data-slot="context-menu-sub-content"
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
};
