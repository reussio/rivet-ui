"use client";

import { Box, FileCode2, Layers3, SearchX } from "lucide-react";
import * as React from "react";

import { Field, FieldLabel } from "@/registry/rivetui/components/field/field";
import { SearchField } from "@/registry/rivetui/components/search-field/search-field";

const registryItems = [
  { name: "Button", category: "Control", icon: Box },
  { name: "Command Bar", category: "Overlay", icon: Layers3 },
  { name: "Search Field", category: "Control", icon: SearchX },
  { name: "Code Block", category: "Developer tool", icon: FileCode2 },
];

export function SearchFieldPreview() {
  const [query, setQuery] = React.useState("");
  const results = registryItems.filter((item) =>
    item.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  );

  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="search-field-preview-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Control / Search
          </p>
          <h2
            id="search-field-preview-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Search Field
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Native input
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="mx-auto w-full max-w-xl border border-border">
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium">Registry index</p>
                <p className="text-xs text-muted-foreground">Find a component by name.</p>
              </div>
              <span
                aria-live="polite"
                aria-atomic="true"
                className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {results.length.toString().padStart(2, "0")} /{" "}
                {registryItems.length.toString().padStart(2, "0")}
              </span>
            </div>

            <div className="border-b border-border p-4">
              <Field>
                <FieldLabel htmlFor="registry-search" className="sr-only">
                  Search registry
                </FieldLabel>
                <SearchField
                  id="registry-search"
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search components…"
                />
              </Field>
            </div>

            <div className="min-h-48 divide-y divide-border">
              {results.length > 0 ? (
                results.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.name} className="flex items-center gap-3 px-4 py-3">
                      <span className="grid size-8 shrink-0 place-items-center border border-border text-muted-foreground">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex min-h-48 flex-col items-center justify-center gap-2 p-6 text-center">
                  <SearchX className="size-5 text-muted-foreground" aria-hidden="true" />
                  <p className="text-sm font-medium">No components found</p>
                  <p className="text-xs text-muted-foreground">Try a shorter or different query.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="Search input" />
            <Specification term="Clear" detail="Button / Esc" />
            <Specification term="Value" detail="Both" />
            <Specification term="Loading" detail="Non-blocking" />
            <Specification term="Form" detail="Native" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Default">
          <SearchField className="max-w-md" placeholder="Search documentation…" />
        </PreviewRow>
        <PreviewRow label="Populated">
          <SearchField className="max-w-md" defaultValue="keyboard shortcut" />
        </PreviewRow>
        <PreviewRow label="Loading">
          <SearchField className="max-w-md" defaultValue="popover" loading />
        </PreviewRow>
        <PreviewRow label="Disabled">
          <SearchField className="max-w-md" defaultValue="Search unavailable" disabled />
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
      <div className="flex min-w-0 flex-wrap items-center p-4">{children}</div>
    </div>
  );
}
