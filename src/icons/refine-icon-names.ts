import { type IconName, REFINE_ICON_NAMES as PACKAGE_ICON_NAMES } from '@refine-studio/refine-icons/names';

import { type RefineIconComponent, withRefineWeight } from './with-refine-weight';

export type { IconName };

/**
 * Weighs every package icon once, keyed by its name.
 */
const weighIconNames = (): Record<IconName, RefineIconComponent> => {
  return Object.fromEntries(
    Object.entries(PACKAGE_ICON_NAMES).map(([name, PackageIcon]) => {
      return [name, withRefineWeight(PackageIcon)];
    }),
  ) as Record<IconName, RefineIconComponent>;
};

/** Every Refine icon under its name, at Refine UI's 1.75px line, so an app can keep icon names in data. */
export const REFINE_ICON_NAMES: Record<IconName, RefineIconComponent> = /* @__PURE__ */ weighIconNames();
