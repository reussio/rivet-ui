"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";

import { cn } from "@/lib/utils";

type InputOTPState = {
  disabled: boolean;
  invalid: boolean;
};

const InputOTPStateContext = React.createContext<InputOTPState>({
  disabled: false,
  invalid: false,
});

type ComposedOTPInputProps = Extract<
  React.ComponentProps<typeof OTPInput>,
  { children: React.ReactNode }
>;

type InputOTPProps = Omit<ComposedOTPInputProps, "defaultValue" | "onChange"> & {
  defaultValue?: string;
  onChange?: (value: string) => unknown;
};

function InputOTP({
  "aria-invalid": ariaInvalid,
  autoComplete = "one-time-code",
  className,
  containerClassName,
  defaultValue = "",
  disabled = false,
  onChange,
  value: valueProp,
  ...props
}: InputOTPProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = valueProp ?? uncontrolledValue;
  const invalid = ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== "false";

  function handleChange(nextValue: string) {
    if (valueProp === undefined) {
      setUncontrolledValue(nextValue);
    }

    onChange?.(nextValue);
  }

  return (
    <InputOTPStateContext.Provider value={{ disabled, invalid }}>
      <OTPInput
        data-slot="input-otp"
        aria-invalid={ariaInvalid}
        autoComplete={autoComplete}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        containerClassName={cn(
          "group flex max-w-full items-center gap-2 has-disabled:cursor-not-allowed",
          containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    </InputOTPStateContext.Provider>
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center [&>[data-slot=input-otp-slot]+[data-slot=input-otp-slot]]:-ml-px",
        className,
      )}
      {...props}
    />
  );
}

function InputOTPSlot({
  className,
  index,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputContext = React.useContext(OTPInputContext);
  const { disabled, invalid } = React.useContext(InputOTPStateContext);
  const { char, hasFakeCaret, isActive, placeholderChar } = inputContext.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
      className={cn(
        "relative flex size-11 items-center justify-center border border-input bg-background font-mono text-lg tabular-nums outline-none transition-[background-color,border-color,box-shadow,color,opacity] duration-100 data-active:z-10 data-active:border-foreground/50 data-active:bg-muted/30 data-disabled:bg-muted data-disabled:text-muted-foreground data-disabled:opacity-60 data-invalid:border-destructive group-has-[:focus-visible]:data-active:border-ring group-has-[:focus-visible]:data-active:ring-2 group-has-[:focus-visible]:data-active:ring-ring/40 group-has-[:focus-visible]:data-active:data-invalid:border-destructive group-has-[:focus-visible]:data-active:data-invalid:ring-destructive/25 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {char ??
        (placeholderChar ? <span className="text-muted-foreground">{placeholderChar}</span> : null)}
      {hasFakeCaret ? (
        <span
          className="pointer-events-none absolute h-5 w-px animate-pulse bg-foreground motion-reduce:animate-none"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      aria-hidden="true"
      className={cn("flex w-3 items-center justify-center", className)}
      {...props}
    >
      <span className="h-px w-2 bg-border" />
    </div>
  );
}

export {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";
export type { InputOTPProps };
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
