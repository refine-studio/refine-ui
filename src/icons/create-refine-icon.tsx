import type { ComponentProps, SVGProps } from 'react';

import { cn } from '../lib/cn';

export interface RefineIconProps extends ComponentProps<'svg'> {
  size?: number | string;
}

type RefineIconPath = SVGProps<SVGPathElement>;

/**
 * Builds a React icon from one sprite symbol, taking the same `size`, `strokeWidth` and `className` props as a lucide icon.
 */
export const createRefineIcon = (name: string, viewBox: string, paths: RefineIconPath[]) => {
  /**
   * Renders the icon in currentColor at a 1.75 stroke, which matches lucide's visual weight.
   */
  const RefineIcon = ({ className, size = 24, strokeWidth = 1.75, ...props }: RefineIconProps) => {
    return (
      <svg
        aria-hidden="true"
        className={cn('shrink-0', className)}
        data-icon={name}
        data-slot="icon"
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        viewBox={viewBox}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {paths.map((path) => {
          return <path key={path.d} {...path} />;
        })}
      </svg>
    );
  };

  RefineIcon.displayName = `RefineIcon${name.replaceAll('_', '')}`;

  return RefineIcon;
};
