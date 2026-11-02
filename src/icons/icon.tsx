import type { RefineIconProps } from './create-refine-icon';
import { type IconName, REFINE_ICON_NAMES } from './refine-icon-names';

interface IconProps extends Omit<RefineIconProps, 'name'> {
  name: IconName;
}

/**
 * Draws the Refine icon with this sprite name, so an app can keep icon names in data. It takes the same props as every Refine icon.
 */
export const Icon = ({ name, ...props }: IconProps) => {
  const RefineIcon = REFINE_ICON_NAMES[name];

  return <RefineIcon {...props} />;
};
