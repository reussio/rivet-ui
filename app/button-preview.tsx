import { ArrowUpRight, LoaderCircle, Plus } from "lucide-react";

import { Button } from "@/registry/rivet/blocks/button/button";

const variants = ["default", "secondary", "outline", "ghost", "destructive"] as const;

export function ButtonPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="button-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 001
          </p>
          <h2 id="button-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Button
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Ready
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="flex min-h-72 flex-wrap content-center items-center justify-center gap-3 border border-dashed border-border p-6 sm:p-10">
            <Button>
              Execute
              <ArrowUpRight aria-hidden="true" />
            </Button>
            <Button variant="outline">Review output</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <div className="flex justify-between gap-4 p-4">
              <dt className="text-muted-foreground">Element</dt>
              <dd>button</dd>
            </div>
            <div className="flex justify-between gap-4 p-4">
              <dt className="text-muted-foreground">Height</dt>
              <dd>32—48 px</dd>
            </div>
            <div className="flex justify-between gap-4 p-4">
              <dt className="text-muted-foreground">Radius</dt>
              <dd>0 px</dd>
            </div>
            <div className="flex justify-between gap-4 p-4">
              <dt className="text-muted-foreground">States</dt>
              <dd>05</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Variants">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </PreviewRow>

        <PreviewRow label="Scale">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon-sm" variant="outline" aria-label="Create item">
            <Plus aria-hidden="true" />
          </Button>
          <Button size="icon" variant="outline" aria-label="Create item">
            <Plus aria-hidden="true" />
          </Button>
          <Button size="icon-lg" variant="outline" aria-label="Create item">
            <Plus aria-hidden="true" />
          </Button>
        </PreviewRow>

        <PreviewRow label="System states">
          <Button disabled>Disabled</Button>
          <Button disabled>
            <LoaderCircle className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Processing
          </Button>
          <p className="basis-full font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
            Use Tab to inspect the focus-visible state. Icon-only controls require an accessible
            name.
          </p>
        </PreviewRow>
      </div>
    </section>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3 p-4">{children}</div>
    </div>
  );
}
