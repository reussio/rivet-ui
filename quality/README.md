# Rivet UI quality audit

`component-audit-matrix.ts` is the maintained source of truth for component review and test
coverage. It currently covers every documented registry component.

Each component classifies the same nine audit axes:

- `default`
- `hoverFocus`
- `activeOpen`
- `disabled`
- `invalidError`
- `loadingEmpty`
- `longContent`
- `narrowContainer`
- `themes`

A scenario is either described in `scenarios` or explicitly listed in `notApplicable`. Missing or
duplicated classifications fail validation. `default` and `themes` are mandatory for every
component.

Run the audit guard with:

```bash
bun run audit:matrix
```

The validator also compares the matrix with `content/components/*.mdx` and
`registry/rivetui/components/*`. Adding or removing a component therefore requires an intentional
matrix update.

Phase 1 consumes this file directly for Playwright coverage. The browser suite is split into three
purposes:

- `bun run test:visual` compares every documented preview in light and dark mode plus focused open
  overlay states in Chromium.
- `bun run test:a11y` scans every preview and open overlay with Axe, failing on new serious and
  critical findings. Existing debt is explicit in `known-accessibility-issues.ts`; stale entries
  fail as soon as their underlying issue is fixed.
- `bun run test:functional` runs component smoke coverage and focused keyboard semantics in Chromium
  and WebKit.

Use `bun run test:visual:update` to refresh baselines intentionally. Baselines, reports, traces,
videos, and temporary screenshots are generated outputs and remain ignored. CI stores the persistent
Linux baselines in the GitHub Actions cache so pull requests compare against the latest successful
`main` baseline without adding generated images to the repository.

The automated suite does not replace assistive-technology review. Use
`accessibility-manual-checklist.md` for the keyboard and screen-reader pass recorded in a release
report.

Phase 2 adds `bun run test:responsive` for 320px and 375px viewports, isolated 280px and 400px
component containers, mobile overlay placement, primary touch targets, and initial theme frames.
The findings and resolved issues are recorded in `phase-2-light-responsive-review.md`.

Playwright runs independent test cases fully in parallel within its worker pool. Local runs use 50%
of available logical cores; CI uses four workers. Set `PLAYWRIGHT_WORKERS` to an explicit number or
percentage to tune a machine without changing the shared configuration. Higher local values can
overload the Next.js dev server during cold compilation, so the shared default favors stable
parallelism.
