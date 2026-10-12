import { Copy, RefreshCw, Settings2, Trash2 } from "lucide-react";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/rivetui/components/tooltip/tooltip";

export function TooltipPreview() {
  return (
    <TooltipProvider>
      <section
        className="w-full border border-border bg-background"
        aria-labelledby="tooltip-title"
      >
        <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
          <div className="space-y-2">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
              Primitive / 009
            </p>
            <h2
              id="tooltip-title"
              className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
            >
              Tooltip
            </h2>
          </div>
          <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            Hint
          </span>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="p-5 sm:p-8 lg:border-r lg:border-border">
            <fieldset className="min-w-0 border border-border p-0" aria-label="Deployment actions">
              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                <div>
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Deployment / dpl_8f31c2a
                  </p>
                  <p className="mt-1 text-sm font-medium">Production gateway</p>
                </div>
                <div className="flex items-center gap-1">
                  <ActionTooltip label="Copy deployment URL">
                    <Copy aria-hidden="true" />
                  </ActionTooltip>
                  <ActionTooltip label="Redeploy latest revision">
                    <RefreshCw aria-hidden="true" />
                  </ActionTooltip>
                  <ActionTooltip label="Delete deployment" destructive>
                    <Trash2 aria-hidden="true" />
                  </ActionTooltip>
                </div>
              </div>
              <div className="grid gap-2 p-4 text-sm sm:grid-cols-2">
                <Metadata term="Region" detail="eu-central" />
                <Metadata term="State" detail="Ready" />
              </div>
            </fieldset>
          </div>

          <aside
            className="border-t border-border lg:border-t-0"
            aria-label="Component specification"
          >
            <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
              <Specification term="Delay" detail="400 ms" />
              <Specification term="Input" detail="hover / focus" />
              <Specification term="Portal" detail="body" />
              <Specification term="Dismiss" detail="escape" />
            </dl>
          </aside>
        </div>

        <div className="border-t border-border">
          <PreviewRow label="Placement">
            <PlacementTooltip side="top" />
            <PlacementTooltip side="right" />
            <PlacementTooltip side="bottom" />
            <PlacementTooltip side="left" />
          </PreviewRow>

          <PreviewRow label="Composition">
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="outline" size="sm" />}
                aria-label="Open project settings"
              >
                <Settings2 aria-hidden="true" />
                Settings
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Configure project-level defaults and access policies.
              </TooltipContent>
            </Tooltip>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Tooltips supplement an already labelled control. Essential instructions remain visible
              in the interface.
            </p>
          </PreviewRow>
        </div>
      </section>
    </TooltipProvider>
  );
}

function ActionTooltip({
  label,
  destructive = false,
  children,
}: {
  label: string;
  destructive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant={destructive ? "destructive" : "ghost"} size="icon-sm">
            {children}
          </Button>
        }
        aria-label={label}
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function PlacementTooltip({ side }: { side: "top" | "right" | "bottom" | "left" }) {
  const label = `${side[0].toUpperCase()}${side.slice(1)} placement`;

  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="sm" />} aria-label={label}>
        {side}
      </TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  );
}

function Metadata({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border border-border px-3 py-2">
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {term}
      </span>
      <span className="font-medium">{detail}</span>
    </div>
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
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </div>
  );
}
