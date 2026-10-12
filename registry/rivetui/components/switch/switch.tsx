"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-none border border-input bg-muted/60 outline-none transition-[background-color,border-color,box-shadow,opacity] duration-100 after:absolute after:-inset-2.5 hover:border-foreground/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-checked:border-primary data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-40 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-3.5 translate-x-0.5 rounded-none border border-foreground/20 bg-background transition-[background-color,border-color,transform] duration-100 data-checked:translate-x-[1.125rem] data-checked:border-primary-foreground/20 data-checked:bg-primary-foreground motion-reduce:transition-none"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
