"use client";

import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { Bun, NPM, Pnpm, Yarn } from "@/app/icons";
import {
  type PackageManager,
  setPackageManagerPreference,
  usePackageManagerPreference,
} from "@/app/package-manager-preference";
import { Button } from "@/registry/rivet/components/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/rivet/components/dropdown-menu/dropdown-menu";

const packageManagerIcons = {
  bun: Bun,
  pnpm: Pnpm,
  yarn: Yarn,
  npm: NPM,
} satisfies Record<PackageManager, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

const packageManagerIconClassNames = {
  bun: "size-4 scale-[1.2] fill-current",
  pnpm: "size-4 fill-current",
  yarn: "size-4 scale-[1.125] fill-current",
  npm: "size-4 fill-current",
} satisfies Record<PackageManager, string>;

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
      <fieldset
        className="m-0 inline-flex min-w-0 w-60 border-0 p-0"
        aria-label="Install command controls"
      >
        <Button
          type="button"
          variant="outline"
          className="peer/install min-w-0 flex-1 justify-start border-r-0 pr-3 focus-visible:relative focus-visible:z-10"
          aria-label={`Copy install command with ${selectedCommand.label}`}
          onClick={() => void copyInstallCommand(selectedCommand)}
        >
          {copiedPackageManager ? (
            <Check aria-hidden="true" />
          ) : (
            <SelectedPackageManagerIcon
              className={packageManagerIconClassNames[selectedCommand.value]}
              aria-hidden="true"
            />
          )}
          Copy install command
        </Button>
        <DropdownMenuTrigger
          render={<Button type="button" variant="outline" size="icon" />}
          className="w-10 min-w-10 peer-hover/install:border-l-foreground/40 focus-visible:relative focus-visible:z-10 data-popup-open:bg-muted [&_svg]:transition-transform data-popup-open:[&_svg]:rotate-180 motion-reduce:[&_svg]:transition-none"
          aria-label={`Choose package manager. ${selectedCommand.label} selected`}
        >
          <ChevronDown aria-hidden="true" />
        </DropdownMenuTrigger>
      </fieldset>
      <DropdownMenuContent align="end" className="w-60">
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
                <PackageManagerIcon
                  className={packageManagerIconClassNames[command.value]}
                  aria-hidden="true"
                />
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
