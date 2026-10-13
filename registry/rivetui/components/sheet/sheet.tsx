"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

type SheetSide = "bottom" | "left" | "right" | "top";

const sheetSideClasses = {
  right:
    "inset-y-0 right-0 h-dvh w-[min(28rem,calc(100vw-2rem))] border-l data-ending-style:translate-x-full data-starting-style:translate-x-full",
  left: "inset-y-0 left-0 h-dvh w-[min(28rem,calc(100vw-2rem))] border-r data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
  top: "inset-x-0 top-0 max-h-[calc(100dvh-1rem)] w-full border-b data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
  bottom:
    "inset-x-0 bottom-0 max-h-[calc(100dvh-1rem)] w-full border-t data-ending-style:translate-y-full data-starting-style:translate-y-full",
} satisfies Record<SheetSide, string>;

function Sheet<Payload>(props: DialogPrimitive.Root.Props<Payload>) {
  return <DialogPrimitive.Root {...props} />;
}

function SheetTrigger<Payload>(props: DialogPrimitive.Trigger.Props<Payload>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />;
}

type SheetContentProps = DialogPrimitive.Popup.Props & {
  closeLabel?: string;
  showCloseButton?: boolean;
  side?: SheetSide;
};

function SheetContent({
  className,
  children,
  closeLabel = "Close sheet",
  showCloseButton = true,
  side = "right",
  ...props
}: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="sheet-backdrop"
        className="fixed inset-0 z-50 min-h-dvh bg-black/55 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute motion-reduce:transition-none dark:bg-black/70"
      />
      <DialogPrimitive.Viewport
        data-slot="sheet-viewport"
        className="pointer-events-none fixed inset-0 z-50 min-h-dvh data-ending-style:pointer-events-none"
      >
        <DialogPrimitive.Popup
          data-slot="sheet-content"
          data-side={side}
          className={cn(
            "pointer-events-auto fixed flex max-w-full flex-col overflow-hidden border-border bg-background text-foreground outline-none transition-transform duration-200 ease-out focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none",
            sheetSideClasses[side],
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton ? (
            <DialogPrimitive.Close
              data-slot="sheet-close"
              aria-label={closeLabel}
              className="absolute top-4 right-4 inline-flex size-8 cursor-pointer items-center justify-center border border-transparent text-muted-foreground outline-none transition-[background-color,border-color,color] duration-100 hover:border-border hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
            >
              <X className="size-4" aria-hidden="true" />
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("grid shrink-0 gap-1.5 border-b border-border p-5 pr-14 text-left", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn("min-h-0 flex-1 overflow-y-auto p-5", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "flex shrink-0 flex-col gap-2 border-t border-border p-5 sm:flex-row sm:flex-wrap sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export type { SheetContentProps, SheetSide };
export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
