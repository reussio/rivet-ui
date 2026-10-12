import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/rivet/components/breadcrumb/breadcrumb";

export function BreadcrumbPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="breadcrumb-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 035
          </p>
          <h2
            id="breadcrumb-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Breadcrumb
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Navigation
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-44 items-center p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="w-full border border-border">
            <div className="border-b border-border bg-muted/20 px-4 py-3">
              <ProjectBreadcrumb />
            </div>
            <div className="p-4 sm:p-5">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Environment / production
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight">Frankfurt gateway</p>
            </div>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="Nav" />
            <Specification term="Current" detail="ARIA" />
            <Specification term="Wrap" detail="Enabled" />
            <Specification term="Separator" detail="Custom" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Collapsed">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#workspace">Workspace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Observability</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PreviewRow>

        <PreviewRow label="Custom">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#deployments">Deployments</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>→</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>8F31C2A</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PreviewRow>
      </div>
    </section>
  );
}

function ProjectBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#rivet">Rivet UI</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Production</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
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
      <div className="flex min-w-0 flex-wrap items-center p-4">{children}</div>
    </div>
  );
}
