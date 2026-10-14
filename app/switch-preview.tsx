import { ComponentExample } from "@/app/component-example";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivetui/components/field/field";
import { Switch } from "@/registry/rivetui/components/switch/switch";

const fieldCode = `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function FailoverSwitch() {
  return (
    <Field className="grid-cols-[minmax(0,1fr)_auto] gap-x-4">
      <div className="grid gap-1">
        <FieldLabel htmlFor="failover">Automatic failover</FieldLabel>
        <FieldDescription id="failover-description">
          Route traffic to a healthy region when the primary is unavailable.
        </FieldDescription>
      </div>
      <Switch
        id="failover"
        name="failover"
        defaultChecked
        aria-describedby="failover-description"
      />
    </Field>
  )
}`;

const statesCode = `import { Switch } from "@/components/ui/switch"

export function SwitchStates() {
  return (
    <div className="flex flex-wrap gap-5">
      <Switch aria-label="Off" />
      <Switch aria-label="On" defaultChecked />
      <Switch aria-label="Disabled" disabled />
      <Switch aria-label="Disabled on" defaultChecked disabled />
    </div>
  )
}`;

const validationCode = `import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function RequiredSwitch() {
  return (
    <Field className="grid-cols-[minmax(0,1fr)_auto] gap-x-4">
      <div className="grid gap-1">
        <FieldLabel htmlFor="production">Protected production</FieldLabel>
        <FieldError id="production-error">Enable this control before launch.</FieldError>
      </div>
      <Switch
        id="production"
        required
        aria-invalid
        aria-describedby="production-error"
      />
    </Field>
  )
}`;

export function SwitchPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="With supporting text"
        description="Place the immediate setting beside a clear label and concise consequence."
        code={fieldCode}
      >
        <Field className="w-full max-w-xl grid-cols-[minmax(0,1fr)_auto] gap-x-4">
          <div className="grid gap-1">
            <FieldLabel htmlFor="preview-failover">Automatic failover</FieldLabel>
            <FieldDescription id="preview-failover-description">
              Route traffic to a healthy region when the primary is unavailable.
            </FieldDescription>
          </div>
          <Switch
            id="preview-failover"
            name="failover"
            defaultChecked
            aria-describedby="preview-failover-description"
          />
        </Field>
      </ComponentExample>

      <ComponentExample
        title="States"
        description="On, off, and disabled switches retain a consistent target and alignment."
        code={statesCode}
      >
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Switch aria-label="Off" />
          <Switch aria-label="On" defaultChecked />
          <Switch aria-label="Disabled" disabled />
          <Switch aria-label="Disabled on" defaultChecked disabled />
        </div>
      </ComponentExample>

      <ComponentExample
        title="Validation"
        description="Use semantic invalid state and a connected error when a switch is required."
        code={validationCode}
      >
        <Field className="w-full max-w-xl grid-cols-[minmax(0,1fr)_auto] gap-x-4">
          <div className="grid gap-1">
            <FieldLabel htmlFor="preview-production">Protected production</FieldLabel>
            <FieldError id="preview-production-error">
              Enable this control before launch.
            </FieldError>
          </div>
          <Switch
            id="preview-production"
            required
            aria-invalid
            aria-describedby="preview-production-error"
          />
        </Field>
      </ComponentExample>
    </div>
  );
}
