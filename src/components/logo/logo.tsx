import type { ComponentProps } from 'react';

import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '../../lib/cn';
import { MARK_PATHS, REFINE_PATHS } from './logo-paths';

interface LogoProps extends Omit<ComponentProps<'svg'>, 'children'> {
  plate?: boolean;
  segment?: string;
  title?: string;
}

// The segment sits in Geist Regular at the size and baseline of the drawn "Refine", which is Geist Bold.
const SEGMENT_FONT_SIZE = 15.34;
const SEGMENT_X = 87.23;
const SEGMENT_BASELINE = 25.73;
// A segment's width before the font has loaded, as a share of the font size per character.
const SEGMENT_CHARACTER_ESTIMATE = 0.58;
// The plate keeps 10 units of air left of the diamond and 12 right of the segment, as the website badge does.
const PLATE_PADDING_RIGHT = 12;
const PLATE_HEIGHT = 40;

/**
 * Returns the right edge of the segment text, measured once the font has loaded.
 */
const useSegmentRight = (segment: string) => {
  const textRef = useRef<SVGTextElement>(null);
  const [right, setRight] = useState(SEGMENT_X + segment.length * SEGMENT_FONT_SIZE * SEGMENT_CHARACTER_ESTIMATE);

  useLayoutEffect(() => {
    let isCurrent = true;
    const measure = () => {
      const text = textRef.current;

      if (!isCurrent || !text || typeof text.getBBox !== 'function') {
        return;
      }

      const box = text.getBBox();
      setRight(box.x + box.width);
    };

    measure();
    void document.fonts?.ready.then(measure);

    return () => {
      isCurrent = false;
    };
  }, [segment]);

  return { right, textRef };
};

/**
 * Draws the Refine logo: the diamond, "Refine", and a segment name such as Studio, Tick or UI. `plate` sets it on the ink plate of the website badge.
 */
export const Logo = ({ className, plate = false, segment = 'Studio', title, ...props }: LogoProps) => {
  const { right, textRef } = useSegmentRight(segment);
  const width = Math.ceil(right + PLATE_PADDING_RIGHT);
  const viewBox = plate ? `0 0 ${width} ${PLATE_HEIGHT}` : `10 6 ${Math.ceil(right) - 10 + 1} 28`;

  return (
    <svg
      className={cn('h-8 inline-block w-auto', className)}
      data-slot="logo"
      fill="currentColor"
      role="img"
      viewBox={viewBox}
      {...props}
    >
      <title>{title ?? `Refine ${segment}`}</title>
      {plate && <rect className="fill-primary" height={PLATE_HEIGHT} rx="12" width={width} />}
      <g className={cn({ 'fill-primary-foreground': plate })}>
        {[...MARK_PATHS, ...REFINE_PATHS].map((path) => {
          return <path d={path} key={path} />;
        })}
        <text
          className="font-sans"
          fontSize={SEGMENT_FONT_SIZE}
          fontWeight={400}
          ref={textRef}
          x={SEGMENT_X}
          y={SEGMENT_BASELINE}
        >
          {segment}
        </text>
      </g>
    </svg>
  );
};

interface LogoMarkProps extends Omit<ComponentProps<'svg'>, 'children'> {
  title?: string;
}

/**
 * Draws the diamond alone, for tight spaces such as app shells, favicons and avatars.
 */
export const LogoMark = ({ className, title = 'Refine Studio', ...props }: LogoMarkProps) => {
  return (
    <svg
      className={cn('h-8 inline-block w-auto', className)}
      data-slot="logo"
      fill="currentColor"
      role="img"
      viewBox="10 6 21 28"
      {...props}
    >
      <title>{title}</title>
      {MARK_PATHS.map((path) => {
        return <path d={path} key={path} />;
      })}
    </svg>
  );
};
