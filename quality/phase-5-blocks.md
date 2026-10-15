# Phase 5: First production blocks

Phase 5 separates reusable primitives from production-shaped compositions and adds the first four installable blocks.

## Structure

- Component sources remain in `registry/rivetui/components/`.
- Block sources live in `registry/rivetui/blocks/`.
- Component documentation remains in `content/components/`.
- Block documentation lives in `content/blocks/`.
- Every block has a `registry:block` item and installs to `components/blocks/`.

## Delivered blocks

| Block | Purpose | Registry dependencies |
| --- | --- | --- |
| Settings Form | Workspace settings with responsive form layout | Button, Field, Input, Number Field, Select, Switch |
| Deployment List | Operational deployment overview and row actions | Alert Dialog, Button, Data List, Dropdown Menu, Pagination, Status |
| Authentication | Sign-in, OTP verification, and recovery views | Alert, Button, Field, Input, Input OTP, Password Field |
| Command Dashboard | Searchable service overview and command surface | Button, Card, Command Bar, Keyboard Shortcut, Search Field, Status |

All blocks start as `beta`. They include realistic local example data but no persistence, network calls, session handling, or application-specific backend behavior.

## Documentation and verification

- `/blocks` provides the dedicated block index and is linked from the primary header.
- `/blocks/[slug]` exposes the full responsive preview, exact installable source, installation command, status, and integration notes.
- Docs search includes components and blocks without surfacing status labels.
- Playwright coverage includes dark/light visual snapshots, serious Axe violations, and 320/375 px responsive checks.
- Generated registry output and generated documentation manifests remain ignored.
