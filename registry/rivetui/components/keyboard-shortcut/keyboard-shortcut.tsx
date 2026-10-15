"use client";

import * as React from "react";

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
type KeyboardShortcutPlatform = "auto" | "mac" | "windows" | "linux";
type ResolvedPlatform = Exclude<KeyboardShortcutPlatform, "auto"> | "unknown";

type KeyboardShortcutProps = Omit<React.ComponentProps<"kbd">, "children"> & {
  keys: KeyboardShortcutKeys;
  platform?: KeyboardShortcutPlatform;
  size?: "sm" | "md";
};

type UseKeyboardShortcutOptions = {
  allowInEditable?: boolean;
  allowRepeat?: boolean;
  enabled?: boolean;
  platform?: KeyboardShortcutPlatform;
  preventDefault?: boolean;
};

type KeyDefinition = {
  label: string;
  symbol: string;
};

const keyDefinitions: Record<string, KeyDefinition> = {
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

const modifierKeys = new Set([
  "mod",
  "command",
  "cmd",
  "meta",
  "control",
  "ctrl",
  "option",
  "alt",
  "shift",
]);
const primaryModifierKeys = new Set(["mod", "command", "cmd"]);
const controlKeys = new Set(["control", "ctrl"]);
const optionKeys = new Set(["option", "alt"]);
const eventKeyAliases: Record<string, string> = {
  " ": "space",
  arrowdown: "arrow-down",
  arrowleft: "arrow-left",
  arrowright: "arrow-right",
  arrowup: "arrow-up",
  esc: "escape",
  return: "enter",
};
const keydownSubscribers = new Set<(event: KeyboardEvent) => void>();

function subscribeToPlatform() {
  return () => undefined;
}

function dispatchKeydown(event: KeyboardEvent) {
  for (const subscriber of keydownSubscribers) {
    subscriber(event);
  }
}

function subscribeToKeydown(subscriber: (event: KeyboardEvent) => void) {
  keydownSubscribers.add(subscriber);
  if (keydownSubscribers.size === 1) {
    window.addEventListener("keydown", dispatchKeydown);
  }

  return () => {
    keydownSubscribers.delete(subscriber);
    if (keydownSubscribers.size === 0) {
      window.removeEventListener("keydown", dispatchKeydown);
    }
  };
}

function detectPlatform(): ResolvedPlatform {
  if (typeof navigator === "undefined") {
    return "unknown";
  }

  const navigatorWithHints = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const platform = [
    navigatorWithHints.userAgentData?.platform,
    navigator.platform,
    navigator.userAgent,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/mac|iphone|ipad|ipod/.test(platform)) {
    return "mac";
  }
  if (platform.includes("win")) {
    return "windows";
  }
  if (/linux|android/.test(platform)) {
    return "linux";
  }
  return "unknown";
}

function useResolvedPlatform(platform: KeyboardShortcutPlatform): ResolvedPlatform {
  const detectedPlatform = React.useSyncExternalStore<ResolvedPlatform>(
    subscribeToPlatform,
    detectPlatform,
    (): ResolvedPlatform => "unknown",
  );

  return platform === "auto" ? detectedPlatform : platform;
}

function getKeyDefinition(key: KeyboardShortcutKey, platform: ResolvedPlatform): KeyDefinition {
  const normalizedKey = key.trim().toLowerCase();
  const isMac = platform === "mac";

  if (primaryModifierKeys.has(normalizedKey)) {
    if (platform === "unknown") {
      return { label: "Modifier", symbol: "Mod" };
    }
    return isMac ? { label: "Command", symbol: "⌘" } : { label: "Control", symbol: "Ctrl" };
  }
  if (normalizedKey === "meta") {
    return isMac ? { label: "Command", symbol: "⌘" } : { label: "Meta", symbol: "Meta" };
  }
  if (controlKeys.has(normalizedKey)) {
    return isMac ? { label: "Control", symbol: "⌃" } : { label: "Control", symbol: "Ctrl" };
  }
  if (optionKeys.has(normalizedKey)) {
    return isMac ? { label: "Option", symbol: "⌥" } : { label: "Alt", symbol: "Alt" };
  }
  if (normalizedKey === "shift") {
    return isMac ? { label: "Shift", symbol: "⇧" } : { label: "Shift", symbol: "Shift" };
  }

  return keyDefinitions[normalizedKey] ?? { label: key, symbol: key };
}

function getShortcutItems(keys: KeyboardShortcutKeys, platform: ResolvedPlatform) {
  const occurrences = new Map<string, number>();

  return keys.map((key) => {
    const normalizedKey = key.trim().toLowerCase();
    const definition = getKeyDefinition(key, platform);
    const occurrence = (occurrences.get(normalizedKey) ?? 0) + 1;
    occurrences.set(normalizedKey, occurrence);

    return {
      ...definition,
      id: `${normalizedKey}-${occurrence}`,
      isLiteralKey: !keyDefinitions[normalizedKey] && !modifierKeys.has(normalizedKey),
      isMacModifier: platform === "mac" && modifierKeys.has(normalizedKey),
    };
  });
}

function normalizeEventKey(key: string) {
  const normalizedKey = key.toLowerCase();
  return eventKeyAliases[normalizedKey] ?? normalizedKey;
}

function matchesShortcut(
  event: KeyboardEvent,
  keys: readonly string[],
  platform: ResolvedPlatform,
) {
  const normalizedKeys = keys.map((key) => key.trim().toLowerCase());
  const primaryModifier = platform === "mac" ? "meta" : "control";
  let requiresMeta = false;
  let requiresControl = false;
  let requiresAlt = false;
  let requiresShift = false;

  for (const key of normalizedKeys) {
    if (primaryModifierKeys.has(key)) {
      requiresMeta ||= primaryModifier === "meta";
      requiresControl ||= primaryModifier === "control";
    } else if (key === "meta") {
      requiresMeta = true;
    } else if (controlKeys.has(key)) {
      requiresControl = true;
    } else if (optionKeys.has(key)) {
      requiresAlt = true;
    } else if (key === "shift") {
      requiresShift = true;
    }
  }

  const triggerKeys = normalizedKeys.filter((key) => !modifierKeys.has(key));
  if (triggerKeys.length !== 1 || normalizeEventKey(event.key) !== triggerKeys[0]) {
    return false;
  }

  return (
    event.metaKey === requiresMeta &&
    event.ctrlKey === requiresControl &&
    event.altKey === requiresAlt &&
    event.shiftKey === requiresShift
  );
}

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName))
  );
}

function useKeyboardShortcut(
  keys: KeyboardShortcutKeys,
  onTrigger: (event: KeyboardEvent) => void,
  {
    allowInEditable = false,
    allowRepeat = false,
    enabled = true,
    platform = "auto",
    preventDefault = true,
  }: UseKeyboardShortcutOptions = {},
) {
  const resolvedPlatform = useResolvedPlatform(platform);
  const onTriggerRef = React.useRef(onTrigger);
  const shortcutSignature = keys.map((key) => key.trim().toLowerCase()).join("\u001f");

  React.useEffect(() => {
    onTriggerRef.current = onTrigger;
  }, [onTrigger]);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const shortcutKeys = shortcutSignature.split("\u001f");

    function handleKeyDown(event: KeyboardEvent) {
      if (
        (!allowRepeat && event.repeat) ||
        (!allowInEditable && isEditableTarget(event.target)) ||
        !matchesShortcut(event, shortcutKeys, resolvedPlatform)
      ) {
        return;
      }

      if (preventDefault) {
        event.preventDefault();
      }
      onTriggerRef.current(event);
    }

    return subscribeToKeydown(handleKeyDown);
  }, [allowInEditable, allowRepeat, enabled, preventDefault, resolvedPlatform, shortcutSignature]);
}

function KeyboardShortcut({
  keys,
  platform = "auto",
  size = "md",
  className,
  "aria-label": ariaLabel,
  ...props
}: KeyboardShortcutProps) {
  const resolvedPlatform = useResolvedPlatform(platform);
  const items = getShortcutItems(keys, resolvedPlatform);

  return (
    <kbd
      data-slot="keyboard-shortcut"
      data-platform={resolvedPlatform}
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
            (item.isMacModifier || item.isLiteralKey) &&
              "font-sans font-semibold normal-case antialiased [font-family:system-ui,sans-serif]",
            item.isMacModifier && (size === "sm" ? "text-[0.8125rem]" : "text-[0.9375rem]"),
            item.isLiteralKey && (size === "sm" ? "text-xs" : "text-[0.8125rem]"),
          )}
        >
          <span className="inline-flex translate-y-px">{item.symbol}</span>
        </span>
      ))}
    </kbd>
  );
}

export type {
  KeyboardShortcutKey,
  KeyboardShortcutKeyName,
  KeyboardShortcutKeys,
  KeyboardShortcutPlatform,
  KeyboardShortcutProps,
  UseKeyboardShortcutOptions,
};
export { KeyboardShortcut, useKeyboardShortcut };
