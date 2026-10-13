import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentPreview } from "@/app/component-preview";
import { ComponentPreviewPanel } from "@/app/component-preview-panel";
import { CopyInstallButton } from "@/app/copy-command";
import { DocsSection } from "@/app/docs-section";
import { componentGroups } from "@/app/docs-structure";
import { InstallCommandTerminal } from "@/app/install-command-terminal";
import { getShadcnCommands } from "@/app/install-commands";
import { OnThisPage } from "@/app/on-this-page";
import { getComponentContent, getComponentDoc } from "@/content/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/rivetui/components/breadcrumb/breadcrumb";

type ComponentPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

const orderedComponents = componentGroups.flatMap((group) => group.components);

export function generateStaticParams() {
  return orderedComponents.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  if (!component) {
    return { title: "Component not found – Rivet UI" };
  }

  return {
    title: `${component.name} – Rivet UI`,
    description: component.description,
  };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  if (!component) {
    notFound();
  }

  const componentIndex = orderedComponents.findIndex((item) => item.slug === component.slug);
  const componentGroup = componentGroups.find((group) =>
    group.components.some((item) => item.slug === component.slug),
  );
  const previousComponent = orderedComponents[componentIndex - 1];
  const nextComponent = orderedComponents[componentIndex + 1];
  const installCommands = getShadcnCommands(`add @rivetui/${component.slug}`);
  const ComponentContent = await getComponentContent(component.slug);

  return (
    <>
      <main id="content" className="min-w-0">
        <div className="sticky top-16 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <OnThisPage variant="mobile" />
        </div>

        <article>
          <header className="relative overflow-hidden border-b border-border px-5 py-10 sm:px-10 sm:py-12 xl:px-12 xl:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:4rem_4rem]"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl">
              <Breadcrumb>
                <BreadcrumbList className="text-[0.6875rem] uppercase tracking-[0.16em]">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/#components">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <span>{componentGroup?.name}</span>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{component.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
                {component.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {component.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <code className="inline-flex h-10 items-center border border-border bg-background px-3 font-mono text-xs">
                  @rivetui/{component.slug}
                </code>
                <CopyInstallButton commands={installCommands} />
              </div>
            </div>
          </header>

          <DocsSection
            id="preview"
            title="Preview"
            description="Explore the primary composition, then switch to focused examples for variants and states."
          >
            <ComponentPreviewPanel key={component.slug}>
              <ComponentPreview slug={component.slug} />
            </ComponentPreviewPanel>
          </DocsSection>

          <DocsSection
            id="installation"
            eyebrow="Registry"
            title="Installation"
            description="Add the component source and its declared dependencies with the shadcn CLI."
          >
            <div className="mt-6">
              <InstallCommandTerminal commands={installCommands} />
            </div>
            <a
              href={`/r/${component.slug}.json`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Inspect registry item
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </DocsSection>

          <ComponentContent />

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

        <footer className="flex flex-col gap-3 border-t border-border px-5 py-8 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 xl:px-12">
          <span>Rivet UI / {component.name}</span>
          <span>Components engineered, not decorated.</span>
        </footer>
      </main>

      <aside className="hidden border-l border-border xl:block" aria-label="On this page">
        <div className="sticky top-16 px-5 py-6">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
            On this page
          </p>
          <OnThisPage />
          <div className="mt-10 border-t border-border pt-5">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
              Registry item
            </p>
            <code className="mt-3 block font-mono text-xs">@rivetui/{component.slug}</code>
          </div>
        </div>
      </aside>
    </>
  );
}
