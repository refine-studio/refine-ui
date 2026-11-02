import { render } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';

import { Icon } from './icon';
import { RefineIconBell } from './refine-icons';

describe('Icon', () => {
  it('draws the Refine icon with that sprite name', () => {
    const { container } = render(<Icon name="Add_Column" />);

    expect(container.querySelector('svg')?.getAttribute('data-icon')).toBe('Add_Column');
  });

  it('draws the same svg as the icon component', () => {
    const byName = render(<Icon className="size-5" name="Bell" strokeWidth={1} />).container.innerHTML;
    const byComponent = render(<RefineIconBell className="size-5" strokeWidth={1} />).container.innerHTML;

    expect(byName).toBe(byComponent);
  });

  it('takes the size of every Refine icon', () => {
    const { container } = render(<Icon name="Bell" size={16} />);

    expect(container.querySelector('svg')?.getAttribute('width')).toBe('16');
  });

  it('fails the type check on a name the set lacks', () => {
    const props: ComponentProps<typeof Icon> = {
      // @ts-expect-error Not_An_Icon is not a Refine icon name.
      name: 'Not_An_Icon',
    };

    expect(props.name).toBe('Not_An_Icon');
  });
});
