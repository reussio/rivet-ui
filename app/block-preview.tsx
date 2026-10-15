import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { BlockExample } from "@/app/block-example";
import type { BlockSlug } from "@/content/blocks";
import { Authentication } from "@/registry/rivetui/blocks/authentication/authentication";
import { CommandDashboard } from "@/registry/rivetui/blocks/command-dashboard/command-dashboard";
import { DeploymentList } from "@/registry/rivetui/blocks/deployment-list/deployment-list";
import { SettingsForm } from "@/registry/rivetui/blocks/settings-form/settings-form";

async function BlockPreview({ slug, name }: { slug: BlockSlug; name: string }) {
  const code = await readFile(
    join(process.cwd(), "registry", "rivetui", "blocks", slug, `${slug}.tsx`),
    "utf8",
  );

  return (
    <BlockExample title={name} code={code}>
      {renderBlock(slug)}
    </BlockExample>
  );
}

function renderBlock(slug: BlockSlug) {
  switch (slug) {
    case "authentication":
      return <Authentication />;
    case "command-dashboard":
      return <CommandDashboard commandBarHotkey={false} />;
    case "deployment-list":
      return <DeploymentList />;
    case "settings-form":
      return <SettingsForm />;
  }
}

export { BlockPreview };
