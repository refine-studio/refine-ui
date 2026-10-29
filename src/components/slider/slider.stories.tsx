import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Field, FieldDescription, FieldLabel } from '../field/field';
import { Slider } from './slider';

const meta = {
  args: {
    defaultValue: [40],
    disabled: false,
    max: 100,
    min: 0,
    step: 1,
  },
  component: Slider,
  decorators: [
    (Story) => {
      return (
        <div className="w-80">
          <Story />
        </div>
      );
    },
  ],
  render: (args) => {
    return (
      <Field>
        <FieldLabel>Canary traffic</FieldLabel>
        <Slider {...args} />
      </Field>
    );
  },
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/**
 * Shows a controlled single-value slider with a live readout.
 */
const SliderRolloutExample = () => {
  const [value, setValue] = useState([25]);

  return (
    <Field>
      <div className="flex items-baseline justify-between">
        <FieldLabel>Rollout to members</FieldLabel>
        <span className="font-mono text-body-sm text-gem-ink tabular-nums">{value[0]}%</span>
      </div>
      <Slider onValueChange={setValue} step={5} value={value} />
      <FieldDescription>Share of Acme members who see the new reward shop.</FieldDescription>
    </Field>
  );
};

export const WithReadout: Story = {
  render: () => {
    return <SliderRolloutExample />;
  },
};

/**
 * Shows a range slider whose two thumbs are named by their own labels.
 */
const SliderRangeExample = () => {
  const [value, setValue] = useState([9, 17]);

  return (
    <div className="gap-3 grid">
      <div className="flex justify-between text-body-sm">
        <span id="core-hours-start">
          Core hours from <strong className="tabular-nums">{value[0]}:00</strong>
        </span>
        <span id="core-hours-end">
          until <strong className="tabular-nums">{value[1]}:00</strong>
        </span>
      </div>
      <Slider
        max={24}
        minStepsBetweenThumbs={1}
        onValueChange={setValue}
        thumbLabelIds={['core-hours-start', 'core-hours-end']}
        value={value}
      />
    </div>
  );
};

export const Range: Story = {
  render: () => {
    return <SliderRangeExample />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
