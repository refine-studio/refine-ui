import { addons } from 'storybook/manager-api';

import { refineTheme } from './theme';

addons.setConfig({
  sidebar: {
    showRoots: true,
  },
  theme: refineTheme,
});
