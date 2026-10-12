"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type PreviewView = "overview" | "examples";

function ComponentPreviewPanel({ children }: { children: React.ReactNode }) {
  const [view, setView] = React.useState<PreviewView>("overview");

  return (
    <div className="docs-preview mt-6 overflow-hidden border border-border bg-background">
      <div className="flex h-11 min-w-0 items-stretch justify-between border-b border-border bg-muted/15">
        <div className="flex h-full items-stretch">
          <PreviewTab active={view === "overview"} onClick={() => setView("overview")}>
            Overview
          </PreviewTab>
          <PreviewTab active={view === "examples"} onClick={() => setView("examples")}>
            Examples
          </PreviewTab>
        </div>
        <span className="hidden items-center px-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
          Interactive
        </span>
      </div>

      <div data-slot="component-preview-content" data-view={view}>
        {children}
      </div>
    </div>
  );
}

function PreviewTab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "relative cursor-pointer border-r border-border px-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] outline-none transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40",
        active ? "bg-background text-foreground" : "text-muted-foreground",
      )}
    >
      {children}
      {active ? <span className="absolute inset-x-0 -bottom-px h-px bg-background" /> : null}
    </button>
  );
}

export { ComponentPreviewPanel };
