---
name: rivet-ui-design-review
description: Review Rivet UI components for visual consistency, interaction quality, accessibility, responsiveness, and fit with the Rivet UI design language. Use after implementing or changing a Rivet UI component, or when explicitly reviewing whether a component feels like Rivet UI. Focus on critique and targeted improvements rather than broad refactoring.
---

# Rivet UI Design Review

Review the component as part of **Rivet UI**, not as a generic shadcn component.

Rivet UI follows a visual direction best described as:

**Precision Brutalism / Technical Minimalism**

The interface should feel:

- engineered rather than decorated
- precise
- technical
- restrained
- structured
- deliberate
- modern without generic SaaS styling

Core principle:

> Components engineered, not decorated.

# Review process

Before judging the component:

1. Inspect the component implementation.
2. Inspect its preview/demo.
3. Inspect nearby existing Rivet UI components.
4. Inspect relevant design tokens and global styles.
5. Compare against established Rivet patterns before proposing new ones.

Existing Rivet UI components are the strongest reference.

Do not redesign the whole system during a component review.

# Visual consistency

Check whether the component follows Rivet UI's visual language.

## Geometry

Prefer:

- sharp edges
- little or no border radius
- strict alignment
- clear 1px borders
- structured regions
- grid-aware layouts

Flag:

- generic rounded cards
- oversized pills
- floating panels
- decorative containers

## Color

Rivet UI is primarily monochrome.

Check for:

- semantic token usage
- restrained contrast
- clear hierarchy without unnecessary color

Flag:

- decorative gradients
- arbitrary raw gray values
- unnecessary accent colors
- color used where typography or structure would be enough

## Depth

Hierarchy should primarily come from:

1. spacing
2. borders
3. typography
4. surface contrast

Flag:

- decorative shadows
- glassmorphism
- glow
- blur
- unnecessary elevation

## Typography

Check for:

- strong hierarchy
- deliberate font weight
- appropriate use of sans-serif vs monospace
- compact technical labels
- readable line lengths
- consistent casing and tracking

Monospace should be used intentionally for things such as:

- metadata
- identifiers
- timestamps
- measurements
- technical labels
- status information

Flag indiscriminate monospace usage.

## Spacing

Check:

- spacing rhythm
- alignment
- density
- internal consistency
- consistency with nearby Rivet components

Flag arbitrary spacing values when existing tokens or patterns would work.

# Generic UI smell

Actively look for styling that makes the component feel like a generic shadcn/SaaS template.

Flag patterns such as:

- `rounded-xl` everywhere
- card-inside-card layouts
- gradients
- soft floating surfaces
- oversized icons
- excessive badges
- pill-shaped controls without reason
- decorative shadows
- playful hover movement
- "AI SaaS" aesthetics
- unnecessary decoration

If the component could be dropped unchanged into a generic dashboard template, it probably needs refinement.

# Interaction review

For interactive components, check:

## Hover

Prefer:

- border contrast changes
- subtle background changes
- foreground changes
- restrained icon/state changes

Flag:

- scale effects
- bouncing
- upward translation
- dramatic shadows

## Focus

Verify:

- visible keyboard focus
- consistency with project focus-ring conventions
- no removed outline without a proper replacement

## Active / pressed

Pressed states should feel precise and mechanical.

Avoid playful or exaggerated motion.

## Disabled

Disabled states must remain understandable.

Do not rely only on `cursor-not-allowed`.

# Accessibility

Check where relevant:

- semantic HTML
- keyboard navigation
- visible focus
- accessible labels
- ARIA usage
- disabled semantics
- screen-reader meaning
- contrast
- target size
- reduced-motion behavior
- native behavior preservation

Prefer native HTML semantics over custom reimplementations.

Accessibility issues should be treated as real defects, not visual polish.

# Responsive behavior

Check the component in:

- narrow containers
- normal desktop widths
- long text
- constrained layouts

Look for:

- overflow
- broken alignment
- fixed-width assumptions
- clipped labels
- awkward wrapping
- layout that only works in the demo

Components should be container-friendly.

# Component API

Review whether the API remains appropriate for a reusable registry component.

Check for:

- minimal props
- useful composition
- predictable naming
- `className` extensibility
- native element props where appropriate
- separation between component and preview code

Flag:

- boolean-prop explosions
- application-specific props
- hardcoded content
- premature abstractions
- unnecessary configuration objects
- preview-only behavior leaking into the component

Do not recommend abstraction merely for abstraction's sake.

# Registry fit

Verify:

- the component belongs in Rivet UI
- preview-only files are not shipped accidentally
- registry dependencies are declared correctly
- npm dependencies are justified
- naming is concise and reusable
- the generated registry item contains only what consumers need

When registry schema details are uncertain, consult the latest official shadcn documentation rather than relying on memory.

Rivet's registry namespace is:

`@rivet`

# Visual inspection

If browser or screenshot tooling is available, use it.

Inspect the rendered component rather than relying only on code.

Review:

- alignment
- spacing rhythm
- border consistency
- typography
- contrast
- interaction states
- responsive behavior
- whether the result genuinely feels like Rivet UI

# Severity

Classify findings as:

- **Blocker** — accessibility, broken interaction, broken responsive behavior, or something fundamentally inconsistent
- **Should fix** — clear design-system inconsistency or API problem
- **Polish** — minor visual refinement that improves quality but is not required

Avoid inventing issues just to fill every category.

# Review style

Be specific.

Bad:

> The spacing could be improved.

Good:

> The 24px vertical padding makes this control noticeably taller than existing Rivet inputs. Reuse the established input height and reduce the vertical padding.

Prefer concrete fixes tied to existing Rivet conventions.

Do not produce a long generic design lecture.

# When changes are requested

If the user asks you to fix the findings:

1. make the smallest coherent changes
2. preserve the component API unless there is a strong reason to change it
3. reuse existing tokens and patterns
4. avoid unrelated refactors
5. run relevant checks afterward

# Final review format

Return a concise review with:

1. overall verdict
2. blockers, if any
3. should-fix findings
4. optional polish
5. whether the component feels consistent with Rivet UI

If there are no meaningful issues, say so clearly instead of manufacturing feedback.
