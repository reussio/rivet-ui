"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        "flex w-full min-w-0 flex-col overflow-hidden border border-border bg-background sm:data-[orientation=vertical]:grid sm:data-[orientation=vertical]:grid-cols-[minmax(8rem,12rem)_minmax(0,1fr)] sm:data-[orientation=vertical]:items-stretch",
        className,
      )}
      {...props}
    />
  );
}

function TabsList({ className, activateOnFocus = true, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      activateOnFocus={activateOnFocus}
      className={cn(
        "flex min-h-11 w-full max-w-full items-stretch overflow-x-auto overflow-y-hidden border-b border-border bg-muted/15 data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:overflow-visible sm:data-[orientation=vertical]:border-r sm:data-[orientation=vertical]:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex min-h-11 flex-none cursor-pointer items-center justify-center gap-2 border-r border-border px-4 font-mono text-[0.6875rem] font-medium tracking-[0.12em] whitespace-nowrap text-muted-foreground uppercase outline-none transition-[background-color,box-shadow,color,opacity] duration-100 after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-transparent hover:not-data-disabled:bg-muted/50 hover:not-data-disabled:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 data-active:bg-background data-active:text-foreground data-active:after:bg-background data-disabled:pointer-events-none data-disabled:opacity-40 data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-[orientation=vertical]:border-r-0 data-[orientation=vertical]:border-b data-[orientation=vertical]:after:hidden data-[orientation=vertical]:last:border-b-0 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "min-w-0 bg-background p-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
