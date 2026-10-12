"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import * as React from "react";

import { cn } from "@/lib/utils";

function AlertDialog<Payload>(props: AlertDialogPrimitive.Root.Props<Payload>) {
  return <AlertDialogPrimitive.Root {...props} />;
}

function AlertDialogTrigger<Payload>(props: AlertDialogPrimitive.Trigger.Props<Payload>) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogCancel(props: AlertDialogPrimitive.Close.Props) {
  return <AlertDialogPrimitive.Close data-slot="alert-dialog-cancel" {...props} />;
}

function AlertDialogAction(props: AlertDialogPrimitive.Close.Props) {
  return <AlertDialogPrimitive.Close data-slot="alert-dialog-action" {...props} />;
}

type AlertDialogContentProps = AlertDialogPrimitive.Popup.Props;

const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  function AlertDialogContent({ className, children, initialFocus, ...props }, forwardedRef) {
    const contentRef = React.useRef<HTMLDivElement>(null);

    const setContentRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const focusSafeAction = React.useCallback(
      () =>
        contentRef.current?.querySelector<HTMLElement>('[data-slot="alert-dialog-cancel"]') ?? true,
      [],
    );

    return (
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Backdrop
          data-slot="alert-dialog-backdrop"
          className="fixed inset-0 z-50 min-h-dvh bg-black/60 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute motion-reduce:transition-none dark:bg-black/75"
        />
        <AlertDialogPrimitive.Viewport
          data-slot="alert-dialog-viewport"
          className="fixed inset-0 z-50 flex min-h-dvh items-start justify-center overflow-y-auto p-4 data-ending-style:pointer-events-none sm:p-8"
        >
          <AlertDialogPrimitive.Popup
            ref={setContentRef}
            data-slot="alert-dialog-content"
            initialFocus={initialFocus ?? focusSafeAction}
            className={cn(
              "relative my-auto flex w-full max-w-md flex-col border border-border bg-background text-foreground outline-none transition-[opacity,transform] duration-100 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-ending-style:translate-y-1 data-ending-style:opacity-0 data-starting-style:translate-y-1 data-starting-style:opacity-0 motion-reduce:transition-none",
              className,
            )}
            {...props}
          >
            {children}
          </AlertDialogPrimitive.Popup>
        </AlertDialogPrimitive.Viewport>
      </AlertDialogPrimitive.Portal>
    );
  },
);

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("grid gap-2 border-b border-border p-5 text-left", className)}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ...props }: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function AlertDialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-body" className={cn("p-5", className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col gap-2 border-t border-border p-5 sm:flex-row sm:flex-wrap sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
};
