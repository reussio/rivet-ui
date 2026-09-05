import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { registryItemSchema, registrySchema } from "shadcn/schema";

const root = process.cwd();

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

function validate(schema, value, relativePath) {
  const result = schema.safeParse(value);

  if (!result.success) {
    console.error(`Invalid registry JSON: ${relativePath}`);
    console.error(result.error.issues);
    process.exitCode = 1;
    return;
  }

  console.log(`Valid: ${relativePath}`);
}

validate(registrySchema, await readJson("registry.json"), "registry.json");
validate(registrySchema, await readJson("public/r/registry.json"), "public/r/registry.json");

const generatedFiles = (await readdir(path.join(root, "public/r")))
  .filter((file) => file.endsWith(".json") && file !== "registry.json")
  .sort();

for (const file of generatedFiles) {
  const relativePath = path.join("public/r", file);
  validate(registryItemSchema, await readJson(relativePath), relativePath);
}

if (process.exitCode) {
  throw new Error("Registry schema validation failed.");
}
