import { cn } from "@/lib/utils";

function Breadcrumb({
  className,
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label={ariaLabel}
      className={cn("min-w-0", className)}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex min-w-0 items-center", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn(
        "truncate outline-none transition-[color,box-shadow] duration-100 hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("truncate font-medium text-foreground", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children = "/", className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("select-none text-muted-foreground/50", className)}
      {...props}
    >
      {children}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      className={cn("inline-flex min-w-5 items-center justify-center", className)}
      {...props}
    >
      <span aria-hidden="true">…</span>
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
