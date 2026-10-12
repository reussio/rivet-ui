"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type LoadingBarPosition = "fixed" | "absolute";

type LoadingBarProps = Omit<React.ComponentProps<"div">, "children"> & {
  active?: boolean;
  value?: number;
  position?: LoadingBarPosition;
  label?: string;
};

type LoadingBarController = {
  active: boolean;
  value: number | undefined;
  start: (label?: string) => void;
  setProgress: (value: number, label?: string) => void;
  complete: () => void;
  reset: () => void;
};

type LoadingBarProviderProps = React.PropsWithChildren<{
  className?: string;
  completionDuration?: number;
  label?: string;
  position?: LoadingBarPosition;
}>;

type LoadingBarState = {
  active: boolean;
  label: string | undefined;
  value: number | undefined;
};

const LoadingBarContext = React.createContext<LoadingBarController | null>(null);

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

function LoadingBarProvider({
  children,
  className,
  completionDuration = 200,
  label = "Loading page",
  position = "fixed",
}: LoadingBarProviderProps) {
  const [state, setState] = React.useState<LoadingBarState>({
    active: false,
    label: undefined,
    value: undefined,
  });
  const completionTimerRef = React.useRef<number | undefined>(undefined);

  const clearCompletionTimer = React.useCallback(() => {
    if (completionTimerRef.current !== undefined) {
      window.clearTimeout(completionTimerRef.current);
      completionTimerRef.current = undefined;
    }
  }, []);

  React.useEffect(() => clearCompletionTimer, [clearCompletionTimer]);

  const start = React.useCallback(
    (nextLabel?: string) => {
      clearCompletionTimer();
      setState({ active: true, label: nextLabel, value: undefined });
    },
    [clearCompletionTimer],
  );

  const setProgress = React.useCallback(
    (value: number, nextLabel?: string) => {
      clearCompletionTimer();
      setState((currentState) => ({
        active: true,
        label: nextLabel ?? currentState.label,
        value: Math.min(100, Math.max(0, value)),
      }));
    },
    [clearCompletionTimer],
  );

  const complete = React.useCallback(() => {
    clearCompletionTimer();
    setState((currentState) => ({ ...currentState, active: true, value: 100 }));
    completionTimerRef.current = window.setTimeout(
      () => {
        completionTimerRef.current = undefined;
        setState({ active: false, label: undefined, value: undefined });
      },
      Math.max(0, completionDuration),
    );
  }, [clearCompletionTimer, completionDuration]);

  const reset = React.useCallback(() => {
    clearCompletionTimer();
    setState({ active: false, label: undefined, value: undefined });
  }, [clearCompletionTimer]);

  const controller = React.useMemo<LoadingBarController>(
    () => ({
      active: state.active,
      value: state.value,
      start,
      setProgress,
      complete,
      reset,
    }),
    [complete, reset, setProgress, start, state.active, state.value],
  );

  return (
    <LoadingBarContext.Provider value={controller}>
      {children}
      <LoadingBar
        active={state.active}
        value={state.value}
        position={position}
        label={state.label ?? label}
        className={className}
      />
    </LoadingBarContext.Provider>
  );
}

function useLoadingBar() {
  const context = React.useContext(LoadingBarContext);
  if (!context) {
    throw new Error("useLoadingBar must be used within a LoadingBarProvider.");
  }
  return context;
}

export type { LoadingBarController, LoadingBarPosition, LoadingBarProps, LoadingBarProviderProps };
export { LoadingBar, LoadingBarProvider, useLoadingBar };
