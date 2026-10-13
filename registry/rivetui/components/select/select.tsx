"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

function Select<Value>(props: SelectPrimitive.Root.Props<Value, false>) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group data-slot="select-group" className={cn("py-1", className)} {...props} />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("min-w-0 flex-1 truncate text-left", className)}
      {...props}
    />
  );
}

function SelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "group/select-trigger flex h-10 w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-none border border-input bg-background px-3 py-2 text-sm outline-none transition-[background-color,border-color,box-shadow,color,opacity] duration-100 data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:text-muted-foreground data-disabled:opacity-60 data-placeholder:text-muted-foreground data-popup-open:border-foreground/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:data-popup-open:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        data-slot="select-icon"
        render={<ChevronDown aria-hidden="true" />}
        className="size-4 shrink-0 text-muted-foreground"
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        data-slot="select-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "relative max-h-[min(20rem,var(--available-height))] w-(--anchor-width) min-w-48 overflow-x-hidden overflow-y-auto rounded-none border border-border bg-popover text-popover-foreground outline-none",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List data-slot="select-list" className="p-1">
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-3 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex min-h-9 w-full cursor-default select-none items-center gap-2 px-3 py-2 pr-9 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-selected:font-medium",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText data-slot="select-item-text" className="min-w-0 flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        data-slot="select-item-indicator"
        className="absolute right-3 grid size-4 place-items-center"
      >
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex h-7 w-full cursor-default items-center justify-center bg-popover text-muted-foreground",
        className,
      )}
      {...props}
    >
      <ChevronUp className="size-4" aria-hidden="true" />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({ className, ...props }: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex h-7 w-full cursor-default items-center justify-center bg-popover text-muted-foreground",
        className,
      )}
      {...props}
    >
      <ChevronDown className="size-4" aria-hidden="true" />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
