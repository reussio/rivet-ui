import { ArrowRight, PackageOpen, SearchX } from "lucide-react";

import { Button } from "@/registry/rivet/components/button/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateLabel,
  EmptyStateMedia,
  EmptyStateTitle,
} from "@/registry/rivet/components/empty-state/empty-state";

export function EmptyStatePreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="empty-state-preview-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 046
          </p>
          <h2
            id="empty-state-preview-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Empty state
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Feedback
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <EmptyState>
            <EmptyStateMedia>
              <PackageOpen />
            </EmptyStateMedia>
            <EmptyStateHeader>
              <EmptyStateLabel>Workspace / Empty</EmptyStateLabel>
              <EmptyStateTitle>No deployments yet</EmptyStateTitle>
              <EmptyStateDescription>
                Connect a repository and ship the first revision to create a deployment history.
              </EmptyStateDescription>
            </EmptyStateHeader>
            <EmptyStateActions>
              <Button>
                Create deployment
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button variant="outline">Import project</Button>
            </EmptyStateActions>
            <EmptyStateFooter>New deployments will appear here automatically.</EmptyStateFooter>
          </EmptyState>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Layout" detail="composed" />
            <Specification term="Sizes" detail="02" />
            <Specification term="Frame" detail="optional" />
            <Specification term="Actions" detail="optional" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Compact">
          <EmptyState size="compact" className="max-w-xl">
            <EmptyStateMedia>
              <SearchX />
            </EmptyStateMedia>
            <EmptyStateHeader>
              <EmptyStateTitle>No matching projects</EmptyStateTitle>
              <EmptyStateDescription>
                Try another search term or clear the active filters.
              </EmptyStateDescription>
            </EmptyStateHeader>
            <EmptyStateActions>
              <Button variant="outline" size="sm">
                Clear filters
              </Button>
            </EmptyStateActions>
          </EmptyState>
        </PreviewRow>

        <PreviewRow label="Unframed">
          <EmptyState variant="plain" size="compact" className="max-w-xl items-start text-left">
            <EmptyStateHeader className="items-start">
              <EmptyStateLabel>Activity</EmptyStateLabel>
              <EmptyStateTitle>Nothing to review</EmptyStateTitle>
              <EmptyStateDescription>
                New events will appear here as soon as the project changes.
              </EmptyStateDescription>
            </EmptyStateHeader>
          </EmptyState>
        </PreviewRow>
      </div>
    </section>
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
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
