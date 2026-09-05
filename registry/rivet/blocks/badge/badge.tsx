import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-6 max-w-full items-center gap-1.5 rounded-none border px-2 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground",
        secondary: "border-border bg-secondary text-secondary-foreground",
        outline: "border-border bg-background text-foreground",
        destructive: "border-destructive/40 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

const statusVariants = cva(
  "inline-flex min-h-6 max-w-full items-center gap-2 text-sm font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "text-foreground",
        success: "text-emerald-700 dark:text-emerald-400",
        warning: "text-amber-700 dark:text-amber-400",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

function Status({
  className,
  children,
  tone = "neutral",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof statusVariants>) {
  return (
    <span data-slot="status" className={cn(statusVariants({ tone, className }))} {...props}>
      <span
        data-slot="status-indicator"
        className="size-2 shrink-0 bg-current"
        aria-hidden="true"
      />
      <span className="min-w-0 truncate">{children}</span>
    </span>
  );
}

export { Badge, badgeVariants, Status, statusVariants };
