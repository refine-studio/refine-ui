import {
  ArrowRight,
  Bell,
  Calendar,
  Check,
  Command,
  Copy,
  Diamond,
  House,
  Mail,
  Plus,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Icon } from '../../icons/icon';
import type { IconName } from '../../icons/refine-icon-names';
import * as RefineIcons from '../../icons/refine-icons';
import { Specimen, Token } from './specimen';

const ICONS = [
  ['Diamond', Diamond],
  ['Sparkles', Sparkles],
  ['Search', Search],
  ['Settings', Settings],
  ['Bell', Bell],
  ['Command', Command],
  ['Copy', Copy],
  ['Check', Check],
] as const;

/**
 * A handful of lucide icons at the default stroke, to set expectations.
 */
export const IconSampler = () => {
  return (
    <Specimen>
      <div className="gap-4 sm:grid-cols-8 grid grid-cols-4">
        {ICONS.map(([name, Icon]) => {
          return (
            <div className="gap-2 p-3 flex flex-col items-center rounded-control hover:bg-hover" key={name}>
              <Icon className="size-6" />
              <Token>{name}</Token>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};

/**
 * Icons inside buttons pick up their size from the button text size, so no size class is needed.
 */
export const IconsInButtons = () => {
  return (
    <Specimen>
      <div className="gap-4 flex flex-col">
        <div className="gap-3 flex flex-wrap items-center">
          <Button size="sm">
            <Plus />
            New project
          </Button>
          <Button size="lg" variant="gem">
            Deploy
            <ArrowRight />
          </Button>
          <Button size="icon" title="Search" variant="outline">
            <Search />
            <span className="sr-only">Search</span>
          </Button>
          <Button size="icon" title="Settings" variant="ghost">
            <Settings />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
        <Token>Button sizes svg to 1.15em. Add a size-* class on the icon to opt out.</Token>
      </div>
    </Specimen>
  );
};

const REFINE_ICON_PREFIX = 'RefineIcon';

const REFINE_ICON_ENTRIES = Object.entries(RefineIcons).map(([name, Icon]) => {
  return {
    Icon,
    name,
    shortName: name.slice(REFINE_ICON_PREFIX.length),
  };
});

const WEIGHT_PAIRS = [
  [Bell, RefineIcons.RefineIconBell],
  [Settings, RefineIcons.RefineIconSettings],
  [Search, RefineIcons.RefineIconSearchMagnifyingGlass],
  [Calendar, RefineIcons.RefineIconCalendar],
  [Mail, RefineIcons.RefineIconMail],
  [House, RefineIcons.RefineIconHouse01],
] as const;

/**
 * Sets lucide and Refine icons side by side, so the matched stroke weight is visible.
 */
export const IconWeightMatch = () => {
  return (
    <Specimen>
      <div className="gap-4 flex flex-col">
        <div className="gap-6 flex items-center">
          <Token className="w-32">lucide · 2</Token>
          {WEIGHT_PAIRS.map(([LucideIcon]) => {
            return <LucideIcon className="size-5" key={LucideIcon.displayName} />;
          })}
        </div>
        <div className="gap-6 flex items-center">
          <Token className="w-32">Refine · 1.75</Token>
          {WEIGHT_PAIRS.map(([, RefineIcon]) => {
            return <RefineIcon className="size-5" key={RefineIcon.displayName} />;
          })}
        </div>
      </div>
    </Specimen>
  );
};

const MENU_ITEMS: { icon: IconName; label: string }[] = [
  { icon: 'House_01', label: 'Home' },
  { icon: 'Bell', label: 'Notifications' },
  { icon: 'Calendar', label: 'Calendar' },
  { icon: 'Settings', label: 'Settings' },
];

/**
 * Draws a menu whose icons come from data, by their sprite names.
 */
export const IconByName = () => {
  return (
    <Specimen>
      <div className="gap-1 flex flex-col">
        {MENU_ITEMS.map(({ icon, label }) => {
          return (
            <div className="gap-3 px-3 py-2 flex items-center rounded-control text-body-sm hover:bg-hover" key={label}>
              <Icon className="size-4" name={icon} />
              {label}
              <Token className="ml-auto">{icon}</Token>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};

/**
 * Lists every Refine icon by its short name, filtered by the search term, and copies the full import name on click.
 */
export const RefineIconGallery = () => {
  const [query, setQuery] = useState('');
  const [copiedName, setCopiedName] = useState<string>();
  const term = query.trim().toLowerCase();
  const matches = REFINE_ICON_ENTRIES.filter(({ shortName }) => {
    return shortName.toLowerCase().includes(term);
  });

  /**
   * Copies the full import name and marks its tile as copied for two seconds.
   */
  const handleCopy = async (name: string) => {
    await navigator.clipboard.writeText(name);
    setCopiedName(name);
    window.setTimeout(() => {
      setCopiedName(undefined);
    }, 2000);
  };

  return (
    <Specimen caption={`Shown without the ${REFINE_ICON_PREFIX} prefix. Click a tile to copy its import name.`}>
      <div className="gap-4 flex flex-col">
        <Input
          leading={<Search />}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          placeholder={`Search ${REFINE_ICON_ENTRIES.length} icons`}
          value={query}
        />
        <div className="max-h-120 gap-2 sm:grid-cols-6 grid grid-cols-3 overflow-y-auto">
          {matches.map(({ Icon, name, shortName }) => {
            return (
              <button
                className="gap-2 p-3 flex cursor-pointer flex-col items-center rounded-control text-center focus-ring hover:bg-hover"
                key={name}
                title={name}
                type="button"
                onClick={() => {
                  return handleCopy(name);
                }}
              >
                <Icon className="size-6" />
                <Token className="break-words">{copiedName === name ? 'Copied' : shortName}</Token>
              </button>
            );
          })}
        </div>
        {matches.length === 0 && <Token>No icon matches “{query}”.</Token>}
      </div>
    </Specimen>
  );
};
