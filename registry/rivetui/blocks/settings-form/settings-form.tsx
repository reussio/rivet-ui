"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/rivetui/components/button/button";
import { Field, FieldDescription, FieldLabel } from "@/registry/rivetui/components/field/field";
import { Input } from "@/registry/rivetui/components/input/input";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/rivetui/components/number-field/number-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/rivetui/components/select/select";
import { Switch } from "@/registry/rivetui/components/switch/switch";

const regions = [
  { label: "Frankfurt · eu-central-1", value: "fra" },
  { label: "London · eu-west-2", value: "lhr" },
  { label: "Virginia · us-east-1", value: "iad" },
] as const;

type SettingsFormProps = Omit<React.ComponentProps<"form">, "children">;

function SettingsForm({ className, onSubmit, ...props }: SettingsFormProps) {
  return (
    <form
      aria-labelledby="workspace-settings-title"
      className={cn("w-full max-w-3xl border border-border bg-background", className)}
      onSubmit={onSubmit}
      {...props}
    >
      <header className="border-b border-border p-5 sm:p-6">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Workspace / General
        </p>
        <h2
          id="workspace-settings-title"
          className="mt-3 text-xl font-semibold tracking-[-0.035em]"
        >
          Workspace settings
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Configure the defaults used for new deployments and operational data.
        </p>
      </header>

      <div className="grid gap-6 p-5 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
            <Input id="workspace-name" name="workspaceName" defaultValue="Northstar Systems" />
            <FieldDescription>Shown to every member of the workspace.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="default-region">Default region</FieldLabel>
            <Select items={regions} defaultValue="fra" name="region">
              <SelectTrigger id="default-region" aria-describedby="default-region-description">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription id="default-region-description">
              New services start in this region.
            </FieldDescription>
          </Field>
        </div>

        <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="retention-days">Log retention</FieldLabel>
            <NumberField
              id="retention-days"
              defaultValue={30}
              min={7}
              max={90}
              step={1}
              name="retentionDays"
            >
              <NumberFieldGroup>
                <NumberFieldDecrement />
                <NumberFieldInput aria-describedby="retention-description" />
                <NumberFieldIncrement />
              </NumberFieldGroup>
            </NumberField>
            <FieldDescription id="retention-description">Between 7 and 90 days.</FieldDescription>
          </Field>

          <div className="flex min-h-24 items-start justify-between gap-6 border border-border p-4">
            <div className="min-w-0">
              <label htmlFor="preview-features" className="text-sm font-medium">
                Preview features
              </label>
              <p
                id="preview-features-description"
                className="mt-1 text-sm leading-5 text-muted-foreground"
              >
                Enable qualified beta capabilities for this workspace.
              </p>
            </div>
            <Switch
              id="preview-features"
              name="previewFeatures"
              defaultChecked
              aria-describedby="preview-features-description"
            />
          </div>
        </div>
      </div>

      <footer className="flex flex-col-reverse gap-2 border-t border-border p-5 sm:flex-row sm:justify-end sm:p-6">
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Save changes</Button>
      </footer>
    </form>
  );
}

export type { SettingsFormProps };
export { SettingsForm };
