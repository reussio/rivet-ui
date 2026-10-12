import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivetui/components/field/field";
import { Input } from "@/registry/rivetui/components/input/input";

export function InputFieldPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="input-field-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitives / 002—003
          </p>
          <h2
            id="input-field-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Input + Field
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Native
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <form className="divide-y divide-border border border-border" aria-label="API settings">
            <div className="p-5 sm:p-6">
              <Field>
                <FieldLabel htmlFor="api-key">API key</FieldLabel>
                <Input
                  id="api-key"
                  name="apiKey"
                  placeholder="sk_live_..."
                  autoComplete="off"
                  aria-describedby="api-key-description"
                />
                <FieldDescription id="api-key-description">
                  Used to authenticate requests from this workspace.
                </FieldDescription>
              </Field>
            </div>
            <div className="p-5 sm:p-6">
              <Field>
                <FieldLabel htmlFor="billing-email">Billing email</FieldLabel>
                <Input
                  id="billing-email"
                  name="billingEmail"
                  type="email"
                  defaultValue="ops@"
                  aria-invalid="true"
                  aria-describedby="billing-email-error"
                />
                <FieldError id="billing-email-error">Enter a valid email address.</FieldError>
              </Field>
            </div>
          </form>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="input" />
            <Specification term="Height" detail="40 px" />
            <Specification term="Field slots" detail="04" />
            <Specification term="State" detail="native" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Standalone">
          <Input
            className="max-w-sm"
            aria-label="Command filter"
            placeholder="Filter commands..."
            type="search"
          />
          <Input
            className="max-w-sm"
            aria-label="Populated input"
            defaultValue="rivet-production"
          />
        </PreviewRow>

        <PreviewRow label="Field anatomy">
          <div className="grid w-full gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
              <Input id="workspace-name" defaultValue="Northstar" />
            </Field>
            <Field>
              <FieldLabel htmlFor="endpoint">Endpoint</FieldLabel>
              <Input
                id="endpoint"
                type="url"
                placeholder="https://api.example.com"
                aria-describedby="endpoint-description"
              />
              <FieldDescription id="endpoint-description">
                The public base URL for outgoing requests.
              </FieldDescription>
            </Field>
          </div>
        </PreviewRow>

        <PreviewRow label="Semantics">
          <div className="grid w-full gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="required-email">
                Email <span aria-hidden="true">*</span>
              </FieldLabel>
              <Input id="required-email" type="email" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="invalid-token">Access token</FieldLabel>
              <Input
                id="invalid-token"
                defaultValue="invalid-token"
                aria-invalid="true"
                aria-describedby="invalid-token-error"
              />
              <FieldError id="invalid-token-error">Token format is not recognized.</FieldError>
            </Field>
          </div>
        </PreviewRow>

        <PreviewRow label="Disabled">
          <Field className="w-full max-w-xl">
            <FieldLabel htmlFor="disabled-project">Project</FieldLabel>
            <Input id="disabled-project" defaultValue="Archived project" disabled />
            <FieldDescription>Unavailable while the project is archived.</FieldDescription>
          </Field>
        </PreviewRow>

        <PreviewRow label="Native types">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Input aria-label="Email address" type="email" placeholder="name@example.com" />
            <Input aria-label="Password" type="password" defaultValue="rivet-pass" />
            <Input aria-label="Search" type="search" placeholder="Search..." />
            <Input aria-label="Start date" type="date" />
          </div>
        </PreviewRow>
      </div>
    </section>
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
