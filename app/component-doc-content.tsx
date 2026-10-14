import * as React from "react";

import { DocsSection } from "@/app/docs-section";
import { CodeBlock } from "@/registry/rivetui/components/code-block/code-block";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/rivetui/components/collapsible/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/rivetui/components/table/table";

function ComponentUsage(_: { children: React.ReactNode }) {
  return null;
}

function ComponentApi({ children }: { children: React.ReactNode }) {
  return (
    <DocsSection
      id="api-reference"
      eyebrow="Public interface"
      title="API reference"
      description="Component-specific props are listed here. Native element and Base UI props continue to pass through."
    >
      <div
        data-slot="component-api-content"
        className="mt-8 [&>[data-slot=component-api-heading]:first-child]:mt-0 [&>[data-slot=component-api-heading]+[data-slot=component-doc-table]]:mt-0"
      >
        {children}
      </div>
    </DocsSection>
  );
}

type ComponentTreeNodeProps = {
  children?: React.ReactNode;
  name: string;
  optional?: boolean;
  repeatable?: boolean;
};

function ComponentTree({ children }: { children: React.ReactNode }) {
  return (
    <Collapsible className="mt-8">
      <CollapsibleTrigger>Composition</CollapsibleTrigger>
      <CollapsibleContent className="overflow-x-auto">
        <ul className="grid min-w-max gap-2">{children}</ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ComponentTreeNode({
  children,
  name,
  optional = false,
  repeatable = false,
}: ComponentTreeNodeProps) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <li data-slot="component-tree-node" className="relative">
      <div className="inline-flex min-h-8 items-center gap-2">
        <code className="flex min-h-8 items-center border border-border bg-background px-2.5 font-mono text-xs text-foreground">
          {`<${name}>`}
        </code>
        {optional ? (
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted-foreground/70">
            optional
          </span>
        ) : null}
        {repeatable ? (
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted-foreground/70">
            multiple
          </span>
        ) : null}
      </div>
      {hasChildren ? (
        <ul className="relative ml-3 mt-2 grid gap-2 border-l border-border pl-5 [&>[data-slot=component-tree-node]]:before:absolute [&>[data-slot=component-tree-node]]:before:-left-5 [&>[data-slot=component-tree-node]]:before:top-4 [&>[data-slot=component-tree-node]]:before:h-px [&>[data-slot=component-tree-node]]:before:w-4 [&>[data-slot=component-tree-node]]:before:bg-border">
          {children}
        </ul>
      ) : null}
    </li>
  );
}

function MdxParagraph(props: React.ComponentProps<"p">) {
  return <p className="max-w-3xl text-sm leading-6 text-muted-foreground" {...props} />;
}

function MdxPre({ children }: React.ComponentProps<"pre">) {
  if (!React.isValidElement<{ children?: React.ReactNode; className?: string }>(children)) {
    return null;
  }

  const value = children.props.children;
  const code = typeof value === "string" ? value.replace(/\n$/, "") : "";
  const language = children.props.className?.replace("language-", "") ?? "text";

  return (
    <div data-slot="component-doc-code" className="mt-4 first:mt-0">
      <CodeBlock
        filename={language === "tsx" ? "example.tsx" : undefined}
        language={language}
        code={code}
        softWrap
      />
    </div>
  );
}

function MdxTable(props: React.ComponentProps<"table">) {
  return (
    <div data-slot="component-doc-table" className="mt-8">
      <Table
        containerClassName="border-border"
        className="min-w-[36rem] border-collapse text-left"
        {...props}
      />
    </div>
  );
}

function MdxHeadingThree({ children, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="component-api-heading"
      className="mt-6 flex min-h-11 items-center border border-b-0 border-border bg-muted/20 px-4 font-mono text-xs font-medium text-foreground"
      {...props}
    >
      {children}
    </h3>
  );
}

function MdxTableHead(props: React.ComponentProps<"thead">) {
  return (
    <TableHeader
      className="bg-muted/30 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground"
      {...props}
    />
  );
}

function MdxTableBody(props: React.ComponentProps<"tbody">) {
  return <TableBody {...props} />;
}

function MdxTableRow(props: React.ComponentProps<"tr">) {
  return <TableRow className="hover:bg-transparent" {...props} />;
}

function MdxTableHeader(props: React.ComponentProps<"th">) {
  return <TableHead className="h-auto py-3 last:text-right" {...props} />;
}

function MdxTableCell(props: React.ComponentProps<"td">) {
  return (
    <TableCell
      className="font-mono text-xs text-muted-foreground last:text-right last:text-foreground"
      {...props}
    />
  );
}

function MdxInlineCode(props: React.ComponentProps<"code">) {
  return <code className="font-mono text-xs text-foreground" {...props} />;
}

export {
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
};
