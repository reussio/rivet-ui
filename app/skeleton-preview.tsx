import { Skeleton } from "@/registry/rivetui/components/skeleton/skeleton";

export function SkeletonPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="skeleton-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 018
          </p>
          <h2 id="skeleton-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Skeleton
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Loading
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div
            className="border border-border"
            role="status"
            aria-label="Loading deployment details"
          >
            <span className="sr-only">Loading deployment details</span>
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div className="w-full max-w-sm space-y-3">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-6 w-52 max-w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
              <Skeleton className="size-8 shrink-0" />
            </div>
            <div className="grid grid-cols-3 divide-x divide-border p-5">
              <MetricSkeleton />
              <MetricSkeleton />
              <MetricSkeleton />
            </div>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Meaning" detail="decorative" />
            <Specification term="Motion" detail="reduced" />
            <Specification term="Shape" detail="composed" />
            <Specification term="Surface" detail="muted" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Text">
          <div className="w-full max-w-md space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </PreviewRow>
        <PreviewRow label="Controls">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="size-10" />
          <Skeleton className="h-6 w-20" />
        </PreviewRow>
      </div>
    </section>
  );
}

function MetricSkeleton() {
  return (
    <div className="space-y-3 px-4 first:pl-0 last:pr-0">
      <Skeleton className="h-2.5 w-12" />
      <Skeleton className="h-4 w-16 max-w-full" />
    </div>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right">{detail}</dd>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="flex min-w-0 flex-wrap items-center gap-4 p-4">{children}</div>
    </div>
  );
}
