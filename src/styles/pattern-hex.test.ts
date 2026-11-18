import { describe, expect, it } from 'vitest';

import { CSS } from './css.test-utils';

type Point = readonly [number, number];

type Segment = readonly [Point, Point];

const UTILITY = CSS.slice(
  CSS.indexOf('@utility pattern-hex {'),
  CSS.indexOf('}', CSS.indexOf('@utility pattern-hex {')),
);

const SVG = decodeURIComponent(/url\("data:image\/svg\+xml,([^"]+)"\)/.exec(UTILITY)?.[1] ?? '');

const VIEW_BOX = (/viewBox='([^']+)'/.exec(SVG)?.[1] ?? '').split(' ').map(Number);

const [VIEW_X, VIEW_Y] = VIEW_BOX;

const WIDTH = VIEW_BOX[2] ?? Number.NaN;

const HEIGHT = VIEW_BOX[3] ?? Number.NaN;

const MASK_SIZE = /mask-size: ([\d.]+)px ([\d.]+)px;/.exec(UTILITY)?.slice(1).map(Number);

const PATH = /\sd='([^']+)'/.exec(SVG)?.[1] ?? '';

/**
 * The side of a pointy-top hexagon whose honeycomb repeats every `HEIGHT` pixels down the tile.
 */
const SIDE = HEIGHT / 3;

/**
 * How far a coordinate may stray from the ideal honeycomb, in pixels, to absorb the path's two decimals.
 */
const TOLERANCE = 0.02;

/**
 * Reads the path's segments by pairing coordinates after each command letter.
 */
const parseSegments = (path: string) => {
  const segments: Segment[] = [];
  let pen: Point = [0, 0];
  for (const [, command, body] of path.matchAll(/([MLHV])([^MLHV]*)/g)) {
    const numbers = ((body ?? '').match(/-?[\d.]+/g) ?? []).map(Number);
    if (command === 'H' || command === 'V') {
      for (const value of numbers) {
        const next: Point = command === 'H' ? [value, pen[1]] : [pen[0], value];
        segments.push([pen, next]);
        pen = next;
      }
      continue;
    }
    for (let index = 0; index < numbers.length; index += 2) {
      const next: Point = [numbers[index] ?? Number.NaN, numbers[index + 1] ?? Number.NaN];
      if (command === 'L' || index > 0) {
        segments.push([pen, next]);
      }
      pen = next;
    }
  }
  return segments;
};

const SEGMENTS = parseSegments(PATH);

/**
 * Rounds a coordinate so that two copies of one point compare equal as a string.
 */
const round = (value: number) => {
  return Math.round(value * 10) / 10;
};

/**
 * Names a point after folding it into the tile, so every copy of one lattice vertex shares a name.
 */
const vertexKey = ([x, y]: Point) => {
  return `${round(((x % WIDTH) + WIDTH) % WIDTH) % WIDTH},${round(((y % HEIGHT) + HEIGHT) % HEIGHT) % HEIGHT}`;
};

/**
 * Names a segment by its two ends, in either direction.
 */
const segmentKey = ([from, to]: Segment) => {
  return [from, to]
    .map(([x, y]) => {return `${round(x)},${round(y)}`})
    .toSorted()
    .join('|');
};

/**
 * Moves a segment so its midpoint lies inside the tile, so every copy of one lattice edge lands on the same segment.
 */
const fold = ([from, to]: Segment): Segment => {
  const shiftX = Math.floor((from[0] + to[0]) / 2 / WIDTH) * WIDTH;
  const shiftY = Math.floor((from[1] + to[1]) / 2 / HEIGHT) * HEIGHT;
  return [
    [from[0] - shiftX, from[1] - shiftY],
    [to[0] - shiftX, to[1] - shiftY],
  ];
};

/**
 * Whether any part of a segment lies strictly inside the tile.
 */
const crossesTile = ([from, to]: Segment) => {
  return (
    Math.max(from[0], to[0]) > 0 &&
    Math.min(from[0], to[0]) < WIDTH &&
    Math.max(from[1], to[1]) > 0 &&
    Math.min(from[1], to[1]) < HEIGHT
  );
};

const EDGES = [...new Map(SEGMENTS.map((segment) => {return [segmentKey(fold(segment)), fold(segment)]})).values()];

describe('pattern-hex', () => {
  it('paints the tile at the size its SVG draws', () => {
    expect([VIEW_X, VIEW_Y]).toEqual([0, 0]);
    expect(MASK_SIZE).toEqual([WIDTH, HEIGHT]);
  });

  it('makes the tile one honeycomb period, √3 sides wide and 3 sides tall', () => {
    expect(Math.abs(WIDTH - Math.sqrt(3) * SIDE)).toBeLessThan(TOLERANCE);
  });

  it('draws with absolute M, L, H and V commands only, which the checks below read', () => {
    expect(PATH).toMatch(/^M[MLHV\d\s.-]+$/);
  });

  it.each(SEGMENTS.map((segment) => {return [segmentKey(segment), segment] as const}))(
    'draws %s one side long',
    (_, segment) => {
      const [[x1, y1], [x2, y2]] = segment;
      expect(Math.abs(Math.hypot(x2 - x1, y2 - y1) - SIDE)).toBeLessThan(TOLERANCE);
    },
  );

  it('holds exactly two hexagons, three edges each', () => {
    expect(EDGES).toHaveLength(6);
  });

  // A lattice vertex with two or four edges is a dead end or a crossing line, the look of a broken tiling.
  it('joins exactly three edges at every vertex', () => {
    const degrees = new Map<string, number>();
    for (const [from, to] of EDGES) {
      for (const point of [from, to]) {
        degrees.set(vertexKey(point), (degrees.get(vertexKey(point)) ?? 0) + 1);
      }
    }
    expect([...degrees.values()]).toEqual([3, 3, 3, 3]);
  });

  // Without the copy beyond the seam, the half of a crossing edge that falls in the next tile goes missing.
  it('draws every edge that crosses a seam on both sides of it', () => {
    const drawn = new Set(SEGMENTS.map(segmentKey));
    for (const [from, to] of EDGES) {
      for (const shiftX of [-WIDTH, 0, WIDTH]) {
        for (const shiftY of [-HEIGHT, 0, HEIGHT]) {
          const copy: Segment = [
            [from[0] + shiftX, from[1] + shiftY],
            [to[0] + shiftX, to[1] + shiftY],
          ];
          if (crossesTile(copy)) {
            expect(drawn).toContain(segmentKey(copy));
          }
        }
      }
    }
  });

  // A line along a seam is cut in half by the tile edge and renders thin or doubled.
  it('runs no line along a seam', () => {
    for (const [[x1, y1], [x2, y2]] of SEGMENTS) {
      expect(x1 === x2 && x1 % WIDTH === 0).toBe(false);
      expect(y1 === y2 && y1 % HEIGHT === 0).toBe(false);
    }
  });
});
