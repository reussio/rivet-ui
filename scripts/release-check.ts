import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const checks = [
  { label: "Source, metadata, and component audit", command: ["bun", "run", "check"] },
  { label: "TypeScript", command: ["bunx", "tsc", "--noEmit"] },
  { label: "Registry", command: ["bun", "run", "registry:check"] },
  { label: "Production build", command: ["bun", "run", "build"] },
  { label: "Functional browser tests", command: ["bun", "run", "test:functional"] },
  { label: "Accessibility tests", command: ["bun", "run", "test:a11y"] },
  { label: "Visual and responsive tests", command: ["bun", "run", "test:visual"] },
] as const;

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const check of checks) {
  console.log(`\nRelease check: ${check.label}`);
  const result = spawnSync(check.command[0], check.command.slice(1), {
    cwd: rootDirectory,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.error(`Release check failed: ${check.label}`);
    process.exit(result.status ?? 1);
  }
}

console.log("\nRelease check passed.");
