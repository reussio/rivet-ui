import type { ComponentStatus } from "@/content/components/schema";

type BlockDocMetadata = {
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly status: ComponentStatus;
  readonly since: string;
  readonly registryDependencies: readonly string[];
  readonly replacement?: string;
};

type BlockDoc = BlockDocMetadata;

function defineBlockMetadata<const TMetadata extends BlockDocMetadata>(metadata: TMetadata) {
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(metadata.since)) {
    throw new Error(`Block metadata version "${metadata.since}" is not valid SemVer.`);
  }

  if (metadata.status === "deprecated" && !metadata.replacement) {
    throw new Error(`Deprecated block "${metadata.slug}" must document a replacement.`);
  }

  return metadata;
}

function defineBlockDoc<const TSlug extends string>(slug: TSlug, metadata: BlockDocMetadata) {
  if (metadata.slug !== slug) {
    throw new Error(`Block metadata slug "${metadata.slug}" does not match "${slug}".`);
  }

  return { ...metadata, slug } as const;
}

export type { BlockDoc, BlockDocMetadata };
export { defineBlockDoc, defineBlockMetadata };
