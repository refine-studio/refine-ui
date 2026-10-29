import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeScope } from '../../theme/theme-scope';
import { Logo, LogoMark } from './logo';

const meta = {
  args: {
    plate: false,
    segment: 'Studio',
  },
  argTypes: {
    plate: {
      control: 'boolean',
    },
    segment: {
      control: 'text',
    },
  },
  component: Logo,
  parameters: {
    docs: {
      description: {
        component:
          'Every Refine logo is one pattern: the diamond, **Refine**, and a segment name. **Studio** is the highest segment and the default. A tool or product puts its own name in the segment, such as Tick or UI. The segment is set in the same regular weight and the same colour as Studio. It is never the accent colour. The pattern has two forms: without a container, and on the ink plate with `plate`. Use `LogoMark` for the diamond alone.',
      },
    },
  },
  title: 'Foundations/Logo',
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

const SEGMENTS = [
  {
    segment: 'Studio',
    use: 'Refine Studio, the company. The highest segment and the default.',
  },
  {
    segment: 'Tick',
    use: 'A tool: its own name in the segment.',
  },
  {
    segment: 'UI',
    use: 'This design system.',
  },
] as const;

const SURFACES = [
  {
    label: 'Light',
    mode: 'light',
  },
  {
    label: 'Dark',
    mode: 'dark',
  },
  {
    label: 'On gem',
    mode: 'on-gem',
  },
] as const;

export const Playground: Story = {
  args: {
    className: 'h-12',
  },
};

export const Pattern: Story = {
  render: () => {
    return (
      <div className="gap-8 flex flex-col">
        <div className="gap-10 flex items-center">
          <span className="w-48 shrink-0 eyebrow text-muted-foreground">Without a container</span>
          <span className="w-48 shrink-0 eyebrow text-muted-foreground">With a container</span>
        </div>
        {SEGMENTS.map(({ segment, use }) => {
          return (
            <div className="gap-10 flex items-center" key={segment}>
              <div className="w-48 shrink-0">
                <Logo className="h-10" segment={segment} />
              </div>
              <div className="w-48 shrink-0">
                <Logo className="h-10" plate segment={segment} />
              </div>
              <span className="text-sm text-muted-foreground">{use}</span>
            </div>
          );
        })}
      </div>
    );
  },
};

export const OnEverySurface: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div className="md:grid-cols-3 grid">
        {SURFACES.map(({ label, mode }) => {
          return (
            <ThemeScope className="h-64 gap-6 flex flex-col items-center justify-center" key={mode} mode={mode}>
              <Logo className="h-9" />
              <Logo className="h-9" plate segment="Tick" />
              <span className="eyebrow text-muted-foreground">{label}</span>
            </ThemeScope>
          );
        })}
      </div>
    );
  },
};

export const MarkSizes: Story = {
  render: () => {
    return (
      <div className="gap-6 flex items-end text-foreground">
        {['h-4', 'h-6', 'h-8', 'h-12', 'h-16', 'h-24'].map((size) => {
          return <LogoMark className={size} key={size} />;
        })}
        <LogoMark className="h-24 text-gem" />
      </div>
    );
  },
};
