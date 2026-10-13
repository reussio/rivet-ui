"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion<Value>({ className, ...props }: AccordionPrimitive.Root.Props<Value>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full border border-border", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="m-0">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative z-0 flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 bg-transparent px-4 py-3 text-left text-sm font-medium outline-none transition-[background-color,box-shadow,color,opacity] duration-100 hover:not-data-disabled:bg-muted/50 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 data-disabled:cursor-not-allowed data-disabled:text-muted-foreground data-disabled:opacity-50 motion-reduce:transition-none",
          className,
        )}
        {...props}
      >
        <span className="min-w-0">{children}</span>
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-150 group-data-panel-open/accordion-trigger:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-150 data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div
        className={cn(
          "border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
