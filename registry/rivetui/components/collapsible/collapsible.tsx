"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn("w-full border border-border", className)}
      {...props}
    />
  );
}

function CollapsibleTrigger({ className, children, ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "group/collapsible-trigger relative z-0 flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 bg-background px-3 py-2 text-left text-sm font-medium outline-none transition-[background-color,box-shadow,color,opacity] duration-100 hover:not-data-disabled:bg-muted/50 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-disabled:text-muted-foreground data-disabled:opacity-50 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <span className="min-w-0">{children}</span>
      <ChevronRight
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-150 group-data-panel-open/collapsible-trigger:rotate-90 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsibleContent({ className, children, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-150 [&[hidden]:not([hidden='until-found'])]:hidden data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("border-t border-border px-3 py-3 text-sm", className)}>{children}</div>
    </CollapsiblePrimitive.Panel>
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
