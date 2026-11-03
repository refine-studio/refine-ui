import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toggle, ToggleGroup, ToggleGroupItem } from './toggle-group';
import { RefineIconBold, RefineIconCalendarDays, RefineIconColumns, RefineIconFileDocument, RefineIconItalic, RefineIconListUnordered, RefineIconMoreGridBig, RefineIconTextAlignLeft, RefineIconUnderline } from '../../icons/refine-icons';

const meta = {
  args: {
    defaultValue: 'week',
    size: 'md',
    type: 'single',
    variant: 'segmented',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'inline-radio',
      options: ['segmented', 'ghost', 'outline'],
    },
  },
  component: ToggleGroup,
  render: (args) => {
    return (
      <ToggleGroup {...args}>
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
        <ToggleGroupItem disabled value="year">
          Year
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
  title: 'Components/Toggle Group',
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ViewSwitcher: Story = {
  render: () => {
    return (
      <div className="grid gap-4">
        {(['sm', 'md', 'lg'] as const).map((size) => {
          return (
            <ToggleGroup defaultValue="list" key={size} size={size} type="single">
              <ToggleGroupItem title="List view" value="list">
                <RefineIconListUnordered />
                List
              </ToggleGroupItem>
              <ToggleGroupItem title="Board view" value="board">
                <RefineIconColumns />
                Board
              </ToggleGroupItem>
              <ToggleGroupItem title="Grid view" value="grid">
                <RefineIconMoreGridBig />
                Grid
              </ToggleGroupItem>
              <ToggleGroupItem title="Calendar view" value="calendar">
                <RefineIconCalendarDays />
                <span className="sr-only">Calendar</span>
              </ToggleGroupItem>
            </ToggleGroup>
          );
        })}
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    return (
      <div className="flex gap-6">
        <ToggleGroup defaultValue={['bold']} type="multiple" variant="ghost">
          <ToggleGroupItem title="Bold" value="bold">
            <RefineIconBold />
            <span className="sr-only">Bold</span>
          </ToggleGroupItem>
          <ToggleGroupItem title="Italic" value="italic">
            <RefineIconItalic />
            <span className="sr-only">Italic</span>
          </ToggleGroupItem>
          <ToggleGroupItem title="Underline" value="underline">
            <RefineIconUnderline />
            <span className="sr-only">Underline</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={['left']} type="multiple" variant="outline">
          <ToggleGroupItem title="Align left" value="left">
            <RefineIconTextAlignLeft />
            <span className="sr-only">Align left</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="wrap">Wrap</ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  },
};

export const SingleToggle: Story = {
  render: () => {
    return (
      <div className="flex gap-3">
        <Toggle defaultPressed variant="outline">
          <RefineIconFileDocument />
          Billable only
        </Toggle>
        <Toggle variant="ghost">Show archived</Toggle>
        <Toggle disabled variant="outline">
          Locked
        </Toggle>
      </div>
    );
  },
};
