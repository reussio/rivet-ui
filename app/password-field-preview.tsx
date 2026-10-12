"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";

import { Button } from "@/registry/rivet/components/button/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivet/components/field/field";
import { PasswordField } from "@/registry/rivet/components/password-field/password-field";

export function PasswordFieldPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="password-field-preview-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 043
          </p>
          <h2
            id="password-field-preview-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Password field
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Secure input
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <form
            className="mx-auto w-full max-w-lg border border-border"
            aria-label="Workspace login"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex items-center gap-3 border-b border-border p-4">
              <span className="grid size-9 place-items-center border border-border text-muted-foreground">
                <LockKeyhole className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium">Protected workspace</p>
                <p className="text-sm text-muted-foreground">Authenticate to continue.</p>
              </div>
            </div>
            <div className="p-5">
              <Field>
                <FieldLabel htmlFor="workspace-password">Password</FieldLabel>
                <PasswordField
                  id="workspace-password"
                  name="password"
                  defaultValue="engineered-components"
                  autoComplete="current-password"
                  aria-describedby="workspace-password-description"
                />
                <FieldDescription id="workspace-password-description">
                  The value remains native, form-ready, and password-manager compatible.
                </FieldDescription>
              </Field>
            </div>
            <div className="flex justify-end border-t border-border p-4">
              <Button type="submit">
                Continue
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </form>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="input" />
            <Specification term="Toggle" detail="button" />
            <Specification term="Caps lock" detail="detected" />
            <Specification term="Form value" detail="native" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Visibility">
          <div className="grid w-full gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="password-hidden">Hidden</FieldLabel>
              <PasswordField id="password-hidden" defaultValue="rivet-password" />
            </Field>
            <Field>
              <FieldLabel htmlFor="password-visible">Visible</FieldLabel>
              <PasswordField id="password-visible" defaultValue="rivet-password" defaultVisible />
            </Field>
          </div>
        </PreviewRow>

        <PreviewRow label="Invalid">
          <Field className="w-full max-w-lg">
            <FieldLabel htmlFor="password-invalid">New password</FieldLabel>
            <PasswordField
              id="password-invalid"
              defaultValue="short"
              autoComplete="new-password"
              aria-invalid="true"
              aria-describedby="password-invalid-error"
            />
            <FieldError id="password-invalid-error">Use at least 12 characters.</FieldError>
          </Field>
        </PreviewRow>

        <PreviewRow label="Disabled">
          <Field className="w-full max-w-lg">
            <FieldLabel htmlFor="password-disabled">Service password</FieldLabel>
            <PasswordField id="password-disabled" defaultValue="managed-credential" disabled />
            <FieldDescription>Managed by the workspace administrator.</FieldDescription>
          </Field>
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
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </div>
  );
}
