import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

const CELL_RADIUS = 20;
const GAP_FACTOR = 0.92;
const COLUMN_SPACING = CELL_RADIUS * Math.sqrt(3);
const ROW_SPACING = CELL_RADIUS * 1.5;
const TONE_OPACITIES = [0.03, 0.07, 0.12];

// Twelve diagonal bands, each half a second behind the last, turn the 6s keyframe into a travelling wave.
const BAND_DELAY_CLASSES = [
  '[animation-delay:0s]',
  '[animation-delay:-0.5s]',
  '[animation-delay:-1s]',
  '[animation-delay:-1.5s]',
  '[animation-delay:-2s]',
  '[animation-delay:-2.5s]',
  '[animation-delay:-3s]',
  '[animation-delay:-3.5s]',
  '[animation-delay:-4s]',
  '[animation-delay:-4.5s]',
  '[animation-delay:-5s]',
  '[animation-delay:-5.5s]',
];

/**
 * Returns the polygon points of a pointy-top hexagon of `radius` centred on the origin.
 */
const hexagonPoints = (radius: number) => {
  return Array.from(
    {
      length: 6,
    },
    (_, corner) => {
      const angle = (Math.PI / 180) * (60 * corner - 90);

      return `${(radius * Math.cos(angle)).toFixed(2)},${(radius * Math.sin(angle)).toFixed(2)}`;
    },
  ).join(' ');
};

const HEXAGON_POINTS = hexagonPoints(CELL_RADIUS * GAP_FACTOR);

/**
 * Lays out an odd-row-offset grid and gives each cell one of three tones, so no two neighbours share a tone.
 */
const buildCells = (columnCount: number, rowCount: number) => {
  return Array.from(
    {
      length: columnCount * rowCount,
    },
    (_, index) => {
      const row = Math.floor(index / columnCount);
      const column = index % columnCount;
      // Odd-r offset to axial coordinates: (q - r) mod 3 changes across every hex edge, which is a proper 3-colouring.
      const axialQ = column - (row - (row & 1)) / 2;

      return {
        band: (column + row) % BAND_DELAY_CLASSES.length,
        tone: (((axialQ - row) % 3) + 3) % 3,
        x: column * COLUMN_SPACING + (row % 2 === 1 ? COLUMN_SPACING / 2 : 0),
        y: row * ROW_SPACING,
      };
    },
  );
};

interface HexFieldProps extends Omit<ComponentProps<'svg'>, 'children'> {
  animated?: boolean;
  columns?: number;
  fade?: 'bottom' | 'none' | 'radial';
  rows?: number;
}

/**
 * Draws refine.studio's hex grid as light SVG in `currentColor`, three-toned and swept by a slow diagonal wave.
 */
export const HexField = ({
  animated = true,
  className,
  columns = 32,
  fade = 'radial',
  rows = 16,
  ...props
}: HexFieldProps) => {
  const cells = buildCells(columns, rows);
  const width = (columns + 0.5) * COLUMN_SPACING;
  const height = (rows - 1) * ROW_SPACING + CELL_RADIUS * 2;

  return (
    <svg
      aria-hidden
      className={cn(
        'pointer-events-none size-full text-foreground',
        {
          '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]': fade === 'radial',
          'mask-fade-b': fade === 'bottom',
        },
        className,
      )}
      data-slot="hex-field"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      viewBox={`${-COLUMN_SPACING / 2} ${-CELL_RADIUS} ${width} ${height}`}
    {...props}
    >
      {cells.map((cell) => {
        return (
          <polygon
            className={cn({
              [`opacity-60 motion-safe:animate-hex-wave ${BAND_DELAY_CLASSES[cell.band]}`]: animated,
            })}
            fill="currentColor"
            fillOpacity={TONE_OPACITIES[cell.tone]}
            key={`${cell.x}-${cell.y}`}
            points={HEXAGON_POINTS}
            stroke="currentColor"
            strokeOpacity={0.08}
            transform={`translate(${cell.x.toFixed(2)} ${cell.y.toFixed(2)})`}
          />
        );
      })}
    </svg>
  );
};
