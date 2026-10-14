import { Copy, ExternalLink } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/registry/rivetui/components/data-list/data-list";
import { Status } from "@/registry/rivetui/components/status/status";

const primaryCode = `import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Status } from "@/components/ui/status"
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/components/ui/data-list"

<DataList className="max-w-3xl">
  <DataListItem>
    <DataListLabel>Status</DataListLabel>
    <DataListValue><Status tone="success">Ready</Status></DataListValue>
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
      <a href="https://api.example.com/v1/gateway" className="inline-flex max-w-full items-center gap-2 underline decoration-border underline-offset-4 transition-colors duration-100 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none">
        <span className="truncate">api.example.com/v1/gateway</span>
        <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
      </a>
    </DataListValue>
  </DataListItem>
</DataList>`;

const verticalCode = `import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataList, DataListItem, DataListLabel, DataListValue } from "@/components/ui/data-list";
import { Status } from "@/components/ui/status";
export function VerticalExample() {
  return (
    <>
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
    </>
  );
}`;

const densityCode = `import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataList, DataListItem, DataListLabel, DataListValue } from "@/components/ui/data-list";
import { Status } from "@/components/ui/status";
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
export function DensityExample() {
  return (
    <>
      <div className="grid w-full gap-3 lg:grid-cols-3">
        <SizeExample size="sm" label="Small" />
        <SizeExample size="md" label="Medium" />
        <SizeExample size="lg" label="Large" />
      </div>
    </>
  );
}`;

export function DataListPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="min-w-0 p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow label="Vertical" code={verticalCode}>
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
      <PreviewRow label="Density" code={densityCode}>
        <div className="grid w-full gap-3 lg:grid-cols-3">
          <SizeExample size="sm" label="Small" />
          <SizeExample size="md" label="Medium" />
          <SizeExample size="lg" label="Large" />
        </div>
      </PreviewRow>
    </div>
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
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
