import type * as React from "react";

import { cn } from "@/lib/utils";

type LoadingBarPosition = "fixed" | "absolute";

type LoadingBarProps = Omit<React.ComponentProps<"div">, "children"> & {
  active?: boolean;
  value?: number;
  position?: LoadingBarPosition;
  label?: string;
};

function LoadingBar({
  active = true,
  value,
  position = "fixed",
  label = "Loading page",
  className,
  ...props
}: LoadingBarProps) {
  const determinate = value !== undefined;
  const normalizedValue = determinate ? Math.min(100, Math.max(0, value)) : undefined;

  return (
    <div
      data-slot="loading-bar"
      data-active={active ? "" : undefined}
      data-state={active ? "loading" : "idle"}
      data-mode={determinate ? "determinate" : "indeterminate"}
      data-position={position}
      role="progressbar"
      aria-label={active ? label : undefined}
      aria-hidden={active ? undefined : true}
      aria-valuemin={active && determinate ? 0 : undefined}
      aria-valuemax={active && determinate ? 100 : undefined}
      aria-valuenow={active ? normalizedValue : undefined}
      className={cn(
        "pointer-events-none top-0 right-0 left-0 z-100 h-0.5 overflow-hidden opacity-0 transition-opacity duration-150 data-active:opacity-100 data-[position=absolute]:absolute data-[position=fixed]:fixed motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <span
        data-slot="loading-bar-indicator"
        className={cn(
          "block h-full bg-foreground",
          determinate
            ? "transition-[width] duration-200 ease-out motion-reduce:transition-none"
            : "w-1/3 animate-[rivet-loading-bar_1.15s_ease-in-out_infinite] motion-reduce:w-full motion-reduce:animate-none",
        )}
        style={determinate ? { width: `${normalizedValue}%` } : undefined}
      />
      <style>{`@keyframes rivet-loading-bar{0%{transform:translateX(-110%) scaleX(.55)}50%{transform:translateX(150%) scaleX(1)}100%{transform:translateX(410%) scaleX(.55)}}`}</style>
    </div>
  );
}

export type { LoadingBarPosition, LoadingBarProps };
export { LoadingBar };
