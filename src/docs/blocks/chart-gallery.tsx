import type { ReactNode } from 'react';

import { CHARTS } from './charts';
import { Specimen } from './specimen';

interface LegendItem {
  label: string;
  swatch: string;
}

interface ChartFrameProps {
  caption: string;
  children: ReactNode;
  legend: readonly LegendItem[];
  title: string;
}

/**
 * One chart example: a titled figure, the chart itself, and a legend that names every colour.
 */
const ChartFrame = ({ caption, children, legend, title }: ChartFrameProps) => {
  return (
    <Specimen caption={caption}>
      <figure className="flex flex-col gap-4">
        <figcaption className="text-body-sm font-medium">{title}</figcaption>
        {children}
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {legend.map(({ label, swatch }) => {
            return (
              <li className="flex items-center gap-1.5 text-body-sm text-muted-foreground" key={label}>
                <span className={`size-2.5 rounded-full ${swatch}`} />
                {label}
              </li>
            );
          })}
        </ul>
      </figure>
    </Specimen>
  );
};

/**
 * The legend for a chart whose series take the chart colours in order.
 */
const legendFor = (labels: readonly string[]) => {
  return labels.map((label, index) => {
    return {
      label,
      swatch: CHARTS[index]?.swatch ?? '',
    };
  });
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] as const;

const LINES = [
  { name: 'Atlas', values: [12, 16, 15, 21, 24, 23, 28, 31] },
  { name: 'Beacon', values: [20, 18, 22, 20, 19, 23, 22, 25] },
  { name: 'Cobalt', values: [6, 9, 12, 11, 15, 18, 17, 20] },
  { name: 'Delta', values: [26, 24, 21, 18, 17, 14, 12, 10] },
] as const;

const LINE_MAX = 35;

/**
 * The SVG points of one series on a 100 × 40 plot, the first value at the left edge.
 */
const linePoints = (values: readonly number[]) => {
  return values
    .map((value, index) => {
      return `${(index / (values.length - 1)) * 100},${40 - (value / LINE_MAX) * 40}`;
    })
    .join(' ');
};

/**
 * Four series as lines over eight months.
 */
export const LineChartSample = () => {
  const summary = LINES.map(({ name, values }) => {
    return `${name} ${values.join(', ')}`;
  }).join('; ');

  return (
    <ChartFrame
      caption="Lines take chart-1 to chart-4. A 2px stroke is thin, so the legend and a tooltip carry the names."
      legend={legendFor(
        LINES.map(({ name }) => {
          return name;
        }),
      )}
      title="Active projects per client, January to August"
    >
      <svg
        aria-label={`Active projects per month: ${summary}`}
        className="h-48 w-full overflow-visible"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 100 40"
      >
        {[10, 20, 30].map((y) => {
          return (
            <line
              className="stroke-border"
              key={y}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              x1={0}
              x2={100}
              y1={y}
              y2={y}
            />
          );
        })}
        {LINES.map(({ name, values }, index) => {
          return (
            <polyline
              className={CHARTS[index]?.stroke ?? ''}
              fill="none"
              key={name}
              points={linePoints(values)}
              strokeLinejoin="round"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            >
              <title>{`${name}: ${values.join(', ')}`}</title>
            </polyline>
          );
        })}
      </svg>
      <div className="flex justify-between font-mono text-caption text-muted-foreground">
        {MONTHS.map((month) => {
          return <span key={month}>{month}</span>;
        })}
      </div>
    </ChartFrame>
  );
};

const GROUP_SERIES = ['Strategy', 'Design', 'Development'] as const;

const GROUPS = [
  { name: 'Q1', values: [14, 22, 30] },
  { name: 'Q2', values: [18, 20, 34] },
  { name: 'Q3', values: [16, 26, 28] },
  { name: 'Q4', values: [20, 24, 36] },
] as const;

const GROUP_MAX = 40;

/**
 * Three series side by side in each of four quarters.
 */
export const GroupedBarSample = () => {
  const summary = GROUPS.map(({ name, values }) => {
    return `${name}: ${values.join(', ')}`;
  }).join('; ');

  return (
    <ChartFrame
      caption="Grouped bars take chart-1 to chart-3, the slots most charts use."
      legend={legendFor(GROUP_SERIES)}
      title="Hours booked per discipline, per quarter"
    >
      <svg
        aria-label={`Hours per discipline: ${summary}`}
        className="h-48 w-full"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 100 40"
      >
        {GROUPS.map(({ name, values }, group) => {
          return values.map((value, index) => {
            const height = (value / GROUP_MAX) * 40;

            return (
              <rect
                className={CHARTS[index]?.fill ?? ''}
                height={height}
                key={`${name}-${GROUP_SERIES[index] ?? ''}`}
                width={6}
                x={group * 25 + 3.5 + index * 6.5}
                y={40 - height}
              >
                <title>{`${GROUP_SERIES[index] ?? ''} · ${name} · ${value} h`}</title>
              </rect>
            );
          });
        })}
      </svg>
      <div className="grid grid-cols-4 text-center font-mono text-caption text-muted-foreground">
        {GROUPS.map(({ name }) => {
          return <span key={name}>{name}</span>;
        })}
      </div>
    </ChartFrame>
  );
};

const SLICES = [
  { name: 'Retail', share: 28 },
  { name: 'Banking', share: 22 },
  { name: 'Automotive', share: 18 },
  { name: 'Energy', share: 14 },
  { name: 'Industry', share: 11 },
  { name: 'Public', share: 7 },
] as const;

/**
 * Six slices of one whole, drawn as dashes on a circle whose circumference is 100.
 */
export const DonutSample = () => {
  const starts = SLICES.map((_slice, index) => {
    return SLICES.slice(0, index).reduce((sum, { share }) => {
      return sum + share;
    }, 0);
  });
  const summary = SLICES.map(({ name, share }) => {
    return `${name} ${share}%`;
  }).join(', ');

  return (
    <ChartFrame
      caption="A donut takes all six colours. Past six slices, group the smallest into Other in muted-foreground."
      legend={SLICES.map(({ name, share }, index) => {
        return {
          label: `${name} ${share}%`,
          swatch: CHARTS[index]?.swatch ?? '',
        };
      })}
      title="Revenue by industry"
    >
      <svg aria-label={`Revenue by industry: ${summary}`} className="size-48 -rotate-90" role="img" viewBox="0 0 42 42">
        {SLICES.map(({ name, share }, index) => {
          return (
            <circle
              className={CHARTS[index]?.stroke ?? ''}
              cx={21}
              cy={21}
              fill="none"
              key={name}
              r={15.9155}
              strokeDasharray={`${share - 0.6} ${100 - share + 0.6}`}
              strokeDashoffset={-(starts[index] ?? 0)}
              strokeWidth={6}
            >
              <title>{`${name} · ${share}%`}</title>
            </circle>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

const AREA_SERIES = ['Retainers', 'Projects', 'Workshops'] as const;

const AREAS = [
  [10, 12, 13, 15, 16, 18, 19, 21],
  [8, 9, 12, 11, 13, 14, 16, 15],
  [3, 4, 3, 5, 6, 5, 7, 8],
] as const;

const AREA_MAX = 50;

/**
 * The SVG points of one stacked band: its upper edge left to right, then the band below it right to left.
 */
const bandPoints = (series: number) => {
  const top = (index: number, upTo: number) => {
    return AREAS.slice(0, upTo + 1).reduce((sum, values) => {
      return sum + (values[index] ?? 0);
    }, 0);
  };
  const point = (index: number, value: number) => {
    return `${(index / (MONTHS.length - 1)) * 100},${40 - (value / AREA_MAX) * 40}`;
  };
  const upper = MONTHS.map((_month, index) => {
    return point(index, top(index, series));
  });
  const lower = MONTHS.map((_month, index) => {
    return point(index, series === 0 ? 0 : top(index, series - 1));
  }).reverse();

  return [...upper, ...lower].join(' ');
};

/**
 * Three series stacked as areas over eight months.
 */
export const StackedAreaSample = () => {
  const summary = AREA_SERIES.map((name, index) => {
    return `${name} ${AREAS[index]?.join(', ') ?? ''}`;
  }).join('; ');

  return (
    <ChartFrame
      caption="Stacked areas take chart-1 to chart-3. A hairline in the background colour separates the bands."
      legend={legendFor(AREA_SERIES)}
      title="Revenue by contract type, January to August (k€)"
    >
      <svg
        aria-label={`Revenue by contract type: ${summary}`}
        className="h-48 w-full"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 100 40"
      >
        {AREA_SERIES.map((name, index) => {
          return (
            <polygon
              className={`${CHARTS[index]?.fill ?? ''} stroke-background`}
              key={name}
              points={bandPoints(index)}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            >
              <title>{`${name}: ${AREAS[index]?.join(', ') ?? ''}`}</title>
            </polygon>
          );
        })}
      </svg>
      <div className="flex justify-between font-mono text-caption text-muted-foreground">
        {MONTHS.map((month) => {
          return <span key={month}>{month}</span>;
        })}
      </div>
    </ChartFrame>
  );
};

const SCATTER_GROUPS = [
  {
    name: 'Small',
    points: [
      [12, 30],
      [18, 26],
      [22, 33],
      [15, 22],
      [28, 28],
      [9, 35],
    ],
  },
  {
    name: 'Mid-size',
    points: [
      [38, 20],
      [45, 24],
      [52, 16],
      [41, 12],
      [58, 21],
      [48, 28],
    ],
  },
  {
    name: 'Enterprise',
    points: [
      [68, 10],
      [75, 14],
      [82, 7],
      [88, 12],
      [72, 4],
      [92, 9],
    ],
  },
] as const;

/**
 * Three groups of points on one plane.
 */
export const ScatterSample = () => {
  const summary = SCATTER_GROUPS.map(({ name, points }) => {
    return `${name}: ${points.length} clients`;
  }).join('; ');

  return (
    <ChartFrame
      caption="Scatter groups take chart-1 to chart-3. Points overlap, so each group also has its own region."
      legend={legendFor(
        SCATTER_GROUPS.map(({ name }) => {
          return name;
        }),
      )}
      title="Project size against margin, by client size"
    >
      <svg aria-label={`Clients by size: ${summary}`} className="h-48 w-full" role="img" viewBox="0 0 100 40">
        <line className="stroke-border" strokeWidth={0.3} x1={0} x2={100} y1={40} y2={40} />
        <line className="stroke-border" strokeWidth={0.3} x1={0} x2={0} y1={0} y2={40} />
        {SCATTER_GROUPS.map(({ name, points }, index) => {
          return points.map(([x, y]) => {
            return (
              <circle className={CHARTS[index]?.fill ?? ''} cx={x} cy={y} key={`${name}-${x}-${y}`} r={1.6}>
                <title>{`${name} · size ${x} · margin ${40 - y}`}</title>
              </circle>
            );
          });
        })}
      </svg>
    </ChartFrame>
  );
};

const LIFECYCLE_LEGEND = [
  { label: 'To do', swatch: 'bg-status-todo' },
  { label: 'In progress', swatch: 'bg-status-doing' },
  { label: 'Done', swatch: 'bg-status-done' },
  { label: 'Ended', swatch: 'bg-status-ended' },
] as const;

const LIFECYCLE_ROWS = [
  {
    name: 'Atlas',
    segments: [
      { className: 'w-4/20 bg-status-todo', count: 4, label: 'To do' },
      { className: 'w-6/20 bg-status-doing in-progress', count: 6, label: 'In progress' },
      { className: 'w-8/20 bg-status-done', count: 8, label: 'Done' },
      { className: 'w-2/20 bg-status-ended', count: 2, label: 'Ended' },
    ],
  },
  {
    name: 'Beacon',
    segments: [
      { className: 'w-7/20 bg-status-todo', count: 7, label: 'To do' },
      { className: 'w-3/20 bg-status-doing in-progress', count: 3, label: 'In progress' },
      { className: 'w-5/20 bg-status-done', count: 5, label: 'Done' },
      { className: 'w-5/20 bg-status-ended', count: 5, label: 'Ended' },
    ],
  },
  {
    name: 'Cobalt',
    segments: [
      { className: 'w-2/20 bg-status-todo', count: 2, label: 'To do' },
      { className: 'w-9/20 bg-status-doing in-progress', count: 9, label: 'In progress' },
      { className: 'w-9/20 bg-status-done', count: 9, label: 'Done' },
      { className: 'w-0 bg-status-ended', count: 0, label: 'Ended' },
    ],
  },
] as const;

/**
 * Ideas per product by lifecycle stage, coloured with the lifecycle tokens instead of the chart colours.
 */
export const LifecycleBarSample = () => {
  return (
    <ChartFrame
      caption="A lifecycle is not a category. Colour it with status-todo, -doing, -done and -ended, never with chart colours. The stripe marks work in progress."
      legend={LIFECYCLE_LEGEND}
      title="Ideas per product, by stage"
    >
      <div className="flex flex-col gap-3">
        {LIFECYCLE_ROWS.map(({ name, segments }) => {
          return (
            <div className="flex items-center gap-3" key={name}>
              <span className="w-14 shrink-0 font-mono text-caption text-muted-foreground">{name}</span>
              <div
                aria-label={`${name}: ${segments
                  .map(({ count, label }) => {
                    return `${label} ${count}`;
                  })
                  .join(', ')}`}
                className="flex h-7 w-full gap-px overflow-hidden rounded-control"
                role="img"
              >
                {segments.map(({ className, count, label }) => {
                  return <div className={className} key={label} title={`${label} · ${count}`} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
};

const DELTAS = [
  { delta: 12, name: 'Revenue' },
  { delta: 7, name: 'Active clients' },
  { delta: -4, name: 'Margin' },
  { delta: -9, name: 'Open invoices' },
  { delta: 3, name: 'Utilisation' },
] as const;

const DELTA_MAX = 15;

/**
 * Change against last quarter, good in success and bad in danger, drawn from a shared zero line.
 */
export const DeltaBarSample = () => {
  return (
    <ChartFrame
      caption="Good and bad are statuses, not categories. Colour a gain with success and a loss with danger, and print the sign."
      legend={[
        { label: 'Better than last quarter', swatch: 'bg-success' },
        { label: 'Worse than last quarter', swatch: 'bg-danger' },
      ]}
      title="Change against last quarter (%)"
    >
      <div className="flex flex-col gap-2">
        {DELTAS.map(({ delta, name }) => {
          const width = (Math.abs(delta) / DELTA_MAX) * 50;
          const isGain = delta > 0;

          return (
            <div className="flex items-center gap-3" key={name}>
              <span className="w-28 shrink-0 text-body-sm text-muted-foreground">{name}</span>
              <svg
                aria-label={`${name}: ${isGain ? '+' : ''}${delta}%`}
                className="h-5 w-full"
                preserveAspectRatio="none"
                role="img"
                viewBox="0 0 100 1"
              >
                <rect
                  className={isGain ? 'fill-success' : 'fill-danger'}
                  height={1}
                  width={width}
                  x={isGain ? 50 : 50 - width}
                  y={0}
                />
                <line
                  className="stroke-foreground"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  x1={50}
                  x2={50}
                  y1={0}
                  y2={1}
                />
              </svg>
              <span
                className={`w-10 shrink-0 text-right font-mono text-caption ${isGain ? 'text-success-ink' : 'text-danger-ink'}`}
              >
                {isGain ? '+' : ''}
                {delta}
              </span>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
};
