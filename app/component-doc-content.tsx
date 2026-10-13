import { ChevronRight } from "lucide-react";
import * as React from "react";

import { DocsSection } from "@/app/docs-section";
import { CodeBlock } from "@/registry/rivetui/components/code-block/code-block";

function ComponentUsage({ children }: { children: React.ReactNode }) {
  return (
    <DocsSection
      id="usage"
      eyebrow="Basic composition"
      title="Usage"
      description="Start with this minimal composition, then adapt it to your application."
    >
      <div className="mt-6">{children}</div>
    </DocsSection>
  );
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
    <details data-slot="component-tree" className="group/component-tree mt-8 border border-border">
      <summary className="relative z-0 flex min-h-10 cursor-pointer list-none items-center gap-3 bg-muted/20 px-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground outline-none transition-[background-color,box-shadow,color] duration-100 hover:bg-muted/40 hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
        <span>Composition</span>
        <ChevronRight
          className="ml-auto size-3.5 shrink-0 transition-transform duration-150 group-open/component-tree:rotate-90 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="overflow-x-auto border-t border-border p-4 sm:p-5">
        <ul className="grid min-w-max gap-2">{children}</ul>
      </div>
    </details>
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
      />
    </div>
  );
}

function MdxTable(props: React.ComponentProps<"table">) {
  return (
    <div data-slot="component-doc-table" className="mt-8 overflow-x-auto border border-border">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm" {...props} />
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
    <thead
      className="border-b border-border bg-muted/30 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground"
      {...props}
    />
  );
}

function MdxTableBody(props: React.ComponentProps<"tbody">) {
  return <tbody className="divide-y divide-border" {...props} />;
}

function MdxTableHeader(props: React.ComponentProps<"th">) {
  return <th className="px-4 py-3 font-medium last:text-right" {...props} />;
}

function MdxTableCell(props: React.ComponentProps<"td">) {
  return (
    <td
      className="px-4 py-3 font-mono text-xs text-muted-foreground last:text-right last:text-foreground"
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
};
