'use client';

import { useState } from 'react';

import { Button } from '../../components/button/button';
import { Spinner } from '../../components/spinner/spinner';
import { Specimen, Token } from './specimen';

const SERVICES = ['Strategy', 'Design', 'Development', 'Identity'];

// The list repeats once so the -50% marquee loop is seamless.
const MARQUEE_WORDS = [
  ...SERVICES,
  ...SERVICES.map((word) => {
    return `${word}-copy`;
  }),
];

const EASINGS = [
  ['ease-out-expo', 'cubic-bezier(0.16, 1, 0.3, 1)', 'Default for entrances and state changes.'],
  ['ease-spring', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'A small overshoot for playful, earned moments.'],
] as const;

/**
 * Two tracks that slide a dot with each easing, replayed on click.
 */
export const EasingDemo = () => {
  const [isMoved, setIsMoved] = useState(false);

  return (
    <Specimen>
      <div className="flex flex-col gap-5">
        {EASINGS.map(([className, curve, use]) => {
          return (
            <div className="flex flex-col gap-2" key={className}>
              <div className="flex items-baseline justify-between gap-4">
                <Token className="text-foreground">{className}</Token>
                <Token>{curve}</Token>
              </div>
              <div className="@container relative h-8 rounded-control bg-muted">
                <div
                  className={`absolute top-1 left-1 size-6 rounded-full bg-gem-gradient transition-transform duration-700 ${className} ${
                    isMoved ? 'translate-x-[calc(100cqw-2rem)]' : 'translate-x-0'
                  }`}
                />
              </div>
              <span className="text-caption text-muted-foreground">{use}</span>
            </div>
          );
        })}
        <Button
          className="self-start"
          onClick={() => {
            setIsMoved((current) => {
              return !current;
            });
          }}
          size="sm"
          variant="outline"
        >
          Play
        </Button>
      </div>
    </Specimen>
  );
};

/**
 * One tile per shipped animation, running live.
 */
export const AnimationGallery = () => {
  return (
    <Specimen>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-card border p-4">
          <div className="skeleton-shimmer h-16 animate-shimmer rounded-control" />
          <Token className="text-foreground">animate-shimmer</Token>
          <span className="text-caption text-muted-foreground">Skeletons, with skeleton-shimmer.</span>
        </div>
        <div className="flex flex-col gap-3 rounded-card border p-4">
          <div className="flex h-16 items-center justify-center text-display-sm text-gem-ink">
            <Spinner />
          </div>
          <Token className="text-foreground">animate-facet-spin</Token>
          <span className="text-caption text-muted-foreground">The Spinner. A diamond, of course.</span>
        </div>
        <div className="flex flex-col gap-3 rounded-card border p-4">
          <div className="flex h-16 items-center justify-center gap-3">
            <span className="size-2 animate-twinkle rounded-full bg-foreground" />
            <span className="size-1.5 animate-twinkle rounded-full bg-foreground [animation-delay:1.2s]" />
            <span className="size-2.5 animate-twinkle rounded-full bg-foreground [animation-delay:2.4s]" />
          </div>
          <Token className="text-foreground">animate-twinkle</Token>
          <span className="text-caption text-muted-foreground">Starfields on hero surfaces.</span>
        </div>
        <div className="flex flex-col gap-3 rounded-card border p-4">
          <div className="pattern-hex h-16 animate-hex-wave rounded-control text-gem" />
          <Token className="text-foreground">animate-hex-wave</Token>
          <span className="text-caption text-muted-foreground">Breathing hex grids behind brand moments.</span>
        </div>
        <div className="mask-fade-x flex flex-col gap-3 overflow-hidden rounded-card border p-4">
          <div className="flex h-16 w-max animate-marquee items-center gap-6 text-headline-sm text-muted-foreground">
            {MARQUEE_WORDS.map((word) => {
              return <span key={word}>{word.replace(/-copy$/, '')}</span>;
            })}
          </div>
          <Token className="text-foreground">animate-marquee</Token>
          <span className="text-caption text-muted-foreground">Logo strips. Tune with --marquee-duration.</span>
        </div>
        <RiseTile />
      </div>
    </Specimen>
  );
};

/**
 * Re-mounts a block on click so the rise entrance can be replayed.
 */
const RiseTile = () => {
  const [playCount, setPlayCount] = useState(0);

  return (
    <button
      className="focus-ring flex flex-col gap-3 rounded-card border p-4 text-left hover:bg-hover"
      onClick={() => {
        setPlayCount((count) => {
          return count + 1;
        });
      }}
      type="button"
    >
      <div className="flex h-16 items-center" key={playCount}>
        <span className="animate-rise text-headline-md">Rise ✦</span>
      </div>
      <Token className="text-foreground">animate-rise</Token>
      <span className="text-caption text-muted-foreground">Section entrances. Click to replay.</span>
    </button>
  );
};
