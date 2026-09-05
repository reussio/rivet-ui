"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Check, ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";

function Combobox<Value, Multiple extends boolean | undefined = false, Item = Value>(
  props: ComboboxPrimitive.Root.Props<Value, Multiple, Item>,
) {
  return <ComboboxPrimitive.Root {...props} />;
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.Label.Props) {
  return (
    <ComboboxPrimitive.Label
      data-slot="combobox-label"
      className={cn("mb-2 block text-sm font-medium", className)}
      {...props}
    />
  );
}

function ComboboxInputGroup({ className, ...props }: ComboboxPrimitive.InputGroup.Props) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input-group"
      className={cn("relative w-full", className)}
      {...props}
    />
  );
}

function ComboboxInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      className={cn(
        "h-10 w-full rounded-none border border-input bg-background px-3 pr-16 text-sm outline-none transition-[border-color,box-shadow,color,opacity] duration-100 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "absolute top-px right-px grid size-[2.375rem] place-items-center text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children ?? <ChevronDown className="size-4" aria-hidden="true" />}
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, children, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(
        "absolute top-px right-10 grid size-[2.375rem] place-items-center text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children ?? <X className="size-3.5" aria-hidden="true" />}
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxContent({
  className,
  children,
  align = "start",
  side = "bottom",
  sideOffset = 4,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, "align" | "side" | "sideOffset">) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        data-slot="combobox-positioner"
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "max-h-[min(20rem,var(--available-height))] w-(--anchor-width) min-w-48 overflow-hidden rounded-none border border-border bg-popover text-popover-foreground outline-none",
            className,
          )}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn("max-h-[min(20rem,var(--available-height))] overflow-y-auto p-1", className)}
      {...props}
    />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn("px-3 py-8 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("py-1", className)}
      {...props}
    />
  );
}

function ComboboxGroupLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-group-label"
      className={cn(
        "px-3 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex min-h-9 w-full cursor-default select-none items-center gap-2 px-3 py-2 pr-9 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-selected:font-medium",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        className="absolute right-3 grid size-4 place-items-center"
      >
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
};
