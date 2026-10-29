import type { Meta, StoryObj } from '@storybook/react-vite';

import { Code, CodeBlock } from './code';

const INSTALL_SNIPPET = `pnpm add @refine-studio/ui

/* app.css */
@import 'tailwindcss';
@import '@refine-studio/ui/styles.css';`;

const meta = {
  args: {
    code: INSTALL_SNIPPET,
    copyable: true,
    title: 'Terminal',
  },
  component: CodeBlock,
  decorators: [
    (Story) => {
      return (
        <div className="w-[36rem]">
          <Story />
        </div>
      );
    },
  ],
  title: 'Components/Code',
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Block: Story = {};

export const WithoutTitle: Story = {
  args: {
    code: "import { Button } from '@refine-studio/ui';",
    title: undefined,
  },
};

export const Inline: Story = {
  render: () => {
    return (
      <p className="text-body text-pretty">
        Scope any subtree with <Code>mode="dark"</Code>, or pass <Code>density="compact"</Code> to{' '}
        <Code>ThemeScope</Code> for a denser table.
      </p>
    );
  },
};
