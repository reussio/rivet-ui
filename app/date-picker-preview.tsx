"use client";

import { DatePicker, DateRangePicker } from "@/registry/rivet/components/date-picker/date-picker";

const releaseDate = new Date(2026, 9, 22);
const releaseWindow = {
  from: new Date(2026, 9, 22),
  to: new Date(2026, 9, 28),
};

export function DatePickerPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="date-picker-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 039
          </p>
          <h2
            id="date-picker-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Date picker
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Calendar
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-64 items-center justify-center p-5 sm:p-8 lg:border-r lg:border-border">
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

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Input" detail="single date" />
            <Specification term="Navigate" detail="arrow keys" />
            <Specification term="Dismiss" detail="esc / select" />
            <Specification term="Form" detail="yyyy-mm-dd" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Date range">
          <DateRangePicker
            className="max-w-sm"
            defaultValue={releaseWindow}
            formatLocale="en"
            fromName="releaseFrom"
            toName="releaseTo"
          />
        </PreviewRow>
        <PreviewRow label="Empty">
          <DatePicker className="max-w-sm" formatLocale="en" />
        </PreviewRow>
        <PreviewRow label="Constrained">
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
        <PreviewRow label="Disabled">
          <DatePicker className="max-w-sm" defaultValue={releaseDate} formatLocale="en" disabled />
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
