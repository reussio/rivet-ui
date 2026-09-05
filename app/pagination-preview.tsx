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
          <Pagination className="justify-start" aria-label="Boundary pagination">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#previous" aria-disabled="true" tabIndex={-1} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#page-1" isActive aria-label="Page 1">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#page-2" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </PreviewRow>
      </div>
    </section>
  );
}

function PaginationExample() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#page-2" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-1" aria-label="Page 1">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-3" isActive aria-label="Page 3">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-4" aria-label="Page 4">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-5" aria-label="Page 5">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#page-4" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
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
