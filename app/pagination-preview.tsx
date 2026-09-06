"use client";

import { type MouseEvent, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/rivet/blocks/pagination/pagination";

export function PaginationPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="pagination-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 030
          </p>
          <h2
            id="pagination-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Pagination
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Navigation
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-44 items-center justify-center overflow-x-auto p-5 sm:p-8 lg:border-r lg:border-border">
          <PaginationExample />
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="Nav" />
            <Specification term="Current" detail="ARIA" />
            <Specification term="Control" detail="Links" />
            <Specification term="Focus" detail="Visible" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Boundary">
          <PaginationExample
            ariaLabel="Boundary pagination"
            initialPage={1}
            totalPages={3}
            align="start"
          />
        </PreviewRow>
      </div>
    </section>
  );
}

type PaginationExampleProps = {
  align?: "center" | "start";
  ariaLabel?: string;
  initialPage?: number;
  totalPages?: number;
};

function PaginationExample({
  align = "center",
  ariaLabel = "Interactive pagination",
  initialPage = 3,
  totalPages = 7,
}: PaginationExampleProps = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const pages = getVisiblePages(currentPage, totalPages);
  const previousDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  function selectPage(event: MouseEvent<HTMLAnchorElement>, page: number) {
    event.preventDefault();
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  return (
    <div className={align === "start" ? "space-y-3" : "space-y-3 text-center"}>
      <p
        className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground"
        aria-live="polite"
      >
        Page {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
      </p>
      <Pagination
        className={align === "start" ? "justify-start" : undefined}
        aria-label={ariaLabel}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`#page-${Math.max(currentPage - 1, 1)}`}
              aria-disabled={previousDisabled}
              tabIndex={previousDisabled ? -1 : undefined}
              onClick={(event) => selectPage(event, currentPage - 1)}
            />
          </PaginationItem>
          {pages.map((page) =>
            typeof page === "number" ? (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`#page-${page}`}
                  isActive={page === currentPage}
                  aria-label={`Page ${page}`}
                  onClick={(event) => selectPage(event, page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href={`#page-${Math.min(currentPage + 1, totalPages)}`}
              aria-disabled={nextDisabled}
              tabIndex={nextDisabled ? -1 : undefined}
              onClick={(event) => selectPage(event, currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

type VisiblePage = number | "ellipsis-start" | "ellipsis-end";

function getVisiblePages(currentPage: number, totalPages: number): VisiblePage[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis-end", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis-start", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ];
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd>{detail}</dd>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
