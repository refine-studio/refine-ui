import { create } from 'storybook/theming';

export const refineTheme = create({
  appBg: '#09090b',
  appBorderColor: '#27272a',
  appBorderRadius: 10,
  appContentBg: '#0f0f12',
  barBg: '#0f0f12',
  barHoverColor: '#2dd4bf',
  barSelectedColor: '#2dd4bf',
  base: 'dark',
  brandImage: './refine-ui-logo-dark.svg',
  brandTarget: '_self',
  brandTitle: 'Refine UI',
  brandUrl: './',
  colorPrimary: '#2dd4bf',
  colorSecondary: '#14b8a6',
  fontBase: '"Geist Variable", "Geist", ui-sans-serif, system-ui, sans-serif',
  fontCode: '"Geist Mono Variable", ui-monospace, monospace',
  inputBorderRadius: 8,
  textColor: '#fafafa',
  textMutedColor: '#a1a1aa',
});
