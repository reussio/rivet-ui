import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivet/components/field/field";
import { Switch } from "@/registry/rivet/components/switch/switch";

export function SwitchPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="switch-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 007
          </p>
          <h2 id="switch-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Switch
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Toggle
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <form
            className="divide-y divide-border border border-border"
            aria-label="Operational controls"
          >
            <SwitchField
              id="automatic-failover"
              label="Automatic failover"
              description="Route traffic to a healthy region when the primary region is unavailable."
              defaultChecked
            />
            <SwitchField
              id="maintenance-mode"
              label="Maintenance mode"
              description="Pause external traffic while deployment work is in progress."
            />
            <SwitchField
              id="audit-events"
              label="Audit events"
              description="Record configuration changes for the workspace activity log."
              defaultChecked
            />
          </form>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Control" detail="36 × 20" />
            <Specification term="Input" detail="hidden" />
            <Specification term="Key" detail="space" />
            <Specification term="Form" detail="native" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="States">
          <StateSample label="Off">
            <Switch aria-label="Off" />
          </StateSample>
          <StateSample label="On">
            <Switch aria-label="On" defaultChecked />
          </StateSample>
        </PreviewRow>

        <PreviewRow label="System states">
          <StateSample label="Disabled">
            <Switch aria-label="Disabled" disabled />
          </StateSample>
          <StateSample label="Disabled on">
            <Switch aria-label="Disabled on" defaultChecked disabled />
          </StateSample>
          <StateSample label="Invalid">
            <Switch aria-label="Invalid" aria-invalid="true" />
          </StateSample>
        </PreviewRow>

        <PreviewRow label="Field anatomy">
          <div className="grid w-full gap-5 sm:grid-cols-2">
            <Field className="grid-cols-[minmax(0,1fr)_auto] gap-x-4 border border-border p-4">
              <div className="grid gap-1">
                <FieldLabel htmlFor="preview-deployments">Preview deployments</FieldLabel>
                <FieldDescription id="preview-deployments-description">
                  Create an isolated deployment for every branch.
                </FieldDescription>
              </div>
              <Switch
                id="preview-deployments"
                name="previewDeployments"
                defaultChecked
                aria-describedby="preview-deployments-description"
              />
            </Field>
            <Field className="grid-cols-[minmax(0,1fr)_auto] gap-x-4 border border-border p-4">
              <div className="grid gap-1">
                <FieldLabel htmlFor="protected-production">Protected production</FieldLabel>
                <FieldError id="protected-production-error">
                  Enable this control before launch.
                </FieldError>
              </div>
              <Switch
                id="protected-production"
                name="protectedProduction"
                required
                aria-invalid="true"
                aria-describedby="protected-production-error"
              />
            </Field>
          </div>
        </PreviewRow>
      </div>
    </section>
  );
}

function SwitchField({
  id,
  label,
  description,
  ...props
}: {
  id: string;
  label: string;
  description: string;
} & SwitchPrimitiveProps) {
  const descriptionId = `${id}-description`;

  return (
    <Field className="grid-cols-[minmax(0,1fr)_auto] gap-x-4 p-5 sm:p-6">
      <div className="grid gap-1">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      </div>
      <Switch id={id} name={id} aria-describedby={descriptionId} {...props} />
    </Field>
  );
}

type SwitchPrimitiveProps = React.ComponentProps<typeof Switch>;

function StateSample({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-32 items-center gap-3 border border-border px-3 py-2.5">
      {children}
      <span className="text-sm">{label}</span>
    </div>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd>{detail}</dd>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3 p-4">{children}</div>
    </div>
  );
}
