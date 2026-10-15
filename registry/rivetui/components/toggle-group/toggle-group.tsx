"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const toggleGroupVariants = cva(
  "group/toggle-group inline-flex w-fit max-w-full items-stretch bg-background data-[orientation=vertical]:flex-col",
  {
    variants: {
      variant: {
        outline: "border border-border",
        ghost: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

const toggleGroupItemVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap font-medium text-muted-foreground outline-none transition-[background-color,border-color,color,opacity] duration-100 hover:not-data-disabled:bg-muted hover:not-data-disabled:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring/40 data-disabled:pointer-events-none data-disabled:opacity-40 motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        outline:
          "border-0 border-border border-l data-pressed:bg-muted data-pressed:text-foreground first:border-l-0 group-data-[orientation=vertical]/toggle-group:border-t group-data-[orientation=vertical]/toggle-group:border-l-0 group-data-[orientation=vertical]/toggle-group:first:border-t-0",
        ghost:
          "border border-transparent data-pressed:border-foreground/40 data-pressed:bg-muted data-pressed:text-foreground",
      },
      size: {
        sm: "h-8 min-w-8 gap-1.5 px-2.5 text-xs [&_svg]:size-3.5",
        md: "h-10 min-w-10 gap-2 px-3.5 text-sm [&_svg]:size-4",
        lg: "h-12 min-w-12 gap-2.5 px-5 text-sm [&_svg]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  },
);

type ToggleGroupStyle = {
  variant: NonNullable<VariantProps<typeof toggleGroupItemVariants>["variant"]>;
  size: NonNullable<VariantProps<typeof toggleGroupItemVariants>["size"]>;
};

const ToggleGroupStyleContext = React.createContext<ToggleGroupStyle>({
  variant: "outline",
  size: "md",
});

type ToggleGroupProps<Value extends string = string> = ToggleGroupPrimitive.Props<Value> &
  VariantProps<typeof toggleGroupVariants> & {
    size?: ToggleGroupStyle["size"];
  };

function ToggleGroup<Value extends string = string>({
  className,
  children,
  variant = "outline",
  size = "md",
  ...props
}: ToggleGroupProps<Value>) {
  const style: ToggleGroupStyle = { variant: variant ?? "outline", size };

  return (
    <ToggleGroupStyleContext.Provider value={style}>
      <ToggleGroupPrimitive
        data-slot="toggle-group"
        className={cn(toggleGroupVariants({ variant, className }))}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive>
    </ToggleGroupStyleContext.Provider>
  );
}

type ToggleGroupItemProps<Value extends string = string> = TogglePrimitive.Props<Value>;

function ToggleGroupItem<Value extends string = string>({
  className,
  ...props
}: ToggleGroupItemProps<Value>) {
  const { variant, size } = React.useContext(ToggleGroupStyleContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(toggleGroupItemVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export type { ToggleGroupItemProps, ToggleGroupProps };
export { ToggleGroup, ToggleGroupItem, toggleGroupItemVariants, toggleGroupVariants };
