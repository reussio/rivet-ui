import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-none border font-medium text-sm leading-none outline-none transition-[background-color,border-color,color,opacity,transform] duration-100 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 active:not-disabled:translate-y-px disabled:pointer-events-none disabled:opacity-40 data-disabled:pointer-events-none data-disabled:opacity-40 motion-reduce:transition-none motion-reduce:transform-none aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-primary-foreground hover:bg-primary/85 active:bg-primary/75",
        secondary:
          "border-border bg-secondary text-secondary-foreground hover:border-foreground/30 hover:bg-accent active:bg-muted",
        outline:
          "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted active:bg-muted/70",
        ghost:
          "border-transparent bg-transparent text-foreground hover:border-border hover:bg-muted active:bg-muted/70",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive hover:border-destructive/60 hover:bg-destructive/20 active:bg-destructive/25 focus-visible:border-destructive focus-visible:ring-destructive/25",
      },
      size: {
        sm: "h-8 min-w-8 gap-1.5 px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-10 min-w-10 gap-2 px-4",
        lg: "h-12 min-w-12 gap-2.5 px-5",
        "icon-sm": "size-8 p-0 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-md": "size-10 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export type { ButtonProps };
export { Button, buttonVariants };
