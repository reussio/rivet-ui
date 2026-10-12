import * as React from "react";

import { DocsSection } from "@/app/docs-section";
import { CodeBlock } from "@/registry/rivet/components/code-block/code-block";

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
      {children}
    </DocsSection>
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
    <div className="mt-8 overflow-x-auto border border-border">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm" {...props} />
    </div>
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
  ComponentUsage,
  MdxInlineCode,
  MdxParagraph,
  MdxPre,
  MdxTable,
  MdxTableBody,
  MdxTableCell,
  MdxTableHead,
  MdxTableHeader,
};
