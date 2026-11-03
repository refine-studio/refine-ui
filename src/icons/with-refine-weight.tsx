import type { RefineIconProps } from '@refine-studio/refine-icons';
import type { ReactNode } from 'react';

import { cn } from '../lib/cn';

/** The shared package draws at 2px. Refine UI draws at 1.75px, which matches lucide's weight. */
const REFINE_UI_STROKE_WIDTH = 1.75;

interface PackageIcon {
  (props: RefineIconProps): ReactNode;
  displayName?: string;
}

/**
 * Draws a shared-package icon at Refine UI's 1.75px line and keeps it from shrinking in a flex row. A `strokeWidth` prop still wins.
 */
export const withRefineWeight = (PackageIcon: PackageIcon) => {
  /**
   * Renders the package icon with Refine UI's defaults.
   */
  const RefineIcon = ({ className, strokeWidth = REFINE_UI_STROKE_WIDTH, ...props }: RefineIconProps) => {
    return <PackageIcon className={cn('shrink-0', className)} strokeWidth={strokeWidth} {...props} />;
  };

  RefineIcon.displayName = PackageIcon.displayName;

  return RefineIcon;
};
