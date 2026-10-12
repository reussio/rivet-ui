import { Status } from "@/registry/rivet/components/status/status";

const services = [
  { name: "API gateway", region: "fra1", state: "Operational", tone: "success" as const },
  { name: "Queue worker", region: "iad1", state: "Deploying", tone: "warning" as const },
  { name: "Legacy webhook", region: "sfo1", state: "Degraded", tone: "destructive" as const },
] as const;

export function StatusPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="status-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 033
          </p>
          <h2 id="status-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Status
          </h2>
        </div>
        <Status tone="success">Operational</Status>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="divide-y divide-border border border-border">
            {services.map((service) => (
              <div
                key={service.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{service.name}</p>
                  <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Region / {service.region}
                  </p>
                </div>
                <Status tone={service.tone}>{service.state}</Status>
              </div>
            ))}
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="span" />
            <Specification term="Purpose" detail="live state" />
            <Specification term="Indicator" detail="text + color" />
            <Specification term="Tones" detail="04" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Tones">
          <Status>Idle</Status>
          <Status tone="success">Operational</Status>
          <Status tone="warning">Building</Status>
          <Status tone="destructive">Failed</Status>
        </PreviewRow>
        <PreviewRow label="Constrained">
          <Status className="max-w-44" tone="warning">
            Waiting for regional capacity
          </Status>
        </PreviewRow>
      </div>
    </section>
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
      <div className="flex min-w-0 flex-wrap items-center gap-6 p-4">{children}</div>
    </div>
  );
}
