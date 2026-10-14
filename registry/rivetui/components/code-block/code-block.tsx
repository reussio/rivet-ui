"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

import { SyntaxHighlight } from "@/lib/syntax-highlight";
import { cn } from "@/lib/utils";

type CodeBlockProps = Omit<React.ComponentProps<"div">, "children"> & {
  code: string;
  language?: string;
  filename?: string;
  copyable?: boolean;
  showLineNumbers?: boolean;
  highlightLinesOnHover?: boolean;
  softWrap?: boolean;
};

function CodeBlock({
  code,
  language,
  filename,
  copyable = true,
  showLineNumbers = false,
  highlightLinesOnHover = false,
  softWrap = false,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const hasHeader = filename !== undefined || language !== undefined || copyable;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      data-slot="code-block"
      data-language={language}
      data-soft-wrap={softWrap ? "true" : undefined}
      className={cn("min-w-0 overflow-hidden border border-border bg-card", className)}
      {...props}
    >
      {hasHeader ? (
        <div
          data-slot="code-block-header"
          className="flex min-h-10 items-stretch border-b border-border bg-muted/20"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            {filename ? <span className="truncate text-foreground">{filename}</span> : null}
            {language ? <span className="ml-auto shrink-0">{language}</span> : null}
          </div>
          {copyable ? (
            <button
              type="button"
              data-slot="code-block-copy"
              onClick={copyCode}
              className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border-l border-border text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted/60 hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none"
              aria-label={copied ? "Code copied" : "Copy code"}
            >
              {copied ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <Copy className="size-3.5" aria-hidden="true" />
              )}
              <span className="sr-only" aria-live="polite">
                {copied ? "Code copied to clipboard" : ""}
              </span>
            </button>
          ) : null}
        </div>
      ) : null}

      <pre
        data-slot="code-block-content"
        className={cn(
          "min-w-0 py-4 font-mono text-xs leading-6",
          softWrap ? "overflow-x-hidden" : "overflow-x-auto",
          !showLineNumbers && !highlightLinesOnHover && "px-4",
        )}
      >
        <SyntaxHighlight
          code={code}
          language={language}
          showLineNumbers={showLineNumbers}
          highlightLinesOnHover={highlightLinesOnHover}
          softWrap={softWrap}
        />
      </pre>
    </div>
  );
}

export type { CodeBlockProps };
export { CodeBlock };
