declare module "@/content/components/*.mdx" {
  import type { ComponentType } from "react";

  import type { ComponentDocMetadata } from "@/content/components/schema";

  export const metadata: ComponentDocMetadata;

  const Content: ComponentType;
  export default Content;
}

declare module "@/content/blocks/*.mdx" {
  import type { ComponentType } from "react";

  import type { BlockDocMetadata } from "@/content/blocks/schema";

  export const metadata: BlockDocMetadata;

  const Content: ComponentType;
  export default Content;
}
