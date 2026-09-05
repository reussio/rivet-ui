import { Button } from "@/registry/rivet/blocks/button/button";
import { Spinner } from "@/registry/rivet/blocks/spinner/spinner";

export function SpinnerPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="spinner-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 026
          </p>
          <h2 id="spinner-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Spinner
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Activity
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-40 items-center justify-center p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="flex items-center gap-3 border border-border px-4 py-3 text-sm">
            <Spinner aria-label="Building deployment" />
            Building deployment
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="SVG" />
            <Specification term="Sizes" detail="3" />
            <Specification term="Motion" detail="Reduced" />
            <Specification term="Role" detail="Status" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Sizes">
          <div className="flex items-center gap-8">
            <Spinner size="sm" aria-label="Small loader" />
            <Spinner aria-label="Default loader" />
            <Spinner size="lg" aria-label="Large loader" />
          </div>
        </PreviewRow>
        <PreviewRow label="In control">
          <Button disabled>
            <Spinner aria-hidden="true" />
            Deploying
          </Button>
        </PreviewRow>
      </div>
    </section>
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
