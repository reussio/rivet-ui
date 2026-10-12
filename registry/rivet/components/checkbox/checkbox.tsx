"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative inline-flex size-4 shrink-0 items-center justify-center rounded-none border border-input bg-background text-primary-foreground outline-none transition-[background-color,border-color,box-shadow,opacity] duration-100 after:absolute after:-inset-2.5 hover:border-foreground/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-checked:border-primary data-checked:bg-primary data-indeterminate:border-primary data-indeterminate:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-40 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="group/indicator grid place-items-center text-current [&_svg]:size-3"
      >
        <Check
          className="group-data-[indeterminate]/indicator:hidden"
          strokeWidth={2.5}
          aria-hidden="true"
        />
        <Minus
          className="hidden group-data-[indeterminate]/indicator:block"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
