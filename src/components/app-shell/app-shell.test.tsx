import { act, cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { mockScreenWidth } from '../../lib/match-media.test-utils';
import { AppShell, AppShellSidebar, AppShellSidebarTrigger, useAppShell } from './app-shell';

const LayoutProbe = () => {
  const { collapsed, isMobile } = useAppShell();

  return <output>{`${isMobile ? 'phone' : 'sidebar'} ${collapsed ? 'collapsed' : 'expanded'}`}</output>;
};

const renderShell = () => {
  return render(
    <AppShell>
      <AppShellSidebar>
        <a href="#track">Track</a>
      </AppShellSidebar>
      <AppShellSidebarTrigger />
      <LayoutProbe />
    </AppShell>,
  );
};

describe('AppShell', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('says it shows the phone layout below md, and follows a resize', () => {
    const screen = mockScreenWidth(30);
    const { getByRole } = renderShell();
    expect(getByRole('status').textContent).toEqual('phone expanded');

    act(() => {
      screen.resize(48);
    });
    expect(getByRole('status').textContent).toEqual('sidebar expanded');
  });

  it('opens the drawer from the trigger in the phone layout', async () => {
    mockScreenWidth(30);
    const user = userEvent.setup();
    const { getByRole, queryByRole } = renderShell();
    expect(queryByRole('dialog')).toBeNull();

    await user.click(getByRole('button', { name: 'Toggle sidebar' }));

    expect(getByRole('dialog', { name: 'Navigation' })).toBeTruthy();
  });

  it('collapses the sidebar from the trigger in the sidebar layout', async () => {
    mockScreenWidth(64);
    const user = userEvent.setup();
    const { getByRole, queryByRole } = renderShell();

    await user.click(getByRole('button', { name: 'Toggle sidebar' }));

    expect(queryByRole('dialog')).toBeNull();
    expect(getByRole('status').textContent).toEqual('sidebar collapsed');
  });
});
