import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type KeyboardShortcutKeyName =
  | "mod"
  | "command"
  | "control"
  | "option"
  | "shift"
  | "enter"
  | "escape"
  | "tab"
  | "space"
  | "backspace"
  | "delete"
  | "arrow-up"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right";

type KeyboardShortcutKey = KeyboardShortcutKeyName | (string & Record<never, never>);
type KeyboardShortcutKeys = readonly [KeyboardShortcutKey, ...KeyboardShortcutKey[]];

type KeyboardShortcutProps = Omit<ComponentProps<"kbd">, "children"> & {
  keys: KeyboardShortcutKeys;
  size?: "sm" | "default";
};

type KeyDefinition = {
  label: string;
  symbol: string;
};

const keyDefinitions: Record<string, KeyDefinition> = {
  mod: { label: "Modifier", symbol: "Mod" },
  command: { label: "Command", symbol: "⌘" },
  cmd: { label: "Command", symbol: "⌘" },
  meta: { label: "Meta", symbol: "⌘" },
  control: { label: "Control", symbol: "⌃" },
  ctrl: { label: "Control", symbol: "Ctrl" },
  option: { label: "Option", symbol: "⌥" },
  alt: { label: "Alt", symbol: "Alt" },
  shift: { label: "Shift", symbol: "⇧" },
  enter: { label: "Enter", symbol: "↵" },
  return: { label: "Enter", symbol: "↵" },
  escape: { label: "Escape", symbol: "Esc" },
  esc: { label: "Escape", symbol: "Esc" },
  tab: { label: "Tab", symbol: "⇥" },
  space: { label: "Space", symbol: "Space" },
  backspace: { label: "Backspace", symbol: "⌫" },
  delete: { label: "Delete", symbol: "⌦" },
  "arrow-up": { label: "Arrow up", symbol: "↑" },
  "arrow-down": { label: "Arrow down", symbol: "↓" },
  "arrow-left": { label: "Arrow left", symbol: "←" },
  "arrow-right": { label: "Arrow right", symbol: "→" },
};

function getShortcutItems(keys: KeyboardShortcutKeys) {
  const occurrences = new Map<string, number>();

  return keys.map((key) => {
    const normalizedKey = key.trim().toLowerCase();
    const definition = keyDefinitions[normalizedKey] ?? { label: key, symbol: key };
    const occurrence = (occurrences.get(normalizedKey) ?? 0) + 1;
    occurrences.set(normalizedKey, occurrence);

    return {
      ...definition,
      id: `${normalizedKey}-${occurrence}`,
    };
  });
}

function KeyboardShortcut({
  keys,
  size = "default",
  className,
  "aria-label": ariaLabel,
  ...props
}: KeyboardShortcutProps) {
  const items = getShortcutItems(keys);

  return (
    <kbd
      data-slot="keyboard-shortcut"
      data-size={size}
      aria-label={ariaLabel ?? items.map((item) => item.label).join(" plus ")}
      className={cn(
        "inline-flex shrink-0 overflow-hidden border border-border bg-muted/30 align-middle text-muted-foreground",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <span
          key={item.id}
          data-slot="keyboard-shortcut-key"
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center border-l border-border font-mono font-medium uppercase leading-none first:border-l-0",
            size === "sm"
              ? "h-5 min-w-5 px-1 text-[0.625rem]"
              : "h-7 min-w-7 px-1.5 text-[0.6875rem]",
          )}
        >
          {item.symbol}
        </span>
      ))}
    </kbd>
  );
}

export type {
  KeyboardShortcutKey,
  KeyboardShortcutKeyName,
  KeyboardShortcutKeys,
  KeyboardShortcutProps,
};
export { KeyboardShortcut };
