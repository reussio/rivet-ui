import type * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-24 w-full resize-y rounded-none border border-input bg-background px-3 py-2.5 text-sm leading-relaxed outline-none transition-[background-color,border-color,box-shadow,color,opacity] duration-100 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
