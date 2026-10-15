import { ComponentExample } from "@/app/component-example";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from "@/registry/rivetui/components/number-field/number-field";

const defaultCode = `import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from "@/components/ui/number-field"

export function ReplicaCount() {
  return (
    <NumberField defaultValue={3} min={1} max={12} className="max-w-xs">
      <NumberFieldLabel htmlFor="replicas">Replicas</NumberFieldLabel>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput id="replicas" />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  )
}`;

const formattedCode = `import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from "@/components/ui/number-field"

export function MonthlyBudget() {
  return (
    <NumberField
      defaultValue={2500}
      min={0}
      step={100}
      locale="en-US"
      format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      className="max-w-xs"
    >
      <NumberFieldLabel htmlFor="monthly-budget">Monthly budget</NumberFieldLabel>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput id="monthly-budget" />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  )
}`;

export function NumberFieldPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Adjust a constrained numeric value with buttons, arrow keys, or direct entry."
        code={defaultCode}
      >
        <NumberField defaultValue={3} min={1} max={12} className="max-w-xs">
          <NumberFieldLabel htmlFor="replicas-preview">Replicas</NumberFieldLabel>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput id="replicas-preview" />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </ComponentExample>

      <ComponentExample
        title="Formatted value"
        description="Use the native Intl number format options without changing the raw numeric value."
        note="Arrow keys change the value by $100. Hold Shift for $10 steps, or Alt for $0.10 steps."
        code={formattedCode}
      >
        <NumberField
          defaultValue={2500}
          min={0}
          step={100}
          locale="en-US"
          format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
          className="max-w-xs"
        >
          <NumberFieldLabel htmlFor="monthly-budget-preview">Monthly budget</NumberFieldLabel>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput id="monthly-budget-preview" />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </ComponentExample>
    </div>
  );
}
