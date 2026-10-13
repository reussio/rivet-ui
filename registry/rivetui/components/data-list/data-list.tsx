import type * as React from "react";

import { cn } from "@/lib/utils";

type DataListOrientation = "horizontal" | "vertical";
type DataListSize = "sm" | "md" | "lg";

type DataListProps = React.ComponentProps<"dl"> & {
  orientation?: DataListOrientation;
  size?: DataListSize;
};

const orientationClasses: Record<DataListOrientation, string> = {
  horizontal:
    "[&>[data-slot=data-list-item]]:grid [&>[data-slot=data-list-item]]:grid-cols-1 [&>[data-slot=data-list-item]]:gap-1.5 sm:[&>[data-slot=data-list-item]]:grid-cols-[minmax(8rem,0.35fr)_minmax(0,1fr)] sm:[&>[data-slot=data-list-item]]:gap-6",
  vertical:
    "[&>[data-slot=data-list-item]]:flex [&>[data-slot=data-list-item]]:flex-col [&>[data-slot=data-list-item]]:gap-1.5",
};

const sizeClasses: Record<DataListSize, string> = {
  sm: "[--data-list-padding-x:0.75rem] [--data-list-padding-y:0.625rem] [--data-list-value-size:0.75rem]",
  md: "[--data-list-padding-x:1rem] [--data-list-padding-y:0.875rem] [--data-list-value-size:0.875rem]",
  lg: "[--data-list-padding-x:1.25rem] [--data-list-padding-y:1.125rem] [--data-list-value-size:1rem]",
};

function DataList({ className, orientation = "horizontal", size = "md", ...props }: DataListProps) {
  return (
    <dl
      data-slot="data-list"
      data-orientation={orientation}
      data-size={size}
      className={cn(
        "w-full border border-border bg-background text-foreground",
        orientationClasses[orientation],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

function DataListItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-list-item"
      className={cn(
        "min-w-0 border-b border-border px-[var(--data-list-padding-x)] py-[var(--data-list-padding-y)] last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function DataListLabel({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="data-list-label"
      className={cn(
        "min-w-0 font-mono text-[0.6875rem] font-medium uppercase leading-5 tracking-[0.12em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function DataListValue({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="data-list-value"
      className={cn(
        "min-w-0 break-words text-[length:var(--data-list-value-size)] leading-5",
        className,
      )}
      {...props}
    />
  );
}

export type { DataListOrientation, DataListProps, DataListSize };
export { DataList, DataListItem, DataListLabel, DataListValue };
