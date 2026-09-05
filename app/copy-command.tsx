"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/registry/rivet/blocks/button/button";

export function CopyCommand({ command }: { command: string }) {
  const { copied, copy } = useCopyText(command);

  return (
    <div className="flex min-w-0 items-center border border-border bg-card">
      <span
        className="border-r border-border px-4 py-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground"
        aria-hidden="true"
      >
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto px-4 py-3 font-mono text-xs whitespace-nowrap">
        {command}
      </code>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="m-1 shrink-0"
        onClick={copy}
        aria-label={copied ? "Command copied" : "Copy command"}
      >
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Command copied to clipboard" : ""}
      </span>
    </div>
  );
}

export function CopyInstallButton({ command }: { command: string }) {
  const { copied, copy } = useCopyText(command);

  return (
    <Button type="button" variant="outline" onClick={copy}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {copied ? "Command copied" : "Copy install command"}
      <span className="sr-only" aria-live="polite">
        {copied ? "Install command copied to clipboard" : ""}
      </span>
    </Button>
  );
}

function useCopyText(text: string) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return { copied, copy };
}
