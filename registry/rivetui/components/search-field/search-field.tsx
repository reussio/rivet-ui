"use client";

import { LoaderCircle, Search, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type SearchFieldProps = Omit<
  React.ComponentProps<"input">,
  "className" | "defaultValue" | "onChange" | "type" | "value"
> & {
  className?: string;
  clearable?: boolean;
  clearLabel?: string;
  defaultValue?: string;
  inputClassName?: string;
  loading?: boolean;
  loadingLabel?: string;
  onClear?: () => void;
  onValueChange?: (value: string) => void;
  value?: string;
};

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  {
    autoComplete = "off",
    className,
    clearable = true,
    clearLabel = "Clear search",
    defaultValue = "",
    disabled,
    inputClassName,
    loading = false,
    loadingLabel = "Searching",
    onClear,
    onKeyDown,
    onValueChange,
    readOnly,
    value: valueProp,
    ...props
  },
  forwardedRef,
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolledValue;
  const canClear = clearable && value.length > 0 && !disabled && !readOnly;

  function setValue(nextValue: string) {
    if (!controlled) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  function clear() {
    setValue("");
    onClear?.();
    inputRef.current?.focus();
  }

  return (
    <div
      data-slot="search-field"
      data-disabled={disabled ? "" : undefined}
      data-has-value={value.length > 0 ? "" : undefined}
      data-loading={loading ? "" : undefined}
      className={cn("relative w-full", className)}
    >
      {loading ? (
        <span
          data-slot="search-field-spinner"
          className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 animate-spin text-muted-foreground motion-reduce:animate-none"
          aria-hidden="true"
        >
          <LoaderCircle className="size-4" />
        </span>
      ) : (
        <Search
          data-slot="search-field-icon"
          className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      )}
      <input
        {...props}
        ref={(node) => {
          inputRef.current = node;
          setForwardedRef(forwardedRef, node);
        }}
        type="search"
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
        readOnly={readOnly}
        aria-busy={loading || undefined}
        data-slot="search-field-input"
        className={cn(
          "peer h-10 w-full min-w-0 appearance-none rounded-none border border-input bg-background py-2 pr-10 pl-10 text-sm outline-none transition-[background-color,border-color,box-shadow,color] duration-100 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none motion-reduce:transition-none",
          inputClassName,
        )}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);

          if (!event.defaultPrevented && event.key === "Escape" && canClear) {
            event.preventDefault();
            clear();
          }
        }}
      />
      {canClear ? (
        <button
          type="button"
          data-slot="search-field-clear"
          aria-label={clearLabel}
          className="absolute top-px right-px inline-flex h-[calc(100%-2px)] w-[2.375rem] cursor-pointer items-center justify-center border-l border-input bg-background text-muted-foreground outline-none transition-[background-color,border-color,color] duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 peer-aria-invalid:border-destructive motion-reduce:transition-none"
          onClick={clear}
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ) : null}
      <span role="status" className="sr-only">
        {loading ? loadingLabel : ""}
      </span>
    </div>
  );
});

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export type { SearchFieldProps };
export { SearchField };
