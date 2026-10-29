'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import type { Mode } from '../../theme/theme';
import { useTheme } from '../../theme/theme-provider';

const MODE_OPTIONS = [
  {
    icon: Sun,
    label: 'Light',
    value: 'light',
  },
  {
    icon: Moon,
    label: 'Dark',
    value: 'dark',
  },
  {
    icon: Monitor,
    label: 'System',
    value: 'system',
  },
] satisfies {
  icon: typeof Sun;
  label: string;
  value: Mode;
}[];

type ThemeSwitcherProps = Omit<ComponentProps<'div'>, 'defaultValue' | 'dir'>;

/**
 * Lets a person pick light, dark or system mode; the choice writes through `useTheme`, so it applies app-wide and persists.
 */
export const ThemeSwitcher = ({ className, ...props }: ThemeSwitcherProps) => {
  const theme = useTheme();

  return (
    <ToggleGroupPrimitive.Root
      className={cn('inline-flex items-center gap-0.5 rounded-control border border-border bg-muted p-0.5', className)}
      data-slot="theme-switcher"
      onValueChange={(value) => {
        if (value) theme.setTheme({ mode: value as Mode });
      }}
      type="single"
      value={theme.mode}
      {...props}
    >
      {MODE_OPTIONS.map(({ icon: Icon, label, value }) => {
        return (
          <ToggleGroupPrimitive.Item
            className={cn(
              // base
              'inline-flex size-control-xs items-center justify-center rounded-inner text-muted-foreground transition-colors focus-ring',
              // hover
              'hover:text-foreground',
              // active
              'data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-soft',
            )}
            key={value}
            title={label}
            value={value}
          >
            <Icon aria-hidden className="size-3.5" />
            <span className="sr-only">{label}</span>
          </ToggleGroupPrimitive.Item>
        );
      })}
    </ToggleGroupPrimitive.Root>
  );
};
