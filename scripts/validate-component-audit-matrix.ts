import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type ComponentStatus, componentStatuses } from "../content/components/schema";
import {
  auditScenarioKeys,
  type ComponentAuditEntry,
  componentAuditMatrix,
} from "../quality/component-audit-matrix";
import {
  knownOverlayAccessibilityIssues,
  knownPreviewAccessibilityIssues,
} from "../quality/known-accessibility-issues";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const rootDirectory = join(scriptDirectory, "..");
const auditEntries: readonly ComponentAuditEntry[] = componentAuditMatrix;
const currentVersion = JSON.parse(readFileSync(join(rootDirectory, "package.json"), "utf8")) as {
  version: string;
};
const accessibilityDebtSlugs = new Set([
  ...Object.keys(knownPreviewAccessibilityIssues).map((scope) => scope.split(":", 1)[0]),
  ...Object.keys(knownOverlayAccessibilityIssues).map((scope) => scope.split(":", 1)[0]),
]);

const documentedSlugs = readDirectorySlugs(join(rootDirectory, "content", "components"), ".mdx");
const sourceSlugs = readDirectorySlugs(join(rootDirectory, "registry", "rivetui", "components"));
const matrixSlugs = auditEntries.map((entry) => entry.slug).sort(compareStrings);
const errors: string[] = [];

for (const slug of findDuplicates(matrixSlugs)) {
  errors.push(`Duplicate matrix entry: ${slug}`);
}
compareSlugSets("documentation", documentedSlugs, matrixSlugs, errors);
compareSlugSets("registry sources", sourceSlugs, matrixSlugs, errors);

const statusCounts = new Map(componentStatuses.map((status) => [status, 0]));
for (const slug of documentedSlugs) {
  const source = readFileSync(join(rootDirectory, "content", "components", `${slug}.mdx`), "utf8");
  const status = readMetadataField(source, "status", slug, errors);
  const since = readMetadataField(source, "since", slug, errors);
  const replacement = readOptionalMetadataField(source, "replacement", slug, errors);

  if (status && !componentStatuses.includes(status as ComponentStatus)) {
    errors.push(`${slug}: unknown component status "${status}"`);
  } else if (status) {
    const typedStatus = status as ComponentStatus;
    statusCounts.set(typedStatus, (statusCounts.get(typedStatus) ?? 0) + 1);

    if (typedStatus === "stable" && accessibilityDebtSlugs.has(slug)) {
      errors.push(`${slug}: stable components cannot retain known serious accessibility debt`);
    }

    if (typedStatus === "deprecated" && !replacement) {
      errors.push(`${slug}: deprecated components must document a replacement`);
    }
  }

  if (since && !isSemver(since)) {
    errors.push(`${slug}: first available version "${since}" is not valid SemVer`);
  } else if (since && compareSemver(since, currentVersion.version) > 0) {
    errors.push(
      `${slug}: first available version ${since} exceeds current Rivet UI version ${currentVersion.version}`,
    );
  }
}

for (const entry of auditEntries) {
  const requiredKeys = Object.keys(entry.scenarios);
  const excludedKeys = [...entry.notApplicable];
  const coveredKeys = new Set([...requiredKeys, ...excludedKeys]);

  for (const key of requiredKeys) {
    if (!auditScenarioKeys.includes(key as (typeof auditScenarioKeys)[number])) {
      errors.push(`${entry.slug}: unknown required scenario "${key}"`);
    }

    const note = entry.scenarios[key as keyof typeof entry.scenarios];
    if (!note?.trim()) {
      errors.push(`${entry.slug}: scenario "${key}" needs a non-empty test description`);
    }
  }

  for (const key of excludedKeys) {
    if (requiredKeys.includes(key)) {
      errors.push(`${entry.slug}: scenario "${key}" is both required and not applicable`);
    }
  }

  for (const key of auditScenarioKeys) {
    if (!coveredKeys.has(key)) {
      errors.push(`${entry.slug}: scenario "${key}" is not classified`);
    }
  }

  if (!entry.scenarios.default) {
    errors.push(`${entry.slug}: the default scenario is mandatory`);
  }

  if (!entry.scenarios.themes) {
    errors.push(`${entry.slug}: the light/dark theme scenario is mandatory`);
  }
}

if (errors.length > 0) {
  console.error("Component audit matrix validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Audit matrix valid: ${auditEntries.length} components.`);
for (const key of auditScenarioKeys) {
  const required = auditEntries.filter((entry) => entry.scenarios[key]).length;
  console.log(`- ${key}: ${required} required, ${auditEntries.length - required} not applicable`);
}
console.log(
  `- status: ${componentStatuses.map((status) => `${status} ${statusCounts.get(status) ?? 0}`).join(", ")}`,
);

function readDirectorySlugs(directory: string, extension?: string) {
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) =>
      extension ? entry.isFile() && entry.name.endsWith(extension) : entry.isDirectory(),
    )
    .map((entry) => (extension ? entry.name.slice(0, -extension.length) : entry.name))
    .sort(compareStrings);
}

function compareSlugSets(
  sourceName: string,
  sourceSlugs: readonly string[],
  targetSlugs: readonly string[],
  targetErrors: string[],
) {
  const source = new Set(sourceSlugs);
  const target = new Set(targetSlugs);

  for (const slug of sourceSlugs) {
    if (!target.has(slug)) {
      targetErrors.push(`Missing matrix entry for ${sourceName} component: ${slug}`);
    }
  }

  for (const slug of targetSlugs) {
    if (!source.has(slug)) {
      targetErrors.push(`Matrix entry has no matching ${sourceName} component: ${slug}`);
    }
  }
}

function findDuplicates(values: readonly string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return [...duplicates].sort(compareStrings);
}

function compareStrings(left: string, right: string) {
  return left.localeCompare(right);
}

function readMetadataField(source: string, field: string, slug: string, targetErrors: string[]) {
  const values = readMetadataFieldValues(source, field);

  if (values.length === 0) {
    targetErrors.push(`${slug}: missing metadata field "${field}"`);
    return undefined;
  }

  if (values.length > 1) {
    targetErrors.push(`${slug}: metadata field "${field}" is declared more than once`);
  }

  return values[0];
}

function readOptionalMetadataField(
  source: string,
  field: string,
  slug: string,
  targetErrors: string[],
) {
  const values = readMetadataFieldValues(source, field);

  if (values.length > 1) {
    targetErrors.push(`${slug}: metadata field "${field}" is declared more than once`);
  }

  return values[0];
}

function readMetadataFieldValues(source: string, field: string) {
  const pattern = new RegExp(`["']?${field}["']?\\s*:\\s*["']([^"']+)["']`, "g");
  return [...source.matchAll(pattern)].map((match) => match[1] ?? "");
}

function isSemver(value: string) {
  return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/.test(value);
}

function compareSemver(left: string, right: string) {
  const leftParts = left.split("-", 1)[0]?.split(".").map(Number) ?? [];
  const rightParts = right.split("-", 1)[0]?.split(".").map(Number) ?? [];

  for (let index = 0; index < 3; index += 1) {
    const difference = (leftParts[index] ?? 0) - (rightParts[index] ?? 0);
    if (difference !== 0) {
      return difference;
    }
  }

  return 0;
}
