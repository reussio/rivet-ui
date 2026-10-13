"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import type * as React from "react";

import { cn } from "@/lib/utils";

type DrawerProps<Payload = unknown> = Omit<DrawerPrimitive.Root.Props<Payload>, "swipeDirection">;

type DrawerSnapPoint = DrawerPrimitive.Root.SnapPoint;

function Drawer<Payload>(props: DrawerProps<Payload>) {
  return <DrawerPrimitive.Root swipeDirection="down" {...props} />;
}

function DrawerTrigger<Payload>(props: DrawerPrimitive.Trigger.Props<Payload>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerSwipeArea(props: DrawerPrimitive.SwipeArea.Props) {
  return <DrawerPrimitive.SwipeArea data-slot="drawer-swipe-area" {...props} />;
}

type DrawerContentProps = DrawerPrimitive.Popup.Props & {
  showHandle?: boolean;
};

function DrawerContent({ className, children, showHandle = true, ...props }: DrawerContentProps) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        data-slot="drawer-backdrop"
        className="fixed inset-0 z-50 min-h-dvh bg-black/70 opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity [transition-duration:calc(var(--drawer-swipe-strength)*240ms)] data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute motion-reduce:transition-none"
      />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        className="pointer-events-none fixed inset-0 z-50 flex min-h-dvh items-end justify-center overflow-hidden"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            "pointer-events-auto relative flex max-h-[calc(100dvh-1rem)] w-full max-w-2xl flex-col overflow-hidden border-x border-t border-border bg-background text-foreground outline-none [transform:translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] transition-transform [transition-duration:calc(var(--drawer-swipe-strength)*240ms)] ease-out focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-ending-style:[transform:translateY(100%)] data-starting-style:[transform:translateY(100%)] data-swiping:select-none data-swiping:duration-0 motion-reduce:transition-none",
            className,
          )}
          {...props}
        >
          <DrawerPrimitive.Content className="flex min-h-0 flex-1 flex-col">
            {showHandle ? <DrawerHandle /> : null}
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

function DrawerHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-handle"
      className={cn(
        "flex h-7 shrink-0 cursor-grab touch-none items-center justify-center border-b border-border active:cursor-grabbing",
        className,
      )}
      {...props}
    >
      <span className="h-px w-10 bg-muted-foreground/70" aria-hidden="true" />
    </div>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("grid shrink-0 gap-1.5 border-b border-border p-5 text-left", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-body"
      className={cn("min-h-0 flex-1 overflow-y-auto p-5", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "flex shrink-0 flex-col gap-2 border-t border-border p-5 sm:flex-row sm:flex-wrap sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export type { DrawerContentProps, DrawerProps, DrawerSnapPoint };
export {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
};
