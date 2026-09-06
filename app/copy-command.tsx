"use client";

import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { Bun, NPM, Pnpm, Yarn } from "@/app/icons";
import {
  type PackageManager,
  setPackageManagerPreference,
  usePackageManagerPreference,
} from "@/app/package-manager-preference";
import { Button } from "@/registry/rivet/blocks/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/rivet/blocks/dropdown-menu/dropdown-menu";

const packageManagerIcons = {
  bun: Bun,
  pnpm: Pnpm,
  yarn: Yarn,
  npm: NPM,
} satisfies Record<PackageManager, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

type InstallCommand = {
  readonly value: PackageManager;
  readonly label: string;
  readonly command: string;
};

type CopyInstallButtonProps = {
  commands: readonly [InstallCommand, ...InstallCommand[]];
};

export function CopyInstallButton({ commands }: CopyInstallButtonProps) {
  const preferredPackageManager = usePackageManagerPreference();
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
        render={<Button type="button" variant="outline" className="min-w-60 justify-between" />}
        aria-label={`Copy install command. ${selectedCommand.label} selected`}
      >
        <span className="flex items-center gap-2">
          {copiedPackageManager ? (
            <Check aria-hidden="true" />
          ) : (
            <SelectedPackageManagerIcon className="size-4 fill-current" aria-hidden="true" />
          )}
          Copy install command
        </span>
        <ChevronDown className="ml-auto" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-(--anchor-width) min-w-60">
        <DropdownMenuRadioGroup value={selectedCommand.value}>
          <DropdownMenuLabel>Package manager</DropdownMenuLabel>
          {commands.map((command) => {
            const PackageManagerIcon = packageManagerIcons[command.value];

            return (
              <DropdownMenuRadioItem
                key={command.value}
                value={command.value}
                className="gap-2 pl-3 [&_[data-slot=dropdown-menu-radio-item-indicator]]:hidden"
                closeOnClick
                onClick={() => void copyInstallCommand(command)}
              >
                <PackageManagerIcon className="size-4 fill-current" aria-hidden="true" />
                <span>Install with {command.label}</span>
                {selectedCommand.value === command.value ? (
                  <Check className="ml-auto size-4" aria-hidden="true" />
                ) : null}
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
