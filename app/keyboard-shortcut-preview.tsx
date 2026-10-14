"use client";

import * as React from "react";
import { ComponentExample } from "@/app/component-example";
import {
  KeyboardShortcut,
  useKeyboardShortcut,
} from "@/registry/rivetui/components/keyboard-shortcut/keyboard-shortcut";

const primaryCode = `import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut"

<div className="mx-auto max-w-2xl border border-border bg-card">
  <ShortcutRow label="Open command bar" keys={["mod", "K"]} />
  <ShortcutRow label="Open project" keys={["mod", "P"]} />
  <ShortcutRow label="Run build task" keys={["shift", "mod", "B"]} />
</div>

function ShortcutRow({ label, keys }) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 border-b border-border px-4 last:border-b-0">
      <span className="text-sm font-medium">{label}</span>
      <KeyboardShortcut keys={keys} />
    </div>
  )
}`;

const keyVariantsCode = `import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut"

<div className="grid gap-4">
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
  <div className="flex flex-wrap items-center gap-3">
    <KeyboardShortcut keys={["arrow-up"]} size="sm" />
    <KeyboardShortcut keys={["arrow-down"]} size="sm" />
    <KeyboardShortcut keys={["enter"]} size="sm" />
    <KeyboardShortcut keys={["escape"]} size="sm" />
  </div>
</div>`;

const listenerCode = `"use client"

import * as React from "react"
import { KeyboardShortcut, useKeyboardShortcut } from "@/components/ui/keyboard-shortcut"

export function ListenerExample() {
  const [triggerCount, setTriggerCount] = React.useState(0)

  useKeyboardShortcut(["mod", "shift", "L"], () => {
    setTriggerCount((count) => count + 1)
  })

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3 text-sm">
        <KeyboardShortcut keys={["mod", "shift", "L"]} size="sm" />
        <span className="text-muted-foreground">Press to test the global listener.</span>
      </div>
      <div
        className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground"
        aria-live="polite"
      >
        {triggerCount === 0 ? "Waiting" : \`Triggered \${triggerCount}×\`}
      </div>
    </div>
  )
}`;

export function KeyboardShortcutPreview() {
  const [triggerCount, setTriggerCount] = React.useState(0);

  useKeyboardShortcut(["mod", "shift", "L"], () => {
    setTriggerCount((count) => count + 1);
  });

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Shortcut labels"
        description="Render typed key combinations anywhere an action needs a compact keyboard hint."
        note="mod resolves to Command on macOS and Control on Windows or Linux unless platform is set explicitly."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="min-w-0 p-5 sm:p-8">
          <div className="mx-auto max-w-2xl border border-border bg-card">
            <ShortcutRow label="Open command bar" keys={["mod", "K"]} />
            <ShortcutRow label="Open project" keys={["mod", "P"]} />
            <ShortcutRow label="Run build task" keys={["shift", "mod", "B"]} />
          </div>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Platforms and keys"
        description="Override the platform for documentation or show compact navigation keys without separate examples."
        code={keyVariantsCode}
      >
        <div className="grid gap-4">
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
          <div className="flex flex-wrap items-center gap-3">
            <KeyboardShortcut keys={["arrow-up"]} size="sm" />
            <KeyboardShortcut keys={["arrow-down"]} size="sm" />
            <KeyboardShortcut keys={["enter"]} size="sm" />
            <KeyboardShortcut keys={["escape"]} size="sm" />
          </div>
        </div>
      </PreviewRow>
      <PreviewRow
        label="Global listener"
        description="Use the matching hook when the displayed shortcut should also trigger an action."
        note="Editable controls are ignored by default so global shortcuts do not interrupt typing."
        code={listenerCode}
      >
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

function PreviewRow({
  label,
  children,
  code,
  description,
  note,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
  note?: string;
}) {
  return (
    <ComponentExample title={label} description={description} note={note} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
