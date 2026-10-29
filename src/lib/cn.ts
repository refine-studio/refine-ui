import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-family': ['font-display'],
    },
    theme: {
      radius: ['inner', 'control', 'card', 'panel'],
      shadow: ['soft', 'float', 'glow'],
      spacing: ['control-xs', 'control-sm', 'control-md', 'control-lg', 'control-xl'],
      text: [
        'display-2xl',
        'display-xl',
        'display-lg',
        'display-md',
        'display-sm',
        'headline-lg',
        'headline-md',
        'headline-sm',
        'body-lg',
        'body',
        'body-sm',
        'caption',
      ],
    },
  },
});

/**
 * Joins class values and resolves Tailwind conflicts, Refine UI's custom tokens included, so the last class wins.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
