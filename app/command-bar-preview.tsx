"use client";

import { ArrowRight, FilePlus, Rocket, Settings, TerminalSquare } from "lucide-react";
import * as React from "react";
import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  CommandBar,
  type CommandBarAction,
  CommandBarTrigger,
} from "@/registry/rivetui/components/command-bar/command-bar";
import { KeyboardShortcut } from "@/registry/rivetui/components/keyboard-shortcut/keyboard-shortcut";

const primaryCode = `import { ArrowRight, FilePlus, Rocket, Settings, TerminalSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CommandBar, type CommandBarAction, CommandBarTrigger } from "@/components/ui/command-bar"
import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut"

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
    shortcut: <KeyboardShortcut keys={["control", "\u0060"]} size="sm" />,
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
]

export function ProjectCommandBar() {
  return (
    <div className="grid justify-items-center gap-3">
      <CommandBar actions={actions} hotkey={false}>
        <CommandBarTrigger render={<Button variant="outline" />}>
          Open command bar
          <ArrowRight aria-hidden="true" />
        </CommandBarTrigger>
      </CommandBar>
      <p className="text-center text-xs text-muted-foreground">
        The global shortcut is disabled inside the documentation preview.
      </p>
    </div>
  )
}`;

const selectionCallbackCode = `import { ArrowRight, FilePlus, Rocket, Settings, TerminalSquare } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { CommandBar, type CommandBarAction, CommandBarTrigger } from "@/components/ui/command-bar";
import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut";
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
    shortcut: <KeyboardShortcut keys={["control", "\`"]} size="sm" />,
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
export function SelectionCallbackExample() {
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <CommandBar
          actions={actions}
          hotkey={false}
          label="Project commands"
          placeholder="Search project commands"
          onActionSelect={(action) => setSelectedAction(action.label)}
        >
          <CommandBarTrigger render={<Button size="sm" variant="outline" />}>
            Run project action
            <ArrowRight aria-hidden="true" />
          </CommandBarTrigger>
        </CommandBar>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {selectedAction ? \`Selected: \${selectedAction}\` : "Select an action to inspect it."}
        </p>
      </div>
    </>
  );
}`;

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
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="flex min-h-48 items-center justify-center p-5 sm:p-8">
          <div className="grid justify-items-center gap-3">
            <CommandBar actions={actions} hotkey={false}>
              <CommandBarTrigger render={<Button variant="outline" />}>
                Open command bar
                <ArrowRight aria-hidden="true" />
              </CommandBarTrigger>
            </CommandBar>
            <p className="text-center text-xs text-muted-foreground">
              The global shortcut is disabled inside the documentation preview.
            </p>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow label="Selection callback" code={selectionCallbackCode}>
        <div className="flex flex-wrap items-center gap-3">
          <CommandBar
            actions={actions}
            hotkey={false}
            label="Project commands"
            placeholder="Search project commands"
            onActionSelect={(action) => setSelectedAction(action.label)}
          >
            <CommandBarTrigger render={<Button size="sm" variant="outline" />}>
              Run project action
              <ArrowRight aria-hidden="true" />
            </CommandBarTrigger>
          </CommandBar>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {selectedAction ? `Selected: ${selectedAction}` : "Select an action to inspect it."}
          </p>
        </div>
      </PreviewRow>
    </div>
  );
}

function PreviewRow({
  label,
  children,
  code,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
