import { ComponentExample } from "@/app/component-example";
import { Checkbox } from "@/registry/rivetui/components/checkbox/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivetui/components/field/field";

const fieldCode = `import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export function TelemetryCheckbox() {
  return (
    <Field className="grid-cols-[auto_minmax(0,1fr)] gap-x-3">
      <Checkbox id="telemetry" name="telemetry" defaultChecked />
      <div className="grid gap-1">
        <FieldLabel htmlFor="telemetry">Anonymous telemetry</FieldLabel>
        <FieldDescription>
          Send operational metrics without account identifiers.
        </FieldDescription>
      </div>
    </Field>
  )
}`;

const statesCode = `import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxStates() {
  return (
    <div className="flex flex-wrap gap-3">
      <Checkbox aria-label="Unchecked" />
      <Checkbox aria-label="Checked" defaultChecked />
      <Checkbox aria-label="Mixed" indeterminate />
      <Checkbox aria-label="Disabled" defaultChecked disabled />
    </div>
  )
}`;

const validationCode = `import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export function RequiredCheckbox() {
  return (
    <Field className="grid-cols-[auto_minmax(0,1fr)] gap-x-3">
      <Checkbox
        id="policy"
        name="policy"
        required
        aria-invalid="true"
        aria-describedby="policy-error"
      />
      <div className="grid gap-1">
        <FieldLabel htmlFor="policy">Accept deployment policy</FieldLabel>
        <FieldError id="policy-error">Approval is required to continue.</FieldError>
      </div>
    </Field>
  )
}`;

export function CheckboxPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="With supporting text"
        description="Connect the control, label, and description so the complete field remains understandable."
        code={fieldCode}
      >
        <Field className="max-w-lg grid-cols-[auto_minmax(0,1fr)] gap-x-3">
          <Checkbox id="preview-telemetry" name="telemetry" defaultChecked />
          <div className="grid gap-1">
            <FieldLabel htmlFor="preview-telemetry">Anonymous telemetry</FieldLabel>
            <FieldDescription>
              Send operational metrics without account identifiers.
            </FieldDescription>
          </div>
        </Field>
      </ComponentExample>

      <ComponentExample
        title="Selection states"
        description="Checkboxes support unchecked, checked, indeterminate, and disabled states."
        code={statesCode}
      >
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Checkbox aria-label="Unchecked" />
          <Checkbox aria-label="Checked" defaultChecked />
          <Checkbox aria-label="Mixed" indeterminate />
          <Checkbox aria-label="Disabled" defaultChecked disabled />
        </div>
      </ComponentExample>

      <ComponentExample
        title="Validation"
        description="Expose invalid state semantically and associate the control with its error message."
        code={validationCode}
      >
        <Field className="max-w-lg grid-cols-[auto_minmax(0,1fr)] gap-x-3">
          <Checkbox
            id="preview-policy"
            name="policy"
            required
            aria-invalid="true"
            aria-describedby="preview-policy-error"
          />
          <div className="grid gap-1">
            <FieldLabel htmlFor="preview-policy">Accept deployment policy</FieldLabel>
            <FieldError id="preview-policy-error">Approval is required to continue.</FieldError>
          </div>
        </Field>
      </ComponentExample>
    </div>
  );
}
