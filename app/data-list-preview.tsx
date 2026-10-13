import { Copy, ExternalLink } from "lucide-react";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/registry/rivetui/components/data-list/data-list";
import { Status } from "@/registry/rivetui/components/status/status";

export function DataListPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="data-list-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / Data
          </p>
          <h2
            id="data-list-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Data List
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Semantic
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 p-5 sm:p-8 lg:border-r lg:border-border">
          <DataList className="max-w-3xl">
            <DataListItem>
              <DataListLabel>Status</DataListLabel>
              <DataListValue>
                <Status tone="success">Ready</Status>
              </DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListLabel>Deployment</DataListLabel>
              <DataListValue className="font-medium">Production gateway</DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListLabel>Identifier</DataListLabel>
              <DataListValue className="flex min-w-0 items-center justify-between gap-3">
                <code className="min-w-0 truncate font-mono text-xs">dpl_8f31c2a</code>
                <Button variant="ghost" size="icon-sm" aria-label="Copy deployment identifier">
                  <Copy aria-hidden="true" />
                </Button>
              </DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListLabel>Region</DataListLabel>
              <DataListValue className="font-mono text-xs uppercase tracking-[0.08em]">
                fra1 / Frankfurt
              </DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListLabel>Endpoint</DataListLabel>
              <DataListValue>
                <a
                  href="https://api.example.com/v1/gateway"
                  className="inline-flex max-w-full items-center gap-2 underline decoration-border underline-offset-4 transition-colors duration-100 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none"
                >
                  <span className="truncate">api.example.com/v1/gateway</span>
                  <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                </a>
              </DataListValue>
            </DataListItem>
          </DataList>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="dl" />
            <Specification term="Layout" detail="Responsive" />
            <Specification term="Sizes" detail="03" />
            <Specification term="Content" detail="Composable" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Vertical">
          <DataList orientation="vertical" className="max-w-lg">
            <DataListItem>
              <DataListLabel>Build command</DataListLabel>
              <DataListValue className="font-mono text-xs">bun run build</DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListLabel>Output directory</DataListLabel>
              <DataListValue className="font-mono text-xs">.next</DataListValue>
            </DataListItem>
          </DataList>
        </PreviewRow>

        <PreviewRow label="Density">
          <div className="grid w-full gap-3 lg:grid-cols-3">
            <SizeExample size="sm" label="Small" />
            <SizeExample size="md" label="Medium" />
            <SizeExample size="lg" label="Large" />
          </div>
        </PreviewRow>
      </div>
    </section>
  );
}

function SizeExample({ label, size }: { label: string; size: "sm" | "md" | "lg" }) {
  return (
    <DataList orientation="vertical" size={size}>
      <DataListItem>
        <DataListLabel>{label}</DataListLabel>
        <DataListValue>128 requests</DataListValue>
      </DataListItem>
    </DataList>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right">{detail}</dd>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
