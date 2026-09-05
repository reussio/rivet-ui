"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

function ToastProvider(props: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />;
}

function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        "group/toast absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom border border-border bg-background text-foreground outline-none [--gap:0.5rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.5rem] [--scale:calc(max(0,1-(var(--toast-index)*0.06)))] [--shrink:calc(1-var(--scale))] [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] data-limited:opacity-0 data-ending-style:opacity-0 data-starting-style:translate-y-[calc(100%+1rem)] data-[type=error]:border-destructive/50 h-(--height) transition-[transform,opacity,height] duration-200 select-none motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        className={cn(
          "fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] max-w-sm outline-none sm:right-6 sm:bottom-6",
          className,
        )}
        {...props}
      />
    </ToastPrimitive.Portal>
  );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex min-h-20 items-start gap-3 overflow-hidden p-4 transition-opacity duration-150 data-behind:opacity-0 data-expanded:opacity-100 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-sm font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("mt-1.5 text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function ToastAction({ className, ...props }: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center border border-border bg-background px-3 text-xs font-medium outline-none transition-[background-color,border-color,box-shadow] duration-100 hover:bg-muted focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

function ToastClose({
  className,
  children,
  "aria-label": ariaLabel = "Dismiss notification",
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center border border-transparent text-muted-foreground outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-border hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children ?? <X className="size-4" aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
}

function Toaster() {
  const { toasts } = ToastPrimitive.useToastManager();

  return (
    <ToastViewport>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast}>
          <ToastContent>
            <span
              className="mt-1 size-2 shrink-0 bg-foreground group-data-[type=error]/toast:bg-destructive group-data-[type=success]/toast:bg-emerald-600 group-data-[type=warning]/toast:bg-amber-600"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <ToastTitle />
              <ToastDescription />
            </div>
            {toast.actionProps ? <ToastAction {...toast.actionProps} /> : null}
            <ToastClose />
          </ToastContent>
        </Toast>
      ))}
    </ToastViewport>
  );
}

const useToast = ToastPrimitive.useToastManager;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  Toaster,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToast,
};
