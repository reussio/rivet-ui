import type * as React from "react";

import { cn } from "@/lib/utils";

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field" className={cn("group/field grid w-full gap-2", className)} {...props} />
  );
}

function FieldLabel({ className, children, htmlFor, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      htmlFor={htmlFor}
      data-slot="field-label"
      className={cn(
        "w-fit font-mono text-[0.6875rem] font-medium uppercase leading-none tracking-[0.14em] text-foreground group-has-[:disabled]/field:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function FieldError({ className, role = "alert", ...props }: React.ComponentProps<"p">) {
  return (
    <p
      role={role}
      data-slot="field-error"
      className={cn("text-sm leading-relaxed text-destructive", className)}
      {...props}
    />
  );
}

export { Field, FieldDescription, FieldError, FieldLabel };
