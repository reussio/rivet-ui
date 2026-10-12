"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";
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

type ThemeMenuVariant = "default" | "icon";

type ThemeMenuProps = ThemeStoreOptions & {
  align?: MenuPrimitive.Positioner.Props["align"];
  "aria-label"?: string;
  className?: string;
  disabled?: boolean;
  onValueChange?: (theme: Theme) => void;
  side?: MenuPrimitive.Positioner.Props["side"];
  variant?: ThemeMenuVariant;
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

function ThemeMenu({
  align = "end",
  className,
  defaultTheme = "system",
  disabled = false,
  onValueChange,
  side = "bottom",
  storageKey = defaultStorageKey,
  variant = "default",
  "aria-label": ariaLabel,
}: ThemeMenuProps) {
  const { theme, resolvedTheme, setTheme } = useTheme({ defaultTheme, storageKey });
  const selectedOption = themeOptions.find((option) => option.value === theme) ?? themeOptions[1];
  const TriggerIcon =
    variant === "icon" ? (resolvedTheme === "dark" ? Moon : Sun) : selectedOption.icon;

  function selectTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    onValueChange?.(nextTheme);
  }

  return (
    <MenuPrimitive.Root>
      <MenuPrimitive.Trigger
        data-slot="theme-menu-trigger"
        disabled={disabled}
        aria-label={
          ariaLabel ??
          (variant === "icon"
            ? `Select color theme. ${selectedOption.label} selected.`
            : "Select color theme")
        }
        className={cn(
          "group/theme-menu inline-flex h-10 cursor-pointer items-center rounded-none border border-border bg-background text-sm font-medium outline-none transition-[background-color,border-color,box-shadow,color,opacity] duration-100 hover:border-foreground/40 hover:bg-muted focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-disabled:pointer-events-none data-disabled:opacity-40 data-popup-open:border-foreground/50 data-popup-open:bg-muted motion-reduce:transition-none",
          variant === "icon" ? "w-10 justify-center" : "min-w-44 justify-start gap-2 px-3",
          className,
        )}
      >
        <TriggerIcon className="size-4 shrink-0" aria-hidden="true" />
        {variant === "default" ? (
          <>
            <span className="min-w-0 flex-1 truncate text-left">{selectedOption.label}</span>
            <ChevronDown
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-100 group-data-popup-open/theme-menu:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </>
        ) : null}
      </MenuPrimitive.Trigger>

      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner
          data-slot="theme-menu-positioner"
          align={align}
          side={side}
          sideOffset={6}
          className="isolate z-50 outline-none"
        >
          <MenuPrimitive.Popup
            data-slot="theme-menu-content"
            className="min-w-44 origin-(--transform-origin) overflow-hidden border border-border bg-popover p-1 text-popover-foreground outline-none transition-[opacity,transform] duration-100 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none"
          >
            <MenuPrimitive.Group>
              <MenuPrimitive.GroupLabel className="px-3 py-2 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Theme
              </MenuPrimitive.GroupLabel>
              <MenuPrimitive.RadioGroup value={theme} onValueChange={selectTheme}>
                {themeOptions.map((option) => {
                  const Icon = option.icon;

                  return (
                    <MenuPrimitive.RadioItem
                      key={option.value}
                      value={option.value}
                      closeOnClick
                      className="relative flex min-h-9 cursor-default select-none items-center gap-2 py-2 pr-9 pl-3 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate">{option.label}</span>
                      <MenuPrimitive.RadioItemIndicator className="absolute right-3 grid size-4 place-items-center">
                        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                      </MenuPrimitive.RadioItemIndicator>
                    </MenuPrimitive.RadioItem>
                  );
                })}
              </MenuPrimitive.RadioGroup>
            </MenuPrimitive.Group>
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
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

export type { ResolvedTheme, Theme, ThemeMenuProps, ThemeMenuVariant, ThemeSwitcherProps };
export { ThemeMenu, ThemeSwitcher, useTheme };
