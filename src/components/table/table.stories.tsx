import type { Meta, StoryObj } from '@storybook/react-vite';
import { RefreshCw, Rocket, ServerCrash } from 'lucide-react';

import { PEOPLE } from '../../docs/assets/avatars';
import { Alert, AlertDescription, AlertTitle } from '../alert/alert';
import { Avatar } from '../avatar/avatar';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { EmptyState } from '../empty-state/empty-state';
import { Skeleton } from '../skeleton/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './table';

const STATUS_BY_RESULT = {
  failed: {
    label: 'Failed',
    variant: 'danger',
  },
  live: {
    label: 'Live',
    variant: 'success',
  },
  rolling: {
    label: 'Rolling out',
    variant: 'info',
  },
  waiting: {
    label: 'Awaiting approval',
    variant: 'warning',
  },
} as const;

const DEPLOYS = [
  {
    author: PEOPLE.elena.fallback,
    avatar: PEOPLE.elena.src,
    duration: 184,
    id: 'dpl_8f21',
    result: 'live',
    service: 'pilot-web',
    tenant: 'Acme',
    version: 'v2.14.0',
  },
  {
    author: PEOPLE.marco.fallback,
    avatar: PEOPLE.marco.src,
    duration: 96,
    id: 'dpl_8f1e',
    result: 'rolling',
    service: 'pilot-api-vela',
    tenant: 'Vela',
    version: 'v1.9.3',
  },
  {
    author: PEOPLE.clara.fallback,
    avatar: PEOPLE.clara.src,
    duration: 412,
    id: 'dpl_8f1a',
    result: 'failed',
    service: 'pilot-api-lumen',
    tenant: 'Lumen',
    version: 'v1.22.0',
  },
  {
    author: 'DR',
    duration: 0,
    id: 'dpl_8f17',
    result: 'waiting',
    service: 'tick',
    tenant: 'Internal',
    version: 'v0.8.1',
  },
  {
    author: PEOPLE.tomas.fallback,
    avatar: PEOPLE.tomas.src,
    duration: 151,
    id: 'dpl_8f12',
    result: 'live',
    service: 'pilot-api-northwind',
    tenant: 'Northwind',
    version: 'v1.4.7',
  },
] as const;

/**
 * Formats seconds as "3m 04s".
 */
const formatDuration = (seconds: number) => {
  if (seconds === 0) return '—';

  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;
};

const meta = {
  args: {
    stickyHeader: false,
  },
  component: Table,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Table',
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The shared header row for the deploy stories.
 */
const DeploysTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Service</TableHead>
        <TableHead>Tenant</TableHead>
        <TableHead>Version</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>By</TableHead>
        <TableHead numeric>Duration</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export const Deploys: Story = {
  render: (args) => {
    return (
      <div className="max-w-4xl card-surface">
        <Table {...args}>
          <TableCaption className="pb-4">Production deploys, last 24 hours</TableCaption>
          <DeploysTableHeader />
          <TableBody>
            {DEPLOYS.map((deploy, index) => {
              const status = STATUS_BY_RESULT[deploy.result];

              return (
                <TableRow data-state={index === 1 ? 'selected' : undefined} key={deploy.id}>
                  <TableCell className="font-medium">{deploy.service}</TableCell>
                  <TableCell className="text-muted-foreground">{deploy.tenant}</TableCell>
                  <TableCell className="font-mono text-caption">{deploy.version}</TableCell>
                  <TableCell>
                    <Badge dot size="sm" variant={status.variant}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Avatar fallback={deploy.author} size="xs" src={'avatar' in deploy ? deploy.avatar : undefined} />
                  </TableCell>
                  <TableCell numeric>{formatDuration(deploy.duration)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>5 deploys</TableCell>
              <TableCell numeric>14m 03s</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  },
};

export const StickyHeader: Story = {
  args: {
    containerClassName: 'max-h-72',
    stickyHeader: true,
  },
  render: (args) => {
    return (
      <div className="max-w-4xl card-surface">
        <Table {...args}>
          <DeploysTableHeader />
          <TableBody>
            {[...DEPLOYS, ...DEPLOYS, ...DEPLOYS].map((deploy, index) => {
              const status = STATUS_BY_RESULT[deploy.result];

              return (
                <TableRow key={`${deploy.id}-${String(index)}`}>
                  <TableCell className="font-medium">{deploy.service}</TableCell>
                  <TableCell className="text-muted-foreground">{deploy.tenant}</TableCell>
                  <TableCell className="font-mono text-caption">{deploy.version}</TableCell>
                  <TableCell>
                    <Badge dot size="sm" variant={status.variant}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Avatar fallback={deploy.author} size="xs" />
                  </TableCell>
                  <TableCell numeric>{formatDuration(deploy.duration)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const Loading: Story = {
  render: (args) => {
    return (
      <div className="max-w-4xl card-surface">
        <Table {...args} aria-busy>
          <DeploysTableHeader />
          <TableBody>
            {['a', 'b', 'c', 'd'].map((row) => {
              return (
                <TableRow key={row}>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-14" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="size-6 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12 ml-auto" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => {
    return (
      <div className="max-w-4xl p-4 card-surface">
        <EmptyState
          actions={
            <Button size="sm" variant="gem">
              <Rocket />
              Trigger a deploy
            </Button>
          }
          description="Nothing has shipped in the last 24 hours. Deploys appear here as soon as a pipeline finishes."
          icon={<Rocket />}
          title="No deploys yet"
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    return (
      <div className="max-w-4xl gap-4 p-4 flex flex-col card-surface">
        <Alert
          action={
            <Button size="sm" variant="outline">
              <RefreshCw />
              Retry
            </Button>
          }
          icon={<ServerCrash aria-hidden role="presentation" />}
          variant="danger"
        >
          <AlertTitle>Couldn’t load deploys</AlertTitle>
          <AlertDescription>The gitops API answered 502. Argo CD might be restarting.</AlertDescription>
        </Alert>
      </div>
    );
  },
};
