import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivetui/components/field/field";
import { Textarea } from "@/registry/rivetui/components/textarea/textarea";

export function TextareaPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="textarea-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 015
          </p>
          <h2 id="textarea-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Textarea
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Native
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <Field>
            <FieldLabel htmlFor="release-notes">Release notes</FieldLabel>
            <Textarea
              id="release-notes"
              placeholder="Describe the operational changes in this release..."
              aria-describedby="release-notes-description"
            />
            <FieldDescription id="release-notes-description">
              Visible to everyone with access to this deployment.
            </FieldDescription>
          </Field>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="textarea" />
            <Specification term="Minimum" detail="96 px" />
            <Specification term="Resize" detail="vertical" />
            <Specification term="Focus" detail="keyboard" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="States">
          <div className="grid w-full gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="textarea-populated">Configuration note</FieldLabel>
              <Textarea
                id="textarea-populated"
                defaultValue="Traffic shifts to the Frankfurt region after all health checks pass."
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="textarea-disabled">Generated summary</FieldLabel>
              <Textarea
                id="textarea-disabled"
                defaultValue="Generated after deployment."
                disabled
              />
            </Field>
          </div>
        </PreviewRow>

        <PreviewRow label="Validation">
          <Field className="w-full max-w-xl">
            <FieldLabel htmlFor="incident-reason">Incident reason</FieldLabel>
            <Textarea
              id="incident-reason"
              defaultValue="Service unavailable."
              aria-invalid="true"
              aria-describedby="incident-reason-error"
            />
            <FieldError id="incident-reason-error">Provide at least 30 characters.</FieldError>
          </Field>
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
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </div>
  );
}
