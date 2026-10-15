"use client";

import {
  type ComponentStatus as ComponentStatusName,
  componentStatusDescriptions,
} from "@/content/components/schema";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/rivetui/components/tooltip/tooltip";

type ComponentStatusProps = {
  status: ComponentStatusName;
  since: string;
  replacement?: string;
  className?: string;
  subject?: "block" | "component";
  tooltip?: boolean;
};

const indicatorClasses = {
  experimental: "bg-amber-600 dark:bg-amber-400",
  beta: "border border-current bg-transparent",
  stable: "bg-current",
  deprecated: "bg-destructive",
} as const satisfies Record<ComponentStatusName, string>;

function ComponentStatus({
  status,
  since,
  replacement,
  className,
  subject = "component",
  tooltip = true,
}: ComponentStatusProps) {
  const label = status[0].toUpperCase() + status.slice(1);
  const statusLabel = (
    <span
      data-slot="component-status"
      title={
        tooltip ? undefined : `${componentStatusDescriptions[status]} Available since v${since}.`
      }
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-2 border border-border bg-background px-2.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-foreground",
        status === "deprecated" && "text-destructive",
        className,
      )}
    >
      <span className={cn("size-1.5 shrink-0", indicatorClasses[status])} aria-hidden="true" />
      {label}
    </span>
  );

  if (!tooltip) {
    return statusLabel;
  }

  return (
    <TooltipProvider delay={250}>
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              className="cursor-help outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              aria-label={`${label} ${subject} status`}
            />
          }
        >
          {statusLabel}
        </TooltipTrigger>
        <TooltipContent role="tooltip" className="max-w-72">
          <p>{componentStatusDescriptions[status]}</p>
          <p className="mt-1 text-muted-foreground">Available since v{since}.</p>
          {replacement ? (
            <p className="mt-1 text-muted-foreground">Replacement: {replacement}</p>
          ) : null}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export type { ComponentStatusProps };
export { ComponentStatus };
