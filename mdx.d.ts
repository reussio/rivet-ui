declare module "*.mdx" {
  import type { ComponentType } from "react";

  import type { ComponentDocMetadata } from "@/content/components/schema";

  export const metadata: ComponentDocMetadata;

  const Content: ComponentType;
  export default Content;
}
