"use client";

import { type MouseEvent, useState } from "react";
import { ComponentExample } from "@/app/component-example";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/rivetui/components/pagination/pagination";

const primaryCode = `"use client"

import { type MouseEvent, useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationExample() {
  const [page, setPage] = useState(3)
  const pages = getVisiblePages(page, 7)

  function selectPage(event: MouseEvent<HTMLAnchorElement>, nextPage: number) {
    event.preventDefault()
    setPage(Math.min(Math.max(nextPage, 1), 7))
  }

  return (
    <div className="space-y-3 text-center">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        Page {String(page).padStart(2, "0")} / 07
      </p>
      <Pagination aria-label="Interactive pagination">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={\`#page-\${Math.max(page - 1, 1)}\`}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              onClick={(event) => selectPage(event, page - 1)}
            />
          </PaginationItem>
          {pages.map((item) =>
            typeof item === "number" ? (
              <PaginationItem key={item}>
                <PaginationLink
                  href={\`#page-\${item}\`}
                  isActive={item === page}
                  aria-label={\`Page \${item}\`}
                  onClick={(event) => selectPage(event, item)}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={item}><PaginationEllipsis /></PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href={\`#page-\${Math.min(page + 1, 7)}\`}
              aria-disabled={page === 7}
              tabIndex={page === 7 ? -1 : undefined}
              onClick={(event) => selectPage(event, page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (currentPage <= 3) return [1, 2, 3, "ellipsis-end", totalPages] as const
  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis-start", totalPages - 2, totalPages - 1, totalPages] as const
  }
  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ] as const
}`;

const boundaryCode = `import { type MouseEvent, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
              href={\`#page-\${Math.max(currentPage - 1, 1)}\`}
              aria-disabled={previousDisabled}
              tabIndex={previousDisabled ? -1 : undefined}
              onClick={(event) => selectPage(event, currentPage - 1)}
            />
          </PaginationItem>
          {pages.map((page) =>
            typeof page === "number" ? (
              <PaginationItem key={page}>
                <PaginationLink
                  href={\`#page-\${page}\`}
                  isActive={page === currentPage}
                  aria-label={\`Page \${page}\`}
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
              href={\`#page-\${Math.min(currentPage + 1, totalPages)}\`}
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
function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (currentPage <= 3) return [1, 2, 3, "ellipsis-end", totalPages] as const;
  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis-start", totalPages - 2, totalPages - 1, totalPages] as const;
  }
  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ] as const;
}
export function BoundaryExample() {
  return (
    <>
      <PaginationExample
        ariaLabel="Boundary pagination"
        initialPage={1}
        totalPages={3}
        align="start"
      />
    </>
  );
}`;

export function PaginationPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="flex min-h-44 items-center justify-center overflow-x-auto p-5 sm:p-8">
          <PaginationExample />
        </div>
      </ComponentExample>

      <PreviewRow label="Boundary" code={boundaryCode}>
        <PaginationExample
          ariaLabel="Boundary pagination"
          initialPage={1}
          totalPages={3}
          align="start"
        />
      </PreviewRow>
    </div>
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

function PreviewRow({
  label,
  children,
  code,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
