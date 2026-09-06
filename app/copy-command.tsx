"use client";

import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { Bun, NPM, Pnpm, Yarn } from "@/app/icons";
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

const packageManagerIcons = {
  bun: Bun,
  pnpm: Pnpm,
  yarn: Yarn,
  npm: NPM,
} satisfies Record<PackageManager, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

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
  const SelectedPackageManagerIcon = packageManagerIcons[selectedCommand.value];
  const [copiedPackageManager, setCopiedPackageManager] = React.useState<string | null>(null);

  async function copyInstallCommand(command: InstallCommand) {
    setCopiedPackageManager(null);
    setPackageManagerPreference(command.value);
    await navigator.clipboard.writeText(command.command);
    setCopiedPackageManager(command.label);
    window.setTimeout(() => setCopiedPackageManager(null), 1600);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button type="button" variant="outline" className="min-w-72 justify-between" />}
        aria-label={`Copy install command. ${selectedCommand.label} selected`}
      >
        <span className="flex items-center gap-2">
          {copiedPackageManager ? (
            <Check aria-hidden="true" />
          ) : (
            <SelectedPackageManagerIcon className="size-4 fill-current" aria-hidden="true" />
          )}
          Copy install command with {selectedCommand.label}
        </span>
        <ChevronDown className="ml-auto" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-(--anchor-width) min-w-72">
        <DropdownMenuRadioGroup value={selectedCommand.value}>
          <DropdownMenuLabel>Package manager</DropdownMenuLabel>
          {commands.map((command) => {
            const PackageManagerIcon = packageManagerIcons[command.value];

            return (
              <DropdownMenuRadioItem
                key={command.value}
                value={command.value}
                className="gap-2"
                closeOnClick
                onClick={() => void copyInstallCommand(command)}
              >
                <PackageManagerIcon className="size-4 fill-current" aria-hidden="true" />
                Install with {command.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
      <span className="sr-only" aria-live="polite">
        {copiedPackageManager ? `${copiedPackageManager} install command copied to clipboard` : ""}
      </span>
    </DropdownMenu>
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
