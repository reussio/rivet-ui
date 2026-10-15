import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { OnThisPage } from "@/app/on-this-page";
import { blockDocs } from "@/content/blocks";

export const metadata: Metadata = {
  title: "Blocks – Rivet UI",
  description: "Production-shaped interface compositions built from Rivet UI components.",
};

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "blocks", label: "Blocks" },
] as const;

export default function BlocksPage() {
  return (
    <>
      <main id="content" className="min-w-0">
        <div className="sticky top-16 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <OnThisPage variant="mobile" sections={sections} />
        </div>

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
              Rivet UI blocks
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl">
              Interfaces,
              <span className="block text-muted-foreground">composed.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Production-shaped layouts assembled from Rivet components. Install the source, connect
              your data, and keep every implementation detail.
            </p>
          </div>
        </section>

        <section id="blocks" className="scroll-mt-24 px-5 py-10 sm:px-10 sm:py-12 xl:px-12">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
              Block index
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              {blockDocs.length} complete compositions.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Each block includes responsive layout, realistic example data, installable source, and
              declared Rivet dependencies.
            </p>
          </div>

          <ul className="mt-8 grid border-t border-l border-border md:grid-cols-2">
            {blockDocs.map((block) => (
              <li key={block.slug} className="border-r border-b border-border">
                <Link
                  href={`/blocks/${block.slug}`}
                  className="group flex h-full min-h-48 flex-col p-5 outline-none transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                      registry:block
                    </span>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-8 text-lg font-semibold tracking-[-0.025em]">{block.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {block.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex flex-col gap-3 border-t border-border px-5 py-8 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 xl:px-12">
          <span>Rivet UI / Blocks</span>
          <span>Compositions built from the system.</span>
        </footer>
      </main>

      <aside className="hidden border-l border-border xl:block" aria-label="On this page">
        <div className="sticky top-16 px-5 py-6">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
            On this page
          </p>
          <OnThisPage sections={sections} />
        </div>
      </aside>
    </>
  );
}
