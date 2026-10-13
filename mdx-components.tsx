import type { MDXComponents } from "mdx/types";

import {
  ComponentApi,
  ComponentTree,
  ComponentTreeNode,
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
  ComponentTree,
  ComponentTreeNode,
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
