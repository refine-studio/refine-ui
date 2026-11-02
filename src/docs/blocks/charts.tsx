import { Specimen, Token } from './specimen';

const CHARTS = [
  { fill: 'fill-chart-1', label: 'chart-1', swatch: 'bg-chart-1' },
  { fill: 'fill-chart-2', label: 'chart-2', swatch: 'bg-chart-2' },
  { fill: 'fill-chart-3', label: 'chart-3', swatch: 'bg-chart-3' },
  { fill: 'fill-chart-4', label: 'chart-4', swatch: 'bg-chart-4' },
  { fill: 'fill-chart-5', label: 'chart-5', swatch: 'bg-chart-5' },
  { fill: 'fill-chart-6', label: 'chart-6', swatch: 'bg-chart-6' },
  { fill: 'fill-chart-7', label: 'chart-7', swatch: 'bg-chart-7' },
  { fill: 'fill-chart-8', label: 'chart-8', swatch: 'bg-chart-8' },
] as const;

/**
 * The eight chart colours in the order a chart takes them.
 */
export const ChartSwatches = () => {
  return (
    <Specimen caption="bg-chart-1 … bg-chart-8, also as fill-, stroke- and text-. Take them in order from chart-1.">
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
        {CHARTS.map(({ label, swatch }) => {
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

const SERIES = ['Atlas', 'Beacon', 'Cobalt', 'Delta', 'Ember', 'Fjord', 'Granite', 'Harbor'] as const;

const QUARTERS = [
  { name: 'Q1', shares: [22, 16, 14, 12, 11, 10, 8, 7] },
  { name: 'Q2', shares: [18, 20, 12, 14, 9, 11, 9, 7] },
  { name: 'Q3', shares: [16, 15, 17, 10, 13, 9, 12, 8] },
  { name: 'Q4', shares: [14, 13, 15, 16, 10, 12, 9, 11] },
] as const;

/**
 * The left edge of each segment in a row of percentage shares.
 */
const offsets = (shares: readonly number[]) => {
  return shares.map((_share, index) => {
    return shares.slice(0, index).reduce((sum, share) => {
      return sum + share;
    }, 0);
  });
};

/**
 * A stacked bar chart of revenue mix, so every neighbouring pair of chart colours touches.
 */
export const ChartSample = () => {
  return (
    <Specimen caption="Stacked bars put every neighbouring pair side by side, the hardest case for the order. The legend carries the names, never the colour alone.">
      <figure className="flex flex-col gap-4">
        <figcaption className="text-body-sm font-medium">Revenue mix by client, per quarter</figcaption>
        <div className="flex flex-col gap-3">
          {QUARTERS.map(({ name, shares }) => {
            const lefts = offsets(shares);

            return <ChartSampleRow key={name} lefts={lefts} name={name} shares={shares} />;
          })}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {SERIES.map((series, index) => {
            return (
              <li className="flex items-center gap-1.5 text-body-sm text-muted-foreground" key={series}>
                <span className={`size-2.5 rounded-full ${CHARTS[index]?.swatch ?? ''}`} />
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
  lefts: readonly number[];
  name: string;
  shares: readonly number[];
}

/**
 * One quarter's label and its stacked bar of shares, drawn on a 0–100 axis.
 */
const ChartSampleRow = ({ lefts, name, shares }: ChartSampleRowProps) => {
  const summary = shares
    .map((share, index) => {
      return `${SERIES[index] ?? ''} ${share}%`;
    })
    .join(', ');

  return (
    <div className="flex items-center gap-3">
      <span className="w-6 shrink-0 font-mono text-caption text-muted-foreground">{name}</span>
      <svg
        aria-label={`${name} revenue share by client: ${summary}`}
        className="h-7 w-full"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 100 1"
      >
        {shares.map((share, index) => {
          return (
            <rect
              className={`${CHARTS[index]?.fill ?? ''} stroke-background`}
              height={1}
              key={SERIES[index]}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              width={share}
              x={lefts[index] ?? 0}
              y={0}
            >
              <title>{`${SERIES[index] ?? ''} · ${name} · ${share}%`}</title>
            </rect>
          );
        })}
      </svg>
    </div>
  );
};
