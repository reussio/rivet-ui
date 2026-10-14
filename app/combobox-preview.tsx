"use client";

import { ComponentExample } from "@/app/component-example";
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

const primaryCode = `import {
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
} from "@/components/ui/combobox"

const regions = ["Amsterdam", "Frankfurt", "London", "New York", "Singapore", "Tokyo"]

export function RegionCombobox() {
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
          {(region) => (
            <ComboboxItem key={region} value={region}>{region}</ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`;

const regions = ["Amsterdam", "Frankfurt", "London", "New York", "Singapore", "Tokyo"];

export function ComboboxPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Filter a collection, inspect the empty state, and clear the current selection."
        note={
          <>
            Use the root <code>disabled</code> prop when the entire control is unavailable.
          </>
        }
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="flex min-h-56 items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-sm">
            <RegionCombobox />
          </div>
        </div>
      </ComponentExample>
    </div>
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
