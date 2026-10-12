import { Ellipsis, ExternalLink } from "lucide-react";

import { Button } from "@/registry/rivet/components/button/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/rivet/components/table/table";

const deployments = [
  {
    name: "Production gateway",
    id: "dpl_8f31c2a",
    status: "Ready",
    region: "eu-central",
    requests: "28,410",
    updated: "2 min ago",
  },
  {
    name: "Checkout worker",
    id: "dpl_0c74ae1",
    status: "Building",
    region: "us-east",
    requests: "9,842",
    updated: "8 min ago",
  },
  {
    name: "Asset transformer",
    id: "dpl_4b90df7",
    status: "Ready",
    region: "eu-west",
    requests: "6,209",
    updated: "21 min ago",
  },
  {
    name: "Legacy webhook",
    id: "dpl_a812e65",
    status: "Paused",
    region: "us-west",
    requests: "0",
    updated: "3 hr ago",
  },
] as const;

export function TablePreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="table-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 013
          </p>
          <h2 id="table-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Table
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Data
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 p-5 sm:p-8 lg:border-r lg:border-border">
          <Table className="min-w-[42rem]">
            <TableCaption>
              Deployment traffic and runtime state during the last 24 hours.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Deployment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="text-right">Requests</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deployments.map((deployment, index) => (
                <TableRow key={deployment.id} data-state={index === 1 ? "selected" : undefined}>
                  <TableCell>
                    <p className="font-medium">{deployment.name}</p>
                    <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground">
                      {deployment.id}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Status value={deployment.status} />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{deployment.region}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {deployment.requests}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{deployment.updated}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Open actions for ${deployment.name}`}
                    >
                      <Ellipsis aria-hidden="true" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total requests</TableCell>
                <TableCell className="text-right font-mono tabular-nums">44,461</TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="table" />
            <Specification term="Overflow" detail="x-axis" />
            <Specification term="Header" detail="mono" />
            <Specification term="State" detail="data-state" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Compact">
          <Table className="min-w-[32rem]">
            <TableHeader>
              <TableRow>
                <TableHead className="h-8 px-3">Service</TableHead>
                <TableHead className="h-8 px-3">Runtime</TableHead>
                <TableHead className="h-8 px-3 text-right">Memory</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="px-3 py-2">API gateway</TableCell>
                <TableCell className="px-3 py-2 font-mono text-xs">Bun 1.3</TableCell>
                <TableCell className="px-3 py-2 text-right font-mono">512 MB</TableCell>
              </TableRow>
              <TableRow data-state="selected">
                <TableCell className="px-3 py-2">Queue worker</TableCell>
                <TableCell className="px-3 py-2 font-mono text-xs">Node 24</TableCell>
                <TableCell className="px-3 py-2 text-right font-mono">1 GB</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </PreviewRow>

        <PreviewRow label="Empty state">
          <Table containerClassName="max-w-xl">
            <TableCaption>
              Artifacts appear after the first successful production build.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Artifact</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} className="h-28 whitespace-normal text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center gap-3">
                    <p className="text-sm text-muted-foreground">No build artifacts available.</p>
                    <Button variant="outline" size="sm">
                      View build settings
                      <ExternalLink aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </PreviewRow>
      </div>
    </section>
  );
}

function Status({ value }: { value: (typeof deployments)[number]["status"] }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={
          value === "Paused" ? "size-2 border border-foreground/50" : "size-2 bg-foreground"
        }
        aria-hidden="true"
      />
      {value}
    </span>
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
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </div>
  );
}
