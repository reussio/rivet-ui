import { ComponentExample } from "@/app/component-example";
import { Separator } from "@/registry/rivetui/components/separator/separator";

const primaryCode = `import { Separator } from "@/components/ui/separator"

<div className="border border-border p-5">
  <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
    Deployment / production
  </p>
  <h3 className="mt-2 text-lg font-semibold tracking-tight">Production gateway</h3>
  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
    Public traffic routed through the Frankfurt region.
  </p>
  <Separator className="my-5" />
  <dl className="grid grid-cols-3 gap-4">
    <Metric label="Region" value="fra1" />
    <Metric label="Runtime" value="Bun 1.3" />
    <Metric label="State" value="Ready" />
  </dl>
</div>

function Metric({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium">{value}</dd>
    </div>
  )
}`;

const verticalCode = `import { Separator } from "@/components/ui/separator";
export function VerticalExample() {
  return (
    <>
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Overview</span>
        <Separator orientation="vertical" />
        <span>Activity</span>
        <Separator orientation="vertical" />
        <span className="text-muted-foreground">Settings</span>
      </div>
    </>
  );
}`;

export function SeparatorPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Separate related content regions without introducing another container."
        note="Horizontal is the default orientation. Use decorative={false} only when the separator conveys a semantic boundary."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
          <div className="border border-border p-5">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
              Deployment / production
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">Production gateway</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Public traffic routed through the Frankfurt region.
            </p>
            <Separator className="my-5" />
            <dl className="grid grid-cols-3 gap-4">
              <Metric label="Region" value="fra1" />
              <Metric label="Runtime" value="Bun 1.3" />
              <Metric label="State" value="Ready" />
            </dl>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Vertical"
        description="Give a vertical separator an explicit height through its parent layout."
        code={verticalCode}
      >
        <div className="flex h-5 items-center gap-4 text-sm">
          <span>Overview</span>
          <Separator orientation="vertical" />
          <span>Activity</span>
          <Separator orientation="vertical" />
          <span className="text-muted-foreground">Settings</span>
        </div>
      </PreviewRow>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium">{value}</dd>
    </div>
  );
}

function PreviewRow({
  label,
  children,
  code,
  description,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
}) {
  return (
    <ComponentExample title={label} description={description} code={code}>
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </ComponentExample>
  );
}
