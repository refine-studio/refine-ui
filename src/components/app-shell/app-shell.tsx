'use client';

import { Dialog as DialogPrimitive, Slot } from 'radix-ui';
import { type ComponentProps, createContext, type ReactNode, use, useState } from 'react';

import { cn } from '../../lib/cn';
import { useBreakpoint } from '../../lib/use-breakpoint';
import { RefineIconBarLeft } from '../../icons/refine-icons';

interface AppShellContextValue {
  collapsed: boolean;
  /** Whether the shell shows its phone layout: the sidebar as a drawer, below `md`. `true` on the server. */
  isMobile: boolean;
  mobileOpen: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (mobileOpen: boolean) => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

/**
 * Returns the shell's sidebar state and whether it shows the phone layout; throws outside an `AppShell`.
 */
export const useAppShell = () => {
  const context = use(AppShellContext);
  if (!context) throw new Error('useAppShell must be used inside an AppShell.');

  return context;
};

interface AppShellProps extends ComponentProps<'div'> {
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

/**
 * Lays out an internal tool as sidebar plus content, and owns whether the sidebar is collapsed to a rail or open as a mobile drawer.
 */
export const AppShell = ({
  className,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  ...props
}: AppShellProps) => {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapsed = controlledCollapsed ?? uncontrolledCollapsed;
  const isMobile = !useBreakpoint('md');

  /**
   * Updates the collapsed state and reports it to a controlling parent.
   */
  const setCollapsed = (nextCollapsed: boolean) => {
    setUncontrolledCollapsed(nextCollapsed);
    onCollapsedChange?.(nextCollapsed);
  };

  return (
    <AppShellContext value={{ collapsed, isMobile, mobileOpen, setCollapsed, setMobileOpen }}>
      <div className={cn('flex min-h-dvh bg-canvas text-foreground', className)} data-slot="app-shell" {...props} />
    </AppShellContext>
  );
};

interface AppShellSidebarProps extends ComponentProps<'aside'> {
  label?: string;
}

/**
 * Renders the navigation column: a sticky panel that collapses to an icon rail from `md` up, and an off-canvas drawer below it.
 */
export const AppShellSidebar = ({ children, className, label = 'Navigation', ...props }: AppShellSidebarProps) => {
  const { collapsed, mobileOpen, setMobileOpen } = useAppShell();

  return (
    <>
      <aside
        className={cn(
          // base
          'group/sidebar sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-2 border-r border-border bg-background md:flex',
          // animation
          'transition-[width] duration-300 ease-out-expo data-[collapsed=true]:w-16',
          className,
        )}
        data-collapsed={collapsed}
        data-slot="app-shell-sidebar"
        {...props}
      >
        {children}
      </aside>
      <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              // base
              'fixed inset-0 z-40 bg-scrim backdrop-blur-sm md:hidden',
              // animation
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
            )}
          />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className={cn(
              // base
              'group/sidebar fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-2 border-r border-border bg-background shadow-float md:hidden',
              // animation
              'duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:slide-in-from-left',
            )}
            data-collapsed={false}
          >
            <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
            {children}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};

/**
 * Holds the brand row at the top of the sidebar; hides everything but the first child when collapsed.
 */
export const SidebarHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex h-14 shrink-0 items-center gap-2 border-b border-border px-4 group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:px-0',
        className,
      )}
      data-slot="sidebar-header"
      {...props}
    />
  );
};

/**
 * Scrolls the sidebar's sections when they outgrow the viewport.
 */
export const SidebarContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-3 py-3', className)}
      data-slot="sidebar-content"
      {...props}
    />
  );
};

interface SidebarSectionProps extends Omit<ComponentProps<'div'>, 'title'> {
  title?: ReactNode;
}

/**
 * Groups related items under a mono caption, which turns into a hairline when the sidebar is a rail.
 */
export const SidebarSection = ({ children, className, title, ...props }: SidebarSectionProps) => {
  return (
    <div className={cn('flex flex-col gap-0.5', className)} data-slot="sidebar-section" role="group" {...props}>
      {title && (
        <div className="mb-1 flex h-5 items-center px-2">
          <span className="eyebrow truncate text-subtle group-data-[collapsed=true]/sidebar:sr-only">{title}</span>
          <span
            aria-hidden
            className="hidden h-px w-full bg-border group-data-[collapsed=true]/sidebar:block"
            role="presentation"
          />
        </div>
      )}
      {children}
    </div>
  );
};

interface SidebarItemProps extends ComponentProps<'button'> {
  active?: boolean;
  asChild?: boolean;
  badge?: ReactNode;
  icon?: ReactNode;
  label: string;
  number?: number | string;
}

/**
 * Renders one navigation entry with icon, optional website-style number and badge; pass a router link as the child with `asChild`.
 */
export const SidebarItem = ({
  active = false,
  asChild = false,
  badge,
  children,
  className,
  icon,
  label,
  number,
  onClick,
  ...props
}: SidebarItemProps) => {
  const { collapsed, setMobileOpen } = useAppShell();
  const Component = asChild ? Slot.Root : 'button';
  const formattedNumber = typeof number === 'number' ? number.toString().padStart(2, '0') : number;

  return (
    <Component
      aria-current={active ? 'page' : undefined}
      className={cn(
        // base
        'group/item relative flex h-control-md w-full items-center gap-3 rounded-control px-2.5 text-left text-body-sm text-muted-foreground outline-none select-none focus-ring',
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        'group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:px-0',
        // hover
        'transition-colors hover:bg-hover hover:text-foreground',
        // active
        'active:bg-pressed aria-[current=page]:bg-card aria-[current=page]:font-medium aria-[current=page]:text-foreground aria-[current=page]:shadow-soft aria-[current=page]:ring-1 aria-[current=page]:ring-border',
        // disabled
        'disabled:pointer-events-none disabled:opacity-45',
        className,
      )}
      data-slot="sidebar-item"
      title={collapsed ? label : undefined}
      type={asChild ? undefined : 'button'}
      onClick={(event) => {
        setMobileOpen(false);
        onClick?.(event);
      }}
      {...props}
    >
      {asChild && <Slot.Slottable>{children}</Slot.Slottable>}
      {icon && <span className="flex text-subtle group-hover/item:text-foreground group-aria-[current=page]/item:text-gem-ink">{icon}</span>}
      {formattedNumber !== undefined && (
        <span className="font-mono text-caption text-subtle tabular-nums group-data-[collapsed=true]/sidebar:hidden">
          {formattedNumber}
        </span>
      )}
      <span className="flex-1 truncate group-data-[collapsed=true]/sidebar:sr-only">{label}</span>
      {badge !== undefined && (
        <span
          className={cn(
            'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gem-soft px-1.5 font-mono text-caption text-gem-ink tabular-nums',
            'group-data-[collapsed=true]/sidebar:absolute group-data-[collapsed=true]/sidebar:top-1 group-data-[collapsed=true]/sidebar:right-1 group-data-[collapsed=true]/sidebar:size-2 group-data-[collapsed=true]/sidebar:min-w-0 group-data-[collapsed=true]/sidebar:bg-gem group-data-[collapsed=true]/sidebar:p-0',
          )}
        >
          <span className="group-data-[collapsed=true]/sidebar:sr-only">{badge}</span>
        </span>
      )}
    </Component>
  );
};

/**
 * Pins account and settings controls to the bottom of the sidebar.
 */
export const SidebarFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'mt-auto flex shrink-0 items-center gap-3 border-t border-border p-3 group-data-[collapsed=true]/sidebar:justify-center',
        className,
      )}
      data-slot="sidebar-footer"
      {...props}
    />
  );
};

/**
 * Toggles the sidebar: collapses it to a rail from `md` up and opens the drawer below it.
 */
export const AppShellSidebarTrigger = ({ className, onClick, ...props }: ComponentProps<'button'>) => {
  const { collapsed, isMobile, mobileOpen, setCollapsed, setMobileOpen } = useAppShell();

  return (
    <button
      className={cn(
        // base
        'inline-flex size-control-sm shrink-0 items-center justify-center rounded-control text-muted-foreground transition-colors focus-ring',
        // hover
        'hover:bg-hover hover:text-foreground',
        // active
        'active:bg-pressed',
        className,
      )}
      data-slot="app-shell-sidebar-trigger"
      title="Toggle sidebar"
      type="button"
      onClick={(event) => {
        if (isMobile) setMobileOpen(!mobileOpen);
        else setCollapsed(!collapsed);
        onClick?.(event);
      }}
      {...props}
    >
      <RefineIconBarLeft aria-hidden className="size-4" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
};

/**
 * Stacks the header and page content to the right of the sidebar.
 */
export const AppShellMain = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={cn('flex min-w-0 flex-1 flex-col', className)} data-slot="app-shell-main" {...props} />;
};

/**
 * Renders the sticky, frosted top bar of the content column, like the refine.studio header.
 */
export const AppShellHeader = ({ className, ...props }: ComponentProps<'header'>) => {
  return (
    <header
      className={cn('sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 glass md:px-6', className)}
      data-slot="app-shell-header"
      {...props}
    />
  );
};

/**
 * Holds the page itself, padded and capped for readable line lengths on very wide screens.
 */
export const AppShellContent = ({ className, ...props }: ComponentProps<'main'>) => {
  return (
    <main
      className={cn('mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-4 md:p-8', className)}
      data-slot="app-shell-content"
      {...props}
    />
  );
};
