import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "flex w-full items-start gap-3 border p-4 text-sm [&>[data-slot=alert-icon]]:mt-0.5",
  {
    variants: {
      variant: {
        neutral: "border-border bg-background [&>[data-slot=alert-icon]]:text-foreground",
        success:
          "border-emerald-700/35 bg-emerald-500/5 [&>[data-slot=alert-icon]]:text-emerald-700 dark:[&>[data-slot=alert-icon]]:text-emerald-400",
        warning:
          "border-amber-700/35 bg-amber-500/5 [&>[data-slot=alert-icon]]:text-amber-700 dark:[&>[data-slot=alert-icon]]:text-amber-400",
        destructive:
          "border-destructive/45 bg-destructive/5 [&>[data-slot=alert-icon]]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

type AlertProps = React.ComponentProps<"div"> & VariantProps<typeof alertVariants>;

function Alert({ className, variant = "neutral", role = "alert", ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role={role}
      className={cn(alertVariants({ variant, className }))}
      {...props}
    />
  );
}

function AlertIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="alert-icon"
      className={cn("grid size-5 shrink-0 place-items-center [&_svg]:size-4", className)}
      {...props}
    />
  );
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-content" className={cn("min-w-0 flex-1", className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("font-semibold leading-5 tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("mt-1 leading-relaxed text-muted-foreground [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-action" className={cn("shrink-0", className)} {...props} />;
}

export type { AlertProps };
export { Alert, AlertAction, AlertContent, AlertDescription, AlertIcon, AlertTitle, alertVariants };
