import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const emptyStateVariants = cva("flex min-w-0 flex-col items-center justify-center text-center", {
  variants: {
    variant: {
      plain: "",
      outline: "border border-dashed border-border bg-background",
    },
    size: {
      sm: "min-h-0 gap-4 px-5 py-8",
      md: "min-h-72 gap-6 px-6 py-12 sm:px-10",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

type EmptyStateProps = React.ComponentProps<"div"> & VariantProps<typeof emptyStateVariants>;

function EmptyState({ className, variant = "outline", size = "md", ...props }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      data-variant={variant}
      data-size={size}
      className={cn(emptyStateVariants({ variant, size, className }))}
      {...props}
    />
  );
}

const emptyStateMediaVariants = cva(
  "flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        plain: "[&_svg:not([class*='size-'])]:size-8",
        icon: "size-12 border border-border bg-muted/30 text-foreground [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  },
);

type EmptyStateMediaProps = React.ComponentProps<"div"> &
  VariantProps<typeof emptyStateMediaVariants>;

function EmptyStateMedia({ className, variant = "icon", ...props }: EmptyStateMediaProps) {
  return (
    <div
      data-slot="empty-state-media"
      data-variant={variant}
      aria-hidden="true"
      className={cn(emptyStateMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

function EmptyStateHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-header"
      className={cn("flex max-w-md flex-col items-center gap-2", className)}
      {...props}
    />
  );
}

function EmptyStateLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-state-label"
      className={cn(
        "font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-state-title"
      className={cn("text-lg font-semibold tracking-[-0.025em]", className)}
      {...props}
    />
  );
}

function EmptyStateDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  );
}

function EmptyStateActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-actions"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
      {...props}
    />
  );
}

function EmptyStateFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-footer"
      className={cn("max-w-md text-xs leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}

export type { EmptyStateMediaProps, EmptyStateProps };
export {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateLabel,
  EmptyStateMedia,
  EmptyStateTitle,
  emptyStateMediaVariants,
  emptyStateVariants,
};
