import { ComponentExample } from "@/app/component-example";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivetui/components/field/field";
import { Textarea } from "@/registry/rivetui/components/textarea/textarea";

const defaultCode = `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function ReleaseNotes() {
  return (
    <Field>
      <FieldLabel htmlFor="release-notes">Release notes</FieldLabel>
      <Textarea
        id="release-notes"
        placeholder="Describe the operational changes…"
        aria-describedby="release-notes-description"
      />
      <FieldDescription id="release-notes-description">
        Visible to everyone with access to this deployment.
      </FieldDescription>
    </Field>
  )
}`;

const statesCode = `import { Textarea } from "@/components/ui/textarea"

export function TextareaStates() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Textarea defaultValue="Traffic shifts after all health checks pass." />
      <Textarea defaultValue="Generated after deployment." disabled />
    </div>
  )
}`;

const validationCode = `import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function IncidentReason() {
  return (
    <Field>
      <FieldLabel htmlFor="incident-reason">Incident reason</FieldLabel>
      <Textarea
        id="incident-reason"
        defaultValue="Service unavailable."
        aria-invalid
        aria-describedby="incident-reason-error"
      />
      <FieldError id="incident-reason-error">Provide at least 30 characters.</FieldError>
    </Field>
  )
}`;

export function TextareaPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="With supporting text"
        description="Use a native textarea for longer content and explain how the value will be used."
        code={defaultCode}
      >
        <Field className="w-full max-w-xl">
          <FieldLabel htmlFor="preview-release-notes">Release notes</FieldLabel>
          <Textarea
            id="preview-release-notes"
            placeholder="Describe the operational changes…"
            aria-describedby="preview-release-notes-description"
          />
          <FieldDescription id="preview-release-notes-description">
            Visible to everyone with access to this deployment.
          </FieldDescription>
        </Field>
      </ComponentExample>

      <ComponentExample
        title="States"
        description="Populated and disabled textareas keep the same vertical rhythm and resize behavior."
        code={statesCode}
      >
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Textarea defaultValue="Traffic shifts after all health checks pass." />
          <Textarea defaultValue="Generated after deployment." disabled />
        </div>
      </ComponentExample>

      <ComponentExample
        title="Validation"
        description="Associate invalid multiline input with a specific correction message."
        code={validationCode}
      >
        <Field className="w-full max-w-xl">
          <FieldLabel htmlFor="preview-incident-reason">Incident reason</FieldLabel>
          <Textarea
            id="preview-incident-reason"
            defaultValue="Service unavailable."
            aria-invalid
            aria-describedby="preview-incident-reason-error"
          />
          <FieldError id="preview-incident-reason-error">
            Provide at least 30 characters.
          </FieldError>
        </Field>
      </ComponentExample>
    </div>
  );
}
