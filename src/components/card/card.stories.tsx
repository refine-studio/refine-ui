import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpRight, MoreHorizontal } from 'lucide-react';

import { PEOPLE } from '../../docs/assets/avatars';
import { Avatar, AvatarGroup } from '../avatar/avatar';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardEyebrow,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from './card';

const DESCRIPTION_BY_VARIANT = {
  default: 'The refine.studio card: paper on canvas, a hairline and a wide, soft shadow.',
  flat: 'Border only. For dense dashboards where many cards sit side by side.',
  gem: 'Tinted with the refine teal. Reserve it for the one thing that matters on the page.',
  sunken: 'A recessed well for secondary groups, filters and inline settings.',
};

const meta = {
  args: {
    interactive: false,
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'flat', 'sunken', 'gem'],
    },
  },
  component: Card,
  title: 'Components/Card',
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    return (
      <Card {...args} className="w-96">
        <CardHeader>
          <CardEyebrow>01 · Pilot</CardEyebrow>
          <CardTitle>Acme tenant rollout</CardTitle>
          <CardDescription>
            Ship the new points ledger to all Acme dealerships before the Q4 campaign starts.
          </CardDescription>
          <CardAction>
            <Button size="icon-sm" title="More actions" variant="ghost">
              <MoreHorizontal />
              <span className="sr-only">More actions</span>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="gap-2 flex items-center">
            <Badge dot size="sm" variant="success">
              On track
            </Badge>
            <Badge size="sm" variant="outline">
              Sprint 42
            </Badge>
          </div>
        </CardContent>
        <CardFooter>
          <AvatarGroup max={3} size="sm">
            <Avatar fallback={PEOPLE.elena.fallback} size="sm" src={PEOPLE.elena.src} />
            <Avatar fallback={PEOPLE.marco.fallback} size="sm" src={PEOPLE.marco.src} />
            <Avatar fallback={PEOPLE.clara.fallback} size="sm" src={PEOPLE.clara.src} />
            <Avatar fallback="DR" size="sm" />
          </AvatarGroup>
          <Button className="ml-auto" size="sm" variant="outline">
            Open board
          </Button>
        </CardFooter>
      </Card>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className="gap-6 grid w-[48rem] grid-cols-2">
        {(['default', 'flat', 'sunken', 'gem'] as const).map((variant, index) => {
          return (
            <Card key={variant} variant={variant}>
              <CardHeader>
                <CardEyebrow>0{index + 1}</CardEyebrow>
                <CardTitle className="capitalize">{variant}</CardTitle>
                <CardDescription>{DESCRIPTION_BY_VARIANT[variant]}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    return (
      <div className="gap-6 grid w-[48rem] grid-cols-2">
        <Card asChild interactive>
          <a href="#strategy">
            <CardMedia className="bg-gem-gradient">
              <div aria-hidden className="text-white/25 pattern-hex" role="presentation" />
            </CardMedia>
            <CardHeader>
              <CardEyebrow>01 · Services</CardEyebrow>
              <CardTitle className="flex items-center justify-between">
                Strategy
                <ArrowUpRight className="size-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>
                We turn visions into high-quality applications, step by step, with everyone involved.
              </CardDescription>
            </CardHeader>
          </a>
        </Card>
        <Card asChild interactive variant="flat">
          <a href="#design">
            <CardHeader>
              <CardEyebrow>02 · Services</CardEyebrow>
              <CardTitle className="flex items-center justify-between">
                Design
                <ArrowUpRight className="size-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>Design systems that give Diamonds room to play — Refine UI included.</CardDescription>
            </CardHeader>
          </a>
        </Card>
      </div>
    );
  },
};
