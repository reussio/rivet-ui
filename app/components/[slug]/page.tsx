import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentPreview } from "@/app/component-preview";
import { CopyInstallButton } from "@/app/copy-command";
import { componentDocs, getComponentDoc } from "@/app/docs-data";
import { DocsHeader, DocsSidebar } from "@/app/docs-navigation";
import { getShadcnCommands } from "@/app/install-commands";
import { CodeBlock } from "@/registry/rivet/blocks/code-block/code-block";
import { Terminal } from "@/registry/rivet/blocks/terminal/terminal";

type ComponentPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return componentDocs.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  if (!component) {
    return { title: "Component not found — Rivet UI" };
  }

  return {
    title: `${component.name} — Rivet UI`,
    description: component.description,
  };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  if (!component) {
    notFound();
  }

  const componentIndex = componentDocs.findIndex((item) => item.slug === component.slug);
  const previousComponent = componentDocs[componentIndex - 1];
  const nextComponent = componentDocs[componentIndex + 1];
  const installCommands = getShadcnCommands(`add @rivet/${component.slug}`);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <a
        href="#content"
        className="fixed top-2 left-2 z-50 -translate-y-20 border border-foreground bg-background px-3 py-2 text-sm focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <DocsHeader />

      <div className="mx-auto grid max-w-[96rem] lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
        <DocsSidebar activeSlug={component.slug} />

        <main id="content" className="min-w-0">
          <div className="border-b border-border px-4 py-3 lg:hidden">
            <nav
              className="flex gap-5 overflow-x-auto font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="On this page"
            >
              <a href="#preview" className="shrink-0 text-foreground">
                Preview
              </a>
              <a href="#installation" className="shrink-0">
                Installation
              </a>
              <a href="#usage" className="shrink-0">
                Usage
              </a>
              <a href="#examples" className="shrink-0">
                Examples
              </a>
              <a href="#api-reference" className="shrink-0">
                API
              </a>
            </nav>
          </div>

          <article>
            <header className="relative overflow-hidden border-b border-border px-5 py-14 sm:px-10 sm:py-20 xl:px-16">
              <div
                className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:4rem_4rem]"
                aria-hidden="true"
              />
              <div className="relative max-w-3xl">
                <nav
                  className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground"
                  aria-label="Breadcrumb"
                >
                  <Link href="/#components" className="transition-colors hover:text-foreground">
                    Components
                  </Link>
                  <span aria-hidden="true">/</span>
                  <span>{component.number}</span>
                </nav>

                <h1 className="mt-8 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
                  {component.name}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {component.description}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <code className="inline-flex h-10 items-center border border-border bg-background px-3 font-mono text-xs">
                    @rivet/{component.slug}
                  </code>
                  <CopyInstallButton commands={installCommands} />
                </div>
              </div>
            </header>

            <DocsSection id="preview" title="Preview">
              <div className="docs-preview mt-8 overflow-hidden border border-border bg-background">
                <ComponentPreview slug={component.slug} />
              </div>
            </DocsSection>

            <DocsSection
              id="installation"
              eyebrow="Registry"
              title="Installation"
              description="Add the component source and its declared dependencies with the shadcn CLI."
            >
              <div className="mt-8">
                <Terminal label="Install component" commands={installCommands} defaultValue="bun" />
              </div>
              <a
                href={`/r/${component.slug}.json`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Inspect registry item
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </DocsSection>

            <DocsSection
              id="usage"
              eyebrow="Source"
              title="Usage"
              description="Import the component from your local UI directory and compose it in your application."
            >
              <div className="mt-8">
                <CodeBlock filename="example.tsx" language="tsx" code={component.usage} />
              </div>
            </DocsSection>

            <DocsSection
              id="examples"
              eyebrow="Composition"
              title="Variants and states"
              description="Use the smallest API surface that communicates the interaction or state clearly."
            >
              <div className="mt-10 grid border-t border-l border-border">
                {component.notes.map((note, index) => (
                  <section
                    key={note.title}
                    className="grid border-r border-b border-border lg:grid-cols-[12rem_minmax(0,1fr)]"
                    aria-labelledby={`example-${index}`}
                  >
                    <div className="border-b border-border p-5 lg:border-r lg:border-b-0">
                      <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3
                        id={`example-${index}`}
                        className="mt-4 text-sm font-semibold tracking-[-0.02em]"
                      >
                        {note.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {note.description}
                      </p>
                    </div>
                    <pre className="min-w-0 overflow-x-auto p-5 font-mono text-xs leading-6">
                      <code>{note.code}</code>
                    </pre>
                  </section>
                ))}
              </div>
            </DocsSection>

            <DocsSection
              id="api-reference"
              eyebrow="Public interface"
              title="API reference"
              description="Component-specific props are listed here. Native element and Base UI props continue to pass through."
            >
              <div className="mt-10 overflow-x-auto border border-border">
                <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                  <thead className="border-b border-border bg-muted/30 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">
                        Prop
                      </th>
                      <th scope="col" className="px-4 py-3 font-medium">
                        Type
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-medium">
                        Default
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {component.api.map((row) => (
                      <tr key={row.name}>
                        <th scope="row" className="px-4 py-3 font-mono text-xs font-medium">
                          {row.name}
                        </th>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                          {row.type}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs">
                          {row.defaultValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DocsSection>

            <nav
              className="grid border-t border-border sm:grid-cols-2"
              aria-label="Component pagination"
            >
              {previousComponent ? (
                <Link
                  href={`/components/${previousComponent.slug}`}
                  className="group flex min-h-28 items-center gap-4 border-b border-border p-5 transition-colors hover:bg-muted/40 sm:border-r sm:border-b-0 sm:p-6"
                >
                  <ArrowLeft
                    className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                      Previous
                    </span>
                    <span className="mt-2 block text-sm font-medium">{previousComponent.name}</span>
                  </span>
                </Link>
              ) : (
                <span className="hidden border-r border-border sm:block" />
              )}
              {nextComponent ? (
                <Link
                  href={`/components/${nextComponent.slug}`}
                  className="group flex min-h-28 items-center justify-end gap-4 p-5 text-right transition-colors hover:bg-muted/40 sm:p-6"
                >
                  <span>
                    <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                      Next
                    </span>
                    <span className="mt-2 block text-sm font-medium">{nextComponent.name}</span>
                  </span>
                  <ArrowRight
                    className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </Link>
              ) : null}
            </nav>
          </article>

          <footer className="flex flex-col gap-3 border-t border-border px-5 py-8 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 xl:px-16">
            <span>Rivet UI / {component.name}</span>
            <span>Components engineered, not decorated.</span>
          </footer>
        </main>

        <aside className="hidden border-l border-border xl:block" aria-label="On this page">
          <div className="sticky top-14 px-6 py-8">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              On this page
            </p>
            <nav className="mt-5 grid gap-3 text-sm text-muted-foreground">
              <TocLink href="#preview">Preview</TocLink>
              <TocLink href="#installation">Installation</TocLink>
              <TocLink href="#usage">Usage</TocLink>
              <TocLink href="#examples">Variants & states</TocLink>
              <TocLink href="#api-reference">API reference</TocLink>
            </nav>
            <div className="mt-10 border-t border-border pt-5">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Registry item
              </p>
              <code className="mt-3 block font-mono text-xs">@rivet/{component.slug}</code>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DocsSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-border px-5 py-12 sm:px-10 sm:py-16 xl:px-16"
      aria-labelledby={`${id}-title`}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={`${id}-title`}
          className={`${eyebrow ? "mt-4 " : ""}text-3xl font-semibold tracking-[-0.045em] sm:text-4xl`}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function TocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="transition-colors hover:text-foreground">
      {children}
    </a>
  );
}
