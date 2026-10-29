import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';
import type { Density } from './theme';

interface ThemeScopeProps extends ComponentProps<'div'> {
  asChild?: boolean;
  density?: Density;
  mode?: 'dark' | 'light' | 'on-gem';
}

/**
 * Re-themes one subtree — a dark sidebar in a light app, a brand panel on the gem gradient, a compact table — without touching the document theme.
 */
export const ThemeScope = ({ asChild = false, className, density, mode, ...props }: ThemeScopeProps) => {
  const Component = asChild ? Slot.Root : 'div';

  return (
    <Component
      className={cn(
        mode,
        {
          'bg-background text-foreground': mode === 'dark' || mode === 'light',
          'bg-gem-gradient': mode === 'on-gem',
        },
        className,
      )}
      data-density={density}
      data-slot="theme-scope"
      {...props}
    />
  );
};
