import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/cn';

const TREND_CLASS_BY_TREND = {
  down: 'bg-danger-soft text-danger-ink',
  flat: 'bg-muted text-muted-foreground',
  up: 'bg-success-soft text-success-ink',
} satisfies Record<string, string>;

const TREND_ICON_BY_TREND = {
  down: ArrowDownRight,
  flat: Minus,
  up: ArrowUpRight,
} satisfies Record<keyof typeof TREND_CLASS_BY_TREND, typeof Minus>;

interface StatProps extends Omit<ComponentProps<'div'>, 'children'> {
  delta?: ReactNode;
  index?: string;
  label: ReactNode;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  sparkline?: ReactNode;
  trend?: keyof typeof TREND_CLASS_BY_TREND;
  unit?: ReactNode;
  value: ReactNode;
}

const VALUE_CLASS_BY_SIZE = {
  lg: 'text-display-md',
  md: 'text-display-sm',
  sm: 'text-headline-lg',
  xs: 'text-headline-md',
} satisfies Record<NonNullable<StatProps['size']>, string>;

/**
 * An editorial figure: a mono index and label above a heavy tabular number, with an optional trend delta on a tinted pill and sparkline.
 */
export const Stat = ({
  className,
  delta,
  index,
  label,
  size = 'md',
  sparkline,
  trend = 'flat',
  unit,
  value,
  ...props
}: StatProps) => {
  const TrendIcon = TREND_ICON_BY_TREND[trend];

  return (
    <div className={cn('min-w-0 gap-3 flex flex-col', className)} data-slot="stat" {...props}>
      <div className="gap-2 flex items-baseline text-muted-foreground">
        {index && <span className="eyebrow text-gem-ink">{index}</span>}
        <span className="truncate eyebrow">{label}</span>
      </div>
      <div className="gap-4 flex items-end justify-between">
        <p className={cn('font-black tracking-tight font-display tabular-nums', VALUE_CLASS_BY_SIZE[size])}>
          {value}
          {unit && <span className="ml-1 font-semibold tracking-normal text-body text-muted-foreground">{unit}</span>}
        </p>
        {sparkline && <div className="h-10 w-24 shrink-0 text-gem">{sparkline}</div>}
      </div>
      {delta && (
        <p
          className={cn(
            'gap-1 ps-1.5 pe-2 font-semibold flex w-fit items-center rounded-full text-body-sm tabular-nums',
            TREND_CLASS_BY_TREND[trend],
          )}
        >
          <TrendIcon aria-hidden className="size-4" role="presentation" />
          {delta}
        </p>
      )}
    </div>
  );
};

interface SparklineProps extends Omit<ComponentProps<'svg'>, 'values'> {
  values: number[];
}

/**
 * Draws a minimal line-and-area chart of `values` in the current text colour, scaled to fill its box.
 */
export const Sparkline = ({ className, values, ...props }: SparklineProps) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => {
    return `${(index / Math.max(values.length - 1, 1)) * 100},${36 - ((value - min) / range) * 32}`;
  });

  return (
    <svg
      aria-hidden
      className={cn('size-full overflow-visible', className)}
      data-slot="sparkline"
      preserveAspectRatio="none"
      role="presentation"
      viewBox="0 0 100 40"
      {...props}
    >
      <polygon fill="currentColor" opacity="0.12" points={`0,40 ${points.join(' ')} 100,40`} />
      <polyline
        fill="none"
        points={points.join(' ')}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
