import { type IconName, REFINE_ICON_NAMES as PACKAGE_ICON_NAMES } from '@refine-studio/refine-icons/names';

import { withRefineWeight } from './with-refine-weight';

export type { IconName };

/**
 * Weighs every package icon once, keyed by its name.
 */
const weighIconNames = () => {
  return Object.fromEntries(
    Object.entries(PACKAGE_ICON_NAMES).map(([name, PackageIcon]) => {
      return [name, withRefineWeight(PackageIcon)];
    }),
  ) as Record<IconName, ReturnType<typeof withRefineWeight>>;
};

/** Every Refine icon under its name, at Refine UI's 1.75px line, so an app can keep icon names in data. */
export const REFINE_ICON_NAMES = /* @__PURE__ */ weighIconNames();
