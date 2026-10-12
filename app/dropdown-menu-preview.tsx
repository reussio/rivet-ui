import { Copy, Ellipsis, Eye, GitBranch, Settings2, Trash2 } from "lucide-react";

import { Button } from "@/registry/rivet/components/button/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/rivet/components/dropdown-menu/dropdown-menu";

export function DropdownMenuPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="dropdown-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 014
          </p>
          <h2 id="dropdown-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Dropdown Menu
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Actions
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="flex items-center justify-between gap-4 border border-border p-4">
            <div className="min-w-0">
              <p className="font-medium">Production gateway</p>
              <p className="mt-1 truncate font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                dep_01K2M7Q9 · fra1
              </p>
            </div>
            <DeploymentMenu />
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Navigation" detail="arrow / type" />
            <Specification term="Dismiss" detail="esc / outside" />
            <Specification term="Nested" detail="supported" />
            <Specification term="Focus" detail="restored" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Selection">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
              <Settings2 aria-hidden="true" />
              View options
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Display</DropdownMenuLabel>
                <DropdownMenuCheckboxItem defaultChecked>Runtime status</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem defaultChecked>Request volume</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem disabled>Build duration</DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup defaultValue="compact">
                <DropdownMenuLabel>Density</DropdownMenuLabel>
                <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </PreviewRow>
      </div>
    </section>
  );
}

function DeploymentMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" />}
        aria-label="Open deployment actions"
      >
        <Ellipsis aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Deployment</DropdownMenuLabel>
          <DropdownMenuItem>
            <Eye aria-hidden="true" />
            View details
            <DropdownMenuShortcut>Enter</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy aria-hidden="true" />
            Copy identifier
            <DropdownMenuShortcut>⌘ C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <GitBranch aria-hidden="true" />
              Promote to
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Preview</DropdownMenuItem>
              <DropdownMenuItem>Staging</DropdownMenuItem>
              <DropdownMenuItem>Production</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <Trash2 aria-hidden="true" />
          Remove deployment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </div>
  );
}
