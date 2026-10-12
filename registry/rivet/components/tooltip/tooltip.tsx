"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delay = 400,
  closeDelay = 80,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider delay={delay} closeDelay={closeDelay} {...props} />;
}

function Tooltip<Payload>(props: TooltipPrimitive.Root.Props<Payload>) {
  return <TooltipPrimitive.Root {...props} />;
}

function TooltipTrigger<Payload>(props: TooltipPrimitive.Trigger.Props<Payload>) {
  return <TooltipPrimitive.Trigger {...props} />;
}

type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;

function TooltipContent({
  className,
  children,
  align = "center",
  alignOffset = 0,
  side = "top",
  sideOffset = 8,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        data-slot="tooltip-positioner"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "max-w-64 rounded-none border border-border bg-popover px-2.5 py-1.5 text-xs leading-relaxed text-popover-foreground transition-opacity duration-100 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 motion-reduce:transition-none",
            className,
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            data-slot="tooltip-arrow"
            className="relative block h-1.5 w-3 overflow-clip data-[side=bottom]:-top-1.5 data-[side=left]:-right-2.25 data-[side=left]:rotate-90 data-[side=right]:-left-2.25 data-[side=right]:-rotate-90 data-[side=top]:-bottom-1.5 data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:size-[calc(6px*sqrt(2))] before:border before:border-border before:bg-popover before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]"
          />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
