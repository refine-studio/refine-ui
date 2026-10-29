import type { Decorator, Preview } from '@storybook/react-vite';

import { applyTheme, type ThemeSettings } from '../src/theme/theme';
import { refineTheme } from './theme';

import './preview.css';

/**
 * Applies the toolbar theme to `<html>`, so portalled overlays such as dialogs and menus pick it up too.
 */
const withRefineTheme: Decorator = (Story, context) => {
  applyTheme(document.documentElement, context.globals as ThemeSettings);

  return <Story />;
};

const preview: Preview = {
  decorators: [withRefineTheme],
  globalTypes: {
    mode: {
      description: 'Colour mode',
      toolbar: {
        dynamicTitle: true,
        icon: 'mirror',
        items: [
          {
            icon: 'sun',
            title: 'Light',
            value: 'light',
          },
          {
            icon: 'moon',
            title: 'Dark',
            value: 'dark',
          },
        ],
        title: 'Mode',
      },
    },
  },
  initialGlobals: {
    mode: 'light',
  },
  parameters: {
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: refineTheme,
    },
    layout: 'centered',
    options: {
      storySort: {
        order: [
          'Welcome',
          'Foundations',
          ['Principles', 'Logo', 'Colors', 'Typography', 'Shape & Spacing', 'Elevation', 'Motion', 'Modes', 'Icons'],
          'Components',
          'Widgets',
          ['App Shell', 'Page Header', 'Command Menu', 'Tenant Form', 'Settings Screen', 'Sign In Screen'],
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
