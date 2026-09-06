"use client";

import { Check, ChevronDown, Copy } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/rivet/blocks/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/rivet/blocks/dropdown-menu/dropdown-menu";

type PackageManager = "bun" | "pnpm" | "yarn" | "npm";

const packageManagerStorageKey = "rivet-ui:package-manager:v1";
const packageManagerChangeEvent = "rivet-ui:package-manager-change";
const defaultPackageManager: PackageManager = "bun";
let inMemoryPackageManager: PackageManager = defaultPackageManager;

type InstallCommand = {
  readonly value: PackageManager;
  readonly label: string;
  readonly command: string;
};

type CopyInstallButtonProps = {
  commands: readonly [InstallCommand, ...InstallCommand[]];
};

export function CopyInstallButton({ commands }: CopyInstallButtonProps) {
  const preferredPackageManager = React.useSyncExternalStore(
    subscribeToPackageManager,
    getPackageManagerSnapshot,
    getServerPackageManagerSnapshot,
  );
  const selectedCommand =
    commands.find((command) => command.value === preferredPackageManager) ?? commands[0];
  const [copied, setCopied] = React.useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(selectedCommand.command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function selectPackageManager(value: string) {
    if (!isPackageManager(value)) {
      return;
    }

    setCopied(false);
    setPackageManagerPreference(value);
  }

  return (
    <div className="inline-flex items-stretch">
      <Button type="button" variant="outline" className="min-w-48 border-r-0" onClick={copyCommand}>
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        {copied ? "Command copied" : "Copy install command"}
        <span className="sr-only" aria-live="polite">
          {copied ? `${selectedCommand.label} install command copied to clipboard` : ""}
        </span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="outline"
              className="min-w-21 gap-1.5 px-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em]"
            />
          }
          aria-label={`Select package manager. ${selectedCommand.label} selected`}
        >
          {selectedCommand.label}
          <ChevronDown aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          <DropdownMenuRadioGroup
            value={selectedCommand.value}
            onValueChange={selectPackageManager}
          >
            <DropdownMenuLabel>Package manager</DropdownMenuLabel>
            {commands.map((command) => (
              <DropdownMenuRadioItem key={command.value} value={command.value} closeOnClick>
                {command.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function subscribeToPackageManager(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(packageManagerChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(packageManagerChangeEvent, onStoreChange);
  };
}

function getPackageManagerSnapshot() {
  try {
    const storedValue = window.localStorage.getItem(packageManagerStorageKey);
    return isPackageManager(storedValue) ? storedValue : inMemoryPackageManager;
  } catch {
    return inMemoryPackageManager;
  }
}

function getServerPackageManagerSnapshot() {
  return defaultPackageManager;
}

function setPackageManagerPreference(value: PackageManager) {
  inMemoryPackageManager = value;

  try {
    window.localStorage.setItem(packageManagerStorageKey, value);
  } catch {
    // Keep the current page functional when persistent storage is unavailable.
  }

  window.dispatchEvent(new Event(packageManagerChangeEvent));
}

function isPackageManager(value: string | null): value is PackageManager {
  return value === "bun" || value === "pnpm" || value === "yarn" || value === "npm";
}
