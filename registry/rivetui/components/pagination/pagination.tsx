import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

function Pagination({
  className,
  "aria-label": ariaLabel = "Pagination",
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="pagination"
      aria-label={ariaLabel}
      className={cn("@container/pagination flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex w-full flex-wrap items-center justify-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = React.ComponentProps<"a"> & {
  isActive?: boolean;
};

function PaginationLink({
  className,
  href,
  isActive = false,
  onClick,
  tabIndex,
  "aria-disabled": ariaDisabled,
  ...props
}: PaginationLinkProps) {
  const disabled = ariaDisabled === true || ariaDisabled === "true";

  return (
    <a
      data-slot="pagination-link"
      aria-current={isActive ? "page" : undefined}
      aria-disabled={ariaDisabled}
      data-active={isActive ? "" : undefined}
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(
        "inline-flex size-10 cursor-pointer items-center justify-center rounded-none border border-transparent text-sm font-medium outline-none transition-[background-color,border-color,color,box-shadow] duration-100 hover:border-border hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-disabled:pointer-events-none aria-disabled:opacity-40 data-active:border-foreground data-active:bg-foreground data-active:text-background motion-reduce:transition-none",
        className,
      )}
      {...(disabled ? {} : { onClick })}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  children,
  href,
  onClick,
  tabIndex,
  "aria-disabled": ariaDisabled,
  ...props
}: React.ComponentProps<"a">) {
  const disabled = ariaDisabled === true || ariaDisabled === "true";

  return (
    <a
      data-slot="pagination-previous"
      aria-disabled={ariaDisabled}
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-none border border-transparent px-3 text-sm font-medium outline-none transition-[background-color,border-color,color,box-shadow] duration-100 hover:border-border hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-disabled:pointer-events-none aria-disabled:opacity-40 motion-reduce:transition-none",
        className,
      )}
      {...(disabled ? {} : { onClick })}
      {...props}
    >
      <ChevronLeft className="size-4" aria-hidden="true" />
      {children ?? <span className="@max-[20rem]/pagination:sr-only">Previous</span>}
    </a>
  );
}

function PaginationNext({
  className,
  children,
  href,
  onClick,
  tabIndex,
  "aria-disabled": ariaDisabled,
  ...props
}: React.ComponentProps<"a">) {
  const disabled = ariaDisabled === true || ariaDisabled === "true";

  return (
    <a
      data-slot="pagination-next"
      aria-disabled={ariaDisabled}
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-none border border-transparent px-3 text-sm font-medium outline-none transition-[background-color,border-color,color,box-shadow] duration-100 hover:border-border hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-disabled:pointer-events-none aria-disabled:opacity-40 motion-reduce:transition-none",
        className,
      )}
      {...(disabled ? {} : { onClick })}
      {...props}
    >
      {children ?? <span className="@max-[20rem]/pagination:sr-only">Next</span>}
      <ChevronRight className="size-4" aria-hidden="true" />
    </a>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "inline-flex size-10 items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" aria-hidden="true" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export type { PaginationLinkProps };
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
