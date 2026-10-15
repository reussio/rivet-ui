import type { MDXComponents } from "mdx/types";

import { BlockDetails } from "@/app/block-doc-content";
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
  MdxTableRow,
} from "@/app/component-doc-content";

const components = {
  BlockDetails,
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
  tr: MdxTableRow,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
