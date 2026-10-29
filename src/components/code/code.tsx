'use client';

import { Check, Copy } from 'lucide-react';
import { type ComponentProps, useState } from 'react';

import { cn } from '../../lib/cn';
import { Button } from '../button/button';

/**
 * Inline code in Geist Mono on a muted chip.
 */
export const Code = ({ className, ...props }: ComponentProps<'code'>) => {
  return (
    <code
      className={cn(
        'rounded-sm border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground wrap-anywhere',
        className,
      )}
      data-slot="code"
      {...props}
    />
  );
};

interface CodeBlockProps extends Omit<ComponentProps<'figure'>, 'children'> {
  code: string;
  copyable?: boolean;
  title?: string;
}

/**
 * A pre-formatted snippet with an optional filename bar and a copy-to-clipboard button.
 */
export const CodeBlock = ({ className, code, copyable = true, title, ...props }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  /**
   * Copies the snippet and flips the button to a check mark for two seconds.
   */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    window.setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const copyLabel = isCopied ? 'Copied' : 'Copy code';

  return (
    <figure
      className={cn('group/code relative overflow-hidden rounded-card border bg-muted/60', className)}
      data-slot="code-block"
      {...props}
    >
      {title && (
        <figcaption className="flex h-control-sm items-center border-b px-4 font-mono text-caption text-muted-foreground">
          {title}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-body-sm leading-relaxed">
        <code>{code}</code>
      </pre>
      {copyable && (
        <Button
          className="absolute right-2 bottom-2 opacity-0 group-hover/code:opacity-100 focus-visible:opacity-100"
          size="icon-sm"
          title={copyLabel}
          variant="outline"
          onClick={handleCopy}
        >
          {isCopied ? <Check className="text-success-ink" /> : <Copy />}
          <span className="sr-only">{copyLabel}</span>
        </Button>
      )}
    </figure>
  );
};
