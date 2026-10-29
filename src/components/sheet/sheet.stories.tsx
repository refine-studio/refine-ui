import type { Meta, StoryObj } from '@storybook/react-vite';
import { PanelRight } from 'lucide-react';

import { Button } from '../button/button';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const meta = {
  args: {
    defaultOpen: true,
  },
  component: Sheet,
  parameters: {
    docs: {
      story: {
        height: '560px',
        inline: false,
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Sheet',
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

const CUSTOMER_FACTS = [
  ['Tenant', 'acme-at'],
  ['Members', '4,812'],
  ['Theme', 'Acme red, 8px radius'],
  ['Backend', 'pilot-api-acme-at'],
  ['Last deploy', 'Today, 09:42 by the Diamonds'],
] as const;

/**
 * Renders a customer record sheet sliding in from the given side.
 */
const renderCustomerSheet = (side: 'bottom' | 'left' | 'right' | 'top') => {
  return (args: Story['args']) => {
    return (
      <div className="flex min-h-[560px] items-center justify-center">
        <Sheet {...args}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <PanelRight />
              Open record
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Acme Austria</SheetTitle>
              <SheetDescription>Pilot tenant since March 2024</SheetDescription>
            </SheetHeader>
            <SheetBody>
              <dl className="gap-x-6 gap-y-3 grid grid-cols-[auto_1fr] text-body-sm">
                {CUSTOMER_FACTS.map(([term, detail]) => {
                  return [
                    <dt className="text-muted-foreground" key={`${term}-term`}>
                      {term}
                    </dt>,
                    <dd className="font-medium" key={`${term}-detail`}>
                      {detail}
                    </dd>,
                  ];
                })}
              </dl>
            </SheetBody>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
              <Button>Edit tenant</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  };
};

export const Right: Story = {
  render: renderCustomerSheet('right'),
};

export const Left: Story = {
  render: renderCustomerSheet('left'),
};

export const Bottom: Story = {
  render: renderCustomerSheet('bottom'),
};
