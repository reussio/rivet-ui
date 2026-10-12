![Rivet UI](https://shieldcn.dev/header/graph.svg?title=Rivet+UI&subtitle=Components%2C+engineered.&mode=dark&theme=slate)

# Rivet UI

Rivet UI is a [shadcn](https://ui.shadcn.com/)-compatible component registry for precise, technical interfaces. It combines the accessible behavior of [Base UI](https://base-ui.com/) with sharp geometry, restrained motion, monochrome hierarchy, and source code that remains entirely yours.

Components are installed directly into your application—not hidden behind a package. Adapt them, compose them, and ship them as part of your own codebase.

[Documentation](https://rivetui.reuss.dev) · [Components](https://rivetui.reuss.dev/#components) · [Registry](https://rivetui.reuss.dev/r/registry.json)

## Why Rivet?

- **Engineered visual language** — structured layouts, square edges, deliberate spacing, and strong typography.
- **Accessible by default** — keyboard interaction, visible focus, semantic structure, and appropriate ARIA behavior.
- **Source-owned** — install only what you need and keep full control over every component.
- **Composable APIs** — primitives stay focused while compound components remain flexible.
- **Registry-ready** — every component is built, validated, and distributed through the shadcn CLI.
- **Dark and light themes** — all surfaces use semantic tokens and support system-aware theming.

## Quick start

Explore the components and their interactive documentation at [rivetui.reuss.dev](https://rivetui.reuss.dev).

Add the hosted Rivet registry to a shadcn project:

```bash
bunx --bun shadcn@latest registry add @rivetui=https://rivetui.reuss.dev/r/{name}.json
```

Then install any component directly into your application:

```bash
bunx --bun shadcn@latest add @rivetui/button
```

```tsx
import { Button } from "@/components/ui/button"

export function DeployAction() {
  return <Button variant="outline">Deploy</Button>
}
```

The same registry works with any package manager:

```bash
# pnpm
pnpm dlx shadcn@latest add @rivetui/button

# npm
npx shadcn@latest add @rivetui/button

# yarn
yarn dlx shadcn@latest add @rivetui/button
```

## Design principles

Rivet follows a visual direction best described as **precision brutalism**: engineered rather than decorated.

1. **Structure creates hierarchy.** Spacing, borders, typography, and surface contrast do the work.
2. **Interaction stays restrained.** Feedback is immediate and mechanical without decorative motion.
3. **Accessibility is part of the component.** It is not an optional layer added after styling.
4. **APIs remain practical.** Components expose useful composition without application-specific assumptions.
5. **Tokens carry the theme.** Semantic colors keep every component consistent across light and dark modes.

## Technology

- [Next.js 16](https://nextjs.org/) and [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Base UI](https://base-ui.com/)
- [shadcn CLI](https://ui.shadcn.com/docs/cli)
- [Bun](https://bun.sh/)
- [Biome](https://biomejs.dev/)

## Project structure

```text
app/                         Documentation shell, renderers, and component previews
content/components/          One MDX documentation file per component
registry/
└── rivet/components/        Source for installable components
public/r/                    Generated registry items
scripts/                     Registry validation
registry.json                Registry manifest
components.json              Local shadcn configuration
mdx-components.tsx           Shared MDX component mapping
```

`public/r` is generated from `registry.json` and the component source. Edit the source files rather than the generated JSON.

## Development

Rivet uses Bun for local development and package management.

```bash
git clone https://github.com/reussio/rivet-ui.git
cd rivet-ui
bun install
bun run dev
```

The local documentation is available at [localhost:3000](http://localhost:3000), with its registry index at [localhost:3000/r/registry.json](http://localhost:3000/r/registry.json).

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the documentation site and local registry |
| `bun run build` | Create a production build |
| `bun run lint` | Run Biome lint rules |
| `bun run check` | Check formatting, lint rules, and import organization |
| `bun run check:write` | Apply safe Biome fixes and formatting |
| `bun run registry:build` | Generate registry JSON in `public/r` |
| `bun run registry:validate` | Validate the manifest and generated items |
| `bun run registry:check` | Build and validate the complete registry |

## Adding a component

1. Create the component in `registry/rivet/components/<name>/`.
2. Add its metadata, files, and dependencies to `registry.json`.
3. Add a focused preview in `app/` and its documentation in `content/components/<name>.mdx`.
4. Run the full quality checks:

```bash
bun run check
bunx tsc --noEmit
bun run build
bun run registry:check
```

5. Inspect the generated item in `public/r/<name>.json` before committing it.

Package dependencies belong in `dependencies`; other shadcn registry items belong in `registryDependencies`. Preview-only files must not be included in the installable registry item.

## Global styles

Rivet also provides an optional global style item for token-aware scrollbars:

```bash
bunx --bun shadcn@latest add @rivetui/rivet-style
```

## Philosophy

> Components, engineered—not decorated.

Rivet is intentionally opinionated about visual discipline and intentionally unopinionated about your product. The registry supplies durable interface building blocks; the application remains yours.
