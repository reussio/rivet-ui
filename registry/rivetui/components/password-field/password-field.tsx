"use client";

import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type PasswordFieldProps = Omit<React.ComponentProps<"input">, "className" | "type"> & {
  capsLockLabel?: string;
  className?: string;
  defaultVisible?: boolean;
  hidePasswordLabel?: string;
  inputClassName?: string;
  onVisibleChange?: (visible: boolean) => void;
  showCapsLockIndicator?: boolean;
  showPasswordLabel?: string;
  visible?: boolean;
};

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
  {
    capsLockLabel = "Caps lock is on",
    className,
    defaultVisible = false,
    disabled,
    hidePasswordLabel = "Hide password",
    id,
    inputClassName,
    onBlur,
    onFocus,
    onVisibleChange,
    showCapsLockIndicator = true,
    showPasswordLabel = "Show password",
    visible: visibleProp,
    ...props
  },
  forwardedRef,
) {
  const generatedInputId = React.useId();
  const capsLockId = React.useId();
  const [uncontrolledVisible, setUncontrolledVisible] = React.useState(defaultVisible);
  const [capsLockOn, setCapsLockOn] = React.useState(false);
  const [inputFocused, setInputFocused] = React.useState(false);
  const visible = visibleProp ?? uncontrolledVisible;
  const inputId = id ?? generatedInputId;
  const capsLockVisible = showCapsLockIndicator && inputFocused && capsLockOn && !disabled;

  React.useEffect(() => {
    if (!showCapsLockIndicator) {
      setCapsLockOn(false);
      return;
    }

    function updateCapsLock(event: KeyboardEvent | PointerEvent) {
      setCapsLockOn(event.getModifierState("CapsLock"));
    }

    window.addEventListener("keydown", updateCapsLock, true);
    window.addEventListener("keyup", updateCapsLock, true);
    window.addEventListener("pointerdown", updateCapsLock, true);

    return () => {
      window.removeEventListener("keydown", updateCapsLock, true);
      window.removeEventListener("keyup", updateCapsLock, true);
      window.removeEventListener("pointerdown", updateCapsLock, true);
    };
  }, [showCapsLockIndicator]);

  function setVisible(nextVisible: boolean) {
    if (visibleProp === undefined) {
      setUncontrolledVisible(nextVisible);
    }

    onVisibleChange?.(nextVisible);
  }

  return (
    <div
      data-slot="password-field"
      data-visible={visible ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn("relative w-full", className)}
    >
      <input
        {...props}
        ref={forwardedRef}
        id={inputId}
        type={visible ? "text" : "password"}
        data-slot="password-field-input"
        disabled={disabled}
        className={cn(
          "peer h-10 w-full min-w-0 rounded-none border border-input bg-background px-3 py-2 text-sm outline-none transition-[background-color,border-color,box-shadow,color] duration-100 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
          showCapsLockIndicator ? "pr-20" : "pr-11",
          inputClassName,
        )}
        onFocus={(event) => {
          onFocus?.(event);
          setInputFocused(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          setInputFocused(false);
        }}
      />

      {showCapsLockIndicator ? (
        <>
          <span
            data-slot="password-field-caps-lock"
            aria-hidden="true"
            data-visible={capsLockVisible ? "" : undefined}
            className="pointer-events-none absolute top-1/2 right-11 -translate-y-1/2 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted-foreground opacity-0 transition-opacity duration-100 data-visible:opacity-100 motion-reduce:transition-none"
          >
            Caps
          </span>
          <span id={capsLockId} className="sr-only" aria-live="polite">
            {capsLockVisible ? capsLockLabel : ""}
          </span>
        </>
      ) : null}

      <button
        type="button"
        data-slot="password-field-toggle"
        data-state={visible ? "visible" : "hidden"}
        aria-controls={inputId}
        aria-label={visible ? hidePasswordLabel : showPasswordLabel}
        aria-pressed={visible}
        disabled={disabled}
        className="absolute top-px right-px inline-flex h-[calc(100%-2px)] w-[2.375rem] cursor-pointer items-center justify-center border-l border-input bg-background text-muted-foreground outline-none transition-[background-color,border-color,color,opacity] duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 peer-aria-invalid:border-destructive motion-reduce:transition-none"
        onClick={() => setVisible(!visible)}
      >
        {visible ? (
          <EyeOff className="size-4" aria-hidden="true" />
        ) : (
          <Eye className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
});

export type { PasswordFieldProps };
export { PasswordField };
