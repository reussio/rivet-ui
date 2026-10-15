import { ComponentExample } from "@/app/component-example";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/registry/rivetui/components/multi-select/multi-select";

const environments = [
  { label: "Development", value: "development" },
  { label: "Preview", value: "preview" },
  { label: "Staging", value: "staging" },
  { label: "Production", value: "production" },
];

const defaultCode = `import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"

const environments = [
  { label: "Development", value: "development" },
  { label: "Preview", value: "preview" },
  { label: "Staging", value: "staging" },
  { label: "Production", value: "production" },
]

export function EnvironmentSelect() {
  return (
    <MultiSelect items={environments} defaultValue={["preview", "staging"]}>
      <MultiSelectTrigger className="max-w-sm" aria-label="Deployment environments">
        <MultiSelectValue placeholder="Choose environments" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        {environments.map((environment) => (
          <MultiSelectItem key={environment.value} value={environment.value}>
            {environment.label}
          </MultiSelectItem>
        ))}
      </MultiSelectContent>
    </MultiSelect>
  )
}`;

export function MultiSelectPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Choose several values from a compact list without adding a search field."
        note="The popup stays open while values are toggled. Press Escape or move focus away when the selection is complete."
        code={defaultCode}
      >
        <MultiSelect items={environments} defaultValue={["preview", "staging"]}>
          <MultiSelectTrigger className="max-w-sm" aria-label="Deployment environments">
            <MultiSelectValue placeholder="Choose environments" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            {environments.map((environment) => (
              <MultiSelectItem key={environment.value} value={environment.value}>
                {environment.label}
              </MultiSelectItem>
            ))}
          </MultiSelectContent>
        </MultiSelect>
      </ComponentExample>
    </div>
  );
}
