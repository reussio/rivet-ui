"use client";

import * as React from "react";
import { ComponentExample } from "@/app/component-example";
import { TimePicker } from "@/registry/rivetui/components/time-picker/time-picker";

const primaryCode = `"use client"

import * as React from "react"
import { TimePicker } from "@/components/ui/time-picker"

export function DeploymentTime() {
  const [time, setTime] = React.useState<string | undefined>("14:30")

  return (
    <div className="w-full max-w-sm space-y-2">
      <label
        htmlFor="deployment-time"
        className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]"
      >
        Deployment time
      </label>
      <TimePicker
        id="deployment-time"
        name="deploymentTime"
        value={time}
        onValueChange={setTime}
        minuteStep={5}
      />
      <p className="text-sm text-muted-foreground">
        {time ? \`Scheduled for \${time}.\` : "No deployment time selected."}
      </p>
    </div>
  )
}`;

const formatsCode = `import { TimePicker } from "@/components/ui/time-picker"

<div className="grid gap-4 sm:grid-cols-2">
  <TimePicker
    defaultValue="09:45"
    hourCycle={12}
    minuteStep={15}
    aria-label="Meeting time"
  />
  <TimePicker
    defaultValue="18:24:30"
    showSeconds
    secondStep={5}
    aria-label="Precise execution time"
  />
</div>`;

const statesCode = `import { TimePicker } from "@/components/ui/time-picker"

<div className="grid gap-4 sm:grid-cols-3">
  <TimePicker aria-label="Optional time" />
  <TimePicker defaultValue="08:00" aria-label="Invalid time" aria-invalid />
  <TimePicker defaultValue="22:15" aria-label="Locked time" disabled />
</div>`;

export function TimePickerPreview() {
  const [time, setTime] = React.useState<string | undefined>("14:30");

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Use the compact 24-hour picker for scheduling without a separate confirmation step."
        note="Omit value and defaultValue for an empty picker. Values use HH:mm or HH:mm:ss when seconds are enabled."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="flex min-h-64 items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-sm space-y-2">
            <label
              htmlFor="deployment-time"
              className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]"
            >
              Deployment time
            </label>
            <TimePicker
              id="deployment-time"
              name="deploymentTime"
              value={time}
              onValueChange={setTime}
              minuteStep={5}
            />
            <p className="text-sm text-muted-foreground">
              {time ? `Scheduled for ${time}.` : "No deployment time selected."}
            </p>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Formats"
        description="Switch to a 12-hour clock or add seconds only when the workflow requires that precision."
        code={formatsCode}
      >
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <TimePicker
            defaultValue="09:45"
            hourCycle={12}
            minuteStep={15}
            aria-label="Meeting time"
          />
          <TimePicker
            defaultValue="18:24:30"
            showSeconds
            secondStep={5}
            aria-label="Precise execution time"
          />
        </div>
      </PreviewRow>
      <PreviewRow
        label="Form states"
        description="Empty, invalid, and disabled states follow the same semantics as other Rivet controls."
        code={statesCode}
      >
        <div className="grid w-full gap-4 sm:grid-cols-3">
          <TimePicker aria-label="Optional time" />
          <TimePicker defaultValue="08:00" aria-label="Invalid time" aria-invalid="true" />
          <TimePicker defaultValue="22:15" aria-label="Locked time" disabled />
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
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
