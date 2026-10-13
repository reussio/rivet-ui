"use client";

import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
} from "@/registry/rivetui/components/combobox/combobox";

const regions = ["Amsterdam", "Frankfurt", "London", "New York", "Singapore", "Tokyo"];

export function ComboboxPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="combobox-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 029
          </p>
          <h2 id="combobox-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Combobox
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Search + Select
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-56 items-center justify-center p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="w-full max-w-sm">
            <RegionCombobox />
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Pattern" detail="ARIA" />
            <Specification term="Filter" detail="Native" />
            <Specification term="Keyboard" detail="Complete" />
            <Specification term="Portal" detail="Yes" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Disabled">
          <div className="w-full max-w-sm">
            <Combobox items={regions} disabled>
              <ComboboxLabel htmlFor="disabled-region">Region</ComboboxLabel>
              <ComboboxInputGroup>
                <ComboboxInput id="disabled-region" placeholder="Select a region" />
                <ComboboxTrigger aria-label="Open regions" />
              </ComboboxInputGroup>
            </Combobox>
          </div>
        </PreviewRow>
      </div>
    </section>
  );
}

function RegionCombobox() {
  return (
    <Combobox items={regions} autoHighlight>
      <ComboboxLabel htmlFor="deployment-region">Deployment region</ComboboxLabel>
      <ComboboxInputGroup>
        <ComboboxInput id="deployment-region" placeholder="Search regions" />
        <ComboboxClear aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open regions" />
      </ComboboxInputGroup>
      <ComboboxContent>
        <ComboboxEmpty>No regions found.</ComboboxEmpty>
        <ComboboxList>
          {(region: string) => (
            <ComboboxItem key={region} value={region}>
              {region}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
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
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
