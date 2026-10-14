"use client";

import { ComponentExample } from "@/app/component-example";
import { DatePicker, DateRangePicker } from "@/registry/rivetui/components/date-picker/date-picker";

const primaryCode = `import { DatePicker } from "@/components/ui/date-picker"

const releaseDate = new Date(2026, 9, 22)

export function ReleaseDatePicker() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <label htmlFor="release-date" className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]">
        Release date
      </label>
      <DatePicker
        id="release-date"
        name="releaseDate"
        defaultValue={releaseDate}
        formatLocale="en"
      />
      <p className="text-sm text-muted-foreground">
        Dates are submitted as local YYYY-MM-DD values.
      </p>
    </div>
  )
}`;

const dateRangeCode = `import { DateRangePicker } from "@/components/ui/date-picker"

const releaseWindow = {
  from: new Date(2026, 9, 22),
  to: new Date(2026, 9, 28),
}

export function ReleaseWindowPicker() {
  return (
    <DateRangePicker
      className="max-w-sm"
      defaultValue={releaseWindow}
      formatLocale="en"
      fromName="releaseFrom"
      toName="releaseTo"
    />
  )
}`;

const constrainedCode = `import { DatePicker } from "@/components/ui/date-picker"

const releaseDate = new Date(2026, 9, 22)

export function ConstrainedDatePicker() {
  return (
    <DatePicker
      className="max-w-sm"
      defaultValue={releaseDate}
      formatLocale="en"
      calendarProps={{
        disabled: { before: new Date(2026, 9, 15) },
        startMonth: new Date(2026, 9),
      }}
    />
  )
}`;

const releaseDate = new Date(2026, 9, 22);
const releaseWindow = {
  from: new Date(2026, 9, 22),
  to: new Date(2026, 9, 28),
};

export function DatePickerPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Select a single local date with direct month and year navigation."
        note="Omit value and defaultValue for an empty picker. disabled and aria-invalid follow the same form-state conventions as other Rivet controls."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="flex min-h-64 items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-sm space-y-2">
            <label
              htmlFor="release-date"
              className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]"
            >
              Release date
            </label>
            <DatePicker
              id="release-date"
              name="releaseDate"
              defaultValue={releaseDate}
              formatLocale="en"
            />
            <p className="text-sm text-muted-foreground">
              Dates are submitted as local YYYY-MM-DD values.
            </p>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Date range"
        description="Collect a start and end date in one coordinated calendar."
        code={dateRangeCode}
      >
        <DateRangePicker
          className="max-w-sm"
          defaultValue={releaseWindow}
          formatLocale="en"
          fromName="releaseFrom"
          toName="releaseTo"
        />
      </PreviewRow>
      <PreviewRow
        label="Constrained dates"
        description="Pass calendar rules through calendarProps when only part of the calendar is selectable."
        code={constrainedCode}
      >
        <DatePicker
          className="max-w-sm"
          defaultValue={releaseDate}
          formatLocale="en"
          calendarProps={{
            disabled: { before: new Date(2026, 9, 15) },
            startMonth: new Date(2026, 9),
          }}
        />
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
