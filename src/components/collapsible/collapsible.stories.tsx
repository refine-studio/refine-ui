import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { ThemeScope } from '../../theme/theme-scope';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { RefineIconChevronRight } from '../../icons/refine-icons';

const meta = {
  component: Collapsible,
  title: 'Components/Collapsible',
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

const Section = (props: Story['args']) => {
  return (
    <Collapsible {...props} className="w-[32rem]">
      <CollapsibleTrigger>Capabilities</CollapsibleTrigger>
      <CollapsibleContent>
        Search, filter and export. Each capability opens its own flows, so the rail stays short until you need it.
      </CollapsibleContent>
    </Collapsible>
  );
};

export const Default: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => {
    return <Section {...args} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: Default.render,
};

/**
 * Shows the section in both modes side by side, whatever the toolbar sets.
 */
export const LightAndDark: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => {
    return (
      <div className="flex gap-6">
        {(['light', 'dark'] as const).map((mode) => {
          return (
            <ThemeScope className="rounded-control p-6" key={mode} mode={mode}>
              <Section {...args} />
            </ThemeScope>
          );
        })}
      </div>
    );
  },
};

/**
 * With `asChild` the trigger renders your own element alone: here an icon-only caret beside a link.
 */
export const CustomTrigger: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => {
    return (
      <Collapsible {...args} className="w-[32rem]">
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button className="group/caret" size="icon-sm" title="Toggle Capabilities" variant="ghost">
              <RefineIconChevronRight className="transition-transform duration-200 ease-out-expo group-data-[state=open]/caret:rotate-90" />
              <span className="sr-only">Toggle Capabilities</span>
            </Button>
          </CollapsibleTrigger>
          <a className="text-body font-medium hover:text-gem-ink" href="#capabilities">
            Capabilities
          </a>
        </div>
        <CollapsibleContent className="pl-9">Search, filter and export.</CollapsibleContent>
      </Collapsible>
    );
  },
};
