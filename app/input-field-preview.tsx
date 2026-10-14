import { ComponentExample } from "@/app/component-example";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivetui/components/field/field";
import { Input } from "@/registry/rivetui/components/input/input";

const primaryCode = `import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<form className="divide-y divide-border border border-border" aria-label="API settings">
  <div className="p-5 sm:p-6">
    <Field>
      <FieldLabel htmlFor="api-key">API key</FieldLabel>
      <Input
        id="api-key"
        name="apiKey"
        placeholder="sk_live_..."
        autoComplete="off"
        aria-describedby="api-key-description"
      />
      <FieldDescription id="api-key-description">
        Used to authenticate requests from this workspace.
      </FieldDescription>
    </Field>
  </div>
  <div className="p-5 sm:p-6">
    <Field>
      <FieldLabel htmlFor="billing-email">Billing email</FieldLabel>
      <Input
        id="billing-email"
        name="billingEmail"
        type="email"
        defaultValue="ops@"
        aria-invalid="true"
        aria-describedby="billing-email-error"
      />
      <FieldError id="billing-email-error">Enter a valid email address.</FieldError>
    </Field>
  </div>
</form>`;

const statesCode = `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<div className="grid gap-5 sm:grid-cols-2">
  <Field>
    <FieldLabel htmlFor="required-email">
      Email <span aria-hidden="true">*</span>
    </FieldLabel>
    <Input id="required-email" type="email" required />
  </Field>
  <Field>
    <FieldLabel htmlFor="disabled-project">Project</FieldLabel>
    <Input id="disabled-project" defaultValue="Archived project" disabled />
    <FieldDescription>Unavailable while the project is archived.</FieldDescription>
  </Field>
</div>`;

export function InputFieldPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Field anatomy"
        description="Compose labels, descriptions, controls, and validation messages as one semantic field."
        note="Input types and standalone input states are documented on the Input page; Field is responsible for the surrounding form structure."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
          <form className="divide-y divide-border border border-border" aria-label="API settings">
            <div className="p-5 sm:p-6">
              <Field>
                <FieldLabel htmlFor="api-key">API key</FieldLabel>
                <Input
                  id="api-key"
                  name="apiKey"
                  placeholder="sk_live_..."
                  autoComplete="off"
                  aria-describedby="api-key-description"
                />
                <FieldDescription id="api-key-description">
                  Used to authenticate requests from this workspace.
                </FieldDescription>
              </Field>
            </div>
            <div className="p-5 sm:p-6">
              <Field>
                <FieldLabel htmlFor="billing-email">Billing email</FieldLabel>
                <Input
                  id="billing-email"
                  name="billingEmail"
                  type="email"
                  defaultValue="ops@"
                  aria-invalid="true"
                  aria-describedby="billing-email-error"
                />
                <FieldError id="billing-email-error">Enter a valid email address.</FieldError>
              </Field>
            </div>
          </form>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Required and disabled"
        description="Keep native form semantics on the control while Field provides the explanatory context."
        code={statesCode}
      >
        <div className="grid w-full gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="required-email">
              Email <span aria-hidden="true">*</span>
            </FieldLabel>
            <Input id="required-email" type="email" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="disabled-project">Project</FieldLabel>
            <Input id="disabled-project" defaultValue="Archived project" disabled />
            <FieldDescription>Unavailable while the project is archived.</FieldDescription>
          </Field>
        </div>
      </PreviewRow>
    </div>
  );
}

function PreviewRow({
  label,
  children,
  code,
  description,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
}) {
  return (
    <ComponentExample title={label} description={description} code={code}>
      <div className="flex flex-wrap items-center gap-3 p-4">{children}</div>
    </ComponentExample>
  );
}
