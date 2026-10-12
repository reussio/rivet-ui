"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Star } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type RatingSize = "sm" | "default" | "lg";

type RatingProps = Omit<
  RadioGroupPrimitive.Props<number>,
  "children" | "className" | "defaultValue" | "onValueChange" | "readOnly" | "value"
> & {
  className?: string;
  defaultValue?: number;
  getItemLabel?: (value: number, max: number) => string;
  max?: number;
  onValueChange?: RadioGroupPrimitive.Props<number>["onValueChange"];
  size?: RatingSize;
  value?: number;
};

const ratingSizeClasses: Record<RatingSize, string> = {
  sm: "size-8 [&_svg]:size-3.5",
  default: "size-10 [&_svg]:size-4",
  lg: "size-12 [&_svg]:size-5",
};

function Rating({
  className,
  defaultValue,
  disabled = false,
  getItemLabel = defaultItemLabel,
  max = 5,
  onBlur,
  onPointerLeave,
  onValueChange,
  size = "default",
  value: valueProp,
  "aria-label": ariaLabel = "Rating",
  ...props
}: RatingProps) {
  const itemCount = Number.isFinite(max) ? Math.max(1, Math.floor(max)) : 5;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const [previewValue, setPreviewValue] = React.useState<number | null>(null);
  const value = valueProp ?? uncontrolledValue;
  const activeValue = disabled ? (value ?? 0) : (previewValue ?? value ?? 0);

  return (
    <RadioGroupPrimitive
      data-slot="rating"
      className={cn(
        "group/rating inline-flex w-fit max-w-full items-center border border-border bg-background outline-none aria-invalid:border-destructive data-disabled:cursor-not-allowed data-disabled:opacity-40",
        className,
      )}
      value={valueProp}
      defaultValue={defaultValue}
      disabled={disabled}
      aria-label={ariaLabel}
      onValueChange={(nextValue, eventDetails) => {
        onValueChange?.(nextValue, eventDetails);

        if (!eventDetails.isCanceled && valueProp === undefined) {
          setUncontrolledValue(nextValue);
        }
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        setPreviewValue(null);
      }}
      onBlur={(event) => {
        onBlur?.(event);

        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPreviewValue(null);
        }
      }}
      {...props}
    >
      {Array.from({ length: itemCount }, (_, index) => {
        const itemValue = index + 1;
        const active = itemValue <= activeValue;

        return (
          <RadioPrimitive.Root
            key={itemValue}
            value={itemValue}
            data-slot="rating-item"
            data-active={active ? "" : undefined}
            aria-label={getItemLabel(itemValue, itemCount)}
            className={cn(
              "relative inline-flex shrink-0 cursor-pointer items-center justify-center border-l border-border text-muted-foreground outline-none transition-[background-color,color,opacity] duration-100 first:border-l-0 hover:bg-muted focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 data-disabled:pointer-events-none data-active:text-foreground group-aria-invalid/rating:focus-visible:ring-destructive/25 motion-reduce:transition-none",
              ratingSizeClasses[size],
            )}
            onPointerEnter={(event) => {
              if (!disabled && event.pointerType !== "touch") {
                setPreviewValue(itemValue);
              }
            }}
            onFocus={() => {
              if (!disabled) {
                setPreviewValue(itemValue);
              }
            }}
          >
            <Star
              className={cn(
                "transition-[fill,color] duration-100 motion-reduce:transition-none",
                active && "fill-current",
              )}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </RadioPrimitive.Root>
        );
      })}
    </RadioGroupPrimitive>
  );
}

function defaultItemLabel(value: number, max: number) {
  return `${value} out of ${max} stars`;
}

export type { RatingProps, RatingSize };
export { Rating };
