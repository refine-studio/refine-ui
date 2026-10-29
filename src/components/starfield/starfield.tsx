import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';

const VIEW_WIDTH = 1920;
const VIEW_HEIGHT = 480;

interface Star {
  delayIndex: number;
  radius: number;
  twinkles: boolean;
  x: number;
  y: number;
}

/**
 * Returns a deterministic pseudo-random generator, so a given seed always draws the same sky on server and client.
 */
const createRandom = (seed: number) => {
  let state = seed;

  return () => {
    state = (state * 1_664_525 + 1_013_904_223) % 4_294_967_296;

    return state / 4_294_967_296;
  };
};

/**
 * Maps a 0–1 brightness roll to a star radius: mostly specks, some mid stars and a rare bright one.
 */
const radiusFor = (brightness: number) => {
  if (brightness > 0.96) return 2.2;
  if (brightness > 0.8) return 1.4;

  return 0.8;
};

/**
 * Scatters `starCount` stars across the view box, mostly tiny, a few bright, and roughly one in `twinkleEvery` twinkling.
 */
const buildStars = (seed: number, starCount: number, twinkleEvery: number) => {
  const random = createRandom(seed);

  return Array.from(
    {
      length: starCount,
    },
    (_, index): Star => {
      const brightness = random();

      return {
        delayIndex: index % 8,
        radius: radiusFor(brightness),
        twinkles: twinkleEvery > 0 && index % twinkleEvery === 0,
        x: random() * VIEW_WIDTH,
        y: random() * VIEW_HEIGHT,
      };
    },
  );
};

const DELAY_CLASSES = [
  '[animation-delay:0s]',
  '[animation-delay:-0.5s]',
  '[animation-delay:-1s]',
  '[animation-delay:-1.5s]',
  '[animation-delay:-2s]',
  '[animation-delay:-2.5s]',
  '[animation-delay:-3s]',
  '[animation-delay:-3.5s]',
];

interface StarfieldProps extends Omit<ComponentProps<'svg'>, 'children'> {
  density?: number;
  seed?: number;
  twinkleEvery?: number;
}

/**
 * Draws a procedural star field in `currentColor` that covers its parent; set the colour with a text utility.
 */
export const Starfield = ({ className, density = 260, seed = 1688, twinkleEvery = 7, ...props }: StarfieldProps) => {
  const stars = buildStars(seed, density, twinkleEvery);

  return (
    <svg
      aria-hidden
      className={cn('pointer-events-none size-full text-foreground/40', className)}
      data-slot="starfield"
      fill="currentColor"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      {...props}
    >
      {stars.map((star) => {
        return (
          <circle
            className={cn({
              [`motion-safe:animate-twinkle ${DELAY_CLASSES[star.delayIndex]}`]: star.twinkles,
            })}
            cx={star.x.toFixed(1)}
            cy={star.y.toFixed(1)}
            key={`${star.x}-${star.y}`}
            r={star.radius}
          />
        );
      })}
    </svg>
  );
};
