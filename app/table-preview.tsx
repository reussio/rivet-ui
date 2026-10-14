import { Ellipsis, ExternalLink } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/rivetui/components/table/table";

const primaryCode = `import { Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const deployments = [
  { name: "Production gateway", id: "dpl_8f31c2a", status: "Ready", region: "eu-central", requests: "28,410", updated: "2 min ago" },
  { name: "Checkout worker", id: "dpl_0c74ae1", status: "Building", region: "us-east", requests: "9,842", updated: "8 min ago" },
  { name: "Asset transformer", id: "dpl_4b90df7", status: "Ready", region: "eu-west", requests: "6,209", updated: "21 min ago" },
  { name: "Legacy webhook", id: "dpl_a812e65", status: "Paused", region: "us-west", requests: "0", updated: "3 hr ago" },
]

export function DeploymentsTable() {
  return <Table className="min-w-[42rem]">
  <TableCaption>Deployment traffic and runtime state during the last 24 hours.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Deployment</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Region</TableHead>
      <TableHead className="text-right">Requests</TableHead>
      <TableHead>Updated</TableHead>
      <TableHead className="w-12"><span className="sr-only">Actions</span></TableHead>
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
        <TableCell><Status value={deployment.status} /></TableCell>
        <TableCell className="font-mono text-xs">{deployment.region}</TableCell>
        <TableCell className="text-right font-mono tabular-nums">{deployment.requests}</TableCell>
        <TableCell className="text-muted-foreground">{deployment.updated}</TableCell>
        <TableCell>
          <Button variant="ghost" size="icon-sm" aria-label={\`Open actions for \${deployment.name}\`}>
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
}

function Status({ value }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={value === "Paused" ? "size-2 border border-foreground/50" : "size-2 bg-foreground"}
        aria-hidden="true"
      />
      {value}
    </span>
  )
}`;

const compactCode = `import { Ellipsis, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function CompactExample() {
  return (
    <>
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
    </>
  );
}`;

const emptyStateCode = `import { Ellipsis, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function EmptyStateExample() {
  return (
    <>
      <Table containerClassName="max-w-xl">
        <TableCaption>Artifacts appear after the first successful production build.</TableCaption>
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
    </>
  );
}`;

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
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="min-w-0 p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow label="Compact" code={compactCode}>
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
      <PreviewRow label="Empty state" code={emptyStateCode}>
        <Table containerClassName="max-w-xl">
          <TableCaption>Artifacts appear after the first successful production build.</TableCaption>
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

function PreviewRow({
  label,
  children,
  code,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} code={code}>
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </ComponentExample>
  );
}
