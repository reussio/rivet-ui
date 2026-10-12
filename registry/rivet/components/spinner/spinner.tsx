import type * as React from "react";

import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "default" | "lg";

type SpinnerProps = React.ComponentProps<"svg"> & {
  size?: SpinnerSize;
};

const spinnerSizes: Record<SpinnerSize, string> = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-6",
};

function Spinner({
  size = "default",
  className,
  "aria-label": ariaLabel = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <svg
      data-slot="spinner"
      role="status"
      aria-label={ariaLabel}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        "shrink-0 animate-spin text-current motion-reduce:animate-none",
        spinnerSizes[size],
        className,
      )}
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

export type { SpinnerProps, SpinnerSize };
export { Spinner };
