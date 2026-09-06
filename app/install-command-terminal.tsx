"use client";

import {
  isPackageManager,
  type PackageManager,
  setPackageManagerPreference,
  usePackageManagerPreference,
} from "@/app/package-manager-preference";
import { Terminal } from "@/registry/rivet/blocks/terminal/terminal";

type InstallCommand = {
  readonly value: PackageManager;
  readonly label: string;
  readonly command: string;
  readonly language?: string;
};

type InstallCommandTerminalProps = {
  commands: readonly [InstallCommand, ...InstallCommand[]];
};

export function InstallCommandTerminal({ commands }: InstallCommandTerminalProps) {
  const preferredPackageManager = usePackageManagerPreference();
  const selectedPackageManager = commands.some(
    (command) => command.value === preferredPackageManager,
  )
    ? preferredPackageManager
    : commands[0].value;

  function selectPackageManager(value: string) {
    if (isPackageManager(value)) {
      setPackageManagerPreference(value);
    }
  }

  return (
    <Terminal
      label="Install component"
      commands={commands}
      value={selectedPackageManager}
      onValueChange={selectPackageManager}
    />
  );
}
