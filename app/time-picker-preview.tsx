"use client";

import * as React from "react";

import { TimePicker } from "@/registry/rivet/components/time-picker/time-picker";

export function TimePickerPreview() {
  const [time, setTime] = React.useState<string | undefined>("14:30");

  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="time-picker-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 045
          </p>
          <h2
            id="time-picker-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Time picker
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Local time
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-64 items-center justify-center p-5 sm:p-8 lg:border-r lg:border-border">
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

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Value" detail="hh:mm" />
            <Specification term="Cycles" detail="12 / 24" />
            <Specification term="Adjust" detail="keys / stepper" />
            <Specification term="Form" detail="native value" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="12 hour">
          <TimePicker
            className="max-w-sm"
            defaultValue="09:45"
            hourCycle={12}
            minuteStep={15}
            aria-label="Meeting time"
          />
        </PreviewRow>
        <PreviewRow label="With seconds">
          <TimePicker
            className="max-w-sm"
            defaultValue="18:24:30"
            showSeconds
            secondStep={5}
            aria-label="Precise execution time"
          />
        </PreviewRow>
        <PreviewRow label="Empty">
          <TimePicker className="max-w-sm" aria-label="Optional reminder time" />
        </PreviewRow>
        <PreviewRow label="Invalid">
          <TimePicker
            className="max-w-sm"
            defaultValue="08:00"
            aria-label="Unavailable time"
            aria-invalid="true"
          />
        </PreviewRow>
        <PreviewRow label="Disabled">
          <TimePicker
            className="max-w-sm"
            defaultValue="22:15"
            aria-label="Locked maintenance time"
            disabled
          />
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
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
