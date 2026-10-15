# Phase 2: Light theme and responsive review

## Scope

The review covers all 58 documented registry components. It combines visual comparison, automated
layout assertions, Axe checks, and targeted manual inspection.

Responsive coverage now includes:

- 320px and 375px page viewports for every component page
- isolated 280px and 400px component containers for every documented preview
- 1440px desktop previews through the existing visual suite
- 15 representative overlay compositions at both mobile widths
- primary touch targets at 320px

The isolated-container pass is intentionally independent from the viewport width. It catches
components that use viewport media queries correctly on a phone but still fail inside a narrow
sidebar, panel, or grid column on desktop.

## Findings and changes

### Light theme

The light theme used borders and secondary text that were too close to the background, while the
destructive foreground missed contrast in several translucent destructive surfaces. The existing
semantic tokens were adjusted globally:

- stronger `border`, `input`, and matching sidebar borders
- darker `muted-foreground`
- darker `destructive`
- clearer `ring` and sidebar focus ring

No component-specific gray values were introduced. The token changes removed the known serious
color-contrast exceptions for Button, Alert Dialog, Alert, Badge, Toast, Avatar, and Table.

The code block, terminal, color transparency preview, scrollable surfaces, disabled states, and open
overlays are captured in both themes by the visual suite. Initial theme frames are now tested for the
dark default and a stored light preference, so a wrong-theme flash fails the browser suite.

### Narrow containers and mobile

The review found and fixed the following container-specific problems:

- Preview content can shrink within the documentation frame instead of retaining an intrinsic
  desktop width.
- Data Table now establishes a contained horizontal scroll boundary, and its toolbar wraps based on
  available component width instead of viewport width.
- Pagination wraps safely and replaces Previous/Next text with accessible icon-only controls below
  a 20rem pagination container.
- Card and QR Code preview compositions use intrinsic auto-fit grids rather than viewport-only
  breakpoints.
- Popover content cannot exceed the height exposed by its collision-aware positioner.
- The mobile overlay harness centers keyboard-opened triggers before placement is measured, avoiding
  smooth-scroll races while preserving real collision behavior.

No component page can be horizontally scrolled at 320px or 375px. Every documented preview remains
contained at 280px and 400px; tables and code surfaces keep their intentional internal scrolling.

Primary rendered button, input, select, textarea, and tab targets are guarded at a minimum of 24px.
Compact checkbox, data-table checkbox, switch, and slider visuals use expanded pseudo-element hit
areas; radio options use the full wrapping label as their target. Inline text links retain the WCAG
target-spacing exception.

## Automated evidence

- `bun run test:responsive`: 322 responsive scenarios across containers, viewports, overlays, touch
  targets, and initial theme frames; duplicate page loads are coalesced into 148 parallel test cases
  (1.5 minutes in the verified local run)
- `bun run test:visual`: all light/dark previews and overlay states in Chromium
- `bun run test:a11y`: every preview and open overlay, with seven obsolete contrast exceptions
  removed
- `bun run test:functional`: Chromium and WebKit interaction coverage remains the cross-browser
  functional gate

Generated baselines, screenshots, videos, traces, and reports remain ignored. CI persists visual
baselines outside the tracked source tree.

## Remaining manual review

The automated checks intentionally do not claim subjective approval. Release review should still
sample both themes on real touch hardware, zoom text to 200%, and run the keyboard/screen-reader
checklist in `accessibility-manual-checklist.md`.
