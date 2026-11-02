import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

const renderSection = () => {
  return render(
    <Collapsible>
      <CollapsibleTrigger>Capabilities</CollapsibleTrigger>
      <CollapsibleContent>Search and export</CollapsibleContent>
    </Collapsible>,
  );
};

describe('Collapsible', () => {
  afterEach(cleanup);

  it('starts shut and tells a screen reader so', () => {
    const { getByRole, queryByText } = renderSection();

    expect(getByRole('button', { name: 'Capabilities' }).getAttribute('aria-expanded')).toBe('false');
    expect(queryByText('Search and export')).toBeNull();
  });

  it('opens and shuts by mouse', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = renderSection();
    const trigger = getByRole('button', { name: 'Capabilities' });

    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(getByText('Search and export')).toBeTruthy();
    expect(trigger.getAttribute('aria-controls')).toBe(getByText('Search and export').parentElement?.id);

    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens and shuts by keyboard', async () => {
    const user = userEvent.setup();
    const { getByRole } = renderSection();
    const trigger = getByRole('button', { name: 'Capabilities' });

    await user.tab();
    expect(document.activeElement).toBe(trigger);

    await user.keyboard('{Enter}');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    await user.keyboard(' ');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders only the child with asChild, and still opens and shuts', async () => {
    const user = userEvent.setup();
    const { container, getByRole } = render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <button className="caret" type="button">
            Toggle
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>Search and export</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = getByRole('button', { name: 'Toggle' });

    expect(trigger.className).toBe('caret');
    expect(container.querySelector('svg')).toBeNull();

    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    await user.keyboard('{Enter}');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
});
