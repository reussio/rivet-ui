"use client";

import { ComponentExample } from "@/app/component-example";
import {
  ThemeMenu,
  ThemeSwitcher,
  useTheme,
} from "@/registry/rivetui/components/theme-switcher/theme-switcher";

const primaryCode = `"use client"

import { ThemeSwitcher, useTheme } from "@/components/ui/theme-switcher"

const themeOptions = {
  defaultTheme: "dark",
  storageKey: "rivet-ui:theme",
}

export function ThemeSettings() {
  const { theme, resolvedTheme } = useTheme(themeOptions)

  return (
    <div className="divide-y divide-border border border-border">
      <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <p className="text-sm font-medium">Interface theme</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Match the system or choose a fixed appearance.
          </p>
        </div>
        <ThemeSwitcher {...themeOptions} />
      </div>
      <dl className="grid grid-cols-2 divide-x divide-border font-mono text-[0.625rem] uppercase tracking-[0.14em]">
        <ThemeMetric label="Preference" value={theme} />
        <ThemeMetric label="Resolved" value={resolvedTheme} />
      </dl>
    </div>
  )
}

function ThemeMetric({ label, value }) {
  return (
    <div className="p-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  )
}`;

const menuCode = `import { ThemeMenu } from "@/components/ui/theme-switcher"

const previewThemeOptions = {
  defaultTheme: "dark",
  storageKey: "rivet-ui:theme",
} as const

export function ThemeMenus() {
  return (
    <div className="flex items-center gap-3">
      <ThemeMenu {...previewThemeOptions} />
      <ThemeMenu {...previewThemeOptions} variant="icon" />
    </div>
  )
}`;

const previewThemeOptions = {
  defaultTheme: "dark",
  storageKey: "rivet-ui:theme",
} as const;

export function ThemeSwitcherPreview() {
  const { theme, resolvedTheme } = useTheme(previewThemeOptions);

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Use the segmented switcher when all theme choices should remain immediately visible."
        note="ThemeScript prevents a flash of the wrong theme during the initial page load."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow
        label="Menu triggers"
        description="Choose a labelled menu for clarity or an icon trigger where horizontal space is limited."
        note="The disabled prop is available on the switcher and both menu variants."
        code={menuCode}
      >
        <ThemeMenu {...previewThemeOptions} />
        <ThemeMenu {...previewThemeOptions} variant="icon" />
      </PreviewRow>
    </div>
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

function PreviewRow({
  label,
  children,
  code,
  description,
  note,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
  note?: string;
}) {
  return (
    <ComponentExample title={label} description={description} note={note} code={code}>
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </ComponentExample>
  );
}
