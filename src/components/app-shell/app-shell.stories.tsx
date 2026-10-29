import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart3, Bell, CalendarDays, Clock, FolderKanban, Plus, Search, Settings, Timer, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../button/button';
import { LogoMark } from '../logo/logo';
import { PageHeader } from '../page-header/page-header';
import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
  AppShellSidebarTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
} from './app-shell';

const PRIMARY_NAVIGATION = [
  {
    icon: Timer,
    label: 'Track',
  },
  {
    badge: 3,
    icon: CalendarDays,
    label: 'Timesheets',
  },
  {
    icon: BarChart3,
    label: 'Reports',
  },
];

const WORKSPACE_NAVIGATION = [
  {
    icon: FolderKanban,
    label: 'Projects',
  },
  {
    badge: 12,
    icon: Users,
    label: 'Diamonds',
  },
  {
    icon: Settings,
    label: 'Settings',
  },
];

const ENTRIES = [
  {
    duration: '2:45',
    project: 'Pilot · Acme',
    task: 'Rewards checkout review',
  },
  {
    duration: '1:30',
    project: 'Refine UI',
    task: 'Storybook foundations',
  },
  {
    duration: '0:50',
    project: 'Internal',
    task: 'Diamonds weekly',
  },
  {
    duration: '3:10',
    project: 'Atlas',
    task: 'Compass onboarding flow',
  },
];

/**
 * Renders a Tick time-tracker shell to exercise every AppShell part together.
 */
const TickShell = ({ defaultCollapsed = false }: { defaultCollapsed?: boolean }) => {
  const [activeLabel, setActiveLabel] = useState('Track');

  return (
    <AppShell defaultCollapsed={defaultCollapsed}>
      <AppShellSidebar>
        <SidebarHeader>
          <LogoMark className="h-6 shrink-0" />
          <span className="font-black truncate font-display text-headline-sm group-data-[collapsed=true]/sidebar:hidden">
            Tick
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection title="Time">
            {PRIMARY_NAVIGATION.map((item, index) => {
              return (
                <SidebarItem
                  active={activeLabel === item.label}
                  badge={item.badge}
                  icon={<item.icon />}
                  key={item.label}
                  label={item.label}
                  number={index + 1}
                  onClick={() => {
                    setActiveLabel(item.label);
                  }}
                />
              );
            })}
          </SidebarSection>
          <SidebarSection title="Workspace">
            {WORKSPACE_NAVIGATION.map((item) => {
              return (
                <SidebarItem
                  active={activeLabel === item.label}
                  badge={item.badge}
                  icon={<item.icon />}
                  key={item.label}
                  label={item.label}
                  onClick={() => {
                    setActiveLabel(item.label);
                  }}
                />
              );
            })}
            <SidebarItem asChild icon={<Clock />} label="Harvest import">
              <a href="#harvest-import" />
            </SidebarItem>
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>
          <span className="size-8 font-semibold inline-flex shrink-0 items-center justify-center rounded-full bg-gem-gradient text-caption text-gem-foreground">
            EV
          </span>
          <div className="min-w-0 flex flex-col group-data-[collapsed=true]/sidebar:hidden">
            <span className="font-medium truncate text-body-sm">Elena</span>
            <span className="truncate text-caption text-muted-foreground">Diamonds · Design</span>
          </div>
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellMain>
        <AppShellHeader>
          <AppShellSidebarTrigger />
          <div className="max-w-sm gap-2 px-3 flex h-control-sm flex-1 items-center rounded-control border border-input bg-background/60 text-body-sm text-subtle">
            <Search aria-hidden className="size-4" />
            Search entries, projects, Diamonds…
            <kbd className="rounded px-1.5 ml-auto border border-border font-mono text-caption">⌘K</kbd>
          </div>
          <div className="gap-1 ml-auto flex items-center">
            <Button size="icon-sm" title="Notifications" variant="ghost">
              <Bell />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </AppShellHeader>
        <AppShellContent>
          <PageHeader
            actions={
              <>
                <Button variant="outline">Export</Button>
                <Button variant="gem">
                  <Plus />
                  New entry
                </Button>
              </>
            }
            description="Monday, 26 October. You have tracked 8:15 of 8:00 hours today."
            eyebrow={activeLabel}
            number={1}
            title="Good afternoon, Elena."
          />
          <div className="gap-4 md:grid-cols-3 grid">
            {[
              ['Today', '8:15'],
              ['This week', '31:40'],
              ['Billable', '87%'],
            ].map(([label, value]) => {
              return (
                <div className="gap-2 p-5 flex flex-col card-surface" key={label}>
                  <span className="eyebrow text-muted-foreground">{label}</span>
                  <span className="font-display text-display-sm tabular-nums">{value}</span>
                </div>
              );
            })}
          </div>
          <ul className="divide-y divide-border card-surface">
            {ENTRIES.map((entry) => {
              return (
                <li className="gap-4 px-5 py-4 flex items-center" key={entry.task}>
                  <span aria-hidden className="size-2 rounded-full bg-gem" role="presentation" />
                  <div className="min-w-0 flex flex-1 flex-col">
                    <span className="font-medium truncate text-body-sm">{entry.task}</span>
                    <span className="truncate text-caption text-muted-foreground">{entry.project}</span>
                  </div>
                  <span className="font-mono text-body-sm tabular-nums">{entry.duration}</span>
                </li>
              );
            })}
          </ul>
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  );
};

const meta = {
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Widgets/App Shell',
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TickConsole: Story = {
  render: () => {
    return <TickShell />;
  },
};

export const CollapsedRail: Story = {
  render: () => {
    return <TickShell defaultCollapsed />;
  },
};

export const Mobile: Story = {
  globals: {
    viewport: {
      value: 'mobile1',
    },
  },
  render: () => {
    return <TickShell />;
  },
};
