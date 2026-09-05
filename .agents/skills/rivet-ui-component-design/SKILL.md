---
name: rivet-ui-component-design
description: Design, implement, refine, or extend components for the Rivet UI shadcn registry. Use whenever creating a new Rivet UI component, redesigning an existing component, adding variants or states, creating component previews, or deciding how a component should look and behave. Preserve Rivet UI's precision-brutalist, technical, monochrome design language and ensure every component is production-quality, accessible, composable, and registry-ready.
---

# Rivet UI Component Design

You are designing and implementing components for **Rivet UI**.

Rivet UI is a shadcn-based component registry with a distinct visual language.

Every component must feel as if it belongs to the same system.

Do not treat this as ordinary application UI development. You are building reusable design-system primitives and
components that will be installed into other projects.

# Design philosophy

Rivet UI follows a visual direction best described as:

**Precision Brutalism / Technical Minimalism**

The interface should feel:

- engineered rather than decorated
- precise
- technical
- restrained
- highly structured
- deliberate
- premium without looking luxurious
- modern without following generic SaaS trends

The design takes influence from:

- industrial interfaces
- engineering software
- developer tools
- Swiss / International Style
- editorial typography
- terminal interfaces
- restrained brutalism

A useful mental model is:

> Components engineered, not decorated.

# Visual references

The `references/` directory contains screenshots of applications that define the visual foundation of Rivet UI.

Before designing a new component, inspect these references when image inspection is available.

Use them to understand:

- overall visual density
- typography hierarchy
- border treatment
- spacing rhythm
- grid usage
- contrast
- component proportions
- technical / industrial character
- relationship between large headings and small monospace labels

Do not copy application-specific layouts literally.

Extract the underlying design principles and apply them to reusable components.

The written rules in this skill define the design system. The screenshots provide additional visual context and should
be used to resolve stylistic ambiguity.

# Visual language

## Color

Rivet UI is primarily monochrome.

Prefer:

- background
- foreground
- muted surfaces
- subtle contrast differences
- borders
- typography hierarchy

Avoid introducing color unless the component semantically requires it, for example:

- destructive actions
- warnings
- success states
- status visualization

Even then, color should be restrained.

Never introduce decorative gradients.

Do not hardcode arbitrary gray values when existing semantic design tokens can be used.

Prefer existing CSS variables and theme tokens.

## Geometry

Prefer:

- sharp edges
- square corners
- strict alignment
- 1px borders
- clearly defined regions
- grid-based layouts

Default to little or no border radius.

Do not introduce rounded SaaS cards, oversized pills, floating panels, or bubbly controls unless there is a clear
functional reason.

## Depth

Prefer hierarchy through:

1. spacing
2. borders
3. typography
4. surface contrast

Avoid:

- decorative box shadows
- floating-card effects
- glassmorphism
- blur effects
- glow effects
- unnecessary elevation

Components should feel integrated into a structured interface rather than floating above it.

## Typography

Typography is a core part of Rivet UI.

Use strong hierarchy.

Prefer:

- bold or heavy sans-serif typography for important headings
- compact sans-serif typography for controls and content
- monospace typography for technical metadata and micro-labels
- uppercase labels where appropriate
- restrained letter spacing for technical labels
- numeric markers such as `01`, `02`, `03` where structurally meaningful

Do not overuse monospace. Use it intentionally for metadata, identifiers, measurements, timestamps, states, or technical
labels.

## Spacing

Spacing should feel systematic.

Prefer existing spacing tokens and established component dimensions.

Avoid arbitrary spacing values unless required.

Layouts should feel:

- calm
- aligned
- intentional
- dense enough to feel like a tool
- spacious enough to remain readable

Do not make components unnecessarily large.

## Background grids

Subtle technical grids or guide lines may be used in larger compositions or demos when they reinforce the layout.

Do not add grids to every component.

A grid is part of the Rivet visual language, not a decoration to apply indiscriminately.

# Anti-patterns

Do NOT default to typical shadcn demo aesthetics.

Avoid:

- `rounded-xl` cards everywhere
- giant border radii
- gradients
- decorative shadows
- glassmorphism
- excessive muted cards inside muted cards
- colorful accent palettes
- pill-shaped everything
- oversized icons
- excessive badges
- decorative illustrations without purpose
- excessive animations
- hover effects that move components vertically
- generic dashboard aesthetics
- "AI SaaS" styling

If the component looks like something that could have been copied unchanged from a generic shadcn dashboard template,
reconsider the design.

# Before implementation

Before creating or materially changing a component:

1. Inspect the repository structure.
2. Inspect existing Rivet UI components.
3. Inspect the visual references in `references/`.
3. Inspect global styles and design tokens.
4. Inspect `components.json`.
5. Inspect `registry.json`.
6. Inspect existing component demos/previews.
7. Identify patterns already established by Rivet UI.

Reuse established conventions instead of inventing new ones.

Look specifically for:

- border treatment
- sizing
- typography
- spacing
- icon sizing
- state handling
- file naming
- `data-slot` conventions
- class composition
- variant handling
- registry item structure

Existing Rivet UI components are the strongest reference for future Rivet UI components.

# Understand the component

Before writing code, determine:

- What problem does the component solve?
- Is it a primitive, composed component, or block?
- What content does it contain?
- What states does it need?
- What variants are genuinely useful?
- What interaction behavior is expected?
- What should be controlled by the consumer?
- What belongs inside the component?
- What accessibility requirements apply?

Do not add variants merely because they are easy to implement.

Every public API should have a reason to exist.

# Component API

Design APIs for actual reuse.

Prefer:

- composition
- native HTML semantics
- predictable props
- `className` customization
- existing project utilities
- existing shadcn conventions

Avoid:

- huge prop interfaces
- boolean-prop explosions
- unnecessary abstractions
- application-specific naming
- hardcoded content
- coupling to the preview/demo
- premature generalization

If a component naturally consists of multiple pieces, prefer a composable API.

Example:

```tsx
<Metric>
    <MetricLabel>Requests</MetricLabel>
    <MetricValue>12,849</MetricValue>
</Metric>
```

instead of an increasingly large configuration object when composition is more flexible.

Do not force compound components when a simple component is sufficient.

# React and TypeScript

Follow the versions and conventions already used by the repository.

Requirements:

- TypeScript
- no `any`
- correct native element props where useful
- semantic HTML
- no unnecessary state
- no unnecessary effects
- no unnecessary memoization
- no unsafe assertions unless genuinely required
- preserve consumer `className`
- use the project's class merging utility
- use existing libraries rather than adding duplicate functionality

Do not introduce a new dependency when the repository already contains a suitable solution.

# Styling

Use the project's established Tailwind and token conventions.

Prefer semantic classes such as existing:

- background tokens
- foreground tokens
- border tokens
- muted tokens
- destructive tokens

Do not create component-specific raw colors when semantic tokens are appropriate.

Keep component styling readable.

Do not extract every group of Tailwind classes into constants merely to shorten JSX.

If variants are needed, use the variant approach already established in the repository.

# Interaction design

Interactions should remain restrained.

## Hover

Prefer changes such as:

- stronger border contrast
- subtle background contrast
- foreground change
- icon visibility

Avoid:

- scaling
- bouncing
- translating cards upward
- dramatic shadows

## Focus

Interactive components must have a clearly visible keyboard focus state.

Reuse the project's focus-ring conventions.

Do not remove outlines without replacing them with an accessible focus treatment.

## Active / pressed

Pressed states should feel mechanical and precise rather than animated or playful.

## Disabled

Disabled states must remain understandable and distinguishable.

Do not rely solely on cursor changes.

# Motion

Motion is optional, not a requirement.

If animation adds useful feedback:

- keep it short
- keep it subtle
- prefer opacity or small state transitions
- respect reduced-motion preferences where relevant

Avoid decorative entrance animations for base components.

# Accessibility

Accessibility is mandatory.

Check, where applicable:

- semantic element selection
- keyboard navigation
- visible focus
- labels
- ARIA attributes
- disabled behavior
- screen-reader meaning
- contrast
- interactive target size
- reduced motion
- native browser behavior

Prefer native HTML semantics over manually recreating behavior.

If an existing accessible primitive is available in the project's current shadcn stack, use it.

# Icons

Use the icon library already configured in the repository.

Icons should:

- be simple
- be geometrically restrained
- use consistent sizing
- usually inherit the current text color

Do not install another icon library for a single component.

Do not use icons when text communicates the action more clearly.

# Component states

For each new component, consider whether it needs examples for:

- default
- hover
- focus
- active
- disabled
- loading
- empty
- error
- destructive
- long content
- narrow width

Only implement states that make sense for the component.

However, deliberately think through edge cases before considering the component complete.

# Preview / demo

Every new registry component should have a useful development preview.

The preview should demonstrate the component in realistic contexts rather than only rendering an isolated happy-path
example.

When useful, include several states next to each other.

Keep preview-specific code separate from the registry component itself.

Preview code must not accidentally become part of the consumer-facing registry item unless intentional.

# Responsive behavior

Components should work outside the exact preview width used during development.

Check behavior at:

- narrow widths
- normal desktop widths
- long text
- constrained containers

Do not assume every component lives inside a full-width dashboard.

Prefer container-friendly layouts.

# Registry integration

Every finished Rivet UI component must be registry-ready.

After implementation:

1. Add or update the corresponding item in `registry.json`.
2. Use the correct current shadcn registry item type.
3. Include all required files.
4. Declare external npm dependencies only when necessary.
5. Declare shadcn dependencies as registry dependencies where appropriate.
6. Do not accidentally include preview-only files.
7. Build the registry.
8. Inspect the generated registry item.

When registry schema details are uncertain or may have changed, consult the latest official shadcn documentation instead
of relying on memory.

The Rivet registry namespace is:

`@rivet`

The intended consumer experience is conceptually:

```bash
npx shadcn add @rivet/<component>
```

# Dependency policy

Prefer this order:

1. browser / React platform APIs
2. utilities already in Rivet UI
3. primitives already used by the project
4. existing shadcn registry dependencies
5. new npm dependency only if justified

Do not add dependencies for trivial functionality.

# Naming

Names should be:

- concise
- predictable
- understandable without project context
- appropriate for a reusable component library

Avoid marketing names for basic primitives.

Prefer:

- `status-indicator`
- `metric`
- `data-row`
- `copy-button`

over highly application-specific names.

# Design decision hierarchy

When deciding between multiple designs, prioritize in this order:

1. usability
2. accessibility
3. consistency with Rivet UI
4. API simplicity
5. visual quality
6. novelty

Do not sacrifice usability for aesthetics.

# Visual review

If browser or screenshot tooling is available, visually inspect the completed component.

Review:

- alignment
- border consistency
- spacing rhythm
- typography hierarchy
- state visibility
- contrast
- narrow-width behavior
- whether it genuinely looks like Rivet UI

Do not trust implementation correctness alone for design tasks.

If the result looks generic, revise it.

# Quality checks

Before finishing, run the relevant repository checks.

Prefer existing scripts.

At minimum, when available:

- lint
- typecheck
- application build
- registry build

Fix errors caused by the change.

Do not modify unrelated code merely to make unrelated pre-existing warnings disappear.

# Completion criteria

A component is complete only when:

- its purpose is clear
- its API is minimal and reusable
- it follows Rivet UI's visual language
- all relevant states have been considered
- it is accessible
- it works responsively
- it uses existing tokens and conventions
- unnecessary dependencies were avoided
- its preview exists
- its registry entry is correct
- the registry builds successfully
- relevant code-quality checks pass

# Final response

After completing a component, provide a concise summary containing:

1. component name
2. what was implemented
3. public API / variants
4. relevant design decisions
5. accessibility considerations
6. registry entry
7. checks performed

Do not write a long walkthrough unless requested.
