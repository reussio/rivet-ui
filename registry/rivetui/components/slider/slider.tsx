"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

function Slider<Value extends number | readonly number[]>({
  className,
  ...props
}: SliderPrimitive.Root.Props<Value>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 data-[orientation=vertical]:w-fit data-[orientation=vertical]:grid-cols-1",
        className,
      )}
      {...props}
    />
  );
}

function SliderLabel({ className, ...props }: SliderPrimitive.Label.Props) {
  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      className={cn("min-w-0 text-sm font-medium", className)}
      {...props}
    />
  );
}

function SliderValue({ className, ...props }: SliderPrimitive.Value.Props) {
  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      className={cn(
        "text-right font-mono text-xs tabular-nums text-muted-foreground data-[orientation=vertical]:text-left",
        className,
      )}
      {...props}
    />
  );
}

function SliderControl({ className, ...props }: SliderPrimitive.Control.Props) {
  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      className={cn(
        "col-span-2 flex w-full cursor-pointer touch-none items-center py-3 select-none data-disabled:cursor-not-allowed data-[orientation=vertical]:col-span-1 data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-3 data-[orientation=vertical]:py-0",
        className,
      )}
      {...props}
    />
  );
}

function SliderTrack({ className, ...props }: SliderPrimitive.Track.Props) {
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn(
        "relative h-1 w-full bg-muted data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1",
        className,
      )}
      {...props}
    />
  );
}

function SliderIndicator({ className, ...props }: SliderPrimitive.Indicator.Props) {
  return (
    <SliderPrimitive.Indicator
      data-slot="slider-indicator"
      className={cn("bg-primary", className)}
      {...props}
    />
  );
}

function SliderThumb({ className, ...props }: SliderPrimitive.Thumb.Props) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "size-4 border border-foreground bg-background outline-none transition-[background-color,border-color,box-shadow] duration-100 before:absolute before:-inset-2.5 has-[:focus-visible]:border-ring has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40 data-dragging:bg-foreground data-disabled:pointer-events-none data-disabled:opacity-40 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
};
