const componentStatuses = ["experimental", "beta", "stable", "deprecated"] as const;

type ComponentStatus = (typeof componentStatuses)[number];

const componentStatusDescriptions = {
  experimental: "API and behavior may change substantially.",
  beta: "Ready for production use, with final release qualification still in progress.",
  stable: "API, accessibility, responsive behavior, and automated tests are approved.",
  deprecated: "Kept temporarily for compatibility. Use the documented replacement instead.",
} as const satisfies Record<ComponentStatus, string>;

type ComponentDocMetadata = {
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly status: ComponentStatus;
  readonly since: string;
  readonly replacement?: string;
};

type ComponentDoc = ComponentDocMetadata;

function defineComponentMetadata<const TMetadata extends ComponentDocMetadata>(
  metadata: TMetadata,
) {
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(metadata.since)) {
    throw new Error(`Component metadata version "${metadata.since}" is not valid SemVer.`);
  }

  if (metadata.status === "deprecated" && !metadata.replacement) {
    throw new Error(`Deprecated component "${metadata.slug}" must document a replacement.`);
  }

  return metadata;
}

function defineComponentDoc<const TSlug extends string>(
  slug: TSlug,
  metadata: ComponentDocMetadata,
) {
  if (metadata.slug !== slug) {
    throw new Error(`Component metadata slug "${metadata.slug}" does not match "${slug}".`);
  }

  return { ...metadata, slug } as const;
}

export type { ComponentDoc, ComponentDocMetadata, ComponentStatus };
export {
  componentStatusDescriptions,
  componentStatuses,
  defineComponentDoc,
  defineComponentMetadata,
};
