import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, FieldDescription, FieldError, FieldLabel } from '../field/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';
import { RefineIconBuilding01, RefineIconBuilding02, RefineIconBuilding03, RefineIconCarAuto } from '../../icons/refine-icons';

const meta = {
  args: {
    disabled: false,
  },
  component: Select,
  decorators: [
    (Story) => {
      return (
        <div className="w-72">
          <Story />
        </div>
      );
    },
  ],
  render: (args) => {
    return (
      <Field>
        <FieldLabel>Tenant</FieldLabel>
        <Select {...args}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a tenant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Automotive</SelectLabel>
              <SelectItem value="acme">
                <RefineIconCarAuto />
                Acme
              </SelectItem>
              <SelectItem value="northwind">
                <RefineIconCarAuto />
                Northwind Motors
              </SelectItem>
              <SelectItem value="fjord">
                <RefineIconCarAuto />
                Fjord Motors
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Manufacturing</SelectLabel>
              <SelectItem value="vela">
                <RefineIconBuilding03 />
                Vela
              </SelectItem>
              <SelectItem value="lumen">
                <RefineIconBuilding03 />
                Lumen
              </SelectItem>
              <SelectItem value="kestrel">
                <RefineIconBuilding03 />
                Kestrel
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Banking</SelectLabel>
              <SelectItem value="orbit-bank">
                <RefineIconBuilding02 />
                Orbit Bank
              </SelectItem>
              <SelectItem disabled value="larch-bank">
                <RefineIconBuilding02 />
                Larch Bank (archived)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription>Switches the data every panel reads from.</FieldDescription>
      </Field>
    );
  },
  title: 'Components/Select',
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: {
    defaultOpen: true,
    defaultValue: 'vela',
  },
  decorators: [
    (Story) => {
      return (
        <div className="h-[30rem]">
          <Story />
        </div>
      );
    },
  ],
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="gap-3 grid">
        {(['sm', 'md', 'lg'] as const).map((size) => {
          return (
            <Select defaultValue="tick" key={size}>
              <SelectTrigger size={size}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tick">Tick · size {size}</SelectItem>
                <SelectItem value="atlas">Atlas · size {size}</SelectItem>
              </SelectContent>
            </Select>
          );
        })}
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div className="gap-5 grid">
        <Field required>
          <FieldLabel>Cost centre</FieldLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose a cost centre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product">
                <RefineIconBuilding01 />
                Product
              </SelectItem>
              <SelectItem value="client">
                <RefineIconBuilding01 />
                Client work
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError>Every entry needs a cost centre.</FieldError>
        </Field>
        <Field disabled>
          <FieldLabel>Region</FieldLabel>
          <Select defaultValue="eu">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eu">EU (Frankfurt)</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    );
  },
};
