import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

import { DocsHeader, DocsSidebar } from "@/app/docs-navigation";
import { DocsSection } from "@/app/docs-section";
import { componentGroups, homeSections } from "@/app/docs-structure";
import { InstallCommandTerminal } from "@/app/install-command-terminal";
import { getShadcnCommands } from "@/app/install-commands";
import { OnThisPage } from "@/app/on-this-page";
import { componentDocs } from "@/content/components";
import { buttonVariants } from "@/registry/rivet/components/button/button";
import { CodeBlock } from "@/registry/rivet/components/code-block/code-block";

const principles = [
  {
    index: "01",
    title: "Accessible by construction",
    description: "Native semantics and Base UI primitives provide a reliable interaction model.",
  },
  {
    index: "02",
    title: "Source you own",
    description: "The CLI writes readable component source directly into your application.",
  },
  {
    index: "03",
    title: "One visual system",
    description: "Sharp geometry, restrained motion, and technical typography stay consistent.",
  },
] as const;

const initializeCommands = getShadcnCommands("init");
const connectRegistryCommands = getShadcnCommands(
  "registry add @rivetui=https://rivetui.reuss.dev/r/{name}.json",
);
const addRivetStyleCommands = getShadcnCommands("add @rivetui/rivet-style");
const addButtonCommands = getShadcnCommands("add @rivetui/button");

export default function Home() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <a
        href="#content"
        className="fixed top-2 left-2 z-50 -translate-y-20 border border-foreground bg-background px-3 py-2 text-sm focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <DocsHeader />

      <div
        id="top"
        className="mx-auto grid max-w-[100rem] lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)_13rem]"
      >
        <DocsSidebar />

        <main id="content" className="min-w-0">
          <div className="sticky top-16 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm lg:hidden">
            <OnThisPage variant="mobile" sections={homeSections} />
          </div>

          <article>
            <section
              id="introduction"
              className="relative scroll-mt-24 overflow-hidden border-b border-border px-5 py-12 sm:px-10 sm:py-16 xl:px-12 xl:py-20"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:4rem_4rem]"
                aria-hidden="true"
              />
              <div className="relative max-w-3xl">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Documentation / 001
                </p>
                <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl">
                  Build with
                  <span className="block text-muted-foreground">Rivet UI.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Accessible React components with precise APIs, readable source, and a visual
                  system engineered for technical products.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#quick-start" className={buttonVariants()}>
                    Quick start
                    <ArrowRight aria-hidden="true" />
                  </a>
                  <a href="#components" className={buttonVariants({ variant: "outline" })}>
                    Browse components
                  </a>
                </div>
              </div>

              <dl className="relative mt-12 grid max-w-3xl border-y border-border sm:grid-cols-3">
                <Stat term="Components" detail={String(componentDocs.length).padStart(2, "0")} />
                <Stat term="Foundation" detail="Base UI" />
                <Stat term="Delivery" detail="shadcn CLI" />
              </dl>
            </section>

            <DocsSection
              id="quick-start"
              eyebrow="Quick start"
              title="From zero to first component."
              description="Initialize shadcn, connect the Rivet registry, then install only the components you need."
            >
              <div className="mt-8 divide-y divide-border border-y border-border">
                <InstallStep index="01" title="Initialize shadcn">
                  <InstallCommandTerminal label="Initialize shadcn" commands={initializeCommands} />
                </InstallStep>
                <InstallStep index="02" title="Connect the registry">
                  <InstallCommandTerminal
                    label="Add Rivet registry"
                    commands={connectRegistryCommands}
                  />
                </InstallStep>
                <InstallStep index="03" title="Add global styles">
                  <InstallCommandTerminal
                    label="Add Rivet styles"
                    commands={addRivetStyleCommands}
                  />
                </InstallStep>
                <InstallStep index="04" title="Install a component">
                  <InstallCommandTerminal label="Add component" commands={addButtonCommands} />
                </InstallStep>
                <InstallStep index="05" title="Import locally">
                  <CodeBlock
                    filename="app/page.tsx"
                    language="tsx"
                    code={
                      'import { Button } from "@/components/ui/button"\n\nexport default function Page() {\n  return <Button>Deploy</Button>\n}'
                    }
                  />
                </InstallStep>
              </div>
            </DocsSection>

            <DocsSection
              id="principles"
              eyebrow="Principles"
              title="A small set of firm decisions."
              description="Rivet stays predictable by favoring usability, semantics, and composition over decorative options."
            >
              <div className="mt-8 grid border-t border-l border-border md:grid-cols-3">
                {principles.map((principle) => (
                  <div key={principle.index} className="border-r border-b border-border p-5">
                    <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground">
                      {principle.index}
                    </span>
                    <h3 className="mt-6 text-base font-semibold tracking-[-0.02em]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </DocsSection>

            <DocsSection
              id="components"
              eyebrow="Component index"
              title={`${componentDocs.length} components, grouped by purpose.`}
              description="Use the categories to scan the system or press Command K to jump directly to a component."
              last
            >
              <div className="mt-8 border-t border-border">
                {componentGroups.map((group) => (
                  <section
                    key={group.name}
                    className="grid border-r border-b border-l border-border md:grid-cols-[11rem_minmax(0,1fr)]"
                    aria-labelledby={`group-${group.name.toLowerCase().replaceAll(/[^a-z]+/g, "-")}`}
                  >
                    <div className="border-b border-border p-4 md:border-r md:border-b-0 md:p-5">
                      <h3
                        id={`group-${group.name.toLowerCase().replaceAll(/[^a-z]+/g, "-")}`}
                        className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
                      >
                        {group.name}
                      </h3>
                      <p className="mt-2 font-mono text-[0.625rem] text-muted-foreground">
                        {String(group.components.length).padStart(2, "0")} entries
                      </p>
                    </div>
                    <ul className="grid sm:grid-cols-2">
                      {group.components.map((component) => (
                        <li
                          id={component.slug}
                          key={component.slug}
                          className="group border-b border-border last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                        >
                          <Link
                            href={`/components/${component.slug}`}
                            className="flex h-full min-h-24 items-start gap-4 p-4 outline-none transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block font-medium tracking-[-0.015em]">
                                {component.name}
                              </span>
                              <span className="mt-1.5 line-clamp-2 block text-xs leading-5 text-muted-foreground">
                                {component.description}
                              </span>
                            </span>
                            <ArrowUpRight
                              className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </DocsSection>
          </article>

          <footer className="flex flex-col gap-3 border-t border-border px-5 py-8 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 xl:px-12">
            <span>Rivet UI / Documentation</span>
            <span>Components engineered, not decorated.</span>
          </footer>
        </main>

        <aside className="hidden border-l border-border xl:block" aria-label="On this page">
          <div className="sticky top-16 px-5 py-6">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              On this page
            </p>
            <OnThisPage sections={homeSections} />
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

function Stat({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="border-b border-border px-4 py-4 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground">
        {term}
      </dt>
      <dd className="mt-2 text-base font-medium tracking-[-0.02em]">{detail}</dd>
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
    <div className="grid gap-4 py-5 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8">
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
