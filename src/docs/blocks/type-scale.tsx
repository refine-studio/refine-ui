import { Specimen, Token } from './specimen';

const TYPE_SCALE = [
  ['text-display-2xl', '96 / 1 · 900', 'Diamonds'],
  ['text-display-xl', '72 / 1 · 900', 'Where Diamonds'],
  ['text-display-lg', '56 / 1.05 · 900', 'craft Diamonds.'],
  ['text-display-md', '44 / 1.1 · 900', 'Internal tools, unboxed'],
  ['text-display-sm', '36 / 1.15 · 800', 'Quarterly delivery review'],
  ['text-headline-lg', '28 / 1.2 · 700', 'Project overview'],
  ['text-headline-md', '22 / 1.3 · 700', 'Open pull requests'],
  ['text-headline-sm', '18 / 1.4 · 600', 'Card and section titles'],
  ['text-body-lg', '18 / 1.65', 'Lead paragraphs that introduce a page or a long form.'],
  ['text-body', '15 / 1.6', 'Running text. The default for paragraphs, table cells and descriptions.'],
  ['text-body-sm', '13 / 1.5', 'Controls, dense tables, secondary copy and form hints.'],
  ['text-caption', '12 / 1.4', 'Timestamps, meta data and footnotes.'],
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
