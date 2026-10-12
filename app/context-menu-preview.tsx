import { Copy, Eye, GitBranch, RefreshCw, Trash2 } from "lucide-react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/rivet/components/context-menu/context-menu";

export function ContextMenuPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="context-menu-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 038
          </p>
          <h2
            id="context-menu-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Context menu
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Actions
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <ContextMenu>
            <ContextMenuTrigger
              tabIndex={0}
              aria-label="Deployment artifact actions"
              className="group grid min-h-56 select-none place-items-center border border-dashed border-border bg-muted/10 p-6 text-center outline-none transition-colors hover:border-foreground/40 hover:bg-muted/25 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <div>
                <span className="mx-auto mb-4 grid size-10 place-items-center border border-border bg-background font-mono text-xs text-muted-foreground group-hover:text-foreground">
                  ↗
                </span>
                <p className="text-sm font-semibold">Deployment artifact</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Right click or long press this surface.
                </p>
                <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                  build_84f2 · fra1 · ready
                </p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-60">
              <ContextMenuGroup>
                <ContextMenuLabel>Artifact</ContextMenuLabel>
                <ContextMenuItem>
                  <Eye aria-hidden="true" />
                  Inspect
                  <ContextMenuShortcut>Enter</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Copy aria-hidden="true" />
                  Copy identifier
                  <ContextMenuShortcut>⌘ C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <RefreshCw aria-hidden="true" />
                  Redeploy
                </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <GitBranch aria-hidden="true" />
                    Promote to
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Preview</ContextMenuItem>
                    <ContextMenuItem>Staging</ContextMenuItem>
                    <ContextMenuItem>Production</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuItem destructive>
                <Trash2 aria-hidden="true" />
                Delete artifact
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Open" detail="right click" />
            <Specification term="Touch" detail="long press" />
            <Specification term="Navigation" detail="arrow / type" />
            <Specification term="Nested" detail="supported" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Selection">
          <ContextMenu>
            <ContextMenuTrigger
              tabIndex={0}
              aria-label="Canvas layer options"
              className="flex min-h-24 w-full max-w-xl select-none items-center justify-between border border-border px-4 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <span className="text-sm font-medium">Canvas layers</span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Context available
              </span>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuGroup>
                <ContextMenuLabel>Visibility</ContextMenuLabel>
                <ContextMenuCheckboxItem defaultChecked>Grid guides</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem defaultChecked>Safe area</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem disabled>Baseline grid</ContextMenuCheckboxItem>
              </ContextMenuGroup>
            </ContextMenuContent>
          </ContextMenu>
        </PreviewRow>
      </div>
    </section>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right">{detail}</dd>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
