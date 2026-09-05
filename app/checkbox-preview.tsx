import { Checkbox } from "@/registry/rivet/blocks/checkbox/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivet/blocks/field/field";

export function CheckboxPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="checkbox-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 004
          </p>
          <h2 id="checkbox-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Checkbox
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Boolean
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <form
            className="divide-y divide-border border border-border"
            aria-label="Deployment checks"
          >
            <CheckboxField
              id="lint-check"
              label="Static analysis"
              description="Lint and type checks completed without errors."
              defaultChecked
            />
            <CheckboxField
              id="test-check"
              label="Integration suite"
              description="Run all browser and API integration tests."
            />
            <CheckboxField
              id="review-check"
              label="Review status"
              description="Some review requirements are complete."
              indeterminate
            />
          </form>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Control" detail="16 px" />
            <Specification term="States" detail="03" />
            <Specification term="Input" detail="hidden" />
            <Specification term="Form" detail="native" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="States">
          <StateSample label="Unchecked">
            <Checkbox aria-label="Unchecked" />
          </StateSample>
          <StateSample label="Checked">
            <Checkbox aria-label="Checked" defaultChecked />
          </StateSample>
          <StateSample label="Mixed">
            <Checkbox aria-label="Mixed" indeterminate />
          </StateSample>
        </PreviewRow>

        <PreviewRow label="System states">
          <StateSample label="Disabled">
            <Checkbox aria-label="Disabled unchecked" disabled />
          </StateSample>
          <StateSample label="Disabled checked">
            <Checkbox aria-label="Disabled checked" defaultChecked disabled />
          </StateSample>
          <StateSample label="Read only">
            <Checkbox aria-label="Read only" defaultChecked readOnly />
          </StateSample>
          <StateSample label="Invalid">
            <Checkbox aria-label="Invalid" aria-invalid="true" />
          </StateSample>
        </PreviewRow>

        <PreviewRow label="Field anatomy">
          <div className="grid w-full gap-5 sm:grid-cols-2">
            <Field className="grid-cols-[auto_minmax(0,1fr)] gap-x-3">
              <Checkbox id="telemetry" name="telemetry" defaultChecked />
              <div className="grid gap-1">
                <FieldLabel htmlFor="telemetry">Anonymous telemetry</FieldLabel>
                <FieldDescription id="telemetry-description">
                  Send operational metrics without account identifiers.
                </FieldDescription>
              </div>
            </Field>
            <Field className="grid-cols-[auto_minmax(0,1fr)] gap-x-3">
              <Checkbox
                id="terms"
                name="terms"
                required
                aria-invalid="true"
                aria-describedby="terms-error"
              />
              <div className="grid gap-1">
                <FieldLabel htmlFor="terms">Accept deployment policy *</FieldLabel>
                <FieldError id="terms-error">Approval is required to continue.</FieldError>
              </div>
            </Field>
          </div>
        </PreviewRow>
      </div>
    </section>
  );
}

function CheckboxField({
  id,
  label,
  description,
  ...props
}: {
  id: string;
  label: string;
  description: string;
} & CheckboxPrimitiveProps) {
  const descriptionId = `${id}-description`;

  return (
    <Field className="grid-cols-[auto_minmax(0,1fr)] gap-x-3 p-5 sm:p-6">
      <Checkbox id={id} name={id} aria-describedby={descriptionId} {...props} />
      <div className="grid gap-1">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      </div>
    </Field>
  );
}

type CheckboxPrimitiveProps = React.ComponentProps<typeof Checkbox>;

function StateSample({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-28 items-center gap-3 border border-border px-3 py-2.5">
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
