import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(join(rootDirectory, "package.json"), "utf8")) as {
  version: string;
};
const changelog = readFileSync(join(rootDirectory, "CHANGELOG.md"), "utf8");
const heading = `## ${version}`;
const sectionStart = changelog.indexOf(heading);

if (sectionStart === -1) {
  throw new Error(`CHANGELOG.md has no section for version ${version}.`);
}

const contentStart = sectionStart + heading.length;
const nextSection = changelog.indexOf("\n## ", contentStart);
const notes = changelog.slice(contentStart, nextSection === -1 ? undefined : nextSection).trim();

if (!notes) {
  throw new Error(`CHANGELOG.md section ${version} is empty.`);
}

const outputPath = process.argv[2];
if (outputPath) {
  writeFileSync(outputPath, `${notes}\n`);
} else {
  process.stdout.write(`${notes}\n`);
}
