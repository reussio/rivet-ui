import type { TerminalCommand } from "@/registry/rivet/blocks/terminal/terminal";

export function getShadcnCommands(argument: string) {
  return [
    {
      value: "bun",
      label: "Bun",
      command: `bunx --bun shadcn@latest ${argument}`,
    },
    {
      value: "pnpm",
      label: "pnpm",
      command: `pnpm dlx shadcn@latest ${argument}`,
    },
    {
      value: "yarn",
      label: "Yarn",
      command: `yarn dlx shadcn@latest ${argument}`,
    },
    {
      value: "npm",
      label: "npm",
      command: `npx shadcn@latest ${argument}`,
    }
  ] as const satisfies readonly [TerminalCommand, ...TerminalCommand[]];
}
