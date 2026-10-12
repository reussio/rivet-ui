"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function ContextMenu(props: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root {...props} />;
}

function ContextMenuTrigger(props: ContextMenuPrimitive.Trigger.Props) {
  return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />;
}

function ContextMenuGroup(props: ContextMenuPrimitive.Group.Props) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />;
}

function ContextMenuRadioGroup(props: ContextMenuPrimitive.RadioGroup.Props) {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}

type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props &
  Pick<ContextMenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;

function ContextMenuContent({
  align,
  alignOffset,
  className,
  side,
  sideOffset,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        data-slot="context-menu-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50 outline-none"
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(
            "min-w-48 origin-(--transform-origin) overflow-hidden border border-border bg-popover p-1 text-popover-foreground outline-none transition-[opacity,transform] duration-100 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none",
            className,
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  className,
  destructive = false,
  inset = false,
  ...props
}: ContextMenuPrimitive.Item.Props & { destructive?: boolean; inset?: boolean }) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-destructive={destructive || undefined}
      data-inset={inset || undefined}
      className={cn(
        "relative flex min-h-9 cursor-default select-none items-center gap-2 px-3 py-2 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[destructive]:text-destructive data-[destructive]:data-highlighted:bg-destructive/10 data-[destructive]:data-highlighted:text-destructive data-[inset]:pl-9 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  children,
  className,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "relative flex min-h-9 cursor-default select-none items-center py-2 pr-3 pl-9 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <ContextMenuPrimitive.CheckboxItemIndicator
        data-slot="context-menu-checkbox-item-indicator"
        className="absolute left-3 grid size-4 place-items-center"
      >
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
      </ContextMenuPrimitive.CheckboxItemIndicator>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  children,
  className,
  ...props
}: ContextMenuPrimitive.RadioItem.Props) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "relative flex min-h-9 cursor-default select-none items-center py-2 pr-3 pl-9 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <ContextMenuPrimitive.RadioItemIndicator
        data-slot="context-menu-radio-item-indicator"
        className="absolute left-3 grid size-4 place-items-center"
      >
        <Circle className="size-2 fill-current" aria-hidden="true" />
      </ContextMenuPrimitive.RadioItemIndicator>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset = false,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset || undefined}
      className={cn(
        "px-3 py-2 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground data-[inset]:pl-9",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({ className, ...props }: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto pl-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSub(props: ContextMenuPrimitive.SubmenuRoot.Props) {
  return <ContextMenuPrimitive.SubmenuRoot {...props} />;
}

function ContextMenuSubTrigger({
  children,
  className,
  inset = false,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset || undefined}
      className={cn(
        "relative flex min-h-9 cursor-default select-none items-center gap-2 px-3 py-2 text-sm outline-none data-popup-open:bg-accent data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-40 data-[inset]:pl-9 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

function ContextMenuSubContent({
  align = "start",
  alignOffset = -4,
  className,
  side = "inline-end",
  sideOffset = -4,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        data-slot="context-menu-sub-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50 outline-none"
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-sub-content"
          className={cn(
            "min-w-44 origin-(--transform-origin) overflow-hidden border border-border bg-popover p-1 text-popover-foreground outline-none transition-[opacity,transform] duration-100 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none",
            className,
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
