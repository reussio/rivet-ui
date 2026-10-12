type ComponentDocMetadata = {
  readonly name: string;
  readonly slug: string;
  readonly description: string;
};

type ComponentDoc = ComponentDocMetadata;

function defineComponentMetadata<const TMetadata extends ComponentDocMetadata>(
  metadata: TMetadata,
) {
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

export type { ComponentDoc, ComponentDocMetadata };
export { defineComponentDoc, defineComponentMetadata };
