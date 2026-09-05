"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/registry/rivet/blocks/button/button";

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
