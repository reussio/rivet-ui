import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivet/components/field/field";
import {
  RadioGroup,
  RadioOption,
  RadioOptionDescription,
  RadioOptionLabel,
} from "@/registry/rivet/components/radio-group/radio-group";

export function RadioGroupPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="radio-group-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 006
          </p>
          <h2
            id="radio-group-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Radio Group
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Single choice
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <form aria-label="Deployment configuration">
            <Field>
              <FieldLabel id="deployment-environment-label">Deployment environment</FieldLabel>
              <FieldDescription id="deployment-environment-description">
                Select the environment that receives the next release.
              </FieldDescription>
              <RadioGroup
                name="deploymentEnvironment"
                defaultValue="staging"
                aria-labelledby="deployment-environment-label"
                aria-describedby="deployment-environment-description"
              >
                <RadioOption value="development">
                  <RadioOptionLabel>Development</RadioOptionLabel>
                  <RadioOptionDescription>
                    Used for local and internal testing.
                  </RadioOptionDescription>
                </RadioOption>
                <RadioOption value="staging">
                  <RadioOptionLabel>Staging</RadioOptionLabel>
                  <RadioOptionDescription>
                    Mirrors production for final verification.
                  </RadioOptionDescription>
                </RadioOption>
                <RadioOption value="production">
                  <RadioOptionLabel>Production</RadioOptionLabel>
                  <RadioOptionDescription>
                    Routes the release to all live traffic.
                  </RadioOptionDescription>
                </RadioOption>
              </RadioGroup>
            </Field>
          </form>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Control" detail="16 px" />
            <Specification term="Selection" detail="one" />
            <Specification term="Input" detail="radio" />
            <Specification term="Navigation" detail="arrows" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Compact grid">
          <RadioGroup
            defaultValue="weekly"
            aria-label="Backup frequency"
            className="sm:grid-cols-3"
          >
            <RadioOption value="daily">
              <RadioOptionLabel>Daily</RadioOptionLabel>
            </RadioOption>
            <RadioOption value="weekly">
              <RadioOptionLabel>Weekly</RadioOptionLabel>
            </RadioOption>
            <RadioOption value="monthly">
              <RadioOptionLabel>Monthly</RadioOptionLabel>
            </RadioOption>
          </RadioGroup>
        </PreviewRow>

        <PreviewRow label="Option states">
          <RadioGroup defaultValue="automatic" aria-label="Update strategy">
            <RadioOption value="automatic">
              <RadioOptionLabel>Automatic</RadioOptionLabel>
              <RadioOptionDescription>Selected and managed by the system.</RadioOptionDescription>
            </RadioOption>
            <RadioOption value="manual">
              <RadioOptionLabel>Manual</RadioOptionLabel>
              <RadioOptionDescription>
                Requires an explicit deployment action.
              </RadioOptionDescription>
            </RadioOption>
            <RadioOption value="legacy" disabled>
              <RadioOptionLabel>Legacy scheduler</RadioOptionLabel>
              <RadioOptionDescription>No longer available for new projects.</RadioOptionDescription>
            </RadioOption>
          </RadioGroup>
        </PreviewRow>

        <PreviewRow label="Field error">
          <Field>
            <FieldLabel id="notification-channel-label">Notification channel</FieldLabel>
            <RadioGroup
              name="notificationChannel"
              required
              aria-invalid="true"
              aria-labelledby="notification-channel-label"
              aria-describedby="notification-channel-error"
            >
              <RadioOption value="email">
                <RadioOptionLabel>Email</RadioOptionLabel>
                <RadioOptionDescription>
                  Send incidents to the operations inbox.
                </RadioOptionDescription>
              </RadioOption>
              <RadioOption value="webhook">
                <RadioOptionLabel>Webhook</RadioOptionLabel>
                <RadioOptionDescription>
                  Forward incidents to an HTTPS endpoint.
                </RadioOptionDescription>
              </RadioOption>
            </RadioGroup>
            <FieldError id="notification-channel-error">
              Select one notification channel.
            </FieldError>
          </Field>
        </PreviewRow>

        <PreviewRow label="Group states">
          <Field className="w-full max-w-xl">
            <FieldLabel id="disabled-mode-label">Disabled</FieldLabel>
            <RadioGroup defaultValue="locked" disabled aria-labelledby="disabled-mode-label">
              <RadioOption value="locked">
                <RadioOptionLabel>Locked configuration</RadioOptionLabel>
              </RadioOption>
              <RadioOption value="alternate">
                <RadioOptionLabel>Alternate configuration</RadioOptionLabel>
              </RadioOption>
            </RadioGroup>
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
