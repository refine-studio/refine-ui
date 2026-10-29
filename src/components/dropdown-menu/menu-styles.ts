import { cva } from 'class-variance-authority';

import { cn } from '../../lib/cn';
import { FLOATING_ANIMATION_CLASS_NAME } from '../popover/popover';

export const MENU_CONTENT_CLASS_NAME = cn(
  // base
  'z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-48 overflow-x-hidden overflow-y-auto rounded-card border bg-popover p-1 text-popover-foreground shadow-float outline-none',
  // animation
  FLOATING_ANIMATION_CLASS_NAME,
);

export const menuItemVariants = cva(
  [
    // base
    'relative flex cursor-default items-center gap-2.5 rounded-control px-2 py-1.5 text-body-sm outline-none select-none',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
    // hover
    'focus:bg-hover data-[state=open]:bg-hover',
    // disabled
    'data-disabled:pointer-events-none data-disabled:opacity-45',
  ],
  {
    variants: {
      variant: {
        default: '',
        danger: 'text-danger-ink focus:bg-danger-soft [&_svg:not([class*="text-"])]:text-danger-ink',
      },
      inset: {
        true: 'pl-8',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inset: false,
    },
  },
);

export const MENU_INDICATOR_ITEM_CLASS_NAME = cn(menuItemVariants(), 'pl-8');

export const MENU_INDICATOR_CLASS_NAME = 'absolute left-2 flex size-4 items-center justify-center';

export const MENU_LABEL_CLASS_NAME = 'px-2 pt-2 pb-1 eyebrow text-subtle';

export const MENU_SEPARATOR_CLASS_NAME = '-mx-1 my-1 h-px bg-border';

export const MENU_SHORTCUT_CLASS_NAME = 'ml-auto pl-4 font-mono text-caption tracking-wide text-subtle';
