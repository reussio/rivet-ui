# Component documentation

Each Rivet UI component owns one MDX document in this directory. The file keeps the written
documentation intentionally small: metadata, one canonical usage example, and the API reference.
Interactive variants and states live in the matching `app/*-preview.tsx` file and appear under the
Preview section's Examples tab.

## Document shape

````mdx
import { defineComponentMetadata } from "@/content/components/schema"

export const metadata = defineComponentMetadata({
  name: "Button",
  slug: "button",
  description: "Displays an interactive control for actions.",
})

<ComponentUsage>

```tsx
import { Button } from "@/components/ui/button"

<Button>Execute</Button>
```

</ComponentUsage>

<ComponentApi>

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "secondary"` | `"default"` |

</ComponentApi>
````

The custom MDX elements are supplied globally by `mdx-components.tsx`. Fenced code blocks use the
Rivet `CodeBlock` component automatically, including syntax highlighting and copy controls. Keep
the usage example focused on the smallest realistic composition; do not repeat every variant in
MDX.

After adding a document, run `bun run docs:manifest` to regenerate the statically analyzable
manifest, then place its slug in the appropriate group in `app/docs-structure.ts`.
