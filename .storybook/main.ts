import { defineMain } from '@storybook/react-vite/node';

export default defineMain({
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  staticDirs: ['./public'],
  stories: ['../src/docs/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  viteFinal: (config) => {
    // The library build settings in vite.config.ts would turn Storybook's app build into a library bundle.
    if (config.build) {
      delete config.build.lib;
      delete config.build.rolldownOptions;
    }

    return config;
  },
});
