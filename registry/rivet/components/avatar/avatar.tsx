import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "group/avatar relative inline-flex shrink-0 overflow-hidden border border-border bg-muted align-middle",
  {
    variants: {
      size: {
        sm: "size-8",
        default: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type AvatarProps = AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>;

function Avatar({ className, size = "default", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(avatarVariants({ size, className }))}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("absolute inset-0 size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center bg-muted font-mono text-[0.625rem] font-medium uppercase tracking-[0.08em] text-muted-foreground group-data-[size=sm]/avatar:text-[0.5625rem] group-data-[size=lg]/avatar:text-xs",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "flex -space-x-2 [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-background",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-group-count"
      className={cn(
        "relative inline-flex size-10 shrink-0 items-center justify-center border border-border bg-muted font-mono text-[0.625rem] font-medium tracking-[0.08em] text-muted-foreground ring-2 ring-background",
        className,
      )}
      {...props}
    />
  );
}

export type { AvatarProps };
export { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage, avatarVariants };
