import { Fragment } from 'react';

import { useDocsTheme } from './use-docs-theme';

interface DocTableProps {
  head: string[];
  rows: string[][];
}

/**
 * Renders a cell, turning `backticked` runs into code spans.
 */
const DocTableCell = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, index) => {
        const key = `${index}-${part}`;
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code className="rounded-sm px-1 py-0.5 bg-muted font-mono text-caption text-foreground" key={key}>
              {part.slice(1, -1)}
            </code>
          );
        }

        return <Fragment key={key}>{part}</Fragment>;
      })}
    </>
  );
};

/**
 * A themed reference table for the docs, since the MDX pipeline here has no GFM table support.
 */
export const DocTable = ({ head, rows }: DocTableProps) => {
  useDocsTheme();

  return (
    <div className="sb-unstyled my-6 overflow-x-auto rounded-card border bg-background font-sans text-foreground">
      <table className="w-full border-collapse text-left text-body-sm">
        <thead className="bg-muted/60 text-muted-foreground">
          <tr>
            {head.map((cell) => {
              return (
                <th className="px-4 py-2.5 font-medium" key={cell}>
                  <DocTableCell text={cell} />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row) => {
            return (
              <tr className="align-top" key={row.join('|')}>
                {row.map((cell, index) => {
                  return (
                    <td className="px-4 py-2.5 first:whitespace-nowrap" key={`${index}-${cell}`}>
                      <DocTableCell text={cell} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
