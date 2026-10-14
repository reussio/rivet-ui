import { Copy, RefreshCw, Settings2, Trash2 } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/rivetui/components/tooltip/tooltip";

const primaryCode = `import { Copy, RefreshCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <fieldset className="min-w-0 border border-border p-0" aria-label="Deployment actions">
    <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
      <div>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Deployment / dpl_8f31c2a
        </p>
        <p className="mt-1 text-sm font-medium">Production gateway</p>
      </div>
      <div className="flex items-center gap-1">
        <ActionTooltip label="Copy deployment URL"><Copy aria-hidden="true" /></ActionTooltip>
        <ActionTooltip label="Redeploy latest revision"><RefreshCw aria-hidden="true" /></ActionTooltip>
        <ActionTooltip label="Delete deployment" destructive><Trash2 aria-hidden="true" /></ActionTooltip>
      </div>
    </div>
    <div className="grid gap-2 p-4 text-sm sm:grid-cols-2">
      <Metadata term="Region" detail="eu-central" />
      <Metadata term="State" detail="Ready" />
    </div>
  </fieldset>
</TooltipProvider>

function ActionTooltip({ label, destructive = false, children }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant={destructive ? "destructive" : "ghost"} size="icon-sm">{children}</Button>}
        aria-label={label}
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function Metadata({ term, detail }) {
  return (
    <div className="flex items-center justify-between gap-4 border border-border px-3 py-2">
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">{term}</span>
      <span className="font-medium">{detail}</span>
    </div>
  )
}`;

const placementCode = `import { Copy, RefreshCw, Settings2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
function PlacementTooltip({ side }: { side: "top" | "right" | "bottom" | "left" }) {
  const label = \`\${side[0].toUpperCase()}\${side.slice(1)} placement\`;

  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="sm" />} aria-label={label}>
        {side}
      </TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  );
}
export function PlacementExample() {
  return (
    <>
      <PlacementTooltip side="top" />
      <PlacementTooltip side="right" />
      <PlacementTooltip side="bottom" />
      <PlacementTooltip side="left" />
    </>
  );
}`;

const compositionCode = `import { Copy, RefreshCw, Settings2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export function CompositionExample() {
  return (
    <>
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
        Tooltips supplement an already labelled control. Essential instructions remain visible in
        the interface.
      </p>
    </>
  );
}`;

export function TooltipPreview() {
  return (
    <TooltipProvider>
      <div className="mt-8 grid gap-12">
        <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
          <div className="p-5 sm:p-8">
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
        </ComponentExample>

        <PreviewRow label="Placement" code={placementCode}>
          <PlacementTooltip side="top" />
          <PlacementTooltip side="right" />
          <PlacementTooltip side="bottom" />
          <PlacementTooltip side="left" />
        </PreviewRow>
        <PreviewRow label="Composition" code={compositionCode}>
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

function PreviewRow({
  label,
  children,
  code,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} code={code}>
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </ComponentExample>
  );
}
