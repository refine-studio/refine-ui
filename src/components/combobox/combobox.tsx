import { Command as CommandPrimitive } from 'cmdk';
import { type KeyboardEvent, type ReactNode, useRef, useState } from 'react';

import {
  RefineIconAddPlus,
  RefineIconCheck,
  RefineIconCloseSM,
  RefineIconSearchMagnifyingGlass,
} from '../../icons/refine-icons';
import { cn } from '../../lib/cn';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../command-menu/command-menu';
import { Popover, PopoverAnchor, PopoverContent } from '../popover/popover';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  hint?: ReactNode;
  keywords?: string[];
}

type ComboboxSize = 'lg' | 'md' | 'sm';

const SHELL_CLASS_NAME_BY_SIZE: Record<ComboboxSize, string> = {
  lg: 'h-control-lg text-body',
  md: 'h-control-md text-body-sm',
  sm: 'h-control-sm text-body-sm',
};

const CREATE_VALUE = '__combobox-create__';

interface ComboboxProps {
  options: ComboboxOption[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  'aria-label'?: string;
  className?: string;
  createLabel?: (query: string) => ReactNode;
  disabled?: boolean;
  emptyMessage?: ReactNode;
  leading?: ReactNode;
  onCreate?: (query: string) => void;
  onQueryChange?: (query: string) => void;
  placeholder?: string;
  query?: string;
  renderOption?: (option: ComboboxOption) => ReactNode;
  renderValue?: (option: ComboboxOption) => ReactNode;
  size?: ComboboxSize;
}

/**
 * Returns true when the query appears in the option's label, value, keywords or text hint, ignoring case.
 */
const matchesQuery = (option: ComboboxOption, query: string) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    option.label,
    option.value,
    ...(option.keywords ?? []),
    typeof option.hint === 'string' ? option.hint : '',
  ];
  return haystack.some((text) => {
    return text.toLowerCase().includes(needle);
  });
};

/**
 * Splits options into groups in the order each group first appears; options without a group share one unnamed group.
 */
const groupOptions = (options: ComboboxOption[]) => {
  const groups = new Map<string, ComboboxOption[]>();
  for (const option of options) {
    const key = option.group ?? '';
    groups.set(key, [...(groups.get(key) ?? []), option]);
  }
  return [...groups.entries()];
};

/**
 * Picks one value from a long list by typing; arrows move, Enter picks, Escape closes, and `onCreate` adds a "Create" row for an unmatched query.
 */
export const Combobox = ({
  'aria-label': ariaLabel,
  className,
  createLabel = (query) => {
    return `Create “${query}”`;
  },
  disabled = false,
  emptyMessage = 'Nothing matches.',
  leading = <RefineIconSearchMagnifyingGlass aria-hidden className="size-4 shrink-0 text-muted-foreground" />,
  onCreate,
  onQueryChange,
  onValueChange,
  options,
  placeholder = 'Search…',
  query: controlledQuery,
  renderOption,
  renderValue,
  size = 'md',
  value,
}: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uncontrolledQuery, setUncontrolledQuery] = useState('');
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isQueryControlled = controlledQuery !== undefined;
  const query = isQueryControlled ? controlledQuery : uncontrolledQuery;
  const selected = options.find((option) => {
    return option.value === value;
  });
  const isShowingChip = !!selected && !isOpen && !query;
  // A controlled query means the caller filters, often on the server, so the list shows options as given.
  const visible = isQueryControlled
    ? options
    : options.filter((option) => {
        return matchesQuery(option, query);
      });
  const trimmed = query.trim();
  const canCreate =
    !!onCreate &&
    !!trimmed &&
    !options.some((option) => {
      return option.label.toLowerCase() === trimmed.toLowerCase();
    });

  /**
   * Writes the query to the caller when controlled, to local state otherwise.
   */
  const setQuery = (next: string) => {
    if (!isQueryControlled) setUncontrolledQuery(next);
    onQueryChange?.(next);
  };

  /**
   * Updates the query from typing and opens the list.
   */
  const handleQueryChange = (next: string) => {
    setQuery(next);
    setIsOpen(true);
  };

  /**
   * Picks an option, clears the query and closes the list.
   */
  const handleSelect = (option: ComboboxOption) => {
    onValueChange(option.value);
    setQuery('');
    setIsOpen(false);
  };

  /**
   * Hands the trimmed query to `onCreate`, clears the query and closes the list.
   */
  const handleCreate = () => {
    onCreate?.(trimmed);
    setQuery('');
    setIsOpen(false);
  };

  /**
   * Clears the picked value and puts the cursor back in the field.
   */
  const handleClear = () => {
    onValueChange(null);
    setIsOpen(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  /**
   * Swaps the chip for the field so the user can search again.
   */
  const handleEdit = () => {
    setIsOpen(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  /**
   * Escape closes an open list, and on a closed list clears the query; cmdk handles arrows and Enter.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (isOpen) setIsOpen(false);
      else setQuery('');
      return;
    }
    if (event.key === 'ArrowDown' && !isOpen) setIsOpen(true);
  };

  return (
    // cmdk names the field through its own label element, which outranks an aria-label on the input.
    <Command
      className={cn('size-auto overflow-visible bg-transparent', className)}
      data-slot="combobox"
      label={ariaLabel}
      loop
      shouldFilter={false}
    >
      <Popover onOpenChange={setIsOpen} open={isOpen && !disabled}>
        <PopoverAnchor asChild>
          <div
            className={cn(
              'gap-2 px-3 flex w-full items-center rounded-control border border-input bg-card transition-colors',
              'focus-within:border-gem focus-within:ring-3 focus-within:ring-gem/20',
              disabled && 'pointer-events-none opacity-45',
              SHELL_CLASS_NAME_BY_SIZE[size],
            )}
            data-slot="combobox-field"
            ref={anchorRef}
          >
            {leading}
            {isShowingChip ? (
              <>
                <button
                  className="min-w-0 gap-2 flex flex-1 items-center rounded-inner text-left focus-ring"
                  data-slot="combobox-value"
                  disabled={disabled}
                  onClick={handleEdit}
                  type="button"
                >
                  {renderValue ? renderValue(selected) : <span className="truncate">{selected.label}</span>}
                </button>
                <button
                  className="-mr-1 size-6 grid shrink-0 place-items-center rounded-inner text-muted-foreground focus-ring hover:bg-hover hover:text-foreground"
                  data-slot="combobox-clear"
                  disabled={disabled}
                  onClick={handleClear}
                  title="Clear"
                  type="button"
                >
                  <RefineIconCloseSM aria-hidden className="size-4" />
                  <span className="sr-only">Clear</span>
                </button>
              </>
            ) : (
              <CommandPrimitive.Input
                className="min-w-0 h-full flex-1 bg-transparent outline-none placeholder:text-subtle"
                data-slot="combobox-input"
                disabled={disabled}
                onFocus={() => {
                  setIsOpen(true);
                }}
                onKeyDown={handleKeyDown}
                onValueChange={handleQueryChange}
                placeholder={selected ? selected.label : placeholder}
                ref={inputRef}
                value={query}
              />
            )}
          </div>
        </PopoverAnchor>
        <PopoverContent
          align="start"
          className="min-w-64 p-0 w-(--radix-popover-trigger-width)"
          data-slot="combobox-content"
          // The field keeps focus while the list is open, so typing keeps filtering.
          onEscapeKeyDown={(event) => {
            event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (anchorRef.current?.contains(event.target as Node)) event.preventDefault();
          }}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
          sideOffset={4}
        >
          <CommandList
            // A mousedown on the list would blur the field and close the popover before the click lands.
            onMouseDown={(event) => {
              event.preventDefault();
            }}
          >
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {groupOptions(visible).map(([heading, groupItems]) => {
              return (
                <CommandGroup heading={heading || undefined} key={heading || 'ungrouped'}>
                  {groupItems.map((option) => {
                    const isSelected = option.value === value;
                    return (
                      <CommandItem
                        data-checked={isSelected || undefined}
                        disabled={option.disabled}
                        key={option.value}
                        onSelect={() => {
                          handleSelect(option);
                        }}
                        value={option.value}
                      >
                        {renderOption ? (
                          renderOption(option)
                        ) : (
                          <>
                            {option.hint ? (
                              <span className="shrink-0 font-mono text-caption text-muted-foreground">
                                {option.hint}
                              </span>
                            ) : null}
                            <span className="min-w-0 flex-1 truncate">{option.label}</span>
                          </>
                        )}
                        {isSelected ? <RefineIconCheck aria-hidden className="ml-auto text-gem-ink" /> : null}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
            {canCreate ? (
              <CommandGroup>
                <CommandItem data-slot="combobox-create" onSelect={handleCreate} value={CREATE_VALUE}>
                  <RefineIconAddPlus aria-hidden />
                  <span className="min-w-0 flex-1 truncate">{createLabel(trimmed)}</span>
                </CommandItem>
              </CommandGroup>
            ) : null}
          </CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  );
};
