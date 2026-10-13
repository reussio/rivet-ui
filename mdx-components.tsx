import type { MDXComponents } from "mdx/types";

import {
  ComponentApi,
  ComponentUsage,
  MdxHeadingThree,
  MdxInlineCode,
  MdxParagraph,
  MdxPre,
  MdxTable,
  MdxTableBody,
  MdxTableCell,
  MdxTableHead,
  MdxTableHeader,
} from "@/app/component-doc-content";

const components = {
  ComponentApi,
  ComponentUsage,
  code: MdxInlineCode,
  h3: MdxHeadingThree,
  p: MdxParagraph,
  pre: MdxPre,
  table: MdxTable,
  tbody: MdxTableBody,
  td: MdxTableCell,
  th: MdxTableHeader,
  thead: MdxTableHead,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
