import type { Meta, StoryObj } from '@storybook/react-vite';

import { Marquee } from './marquee';

const CUSTOMERS = [
  'Acme',
  'Globex',
  'Northwind Motors',
  'Lumen',
  'Vela',
  'Orbit Bank',
  'Halden',
  'Fjord Motors',
  'Corvid Energy',
  'Larch Bank',
];

const meta = {
  args: {
    fade: true,
    pauseOnHover: true,
    speed: 'normal',
  },
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
    speed: {
      control: 'inline-radio',
      options: ['slow', 'normal', 'fast'],
    },
  },
  component: Marquee,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Marquee',
} satisfies Meta<typeof Marquee>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CustomerStrip: Story = {
  render: (args) => {
    return (
      <section className="gap-8 py-16 flex flex-col">
        <p className="text-center eyebrow text-muted-foreground">Some of our customers</p>
        <Marquee {...args}>
          {CUSTOMERS.map((customer) => {
            return (
              <span className="font-black font-display text-headline-lg text-muted-foreground/70" key={customer}>
                {customer}
              </span>
            );
          })}
        </Marquee>
      </section>
    );
  },
};

export const OpposingRows: Story = {
  render: (args) => {
    return (
      <div className="gap-4 py-12 flex flex-col">
        {(['left', 'right'] as const).map((direction) => {
          return (
            <Marquee {...args} direction={direction} key={direction} speed="slow">
              {['Strategy', 'Design', 'Development', 'Identity', 'Diamonds'].map((word) => {
                return (
                  <span className="text-display-md text-foreground/90" key={word}>
                    {word}
                    <span className="ml-12 text-gem">◆</span>
                  </span>
                );
              })}
            </Marquee>
          );
        })}
      </div>
    );
  },
};
