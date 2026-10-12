import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivet/components/field/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/rivet/components/select/select";

const regions = [
  "Amsterdam / eu-west",
  "Berlin / eu-central",
  "Frankfurt / eu-central-2",
  "London / eu-west-2",
  "New York / us-east",
  "San Francisco / us-west",
  "Singapore / ap-southeast",
  "Sydney / ap-southeast-2",
  "Tokyo / ap-northeast",
  "Toronto / ca-central",
  "Warsaw / eu-east",
  "Zurich / eu-central-3",
];

const runtimeItems = [
  { label: "Node.js 24", value: "node" },
  { label: "Bun 1.3", value: "bun" },
  { label: "Deno 2", value: "deno" },
];

const environmentItems = [
  { label: "Preview", value: "preview" },
  { label: "Production", value: "production" },
];

const channelItems = [
  { label: "Stable", value: "stable" },
  { label: "Canary", value: "canary" },
];

const databaseItems = [
  { label: "PostgreSQL", value: "postgres" },
  { label: "MySQL", value: "mysql" },
  { label: "MongoDB", value: "mongo" },
  { label: "Legacy document adapter", value: "legacy" },
];

const profileItems = [
  { label: "Standard deployment profile", value: "standard" },
  {
    label: "Extended production deployment profile with regional failover",
    value: "extended",
  },
];

const regionItems = regions.map((region) => ({ label: region, value: region }));

export function SelectPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="select-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 005
          </p>
          <h2 id="select-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Select
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Single
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <form
            className="divide-y divide-border border border-border"
            aria-label="Runtime settings"
          >
            <div className="p-5 sm:p-6">
              <Field>
                <FieldLabel htmlFor="runtime-select">Runtime</FieldLabel>
                <Select name="runtime" items={runtimeItems} defaultValue="node">
                  <SelectTrigger id="runtime-select" aria-describedby="runtime-description">
                    <SelectValue placeholder="Choose a runtime" />
                  </SelectTrigger>
                  <SelectContent>
                    {runtimeItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription id="runtime-description">
                  Applied to every function in this deployment.
                </FieldDescription>
              </Field>
            </div>
            <div className="p-5 sm:p-6">
              <Field>
                <FieldLabel htmlFor="environment-select">Environment</FieldLabel>
                <Select name="environment" items={environmentItems}>
                  <SelectTrigger
                    id="environment-select"
                    aria-invalid="true"
                    aria-describedby="environment-error"
                  >
                    <SelectValue placeholder="Choose an environment" />
                  </SelectTrigger>
                  <SelectContent>
                    {environmentItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError id="environment-error">Select a target environment.</FieldError>
              </Field>
            </div>
          </form>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Trigger" detail="40 px" />
            <Specification term="Overlay" detail="portal" />
            <Specification term="Input" detail="keyboard" />
            <Specification term="Form" detail="hidden" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="States">
          <Select
            items={[
              { label: "Europe", value: "eu" },
              { label: "United States", value: "us" },
            ]}
          >
            <SelectTrigger className="w-48" aria-label="Placeholder example">
              <SelectValue placeholder="Choose a region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>
          <Select items={channelItems} defaultValue="stable">
            <SelectTrigger className="w-48" aria-label="Selected example">
              <SelectValue placeholder="Choose a channel" />
            </SelectTrigger>
            <SelectContent>
              {channelItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={[{ label: "Locked", value: "locked" }]} defaultValue="locked" disabled>
            <SelectTrigger className="w-48" aria-label="Disabled example">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>
        </PreviewRow>

        <PreviewRow label="Structure">
          <div className="grid w-full gap-3 sm:grid-cols-2">
            <Select items={databaseItems} defaultValue="postgres">
              <SelectTrigger aria-label="Database engine">
                <SelectValue placeholder="Choose an engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Relational</SelectLabel>
                  <SelectItem value="postgres">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Document</SelectLabel>
                  <SelectItem value="mongo">MongoDB</SelectItem>
                  <SelectItem value="legacy" disabled>
                    Legacy document adapter
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select items={profileItems} defaultValue="extended">
              <SelectTrigger aria-label="Long label example">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard deployment profile</SelectItem>
                <SelectItem value="extended">
                  Extended production deployment profile with regional failover
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PreviewRow>

        <PreviewRow label="Scrollable">
          <Select items={regionItems}>
            <SelectTrigger className="max-w-sm" aria-label="Deployment region">
              <SelectValue placeholder="Choose a deployment region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Regions</SelectLabel>
                {regionItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
