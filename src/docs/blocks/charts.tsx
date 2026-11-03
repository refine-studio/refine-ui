import { Specimen, Token } from './specimen';

const ROUNDING_BY_ENDS = {
  both: 'rounded-control',
  end: 'rounded-r-control',
  none: '',
  start: 'rounded-l-control',
} as const;

interface ChartBarProps {
  ends: keyof typeof ROUNDING_BY_ENDS;
  label: string;
  percent: number;
  tone: string;
}

/**
 * One bar or bar segment, as wide as its percentage of the track, rounded at the ends that face outward.
 */
export const ChartBar = ({ ends, label, percent, tone }: ChartBarProps) => {
  return (
    <svg aria-label={label} className={`h-full ${ROUNDING_BY_ENDS[ends]} ${tone}`} role="img" width={`${percent}%`}>
      <title>{label}</title>
    </svg>
  );
};

export const CHARTS = [
  { fill: 'fill-chart-1', label: 'chart-1', stroke: 'stroke-chart-1', swatch: 'bg-chart-1' },
  { fill: 'fill-chart-2', label: 'chart-2', stroke: 'stroke-chart-2', swatch: 'bg-chart-2' },
  { fill: 'fill-chart-3', label: 'chart-3', stroke: 'stroke-chart-3', swatch: 'bg-chart-3' },
  { fill: 'fill-chart-4', label: 'chart-4', stroke: 'stroke-chart-4', swatch: 'bg-chart-4' },
] as const;

export const CHART_OTHER = {
  fill: 'fill-chart-other',
  label: 'chart-other',
  stroke: 'stroke-chart-other',
  swatch: 'bg-chart-other',
} as const;

export const CHART_OTHER_LINE = {
  fill: 'fill-chart-other-line',
  label: 'chart-other-line',
  stroke: 'stroke-chart-other-line',
  swatch: 'bg-chart-other-line',
} as const;

/**
 * The four chart steps in the order a chart takes them, then the neutrals for Others and for context lines.
 */
export const ChartSwatches = () => {
  return (
    <Specimen caption="bg-chart-1 … bg-chart-4, bg-chart-other and bg-chart-other-line, also as fill-, stroke- and text-. One ramp of the gem hue, strongest first. chart-1 is the default for a single series.">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {[...CHARTS, CHART_OTHER, CHART_OTHER_LINE].map(({ label, swatch }) => {
          return (
            <div className="flex min-w-0 flex-col gap-1.5" key={label}>
              <div className={`h-14 rounded-control ${swatch}`} />
              <Token className="truncate">{label}</Token>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};

const REFERENCES = [
  { label: 'success', swatch: 'bg-success' },
  { label: 'warning', swatch: 'bg-warning' },
  { label: 'danger', swatch: 'bg-danger' },
  { label: 'info', swatch: 'bg-info' },
] as const;

/**
 * The chart ramp in one strip beside the status colours, so no chart step can pass for a status.
 */
export const ChartStatusStrip = () => {
  return (
    <Specimen caption="Chart colours on the left, status colours on the right. The ramp is one hue, so a category never reads as good, bad or in progress.">
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex gap-1">
          {[...CHARTS, CHART_OTHER].map(({ label, swatch }) => {
            return (
              <div className="flex w-12 flex-col gap-1.5" key={label}>
                <div className={`h-10 rounded-control ${swatch}`} />
                <Token className="truncate">{label.replace('chart-', '')}</Token>
              </div>
            );
          })}
        </div>
        <div className="flex gap-1 border-l pl-6">
          {REFERENCES.map(({ label, swatch }) => {
            return (
              <div className="flex w-14 flex-col gap-1.5" key={label}>
                <div className={`h-10 rounded-control ${swatch}`} />
                <Token className="truncate">{label}</Token>
              </div>
            );
          })}
        </div>
      </div>
    </Specimen>
  );
};

const SERIES = ['Atlas', 'Beacon', 'Cobalt', 'Delta', 'Others'] as const;

const SERIES_COLOURS = [...CHARTS, CHART_OTHER] as const;

const QUARTERS = [
  { name: 'Q1', shares: [32, 24, 18, 12, 14] },
  { name: 'Q2', shares: [30, 26, 17, 13, 14] },
  { name: 'Q3', shares: [34, 22, 19, 11, 14] },
  { name: 'Q4', shares: [31, 25, 16, 14, 14] },
] as const;

/**
 * A stacked bar chart of revenue mix: four ramp steps, strongest first, then Others.
 */
export const ChartSample = () => {
  return (
    <Specimen caption="Stacked bars take at most four steps, strongest first, then Others in chart-other. The legend carries the names, never the colour alone.">
      <figure className="flex flex-col gap-4">
        <figcaption className="text-body-sm font-medium">Revenue mix by client, per quarter</figcaption>
        <div className="flex flex-col gap-3">
          {QUARTERS.map(({ name, shares }) => {
            return <ChartSampleRow key={name} name={name} shares={shares} />;
          })}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {SERIES.map((series, index) => {
            return (
              <li className="flex items-center gap-1.5 text-body-sm text-muted-foreground" key={series}>
                <span className={`size-2.5 rounded-full ${SERIES_COLOURS[index]?.swatch ?? ''}`} />
                {series}
              </li>
            );
          })}
        </ul>
      </figure>
    </Specimen>
  );
};

interface ChartSampleRowProps {
  name: string;
  shares: readonly number[];
}

/**
 * One quarter's label and its stacked bar of shares, rounded only at the outer edges like the lifecycle bars.
 */
const ChartSampleRow = ({ name, shares }: ChartSampleRowProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 shrink-0 font-mono text-caption text-muted-foreground">{name}</span>
      <div className="flex h-7 w-full gap-px overflow-hidden rounded-control">
        {shares.map((share, index) => {
          return (
            <ChartBar
              ends="none"
              key={SERIES[index]}
              label={`${SERIES[index] ?? ''} · ${name} · ${share}%`}
              percent={share}
              tone={SERIES_COLOURS[index]?.swatch ?? ''}
            />
          );
        })}
      </div>
    </div>
  );
};
