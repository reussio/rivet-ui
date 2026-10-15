"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function NumberField({ className, ...props }: NumberFieldPrimitive.Root.Props) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      className={cn("group/number-field grid w-full gap-2", className)}
      {...props}
    />
  );
}

function NumberFieldLabel({
  children,
  className,
  htmlFor,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      htmlFor={htmlFor}
      data-slot="number-field-label"
      className={cn(
        "w-fit font-mono text-[0.6875rem] font-medium uppercase leading-none tracking-[0.14em] text-foreground group-data-disabled/number-field:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

function NumberFieldGroup({ className, ...props }: NumberFieldPrimitive.Group.Props) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={cn(
        "flex h-10 w-full min-w-0 items-stretch overflow-hidden border border-input bg-background outline-none transition-[background-color,border-color,box-shadow,color,opacity] duration-100 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring/40 data-invalid:border-destructive data-invalid:has-[input:focus-visible]:border-destructive data-invalid:has-[input:focus-visible]:ring-destructive/25 data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:text-muted-foreground data-disabled:opacity-60 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

function NumberFieldInput({ className, ...props }: NumberFieldPrimitive.Input.Props) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-3 text-center text-sm tabular-nums outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

function NumberFieldDecrement({
  "aria-label": ariaLabel = "Decrease value",
  children,
  className,
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      aria-label={ariaLabel}
      className={cn(
        "grid w-10 shrink-0 cursor-pointer place-items-center border-r border-input bg-background text-muted-foreground outline-none transition-[background-color,box-shadow,color,opacity] duration-100 hover:bg-muted hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-40 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children ?? <Minus className="size-3.5" aria-hidden="true" />}
    </NumberFieldPrimitive.Decrement>
  );
}

function NumberFieldIncrement({
  "aria-label": ariaLabel = "Increase value",
  children,
  className,
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      aria-label={ariaLabel}
      className={cn(
        "grid w-10 shrink-0 cursor-pointer place-items-center border-l border-input bg-background text-muted-foreground outline-none transition-[background-color,box-shadow,color,opacity] duration-100 hover:bg-muted hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-40 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children ?? <Plus className="size-3.5" aria-hidden="true" />}
    </NumberFieldPrimitive.Increment>
  );
}

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
};
