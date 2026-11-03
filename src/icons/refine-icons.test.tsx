import * as PackageIcons from '@refine-studio/refine-icons';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';

import * as RefineIcons from './refine-icons';
import { RefineIconBell, RefineIconHeartSolid, RefineIconRocket, RefineIconTestTube } from './refine-icons';

const drawnIconName = (icon: ReactElement) => {
  return render(icon).container.querySelector('svg')?.getAttribute('data-icon');
};

describe('Refine icons', () => {
  it('draws at the 1.75 stroke that matches lucide', () => {
    const { container } = render(<RefineIconBell />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('stroke-width')).toBe('1.75');
    expect(svg?.getAttribute('stroke')).toBe('currentColor');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('takes a stroke width override like a lucide icon', () => {
    const { container } = render(<RefineIconBell strokeWidth={1} />);

    expect(container.querySelector('svg')?.getAttribute('stroke-width')).toBe('1');
  });

  it('keeps its shrink-0 beside an app class', () => {
    const { container } = render(<RefineIconBell className="size-5" />);

    expect(container.querySelector('svg')?.getAttribute('class')).toBe('shrink-0 size-5');
  });

  it('keeps a filled icon filled in currentColor', () => {
    const { container } = render(<RefineIconHeartSolid />);

    expect(container.querySelector('path')?.getAttribute('fill')).toBe('currentColor');
  });

  it('draws the rocket and the test tube from the shared package', () => {
    expect(drawnIconName(<RefineIconRocket />)).toBe('Rocket');
    expect(drawnIconName(<RefineIconTestTube />)).toBe('Test_Tube');
  });

  it('offers every icon the shared package draws, and no other', () => {
    const packageNames = Object.keys(PackageIcons).filter((name) => {
      return name.startsWith('RefineIcon');
    });

    expect(Object.keys(RefineIcons).sort()).toEqual(packageNames.sort());
  });
});
