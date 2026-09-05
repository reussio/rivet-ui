"use client";

import { ArrowRight, FilePlus, Rocket, Settings, TerminalSquare } from "lucide-react";

import { Button } from "@/registry/rivet/blocks/button/button";
import {
  CommandBar,
  type CommandBarAction,
  CommandBarTrigger,
} from "@/registry/rivet/blocks/command-bar/command-bar";
import { KeyboardShortcut } from "@/registry/rivet/blocks/keyboard-shortcut/keyboard-shortcut";

const actions: readonly CommandBarAction[] = [
  {
    id: "new-file",
    label: "Create file",
    description: "Add a file to the current project",
    group: "Create",
    keywords: ["new", "document"],
    shortcut: <KeyboardShortcut keys={["mod", "N"]} size="sm" />,
    icon: <FilePlus aria-hidden="true" />,
  },
  {
    id: "new-terminal",
    label: "Open terminal",
    description: "Start a shell in the project root",
    group: "Create",
    shortcut: <KeyboardShortcut keys={["control", "`"]} size="sm" />,
    icon: <TerminalSquare aria-hidden="true" />,
  },
  {
    id: "deploy",
    label: "Deploy project",
    description: "Create a production deployment",
    group: "Project",
    keywords: ["publish", "release"],
    shortcut: <KeyboardShortcut keys={["mod", "D"]} size="sm" />,
    icon: <Rocket aria-hidden="true" />,
  },
  {
    id: "settings",
    label: "Project settings",
    description: "Configure build and runtime settings",
    group: "Project",
    shortcut: <KeyboardShortcut keys={["mod", ","]} size="sm" />,
    icon: <Settings aria-hidden="true" />,
  },
];

export function CommandBarPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="command-bar-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 031
          </p>
          <h2
            id="command-bar-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Command Bar
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Global Action
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-48 items-center justify-center p-5 sm:p-8 lg:border-r lg:border-border">
          <CommandBar actions={actions}>
            <CommandBarTrigger render={<Button variant="outline" />}>
              Open command bar
              <KeyboardShortcut keys={["mod", "K"]} size="sm" />
            </CommandBarTrigger>
          </CommandBar>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Search" detail="Instant" />
            <Specification term="Hotkey" detail="Mod K" />
            <Specification term="Focus" detail="Trapped" />
            <Specification term="Actions" detail="Grouped" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Pattern">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            Search actions, inspect shortcuts, then execute without leaving the keyboard.
            <ArrowRight className="size-4" aria-hidden="true" />
          </div>
        </PreviewRow>
      </div>
    </section>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd>{detail}</dd>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
