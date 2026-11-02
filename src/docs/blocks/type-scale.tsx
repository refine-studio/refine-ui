import { Specimen, Token } from './specimen';

const TYPE_SCALE = [
  ['text-display-2xl', '96 / 1 · heading', 'Diamonds'],
  ['text-display-xl', '72 / 1 · heading', 'Where Diamonds'],
  ['text-display-lg', '56 / 1.05 · heading', 'craft Diamonds.'],
  ['text-display-md', '44 / 1.1 · heading', 'Internal tools, unboxed'],
  ['text-display-sm', '36 / 1.15 · heading', 'Quarterly delivery review'],
  ['text-headline-lg', '28 / 1.2 · heading', 'Project overview'],
  ['text-headline-md', '22 / 1.3 · heading', 'Open pull requests'],
  ['text-headline-sm', '18 / 1.4 · heading', 'Card and section titles'],
  ['text-body-lg', '18 / 1.65', 'Lead paragraphs that introduce a page or a long form.'],
  ['text-body', '15 / 1.6', 'Running text. The default for paragraphs, table cells and descriptions.'],
  ['text-body-sm', '13 / 1.5', 'Controls, dense tables, secondary copy and form hints.'],
  ['text-caption', '12 / 1.4', 'Timestamps, meta data and footnotes.'],
  ['text-micro', '10 / 1.4', 'Dense table cells and chart axis labels.'],
] as const;

/**
 * Renders every step of the type scale with its class and metrics.
 */
export const TypeScale = () => {
  return (
    <Specimen className="p-0">
      <div className="divide-y">
        {TYPE_SCALE.map(([className, metrics, sample]) => {
          return (
            <div className="grid items-baseline gap-2 px-6 py-4 sm:grid-cols-[11rem_1fr]" key={className}>
              <div className="flex flex-col gap-1">
                <Token className="text-foreground">{className}</Token>
                <Token>{metrics}</Token>
              </div>
              <span className={`${className} truncate`}>{sample}</span>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};

/**
 * Shows the two Geist faces side by side.
 */
export const Families = () => {
  return (
    <Specimen>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="eyebrow text-muted-foreground">font-sans · Geist</span>
          <span className="text-display-md">Aa Gg 01</span>
          <span className="text-body-sm text-muted-foreground">Everything you read: UI, prose, headings.</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="eyebrow text-muted-foreground">font-mono · Geist Mono</span>
          <span className="font-mono text-display-md font-medium tracking-tight">Aa Gg 01</span>
          <span className="text-body-sm text-muted-foreground">Code, IDs, eyebrows and numbers in columns.</span>
        </div>
      </div>
    </Specimen>
  );
};

/**
 * Demonstrates the eyebrow utility over a numbered section heading, as on refine.studio.
 */
export const EyebrowSpecimen = () => {
  return (
    <Specimen>
      <div className="flex flex-col gap-3">
        <span className="eyebrow text-gem-ink">01 — Services</span>
        <span className="text-display-sm">Strategy, design, development.</span>
        <Token>eyebrow · mono, 11px, 0.14em tracking, uppercase</Token>
      </div>
    </Specimen>
  );
};

const FIGURES = [
  ['Billable', '1,204.50'],
  ['Internal', '311.75'],
  ['Total', '1,516.25'],
] as const;

/**
 * Compares proportional and tabular figures in a column of numbers.
 */
export const TabularNumbers = () => {
  return (
    <Specimen>
      <div className="grid gap-8 sm:grid-cols-2">
        {(['proportional-nums', 'tabular-nums'] as const).map((numbers) => {
          return (
            <div className="flex flex-col gap-2" key={numbers}>
              <Token className="text-foreground">{numbers}</Token>
              <div className={`flex flex-col text-right text-headline-sm ${numbers}`}>
                {FIGURES.map(([label, value]) => {
                  return (
                    <div className="flex justify-between gap-4" key={label}>
                      <span className="text-body-sm text-muted-foreground">{label}</span>
                      <span>{value} h</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};

/**
 * Sets the same headings at the default heading weight and again with `--heading-weight` raised to 900.
 */
export const HeadingWeight = () => {
  return (
    <Specimen>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Token className="text-foreground">--heading-weight: 700 · default</Token>
          <span className="text-display-sm">Quarterly review</span>
          <span className="text-headline-sm">Card and section titles</span>
        </div>
        <div className="flex flex-col gap-2 [--heading-weight:900]">
          <Token className="text-foreground">--heading-weight: 900</Token>
          <span className="text-display-sm">Quarterly review</span>
          <span className="text-headline-sm">Card and section titles</span>
        </div>
      </div>
    </Specimen>
  );
};

/**
 * Wraps the micro step over several lines so its line height shows.
 */
export const MicroSpecimen = () => {
  return (
    <Specimen>
      <div className="flex flex-col gap-3">
        <p className="max-w-40 text-micro">
          Chart axis labels and dense table cells wrap onto a second line without the lines touching.
        </p>
        <Token>text-micro · 10 px on a 14 px line</Token>
      </div>
    </Specimen>
  );
};

const TEXT_COLOURS = [
  ['text-foreground', 'Billable hours'],
  ['text-muted-foreground', 'Secondary text'],
  ['text-subtle', 'Placeholder or hint'],
  ['text-disabled', 'Archived project'],
] as const;

/**
 * Lists the text colours from strongest to the disabled one, so disabled reads against subtle.
 */
export const TextColours = () => {
  return (
    <Specimen className="p-0">
      <div className="divide-y">
        {TEXT_COLOURS.map(([className, sample]) => {
          return (
            <div className="grid items-baseline gap-2 px-6 py-3 sm:grid-cols-[11rem_1fr]" key={className}>
              <Token className="text-foreground">{className}</Token>
              <span className={`${className} text-body`}>{sample}</span>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};
