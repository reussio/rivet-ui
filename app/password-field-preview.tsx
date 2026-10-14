import { ComponentExample } from "@/app/component-example";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivetui/components/field/field";
import { PasswordField } from "@/registry/rivetui/components/password-field/password-field";

const defaultCode = `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { PasswordField } from "@/components/ui/password-field"

export function CurrentPassword() {
  return (
    <Field className="w-full max-w-lg">
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <PasswordField
        id="password"
        name="password"
        autoComplete="current-password"
        aria-describedby="password-description"
      />
      <FieldDescription id="password-description">
        Use the password for this workspace.
      </FieldDescription>
    </Field>
  )
}`;

const visibilityCode = `import { PasswordField } from "@/components/ui/password-field"

export function PasswordVisibility() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <PasswordField defaultValue="rivet-password" aria-label="Hidden password" />
      <PasswordField
        defaultValue="rivet-password"
        defaultVisible
        aria-label="Visible password"
      />
    </div>
  )
}`;

const validationCode = `import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { PasswordField } from "@/components/ui/password-field"

export function NewPassword() {
  return (
    <Field className="w-full max-w-lg">
      <FieldLabel htmlFor="new-password">New password</FieldLabel>
      <PasswordField
        id="new-password"
        autoComplete="new-password"
        defaultValue="short"
        aria-invalid
        aria-describedby="password-error"
      />
      <FieldError id="password-error">Use at least 12 characters.</FieldError>
    </Field>
  )
}`;

export function PasswordFieldPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Keep native password-manager behavior while providing an accessible visibility control."
        code={defaultCode}
      >
        <Field className="w-full max-w-lg">
          <FieldLabel htmlFor="preview-password">Password</FieldLabel>
          <PasswordField
            id="preview-password"
            name="password"
            autoComplete="current-password"
            aria-describedby="preview-password-description"
          />
          <FieldDescription id="preview-password-description">
            Use the password for this workspace.
          </FieldDescription>
        </Field>
      </ComponentExample>

      <ComponentExample
        title="Initial visibility"
        description="The field can start hidden or visible without changing the submitted value."
        code={visibilityCode}
      >
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <PasswordField defaultValue="rivet-password" aria-label="Hidden password" />
          <PasswordField
            defaultValue="rivet-password"
            defaultVisible
            aria-label="Visible password"
          />
        </div>
      </ComponentExample>

      <ComponentExample
        title="Validation"
        description="The invalid state remains restrained until keyboard focus is visible."
        code={validationCode}
      >
        <Field className="w-full max-w-lg">
          <FieldLabel htmlFor="preview-new-password">New password</FieldLabel>
          <PasswordField
            id="preview-new-password"
            autoComplete="new-password"
            defaultValue="short"
            aria-invalid
            aria-describedby="preview-password-error"
          />
          <FieldError id="preview-password-error">Use at least 12 characters.</FieldError>
        </Field>
      </ComponentExample>
    </div>
  );
}
