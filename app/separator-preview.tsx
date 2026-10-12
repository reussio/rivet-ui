import { Separator } from "@/registry/rivetui/components/separator/separator";

export function SeparatorPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="separator-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 017
          </p>
          <h2
            id="separator-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Separator
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Structure
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
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

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Role" detail="separator" />
            <Specification term="Weight" detail="1 px" />
            <Specification term="Axis" detail="both" />
            <Specification term="Color" detail="border" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Horizontal">
          <div className="w-full max-w-xl">
            <p className="text-sm">Build configuration</p>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground">
              Environment variables and runtime settings
            </p>
          </div>
        </PreviewRow>
        <PreviewRow label="Vertical">
          <div className="flex h-5 items-center gap-4 text-sm">
            <span>Overview</span>
            <Separator orientation="vertical" />
            <span>Activity</span>
            <Separator orientation="vertical" />
            <span className="text-muted-foreground">Settings</span>
          </div>
        </PreviewRow>
      </div>
    </section>
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
