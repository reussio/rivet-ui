import Link from "next/link";

import { DocsSearch, type DocsSearchItem } from "@/app/docs-search";
import { componentGroups } from "@/app/docs-structure";
import { HomeSidebarLinks } from "@/app/home-sidebar-links";
import { SidebarLink } from "@/app/sidebar-link";
import { Button } from "@/registry/rivetui/components/button/button";

const searchItems: readonly DocsSearchItem[] = componentGroups.flatMap((group) =>
  group.components.map((component) => ({
    slug: component.slug,
    name: component.name,
    description: component.description,
    group: group.name,
  })),
);

export function DocsHeader({ active = "docs" }: { active?: "docs" | "components" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[100rem] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          aria-label="Rivet UI home"
        >
          <span className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold tracking-[-0.03em]">Rivet</span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
              UI
            </span>
          </span>
        </Link>

        <nav
          className="ml-3 hidden h-full items-center gap-6 text-sm text-muted-foreground md:flex"
          aria-label="Primary"
        >
          <Link
            href="/"
            aria-current={active === "docs" ? "page" : undefined}
            className={`flex h-full items-center border-b transition-colors hover:text-foreground ${
              active === "docs" ? "border-foreground text-foreground" : "border-transparent"
            }`}
          >
            Docs
          </Link>
          <Link
            href="/#components"
            aria-current={active === "components" ? "page" : undefined}
            className={`flex h-full items-center border-b transition-colors hover:text-foreground ${
              active === "components" ? "border-foreground text-foreground" : "border-transparent"
            }`}
          >
            Components
          </Link>
          <a
            href="/r/registry.json"
            className="flex h-full items-center border-b border-transparent transition-colors hover:text-foreground"
          >
            Registry
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DocsSearch items={searchItems} />
          <Button
            render={
              <a
                href="https://github.com/reussio/rivet-ui"
                target="_blank"
                rel="noreferrer"
                aria-label="View Rivet UI on GitHub"
              />
            }
            variant="outline"
            size="icon-sm"
            className="size-9 text-muted-foreground hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

export function DocsSidebar() {
  return (
    <aside className="hidden border-r border-border lg:block" aria-label="Documentation navigation">
      <div
        data-slot="docs-sidebar-scroll"
        className="sticky top-16 max-h-[calc(100svh-4rem)] overflow-y-auto px-4 py-6"
      >
        <SidebarGroup title="Getting started">
          <HomeSidebarLinks />
        </SidebarGroup>

        <div className="my-6 border-t border-border" />

        {componentGroups.map((group) => (
          <SidebarGroup key={group.name} title={group.name}>
            {group.components.map((component) => (
              <SidebarLink key={component.slug} href={`/components/${component.slug}`}>
                {component.name}
              </SidebarLink>
            ))}
          </SidebarGroup>
        ))}
      </div>
    </aside>
  );
}

function SidebarGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 last:mb-0" aria-label={title}>
      <div className="mb-2 px-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </div>
      <nav className="grid gap-px text-[0.8125rem]">{children}</nav>
    </section>
  );
}
