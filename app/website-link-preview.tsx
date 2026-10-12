import { WebsiteLink } from "@/registry/rivetui/components/website-link/website-link";

export function WebsiteLinkPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="website-link-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / Inline navigation
          </p>
          <h2
            id="website-link-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Website Link
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Navigation
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-64 items-center justify-center p-5 sm:p-8 lg:border-r lg:border-border">
          <article className="w-full max-w-xl border border-border bg-muted/10 p-5 sm:p-6">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              Release note / 04
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The component registry is documented on{" "}
              <WebsiteLink href="https://rivetui.reuss.dev" title="Rivet UI" target="_blank" /> and
              follows the installation workflow from{" "}
              <WebsiteLink href="https://ui.shadcn.com" title="shadcn/ui" target="_blank" />.
            </p>
          </article>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="Anchor" />
            <Specification term="Favicon" detail="Derived" />
            <Specification term="Protocol" detail="Aware" />
            <Specification term="Focus" detail="Visible" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Automatic">
          <WebsiteLink href="https://github.com" target="_blank" />
        </PreviewRow>
        <PreviewRow label="Custom title">
          <WebsiteLink href="https://developer.mozilla.org" title="MDN Web Docs" target="_blank" />
        </PreviewRow>
        <PreviewRow label="Constrained">
          <div className="max-w-56">
            <WebsiteLink
              href="https://nextjs.org/docs"
              title="Next.js documentation and framework reference"
              target="_blank"
            />
          </div>
        </PreviewRow>
        <PreviewRow label="Email">
          <WebsiteLink href="mailto:team@example.com" />
        </PreviewRow>
        <PreviewRow label="Phone">
          <WebsiteLink href="tel:+49-30-123456" />
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
      <div className="flex min-w-0 flex-wrap items-center p-4">{children}</div>
    </div>
  );
}
