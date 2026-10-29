import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Label } from '../label/label';
import { Checkbox } from './checkbox';

const meta = {
  args: {
    disabled: false,
  },
  component: Checkbox,
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => {
    return (
      <div className="gap-3 grid">
        <div className="gap-2 flex items-center">
          <Checkbox id="checkbox-unchecked" />
          <Label htmlFor="checkbox-unchecked">Unchecked</Label>
        </div>
        <div className="gap-2 flex items-center">
          <Checkbox defaultChecked id="checkbox-checked" />
          <Label htmlFor="checkbox-checked">Checked</Label>
        </div>
        <div className="gap-2 flex items-center">
          <Checkbox checked="indeterminate" id="checkbox-indeterminate" />
          <Label htmlFor="checkbox-indeterminate">Indeterminate</Label>
        </div>
        <div className="gap-2 flex items-center">
          <Checkbox aria-invalid id="checkbox-invalid" />
          <Label htmlFor="checkbox-invalid">Invalid</Label>
        </div>
        <div className="gap-2 flex items-center">
          <Checkbox disabled id="checkbox-disabled" />
          <Label htmlFor="checkbox-disabled">Disabled</Label>
        </div>
        <div className="gap-2 flex items-center">
          <Checkbox defaultChecked disabled id="checkbox-disabled-checked" />
          <Label htmlFor="checkbox-disabled-checked">Disabled and checked</Label>
        </div>
      </div>
    );
  },
};

const TENANTS = ['Acme', 'Northwind', 'Vela', 'Lumen'];

/**
 * Derives the parent checkbox state from how many tenants are selected.
 */
const getAllState = (selectedCount: number) => {
  if (selectedCount === 0) return false;

  return selectedCount === TENANTS.length ? true : 'indeterminate';
};

/**
 * Shows a parent checkbox that turns indeterminate while only some tenants are selected.
 */
const CheckboxSelectAllExample = () => {
  const [selected, setSelected] = useState<string[]>(['Acme']);
  const allState = getAllState(selected.length);

  return (
    <div className="gap-3 grid">
      <div className="gap-2 pb-3 flex items-center border-b">
        <Checkbox
          checked={allState}
          id="tenant-all"
          onCheckedChange={(checked) => {
            setSelected(checked === true ? TENANTS : []);
          }}
        />
        <Label htmlFor="tenant-all">Deploy to all tenants</Label>
      </div>
      {TENANTS.map((tenant) => {
        return (
          <div className="gap-2 pl-6 flex items-center" key={tenant}>
            <Checkbox
              checked={selected.includes(tenant)}
              id={`tenant-${tenant}`}
              onCheckedChange={(checked) => {
                setSelected((current) => {
                  return checked === true
                    ? [...current, tenant]
                    : current.filter((item) => {
                        return item !== tenant;
                      });
                });
              }}
            />
            <Label htmlFor={`tenant-${tenant}`}>{tenant}</Label>
          </div>
        );
      })}
    </div>
  );
};

export const SelectAll: Story = {
  render: () => {
    return <CheckboxSelectAllExample />;
  },
};
