import { Badge } from "@/registry/rivetui/components/badge/badge";

export function BadgePreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="badge-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 016
          </p>
          <h2 id="badge-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Badge
          </h2>
        </div>
        <Badge variant="outline">Metadata</Badge>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="border border-border">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-4">
              <div>
                <p className="text-sm font-medium">Release candidate</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Deployment metadata for the current revision.
                </p>
              </div>
              <Badge>Stable</Badge>
            </div>
            <dl className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <Metadata term="Version">
                <Badge variant="outline">v2.4.0</Badge>
              </Metadata>
              <Metadata term="Region">
                <Badge variant="secondary">fra1</Badge>
              </Metadata>
              <Metadata term="Commit">
                <Badge variant="outline">8f31c2a</Badge>
              </Metadata>
            </dl>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="span" />
            <Specification term="Purpose" detail="metadata" />
            <Specification term="Radius" detail="0 px" />
            <Specification term="Variants" detail="04" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Variants">
          <Badge>Stable</Badge>
          <Badge variant="secondary">Preview</Badge>
          <Badge variant="outline">v2.4.0</Badge>
          <Badge variant="destructive">Blocked</Badge>
        </PreviewRow>
        <PreviewRow label="Metadata">
          <Badge variant="outline">FRA1</Badge>
          <Badge variant="outline">Bun 1.3</Badge>
          <Badge variant="outline">8F31C2A</Badge>
        </PreviewRow>
      </div>
    </section>
  );
}

function Metadata({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 sm:grid sm:gap-3">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {term}
      </dt>
      <dd>{children}</dd>
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
      <div className="flex min-w-0 flex-wrap items-center gap-4 p-4">{children}</div>
    </div>
  );
}
