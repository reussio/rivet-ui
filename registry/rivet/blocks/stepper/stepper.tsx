"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type StepperOrientation = "horizontal" | "vertical";
type StepperState = "complete" | "current" | "upcoming";

type StepperContextValue = {
  disabled: boolean;
  orientation: StepperOrientation;
  value: number;
  setValue: (value: number) => void;
};

type StepperItemContextValue = {
  disabled: boolean;
  orientation: StepperOrientation;
  state: StepperState;
  step: number;
  setValue: (value: number) => void;
};

const StepperContext = React.createContext<StepperContextValue | null>(null);
const StepperItemContext = React.createContext<StepperItemContextValue | null>(null);

function useStepperContext() {
  const context = React.useContext(StepperContext);

  if (!context) {
    throw new Error("Stepper components must be used within <Stepper>.");
  }

  return context;
}

function useStepperItemContext() {
  const context = React.useContext(StepperItemContext);

  if (!context) {
    throw new Error("Stepper item components must be used within <StepperItem>.");
  }

  return context;
}

type StepperProps = Omit<React.ComponentProps<"ol">, "defaultValue" | "onChange"> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  orientation?: StepperOrientation;
  disabled?: boolean;
};

function Stepper({
  value,
  defaultValue = 1,
  onValueChange,
  orientation = "horizontal",
  disabled = false,
  className,
  ...props
}: StepperProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value ?? internalValue;

  function setValue(nextValue: number) {
    if (disabled || nextValue === currentValue) {
      return;
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  return (
    <StepperContext.Provider value={{ disabled, orientation, value: currentValue, setValue }}>
      <ol
        data-slot="stepper"
        data-orientation={orientation}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "flex w-full min-w-0 data-[orientation=horizontal]:overflow-x-auto data-[orientation=horizontal]:[scrollbar-width:none] data-[orientation=vertical]:flex-col data-[orientation=horizontal]:[&::-webkit-scrollbar]:hidden",
          className,
        )}
        {...props}
      />
    </StepperContext.Provider>
  );
}

type StepperItemProps = React.ComponentProps<"li"> & {
  step: number;
  disabled?: boolean;
};

function StepperItem({ step, disabled = false, className, ...props }: StepperItemProps) {
  const stepper = useStepperContext();
  const isDisabled = stepper.disabled || disabled;
  const state: StepperState =
    step === stepper.value ? "current" : step < stepper.value ? "complete" : "upcoming";

  return (
    <StepperItemContext.Provider
      value={{
        disabled: isDisabled,
        orientation: stepper.orientation,
        state,
        step,
        setValue: stepper.setValue,
      }}
    >
      <li
        data-slot="stepper-item"
        data-state={state}
        data-orientation={stepper.orientation}
        data-disabled={isDisabled ? "" : undefined}
        className={cn(
          "group/stepper-item relative min-w-0 last:[&>[data-slot=stepper-separator]]:hidden data-disabled:opacity-40 data-[orientation=horizontal]:min-w-44 data-[orientation=horizontal]:flex-1 data-[orientation=horizontal]:pr-5 data-[orientation=vertical]:pb-6",
          className,
        )}
        {...props}
      />
    </StepperItemContext.Provider>
  );
}

function StepperTrigger({
  type = "button",
  disabled = false,
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const item = useStepperItemContext();
  const isDisabled = item.disabled || disabled;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (!event.defaultPrevented) {
      item.setValue(item.step);
    }
  }

  return (
    <button
      data-slot="stepper-trigger"
      data-state={item.state}
      data-orientation={item.orientation}
      aria-current={item.state === "current" ? "step" : undefined}
      type={type}
      disabled={isDisabled}
      className={cn(
        "group/stepper-trigger relative z-10 grid w-full cursor-pointer appearance-none grid-cols-[2rem_minmax(0,1fr)] items-start gap-x-3 border-0 bg-transparent p-0 text-left outline-none disabled:cursor-not-allowed",
        className,
      )}
      onClick={handleClick}
      {...props}
    />
  );
}

function StepperIndicator({ className, children, ...props }: React.ComponentProps<"span">) {
  const item = useStepperItemContext();
  const stateLabel =
    item.state === "complete"
      ? "Completed step"
      : item.state === "current"
        ? "Current step"
        : "Upcoming step";

  return (
    <span
      data-slot="stepper-indicator"
      data-state={item.state}
      className={cn(
        "relative z-10 inline-flex size-8 shrink-0 items-center justify-center border border-border bg-background font-mono text-[0.625rem] font-medium tabular-nums text-muted-foreground transition-[background-color,border-color,box-shadow,color] duration-100 group-focus-visible/stepper-trigger:border-ring group-focus-visible/stepper-trigger:ring-2 group-focus-visible/stepper-trigger:ring-ring/40 data-[state=complete]:border-foreground data-[state=complete]:bg-foreground data-[state=complete]:text-background data-[state=current]:border-foreground data-[state=current]:text-foreground motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{stateLabel}: </span>
      {children ?? <span aria-hidden="true">{String(item.step).padStart(2, "0")}</span>}
    </span>
  );
}

function StepperContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stepper-content"
      className={cn("grid min-w-0 gap-1 pt-0.5", className)}
      {...props}
    />
  );
}

function StepperTitle({ className, ...props }: React.ComponentProps<"span">) {
  const item = useStepperItemContext();

  return (
    <span
      data-slot="stepper-title"
      data-state={item.state}
      className={cn(
        "text-sm font-medium leading-5 text-foreground data-[state=upcoming]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function StepperDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stepper-description"
      className={cn("text-sm leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}

function StepperSeparator({ className, ...props }: React.ComponentProps<"span">) {
  const item = useStepperItemContext();

  return (
    <span
      data-slot="stepper-separator"
      data-state={item.state}
      data-orientation={item.orientation}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute bg-border data-[state=complete]:bg-foreground data-[orientation=horizontal]:top-4 data-[orientation=horizontal]:right-0 data-[orientation=horizontal]:left-8 data-[orientation=horizontal]:h-px data-[orientation=vertical]:top-8 data-[orientation=vertical]:bottom-0 data-[orientation=vertical]:left-4 data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export type { StepperItemProps, StepperOrientation, StepperProps, StepperState };
export {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
};
