"use client";

import * as React from "react";

import { ComponentExample } from "@/app/component-example";
import { SearchField } from "@/registry/rivetui/components/search-field/search-field";

const registryItems = ["Button", "Command Bar", "Search Field", "Code Block"];

const defaultCode = `import { SearchField } from "@/components/ui/search-field"

export function DocumentationSearch() {
  return <SearchField name="query" placeholder="Search components…" />
}`;

const controlledCode = `"use client"

import * as React from "react"

import { SearchField } from "@/components/ui/search-field"

const items = ["Button", "Command Bar", "Search Field", "Code Block"]

export function RegistrySearch() {
  const [query, setQuery] = React.useState("")
  const results = items.filter((item) =>
    item.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div className="grid gap-3">
      <SearchField value={query} onValueChange={setQuery} placeholder="Search components…" />
      <p>{results.length} components found</p>
    </div>
  )
}`;

const loadingCode = `import { SearchField } from "@/components/ui/search-field"

export function LoadingSearch() {
  return <SearchField defaultValue="popover" loading aria-label="Search documentation" />
}`;

export function SearchFieldPreview() {
  const [query, setQuery] = React.useState("");
  const results = registryItems.filter((item) =>
    item.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  );

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Collect a query with native search behavior and a built-in clear control."
        code={defaultCode}
      >
        <SearchField
          className="max-w-md"
          name="query"
          placeholder="Search components…"
          aria-label="Search components"
        />
      </ComponentExample>

      <ComponentExample
        title="Controlled results"
        description="Use one value callback for typing, the clear button, and the Escape key."
        code={controlledCode}
      >
        <div className="grid w-full max-w-md gap-3">
          <SearchField value={query} onValueChange={setQuery} placeholder="Search components…" />
          <p
            className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground"
            aria-live="polite"
          >
            {results.length.toString().padStart(2, "0")} components found
          </p>
        </div>
      </ComponentExample>

      <ComponentExample
        title="Loading"
        description="Loading feedback remains non-blocking, so the query stays editable and clearable."
        code={loadingCode}
      >
        <SearchField
          className="max-w-md"
          defaultValue="popover"
          loading
          aria-label="Search documentation"
        />
      </ComponentExample>
    </div>
  );
}
