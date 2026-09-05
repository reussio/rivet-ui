"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import * as React from "react";

import { cn } from "@/lib/utils";

type RadioGroupState = {
  disabled: boolean;
  invalid: boolean;
};

const RadioGroupStateContext = React.createContext<RadioGroupState>({
  disabled: false,
  invalid: false,
});

function isAriaInvalid(value: React.AriaAttributes["aria-invalid"]) {
  return value !== undefined && value !== false && value !== "false";
}

function RadioGroup<Value>({
  className,
  children,
  disabled = false,
  "aria-invalid": ariaInvalid,
  ...props
}: RadioGroupPrimitive.Props<Value>) {
  return (
    <RadioGroupStateContext.Provider value={{ disabled, invalid: isAriaInvalid(ariaInvalid) }}>
      <RadioGroupPrimitive
        data-slot="radio-group"
        className={cn("group/radio-group grid w-full gap-2 outline-none", className)}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        {...props}
      >
        {children}
      </RadioGroupPrimitive>
    </RadioGroupStateContext.Provider>
  );
}

function RadioOption<Value>({
  className,
  children,
  disabled = false,
  id,
  tabIndex,
  "aria-invalid": ariaInvalid,
  ...props
}: RadioPrimitive.Root.Props<Value>) {
  const groupState = React.useContext(RadioGroupStateContext);
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const isDisabled = groupState.disabled || disabled;
  const isInvalid = groupState.invalid || isAriaInvalid(ariaInvalid);

  return (
    <label
      htmlFor={controlId}
      data-slot="radio-option"
      className={cn(
        "grid min-w-0 cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 rounded-none border border-border bg-background p-4 outline-none transition-[background-color,border-color,box-shadow,opacity] duration-100 hover:border-foreground/40 has-[:focus-visible]:border-ring has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40 has-data-checked:border-foreground/50 has-data-checked:bg-muted/40 has-data-disabled:cursor-not-allowed has-data-disabled:opacity-40 has-data-readonly:cursor-default group-aria-invalid/radio-group:border-destructive group-aria-invalid/radio-group:has-[:focus-visible]:border-destructive group-aria-invalid/radio-group:has-[:focus-visible]:ring-destructive/25 group-data-invalid/radio-group:border-destructive group-data-invalid/radio-group:has-[:focus-visible]:border-destructive group-data-invalid/radio-group:has-[:focus-visible]:ring-destructive/25 motion-reduce:transition-none",
        isInvalid &&
          "border-destructive has-[:focus-visible]:border-destructive has-[:focus-visible]:ring-destructive/25",
        className,
      )}
    >
      <RadioPrimitive.Root
        id={controlId}
        data-slot="radio-option-control"
        className={cn(
          "relative mt-0.5 inline-flex size-4 row-span-2 shrink-0 items-center justify-center rounded-full border border-input bg-background outline-none transition-[background-color,border-color,box-shadow,opacity] duration-100 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-checked:border-primary data-checked:bg-primary data-disabled:cursor-not-allowed data-readonly:bg-muted/40 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
          isInvalid &&
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25",
        )}
        disabled={isDisabled}
        aria-invalid={ariaInvalid}
        {...props}
        {...(isDisabled || tabIndex !== undefined ? { tabIndex: isDisabled ? -1 : tabIndex } : {})}
      >
        <RadioPrimitive.Indicator
          data-slot="radio-option-indicator"
          className="grid size-full place-items-center"
        >
          <span className="size-1.5 rounded-full bg-primary-foreground" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>
      {children}
    </label>
  );
}

function RadioOptionLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="radio-option-label"
      className={cn("col-start-2 text-sm font-medium leading-snug text-foreground", className)}
      {...props}
    />
  );
}

function RadioOptionDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="radio-option-description"
      className={cn("col-start-2 text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export { RadioGroup, RadioOption, RadioOptionDescription, RadioOptionLabel };
