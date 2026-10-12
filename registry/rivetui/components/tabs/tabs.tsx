"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        "flex w-full min-w-0 flex-col gap-3 sm:data-[orientation=vertical]:grid sm:data-[orientation=vertical]:grid-cols-[minmax(8rem,12rem)_minmax(0,1fr)] sm:data-[orientation=vertical]:items-start",
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
        "inline-flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-none border border-border bg-muted/40 p-1 data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:overflow-visible",
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
        "inline-flex min-h-9 flex-none cursor-pointer items-center justify-center gap-2 rounded-none border border-transparent px-3 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground outline-none transition-[background-color,border-color,box-shadow,color,opacity] duration-100 hover:text-foreground focus-visible:z-10 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-active:border-border data-active:bg-background data-active:text-foreground data-disabled:pointer-events-none data-disabled:opacity-40 data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start motion-reduce:transition-none",
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
        "min-w-0 rounded-none border border-border bg-background p-4 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
