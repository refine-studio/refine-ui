import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeProvider, useTheme } from '../../theme/theme-provider';
import { ThemeSwitcher } from './theme-switcher';

/**
 * Prints the live theme so the story shows what the switcher writes.
 */
const ThemeReadout = () => {
  const theme = useTheme();

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-mono text-caption text-muted-foreground">
      <dt>mode</dt>
      <dd className="text-foreground">
        {theme.mode} ({theme.resolvedMode})
      </dd>
    </dl>
  );
};

const meta = {
  component: ThemeSwitcher,
  decorators: [
    (Story) => {
      return (
        <ThemeProvider mode="light" storageKey={false}>
          <div className="flex flex-col items-start gap-6">
            <Story />
            <ThemeReadout />
          </div>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Writes through `useTheme`, so it needs a `ThemeProvider` above it. In this story it takes over `<html>`, overriding the toolbar until you change a toolbar value.',
      },
    },
  },
  title: 'Components/Theme Switcher',
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
