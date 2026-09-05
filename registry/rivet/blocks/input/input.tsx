import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-none border border-input bg-background px-3 py-2 text-sm outline-none transition-[background-color,border-color,box-shadow,color] duration-100 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 read-only:bg-muted/40 read-only:text-muted-foreground disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 file:mr-3 file:border-0 file:bg-transparent file:p-0 file:font-medium file:text-foreground motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
