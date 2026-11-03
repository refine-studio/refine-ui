import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Chip } from './chip';
import { RefineIconCircleCheck, RefineIconCloseCircle, RefineIconRocket, RefineIconTestTube, RefineIconTriangleWarning } from '../../icons/refine-icons';

const VARIANTS = ['neutral', 'gem', 'outline', 'success', 'warning', 'orange', 'danger', 'info', 'violet'] as const;

const meta = {
  args: {
    children: 'live',
    size: 'sm',
    variant: 'success',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
  component: Chip,
  title: 'Components/Chip',
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    icon: <RefineIconCircleCheck />,
  },
};

/**
 * Every tone, in both sizes, as a label and with an icon before it.
 */
export const Tones: Story = {
  render: (args) => {
    return (
      <div className="gap-3 flex flex-col">
        {(['sm', 'md'] as const).map((size) => {
          return [false, true].map((withIcon) => {
            return (
              <div className="gap-2 flex flex-wrap items-center" key={`${size}-${String(withIcon)}`}>
                {VARIANTS.map((variant) => {
                  return (
                    <Chip
                      {...args}
                      icon={withIcon ? <RefineIconRocket /> : undefined}
                      key={variant}
                      size={size}
                      variant={variant}
                    >
                      {variant}
                    </Chip>
                  );
                })}
              </div>
            );
          });
        })}
      </div>
    );
  },
};

/**
 * A status pill in the tone its status carries.
 */
export const Statuses: Story = {
  render: () => {
    return (
      <div className="gap-2 flex flex-wrap items-center">
        <Chip variant="neutral">concept</Chip>
        <Chip variant="warning">explore</Chip>
        <Chip variant="info">building</Chip>
        <Chip icon={<RefineIconTestTube />} variant="violet">
          beta
        </Chip>
        <Chip icon={<RefineIconCircleCheck />} variant="success">
          live
        </Chip>
        <Chip icon={<RefineIconTriangleWarning />} variant="orange">
          at-risk
        </Chip>
        <Chip icon={<RefineIconCloseCircle />} variant="danger">
          churned
        </Chip>
      </div>
    );
  },
};

/**
 * A chip that opens a page: `asChild` hands the look to the link it wraps. Tab to one to see its focus ring.
 */
export const Links: Story = {
  render: () => {
    return (
      <div className="gap-2 flex flex-wrap items-center">
        {['search', 'export', 'billing'].map((name) => {
          return (
            <Chip asChild icon="🔖" key={name} variant="neutral">
              <a href={`#${name}`}>{name}</a>
            </Chip>
          );
        })}
      </div>
    );
  },
};

const FILTERS = [
  {
    label: 'live',
    variant: 'success',
  },
  {
    label: 'beta',
    variant: 'violet',
  },
  {
    label: 'at-risk',
    variant: 'orange',
  },
  {
    label: 'churned',
    variant: 'danger',
  },
] as const;

/**
 * Filter pills a person toggles by click, Enter or Space. A pill that is on carries `aria-pressed` and a full edge.
 */
export const Filters: Story = {
  render: () => {
    const [on, setOn] = useState<string[]>(['live']);

    return (
      <div className="gap-2 flex flex-wrap items-center">
        {FILTERS.map(({ label, variant }) => {
          const pressed = on.includes(label);

          return (
            <Chip
              aria-pressed={pressed}
              key={label}
              onClick={() => {
                setOn(
                  pressed
                    ? on.filter((item) => {
                        return item !== label;
                      })
                    : [...on, label],
                );
              }}
              size="md"
              variant={variant}
            >
              {label}
            </Chip>
          );
        })}
        <Chip disabled onClick={() => {}} size="md" variant="neutral">
          archived
        </Chip>
      </div>
    );
  },
};
