"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

function Progress({ className, locale = "en", ...props }: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      locale={locale}
      className={cn("grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2", className)}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn("min-w-0 truncate text-sm font-medium", className)}
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn(
        "text-right font-mono text-xs tabular-nums text-muted-foreground data-complete:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn("col-span-2 h-2 overflow-hidden border border-border bg-muted", className)}
      {...props}
    />
  );
}

function ProgressIndicator({ className, ...props }: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full bg-primary transition-[width] duration-300 data-complete:bg-emerald-600 data-indeterminate:w-1/3 data-indeterminate:animate-pulse motion-reduce:animate-none motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue };
