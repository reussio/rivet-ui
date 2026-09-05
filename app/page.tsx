import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { CopyCommand } from "@/app/copy-command";
import { Badge, Status } from "@/registry/rivet/blocks/badge/badge";
import { Button, buttonVariants } from "@/registry/rivet/blocks/button/button";
import { Checkbox } from "@/registry/rivet/blocks/checkbox/checkbox";
import { Input } from "@/registry/rivet/blocks/input/input";
import { Switch } from "@/registry/rivet/blocks/switch/switch";

const components = [
  {
    name: "Accordion",
    slug: "accordion",
    description: "A semantic disclosure set with single and multiple expansion.",
  },
  {
    name: "Alert",
    slug: "alert",
    description: "A structured message for information, success, warning, and failure.",
  },
  {
    name: "Badge / Status",
    slug: "badge",
    description: "Compact metadata and restrained operational states.",
  },
  {
    name: "Button",
    slug: "button",
    description: "A sharp action primitive with purposeful variants and sizes.",
  },
  {
    name: "Card",
    slug: "card",
    description: "A precise content container with composable regions.",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    description: "A native form control for binary and indeterminate choices.",
  },
  {
    name: "Collapsible",
    slug: "collapsible",
    description: "A single disclosure region with measured motion.",
  },
  {
    name: "Dialog",
    slug: "dialog",
    description: "A modal surface with managed focus and explicit dismissal.",
  },
  {
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    description: "A keyboard-ready action menu with nested navigation.",
  },
  {
    name: "Field",
    slug: "field",
    description: "Composable labels, descriptions, controls, and validation.",
  },
  {
    name: "Input",
    slug: "input",
    description: "A native text input with precise focus and error states.",
  },
  {
    name: "Popover",
    slug: "popover",
    description: "A collision-aware interactive surface anchored to a trigger.",
  },
  {
    name: "Progress",
    slug: "progress",
    description: "Determinate and indeterminate progress for ongoing tasks.",
  },
  {
    name: "Radio Group",
    slug: "radio-group",
    description: "A composable single-choice control with arrow-key navigation.",
  },
  {
    name: "Select",
    slug: "select",
    description: "A single-select primitive with grouping and typeahead.",
  },
  {
    name: "Separator",
    slug: "separator",
    description: "A semantic one-pixel divider for horizontal and vertical structure.",
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    description: "A neutral loading placeholder with reduced-motion support.",
  },
  {
    name: "Switch",
    slug: "switch",
    description: "A compact boolean control with native form behavior.",
  },
  {
    name: "Table",
    slug: "table",
    description: "A responsive native table for dense technical data.",
  },
  {
    name: "Tabs",
    slug: "tabs",
    description: "Horizontal and vertical tab navigation with complete keyboard support.",
  },
  {
    name: "Textarea",
    slug: "textarea",
    description: "A multiline native input with deliberate validation states.",
  },
  {
    name: "Toast",
    slug: "toast",
    description: "Non-blocking feedback with polite and urgent priorities.",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    description: "A supplementary hint available through pointer and keyboard.",
  },
] as const;

const principles = [
  {
    index: "01",
    title: "Accessible by construction",
    description: "Native semantics and Base UI primitives provide a reliable interaction model.",
  },
  {
    index: "02",
    title: "Open source model",
    description: "The CLI writes component source into your project. Read it, change it, own it.",
  },
  {
    index: "03",
    title: "One visual system",
    description: "Sharp geometry, restrained motion, and technical typography stay consistent.",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <a
        href="#content"
        className="fixed top-2 left-2 z-50 -translate-y-20 border border-foreground bg-background px-3 py-2 text-sm focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[96rem] items-center px-4 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3" aria-label="Rivet UI home">
            <span
              className="grid size-6 grid-cols-2 gap-px border border-foreground p-1 transition-colors group-hover:bg-foreground"
              aria-hidden="true"
            >
              <span className="bg-foreground group-hover:bg-background" />
              <span className="bg-transparent" />
              <span className="bg-transparent" />
              <span className="bg-foreground group-hover:bg-background" />
            </span>
            <span className="text-sm font-semibold tracking-[-0.02em]">Rivet UI</span>
          </a>

          <nav
            className="ml-8 hidden items-center gap-6 text-sm text-muted-foreground sm:flex"
            aria-label="Primary"
          >
            <a href="#introduction" className="text-foreground">
              Docs
            </a>
            <a href="#components" className="transition-colors hover:text-foreground">
              Components
            </a>
            <a href="/r/registry.json" className="transition-colors hover:text-foreground">
              Registry
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground md:flex">
              <span className="size-1.5 bg-emerald-500" />
              Registry live
            </span>
            <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
              v0.1
            </span>
          </div>
        </div>
      </header>

      <div
        id="top"
        className="mx-auto grid max-w-[96rem] lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem]"
      >
        <aside
          className="hidden border-r border-border lg:block"
          aria-label="Documentation navigation"
        >
          <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-y-auto px-6 py-8">
            <SidebarGroup title="Getting started">
              <SidebarLink href="#introduction" active>
                Introduction
              </SidebarLink>
              <SidebarLink href="#quick-start">Quick start</SidebarLink>
              <SidebarLink href="#principles">Principles</SidebarLink>
            </SidebarGroup>
            <SidebarGroup title="Components">
              {components.map((component) => (
                <SidebarLink key={component.slug} href={`/components/${component.slug}`}>
                  {component.name}
                </SidebarLink>
              ))}
            </SidebarGroup>
          </div>
        </aside>

        <main id="content" className="min-w-0">
          <div className="border-b border-border px-4 py-3 lg:hidden">
            <nav
              className="flex gap-5 overflow-x-auto font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Section navigation"
            >
              <a href="#introduction" className="shrink-0 text-foreground">
                Introduction
              </a>
              <a href="#quick-start" className="shrink-0">
                Quick start
              </a>
              <a href="#principles" className="shrink-0">
                Principles
              </a>
              <a href="#components" className="shrink-0">
                Components
              </a>
            </nav>
          </div>

          <article>
            <section
              id="introduction"
              className="relative scroll-mt-20 overflow-hidden border-b border-border px-5 py-16 sm:px-10 sm:py-24 xl:px-16 xl:py-28"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:4rem_4rem]"
                aria-hidden="true"
              />
              <div className="relative max-w-4xl">
                <p className="mb-8 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="h-px w-8 bg-border" />
                  React components / Base UI primitives
                </p>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.065em] sm:text-7xl xl:text-[6.75rem]">
                  Components,
                  <span className="block text-muted-foreground">engineered.</span>
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  A precise component registry for React. Accessible, composable source code built
                  on Base UI and distributed through the shadcn CLI.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#quick-start" className={buttonVariants()}>
                    Get started
                    <ArrowRight aria-hidden="true" />
                  </a>
                  <a href="#components" className={buttonVariants({ variant: "outline" })}>
                    Browse {components.length} components
                  </a>
                </div>
              </div>

              <dl className="relative mt-16 grid max-w-4xl border-y border-border sm:grid-cols-3">
                <Stat term="Components" detail={String(components.length).padStart(2, "0")} />
                <Stat term="Foundation" detail="Base UI" />
                <Stat term="Delivery" detail="Source" />
              </dl>
            </section>

            <section
              id="system-preview"
              className="scroll-mt-20 border-b border-border px-5 py-12 sm:px-10 sm:py-16 xl:px-16"
              aria-labelledby="system-preview-title"
            >
              <SectionIntro
                eyebrow="System preview"
                title="Designed as one system."
                description="Every primitive shares the same geometry, spacing rhythm, focus treatment, and restrained interaction language."
                id="system-preview-title"
              />

              <div className="mt-10 grid border border-border xl:grid-cols-[minmax(0,1fr)_15rem]">
                <div className="p-5 sm:p-8 xl:border-r xl:border-border">
                  <div className="border border-border bg-background">
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
                      <div>
                        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                          Deployment / Production
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                          API gateway
                        </h3>
                      </div>
                      <Status tone="success">Operational</Status>
                    </div>
                    <div className="grid gap-5 p-5 sm:grid-cols-2">
                      <label htmlFor="docs-public-alias" className="grid gap-2 text-sm font-medium">
                        Public alias
                        <Input id="docs-public-alias" defaultValue="api.rivet.run" />
                      </label>
                      <div className="grid content-start gap-3 border border-border p-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium">Automatic failover</span>
                          <Switch defaultChecked aria-label="Automatic failover" />
                        </div>
                        <label
                          htmlFor="docs-retain-release"
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                        >
                          <Checkbox id="docs-retain-release" defaultChecked />
                          Retain previous release
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
                      <Badge variant="outline">FRA1 / BUN 1.3</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                        <Button size="sm">Deploy revision</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <dl className="divide-y divide-border border-t border-border font-mono text-[0.6875rem] uppercase tracking-[0.12em] xl:border-t-0">
                  <Specification term="Geometry" detail="Sharp" />
                  <Specification term="Contrast" detail="Restrained" />
                  <Specification term="Input" detail="Keyboard" />
                  <Specification term="Source" detail="Yours" />
                </dl>
              </div>
            </section>

            <section
              id="quick-start"
              className="scroll-mt-20 border-b border-border px-5 py-12 sm:px-10 sm:py-16 xl:px-16"
              aria-labelledby="quick-start-title"
            >
              <SectionIntro
                eyebrow="Quick start"
                title="Install what you need."
                description="Rivet UI follows the shadcn distribution model. Components are copied into your project, not hidden behind a package boundary."
                id="quick-start-title"
              />

              <div className="mt-10 divide-y divide-border border-y border-border">
                <InstallStep index="01" title="Initialize shadcn">
                  <CopyCommand command="npx shadcn@latest init" />
                </InstallStep>
                <InstallStep index="02" title="Add a Rivet component">
                  <CopyCommand command="npx shadcn add @rivet/button" />
                </InstallStep>
                <InstallStep index="03" title="Import from your project">
                  <CodeBlock
                    label="app/page.tsx"
                    code={
                      'import { Button } from "@/components/ui/button"\n\nexport default function Page() {\n  return <Button>Deploy</Button>\n}'
                    }
                  />
                </InstallStep>
              </div>
            </section>

            <section
              id="principles"
              className="scroll-mt-20 border-b border-border px-5 py-12 sm:px-10 sm:py-16 xl:px-16"
              aria-labelledby="principles-title"
            >
              <SectionIntro
                eyebrow="Principles"
                title="Built to be understood."
                description="The visual language is technical and exact, but the implementation stays familiar."
                id="principles-title"
              />
              <div className="mt-10 grid border-t border-l border-border md:grid-cols-3">
                {principles.map((principle) => (
                  <div key={principle.index} className="border-r border-b border-border p-5 sm:p-6">
                    <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground">
                      {principle.index}
                    </span>
                    <h3 className="mt-8 text-base font-semibold tracking-[-0.02em]">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              id="components"
              className="scroll-mt-20 px-5 py-12 sm:px-10 sm:py-16 xl:px-16"
              aria-labelledby="components-title"
            >
              <SectionIntro
                eyebrow="Component index"
                title={`${components.length} production-ready primitives.`}
                description="Start with the component you need. Each registry item includes its source and required dependencies."
                id="components-title"
              />

              <ul className="mt-10 grid border-t border-l border-border sm:grid-cols-2">
                {components.map((component, index) => (
                  <li
                    id={component.slug}
                    key={component.slug}
                    className="group scroll-mt-20 border-r border-b border-border"
                  >
                    <a
                      href={`/components/${component.slug}`}
                      className="block h-full p-5 outline-none transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <ArrowUpRight
                          className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-8 text-lg font-semibold tracking-[-0.03em]">
                        {component.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {component.description}
                      </p>
                      <code className="mt-5 block font-mono text-[0.6875rem] text-muted-foreground">
                        @rivet/{component.slug}
                      </code>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <footer className="flex flex-col gap-3 border-t border-border px-5 py-8 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 xl:px-16">
            <span>Rivet UI / Component registry</span>
            <span>Components engineered, not decorated.</span>
          </footer>
        </main>

        <aside className="hidden border-l border-border xl:block" aria-label="On this page">
          <div className="sticky top-14 px-6 py-8">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              On this page
            </p>
            <nav className="mt-5 grid gap-3 text-sm text-muted-foreground">
              <a href="#introduction" className="transition-colors hover:text-foreground">
                Introduction
              </a>
              <a href="#system-preview" className="transition-colors hover:text-foreground">
                System preview
              </a>
              <a href="#quick-start" className="transition-colors hover:text-foreground">
                Quick start
              </a>
              <a href="#principles" className="transition-colors hover:text-foreground">
                Principles
              </a>
              <a href="#components" className="transition-colors hover:text-foreground">
                Components
              </a>
            </nav>
            <div className="mt-10 border-t border-border pt-5">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="size-3.5" aria-hidden="true" />
                Registry validated
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SidebarGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      <nav className="grid gap-0.5 text-sm">{children}</nav>
    </div>
  );
}

function SidebarLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`border-l px-3 py-1.5 transition-colors hover:border-foreground hover:text-foreground ${
        active ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"
      }`}
    >
      {children}
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}

function Stat({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="border-b border-border px-4 py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground">
        {term}
      </dt>
      <dd className="mt-3 text-lg font-medium tracking-[-0.02em]">{detail}</dd>
    </div>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd>{detail}</dd>
    </div>
  );
}

function InstallStep({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 py-6 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8">
      <div>
        <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground">
          {index}
        </span>
        <h3 className="mt-2 text-sm font-medium">{title}</h3>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden border border-border bg-card">
      <div className="border-b border-border px-4 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}
