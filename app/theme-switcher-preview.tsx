"use client";

import { ThemeSwitcher, useTheme } from "@/registry/rivet/blocks/theme-switcher/theme-switcher";

const previewThemeOptions = {
  defaultTheme: "dark",
  storageKey: "rivet-ui:theme",
} as const;

export function ThemeSwitcherPreview() {
  const { theme, resolvedTheme } = useTheme(previewThemeOptions);

  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="theme-switcher-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 034
          </p>
          <h2
            id="theme-switcher-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Theme Switcher
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Appearance
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="divide-y divide-border border border-border">
            <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
              <div>
                <p className="text-sm font-medium">Interface theme</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Match the system or choose a fixed appearance.
                </p>
              </div>
              <ThemeSwitcher {...previewThemeOptions} />
            </div>
            <dl className="grid grid-cols-2 divide-x divide-border font-mono text-[0.625rem] uppercase tracking-[0.14em]">
              <ThemeMetric label="Preference" value={theme} />
              <ThemeMetric label="Resolved" value={resolvedTheme} />
            </dl>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Modes" detail="3" />
            <Specification term="Storage" detail="Local" />
            <Specification term="System" detail="Live" />
            <Specification term="Keys" detail="Arrows" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Disabled">
          <ThemeSwitcher {...previewThemeOptions} disabled />
        </PreviewRow>
      </div>
    </section>
  );
}

function ThemeMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd>{detail}</dd>
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
