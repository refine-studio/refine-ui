import type { Meta, StoryObj } from '@storybook/react-vite';

const PATTERNS = [
  {
    className: 'pattern-hex',
    description: 'The hex lattice from the website, masked onto currentColor.',
  },
  {
    className: 'pattern-grid',
    description: 'A 32px blueprint grid for canvases and empty states.',
  },
  {
    className: 'pattern-dots',
    description: 'A 16px dot matrix, quieter than the grid.',
  },
];

const meta = {
  parameters: {
    layout: 'padded',
  },
  tags: ['!autodocs'],
  title: 'Components/Patterns',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const MaskPatterns: Story = {
  render: () => {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {PATTERNS.map(({ className, description }) => {
          return (
            <figure className="flex flex-col gap-3" key={className}>
              <div className="relative h-48 overflow-hidden rounded-card border border-border bg-background">
                <div aria-hidden className={`absolute inset-0 text-foreground/15 ${className}`} role="presentation" />
                <div aria-hidden className={`absolute inset-0 text-gem/50 mask-fade-b ${className}`} role="presentation" />
              </div>
              <figcaption className="flex flex-col gap-1">
                <code className="font-mono text-body-sm">{className}</code>
                <span className="text-caption text-muted-foreground">{description}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    );
  },
};

export const GemSurfaces: Story = {
  render: () => {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex h-56 flex-col justify-end gap-1 rounded-panel bg-gem-gradient p-6 on-gem">
          <code className="font-mono text-body-sm">bg-gem-gradient on-gem</code>
          <span className="text-caption text-muted-foreground">The website&apos;s teal overlay.</span>
        </div>
        <div className="flex h-56 flex-col justify-end gap-1 rounded-panel border border-border bg-background bg-gem-radiance p-6">
          <code className="font-mono text-body-sm">bg-gem-radiance</code>
          <span className="text-caption text-muted-foreground">Two soft light sources for heroes and empty states.</span>
        </div>
      </div>
    );
  },
};

export const GradientText: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-display-xl">
          Break the <span className="text-gem-gradient">boundaries.</span>
        </h2>
        <code className="font-mono text-body-sm text-muted-foreground">text-gem-gradient</code>
      </div>
    );
  },
};

export const Glass: Story = {
  render: () => {
    return (
      <div className="relative h-72 overflow-hidden rounded-panel bg-gem-gradient">
        <div aria-hidden className="absolute inset-0 pattern-hex text-white/30" role="presentation" />
        <div className="absolute inset-x-6 top-6 flex items-center justify-between rounded-card border border-border px-5 py-4 shadow-soft glass">
          <span className="font-display font-black">Refine Studio</span>
          <code className="font-mono text-caption text-muted-foreground">glass</code>
        </div>
      </div>
    );
  },
};
