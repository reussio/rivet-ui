import Link from "next/link";

import { componentDocs } from "@/app/docs-data";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[96rem] items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Rivet UI home">
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
        </Link>

        <nav
          className="ml-8 hidden items-center gap-6 text-sm text-muted-foreground sm:flex"
          aria-label="Primary"
        >
          <Link href="/" className="text-foreground">
            Docs
          </Link>
          <Link href="/#components" className="transition-colors hover:text-foreground">
            Components
          </Link>
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
  );
}

export function DocsSidebar({ activeSlug }: { activeSlug?: string }) {
  return (
    <aside className="hidden border-r border-border lg:block" aria-label="Documentation navigation">
      <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-y-auto px-6 py-8">
        <SidebarGroup title="Getting started">
          <SidebarLink href="/" active={activeSlug === undefined}>
            Introduction
          </SidebarLink>
          <SidebarLink href="/#quick-start">Quick start</SidebarLink>
          <SidebarLink href="/#principles">Principles</SidebarLink>
        </SidebarGroup>
        <SidebarGroup title="Components">
          {componentDocs.map((component) => (
            <SidebarLink
              key={component.slug}
              href={`/components/${component.slug}`}
              active={activeSlug === component.slug}
            >
              {component.name}
            </SidebarLink>
          ))}
        </SidebarGroup>
      </div>
    </aside>
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
  active = false,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`border-l px-3 py-1.5 transition-colors hover:border-foreground hover:text-foreground ${
        active ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
