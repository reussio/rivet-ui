# Phase 4 — Versioning, changelog, and component status

## Outcome

Rivet UI now has one explicit SemVer release process and component-level maturity metadata. The
metadata is validated together with the Phase 0 audit matrix, rendered in the documentation, and
used to prevent components with known serious accessibility debt from being marked stable.

## Status model

| Status | Release meaning |
| --- | --- |
| `experimental` | API and behavior may change substantially. |
| `beta` | Production-usable, with final release qualification still in progress. |
| `stable` | API, accessibility, responsive behavior, and automated tests are approved. |
| `deprecated` | Temporarily retained and required to name a replacement. |

All 58 component documents declare `status` and `since`. The initial conservative classification is:

- 35 stable components
- 22 beta components
- 1 experimental component (`website-link`)
- 0 deprecated components

Components with known serious accessibility issues remain beta. New components and blocks must
start as beta unless their audit evidence is complete before the first release.

## Documentation surfaces

The status is visible as text, not color alone, in the component hero with a keyboard-accessible
explanatory tooltip. The component overview and documentation search stay intentionally status-free
so both surfaces remain easy to scan.

The tooltip includes the status definition and the first available version. Deprecated entries can
add a `replacement` to the MDX metadata and receive replacement guidance in the same tooltip.

## Release flow

1. Add a Changeset for a user-visible change with `bun run changeset`.
2. Merge changes to `main`; the Version packages workflow creates or updates the version pull request.
3. Review the generated version and `CHANGELOG.md`, including an explicit major Changeset for breaking changes.
4. Merge the version pull request.
5. Run the GitHub Release workflow on `main`.
6. The workflow runs the release gate, creates the `v*` tag, and publishes a GitHub Release from the changelog section.

The release gate runs source and metadata checks, TypeScript, registry generation and validation,
the production build, Chromium and WebKit functional tests, Axe accessibility tests, and visual and
responsive regression tests.

## Enforcement

The metadata audit fails when:

- a component is missing `status` or `since`;
- a status is unknown;
- `since` is not SemVer or is newer than the project version;
- a deprecated component has no replacement;
- a stable component retains a known serious accessibility exception.

Registry status metadata remains intentionally omitted for now because it is optional and the
documentation metadata is the canonical release source. It can be added later after verifying the
consumer behavior of the shadcn registry schema.
