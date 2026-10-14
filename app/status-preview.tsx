import { ComponentExample } from "@/app/component-example";
import { Status } from "@/registry/rivetui/components/status/status";

const primaryCode = `import { Status } from "@/components/ui/status"

const services = [
  { name: "API gateway", region: "fra1", state: "Operational", tone: "success" },
  { name: "Queue worker", region: "iad1", state: "Deploying", tone: "warning" },
  { name: "Legacy webhook", region: "sfo1", state: "Degraded", tone: "destructive" },
]

export function ServiceStatus() {
  return (
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
  )
}`;

const tonesCode = `import { Status } from "@/components/ui/status";
export function TonesExample() {
  return (
    <>
      <Status>Idle</Status>
      <Status tone="success">Operational</Status>
      <Status tone="warning">Building</Status>
      <Status tone="destructive">Failed</Status>
    </>
  );
}`;

const services = [
  { name: "API gateway", region: "fra1", state: "Operational", tone: "success" as const },
  { name: "Queue worker", region: "iad1", state: "Deploying", tone: "warning" as const },
  { name: "Legacy webhook", region: "sfo1", state: "Degraded", tone: "destructive" as const },
] as const;

export function StatusPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Pair a concise operational state with the resource or process it belongs to."
        note="Long labels truncate when constrained. Keep the complete state available to assistive technology through the visible text or an accessible label."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow
        label="Tones"
        description="Use tone to reinforce state meaning while preserving a readable text label."
        code={tonesCode}
      >
        <Status>Idle</Status>
        <Status tone="success">Operational</Status>
        <Status tone="warning">Building</Status>
        <Status tone="destructive">Failed</Status>
      </PreviewRow>
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
      <div className="flex min-w-0 flex-wrap items-center gap-6 p-4">{children}</div>
    </ComponentExample>
  );
}
