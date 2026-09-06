"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Monitor, Moon, Sun } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = Exclude<Theme, "system">;
type ThemeSnapshot = `${Theme}:${ResolvedTheme}`;

type ThemeStoreOptions = {
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeSwitcherProps = Omit<
  RadioGroupPrimitive.Props<Theme>,
  "children" | "defaultValue" | "onValueChange" | "value"
> &
  ThemeStoreOptions & {
    onValueChange?: (theme: Theme) => void;
  };

const defaultStorageKey = "theme";
const themeChangeEvent = "rivet-ui:theme-change";
const themeMemory = new Map<string, Theme>();

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

function ThemeSwitcher({
  className,
  defaultTheme = "system",
  storageKey = defaultStorageKey,
  onValueChange,
  "aria-label": ariaLabel = "Color theme",
  ...props
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme({ defaultTheme, storageKey });

  function selectTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    onValueChange?.(nextTheme);
  }

  return (
    <RadioGroupPrimitive
      data-slot="theme-switcher"
      value={theme}
      onValueChange={selectTheme}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-none border border-border bg-muted/40 p-1",
        className,
      )}
      {...props}
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;

        return (
          <RadioPrimitive.Root
            key={option.value}
            value={option.value}
            aria-label={`Use ${option.label.toLowerCase()} theme`}
            className="inline-flex h-9 flex-none cursor-pointer items-center justify-center gap-2 rounded-none border border-transparent px-3 text-sm font-medium whitespace-nowrap text-muted-foreground outline-none transition-[background-color,border-color,box-shadow,color,opacity] duration-100 hover:text-foreground focus-visible:z-10 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-checked:border-border data-checked:bg-background data-checked:text-foreground data-disabled:pointer-events-none data-disabled:opacity-40 motion-reduce:transition-none"
          >
            <Icon className="size-4" aria-hidden="true" />
            {option.label}
          </RadioPrimitive.Root>
        );
      })}
    </RadioGroupPrimitive>
  );
}

function useTheme({
  defaultTheme = "system",
  storageKey = defaultStorageKey,
}: ThemeStoreOptions = {}) {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => subscribeToTheme(storageKey, onStoreChange),
    [storageKey],
  );
  const getSnapshot = React.useCallback(
    () => getThemeSnapshot(storageKey, defaultTheme),
    [defaultTheme, storageKey],
  );
  const getServerSnapshot = React.useCallback(
    () => getServerThemeSnapshot(defaultTheme),
    [defaultTheme],
  );
  const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { theme, resolvedTheme } = parseThemeSnapshot(snapshot);

  React.useEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = React.useCallback(
    (nextTheme: Theme) => setThemePreference(storageKey, nextTheme),
    [storageKey],
  );

  return { theme, resolvedTheme, setTheme };
}

function subscribeToTheme(storageKey: string, onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function handleStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === null) {
      if (isTheme(event.newValue)) {
        themeMemory.set(storageKey, event.newValue);
      } else {
        themeMemory.delete(storageKey);
      }

      onStoreChange();
    }
  }

  function handleThemeChange(event: Event) {
    if (event instanceof CustomEvent && event.detail?.storageKey === storageKey) {
      onStoreChange();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(themeChangeEvent, handleThemeChange);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(themeChangeEvent, handleThemeChange);
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getThemeSnapshot(storageKey: string, defaultTheme: Theme): ThemeSnapshot {
  const theme = getThemePreference(storageKey, defaultTheme);
  return `${theme}:${resolveTheme(theme)}`;
}

function getServerThemeSnapshot(defaultTheme: Theme): ThemeSnapshot {
  return `${defaultTheme}:${defaultTheme === "dark" ? "dark" : "light"}`;
}

function getThemePreference(storageKey: string, defaultTheme: Theme): Theme {
  try {
    const storedTheme = window.localStorage.getItem(storageKey);

    if (isTheme(storedTheme)) {
      themeMemory.set(storageKey, storedTheme);
      return storedTheme;
    }
  } catch {
    // Fall through to the in-memory preference when storage is unavailable.
  }

  return themeMemory.get(storageKey) ?? defaultTheme;
}

function setThemePreference(storageKey: string, theme: Theme) {
  themeMemory.set(storageKey, theme);

  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // The current page still updates when persistent storage is unavailable.
  }

  applyResolvedTheme(resolveTheme(theme));
  window.dispatchEvent(new CustomEvent(themeChangeEvent, { detail: { storageKey } }));
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return theme;
}

function applyResolvedTheme(theme: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function parseThemeSnapshot(snapshot: ThemeSnapshot) {
  const separatorIndex = snapshot.indexOf(":");
  const theme = snapshot.slice(0, separatorIndex);
  const resolvedTheme = snapshot.slice(separatorIndex + 1);

  return {
    theme: isTheme(theme) ? theme : "system",
    resolvedTheme: resolvedTheme === "dark" ? "dark" : "light",
  } satisfies { theme: Theme; resolvedTheme: ResolvedTheme };
}

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export type { ResolvedTheme, Theme, ThemeSwitcherProps };
export { ThemeSwitcher, useTheme };
