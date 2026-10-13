import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

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

type StatusProps = React.ComponentProps<"span"> & VariantProps<typeof statusVariants>;

function Status({ className, children, tone = "neutral", ...props }: StatusProps) {
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

export type { StatusProps };
export { Status, statusVariants };
