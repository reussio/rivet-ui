"use client";

import * as React from "react";

import {
  KeyboardShortcut,
  useKeyboardShortcut,
} from "@/registry/rivetui/components/keyboard-shortcut/keyboard-shortcut";

export function KeyboardShortcutPreview() {
  const [triggerCount, setTriggerCount] = React.useState(0);

  useKeyboardShortcut(["mod", "shift", "L"], () => {
    setTriggerCount((count) => count + 1);
  });

  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="keyboard-shortcut-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 032
          </p>
          <h2
            id="keyboard-shortcut-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Keyboard Shortcut
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Input Hint
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="mx-auto max-w-2xl border border-border bg-card">
            <ShortcutRow label="Open command bar" keys={["mod", "K"]} />
            <ShortcutRow label="Open project" keys={["mod", "P"]} />
            <ShortcutRow label="Run build task" keys={["shift", "mod", "B"]} />
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="KBD" />
            <Specification term="Platform" detail="Auto" />
            <Specification term="Listener" detail="Hook" />
            <Specification term="Sizes" detail="2" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Platforms">
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              macOS
              <KeyboardShortcut keys={["mod", "shift", "P"]} platform="mac" />
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              Windows
              <KeyboardShortcut keys={["mod", "shift", "P"]} platform="windows" />
            </span>
          </div>
        </PreviewRow>
        <PreviewRow label="Navigation">
          <div className="flex flex-wrap items-center gap-3">
            <KeyboardShortcut keys={["arrow-up"]} />
            <KeyboardShortcut keys={["arrow-down"]} />
            <KeyboardShortcut keys={["enter"]} />
            <KeyboardShortcut keys={["escape"]} />
          </div>
        </PreviewRow>
        <PreviewRow label="Compact">
          <div className="flex flex-wrap items-center gap-3">
            <KeyboardShortcut keys={["control", "C"]} size="sm" />
            <KeyboardShortcut keys={["option", "shift", "F"]} size="sm" />
            <KeyboardShortcut keys={["/"]} size="sm" />
          </div>
        </PreviewRow>
        <PreviewRow label="Listener">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-sm">
              <KeyboardShortcut keys={["mod", "shift", "L"]} size="sm" />
              <span className="text-muted-foreground">Press to test the global listener.</span>
            </div>
            <span
              className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground"
              aria-live="polite"
            >
              {triggerCount === 0 ? "Waiting" : `Triggered ${triggerCount}×`}
            </span>
          </div>
        </PreviewRow>
      </div>
    </section>
  );
}

function ShortcutRow({ label, keys }: { label: string; keys: readonly [string, ...string[]] }) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 border-b border-border px-4 last:border-b-0">
      <span className="text-sm font-medium">{label}</span>
      <KeyboardShortcut keys={keys} />
    </div>
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
