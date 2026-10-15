import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlockPreview } from "@/app/block-preview";
import { ComponentStatus } from "@/app/component-status";
import { CopyInstallButton } from "@/app/copy-command";
import { DocsSection } from "@/app/docs-section";
import { InstallCommandTerminal } from "@/app/install-command-terminal";
import { getShadcnCommands } from "@/app/install-commands";
import { OnThisPage } from "@/app/on-this-page";
import { blockDocs, getBlockContent, getBlockDoc } from "@/content/blocks";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/rivetui/components/breadcrumb/breadcrumb";

type BlockPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

const sections = [
  { id: "preview", label: "Preview" },
  { id: "installation", label: "Installation" },
  { id: "details", label: "Details" },
] as const;

export function generateStaticParams() {
  return blockDocs.map((block) => ({ slug: block.slug }));
}

export async function generateMetadata({ params }: BlockPageProps): Promise<Metadata> {
  const { slug } = await params;
  const block = getBlockDoc(slug);

  if (!block) {
    return { title: "Block not found – Rivet UI" };
  }

  return { title: `${block.name} – Rivet UI`, description: block.description };
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { slug } = await params;
  const block = getBlockDoc(slug);

  if (!block) {
    notFound();
  }

  const blockIndex = blockDocs.findIndex((item) => item.slug === block.slug);
  const previousBlock = blockDocs[blockIndex - 1];
  const nextBlock = blockDocs[blockIndex + 1];
  const installCommands = getShadcnCommands(`add @rivetui/${block.slug}`);
  const BlockContent = await getBlockContent(block.slug);

  return (
    <>
      <main id="content" className="min-w-0">
        <div
          data-slot="block-page-mobile-nav"
          className="sticky top-16 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm lg:hidden"
        >
          <OnThisPage variant="mobile" sections={sections} />
        </div>

        <article>
          <header className="relative overflow-hidden border-b border-border px-5 py-10 sm:px-10 sm:py-12 xl:px-12 xl:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:4rem_4rem]"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <Breadcrumb>
                  <BreadcrumbList className="text-[0.6875rem] uppercase tracking-[0.16em]">
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/blocks">Blocks</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{block.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <ComponentStatus
                  status={block.status}
                  since={block.since}
                  replacement={block.replacement}
                  subject="block"
                />
              </div>
              <div className="max-w-3xl">
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
                  {block.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {block.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <code className="inline-flex h-10 items-center border border-border bg-background px-3 font-mono text-xs">
                    @rivetui/{block.slug}
                  </code>
                  <CopyInstallButton commands={installCommands} />
                </div>
              </div>
            </div>
          </header>

          <DocsSection
            id="preview"
            title="Preview"
            description="Use the complete responsive composition, then inspect the exact source installed by the registry."
          >
            <div className="mt-8">
              <BlockPreview slug={block.slug} name={block.name} />
            </div>
          </DocsSection>

          <DocsSection
            id="installation"
            eyebrow="Registry block"
            title="Installation"
            description="Install the block and every declared Rivet component dependency with one command."
          >
            <div className="mt-6">
              <InstallCommandTerminal commands={installCommands} />
            </div>
            <a
              href={`/r/${block.slug}.json`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Inspect registry item <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </DocsSection>

          <BlockContent />

          <nav className="grid border-t border-border sm:grid-cols-2" aria-label="Block pagination">
            {previousBlock ? (
              <Link
                href={`/blocks/${previousBlock.slug}`}
                className="group flex min-h-28 items-center gap-4 border-b border-border p-5 transition-colors hover:bg-muted/40 sm:border-r sm:border-b-0 sm:p-6"
              >
                <ArrowLeft
                  className="size-4 text-muted-foreground group-hover:text-foreground"
                  aria-hidden="true"
                />
                <span>
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Previous
                  </span>
                  <span className="mt-2 block text-sm font-medium">{previousBlock.name}</span>
                </span>
              </Link>
            ) : (
              <span className="hidden border-r border-border sm:block" />
            )}
            {nextBlock ? (
              <Link
                href={`/blocks/${nextBlock.slug}`}
                className="group flex min-h-28 items-center justify-end gap-4 p-5 text-right transition-colors hover:bg-muted/40 sm:p-6"
              >
                <span>
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Next
                  </span>
                  <span className="mt-2 block text-sm font-medium">{nextBlock.name}</span>
                </span>
                <ArrowRight
                  className="size-4 text-muted-foreground group-hover:text-foreground"
                  aria-hidden="true"
                />
              </Link>
            ) : null}
          </nav>
        </article>
      </main>

      <aside className="hidden border-l border-border xl:block" aria-label="On this page">
        <div className="sticky top-16 px-5 py-6">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
            On this page
          </p>
          <OnThisPage sections={sections} />
          <div className="mt-10 border-t border-border pt-5">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
              Registry block
            </p>
            <code className="mt-3 block font-mono text-xs">@rivetui/{block.slug}</code>
          </div>
        </div>
      </aside>
    </>
  );
}
