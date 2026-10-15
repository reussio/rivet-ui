type AccessibilityIssueScope = `${string}:${"dark" | "light"}`;

/**
 * Migration baseline for serious or critical Axe rules that predate the browser test suite.
 *
 * New rule IDs still fail CI. When a listed issue is fixed, the accessibility test intentionally
 * fails until the stale entry is removed here, keeping this debt visible and reviewable.
 */
const knownPreviewAccessibilityIssues = {
  "keyboard-shortcut:dark": ["aria-prohibited-attr"],
  "keyboard-shortcut:light": ["aria-prohibited-attr"],
  "number-field:dark": ["aria-valid-attr-value"],
  "number-field:light": ["aria-valid-attr-value"],
  "textarea:dark": ["label"],
  "textarea:light": ["label"],
  "theme-switcher:dark": ["label-content-name-mismatch"],
  "theme-switcher:light": ["label-content-name-mismatch"],
  "time-picker:dark": ["label-content-name-mismatch"],
  "time-picker:light": ["label-content-name-mismatch"],
} as const satisfies Partial<Record<AccessibilityIssueScope, readonly string[]>>;

const knownOverlayAccessibilityIssues = {
  "date-picker:calendar": ["color-contrast", "label-content-name-mismatch"],
} as const satisfies Record<string, readonly string[]>;

export { knownOverlayAccessibilityIssues, knownPreviewAccessibilityIssues };
