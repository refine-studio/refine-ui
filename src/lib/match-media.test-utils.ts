import { vi } from 'vitest';

/**
 * Stubs `window.matchMedia` with a screen of the given width in rem, and returns a `resize` that fires `change` on every query whose answer flips.
 */
export const mockScreenWidth = (initialWidth: number) => {
  let width = initialWidth;
  const queries: { listeners: Set<() => void>; matches: () => boolean }[] = [];

  vi.stubGlobal('matchMedia', (query: string) => {
    const minWidth = Number(/min-width:\s*([\d.]+)rem/.exec(query)?.[1] ?? 0);
    const entry = {
      listeners: new Set<() => void>(),
      matches: () => {
        return width >= minWidth;
      },
    };
    queries.push(entry);

    return {
      addEventListener: (_type: string, listener: () => void) => {
        entry.listeners.add(listener);
      },
      get matches() {
        return entry.matches();
      },
      media: query,
      removeEventListener: (_type: string, listener: () => void) => {
        entry.listeners.delete(listener);
      },
    };
  });

  return {
    resize: (nextWidth: number) => {
      const before = queries.map((entry) => {
        return entry.matches();
      });
      width = nextWidth;
      queries.forEach((entry, index) => {
        if (entry.matches() !== before[index]) {
          entry.listeners.forEach((listener) => {
            listener();
          });
        }
      });
    },
  };
};
