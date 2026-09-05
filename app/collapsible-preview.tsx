import { Badge } from "@/registry/rivet/blocks/badge/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/rivet/blocks/collapsible/collapsible";

export function CollapsiblePreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="collapsible-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 020
          </p>
          <h2
            id="collapsible-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Collapsible
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Disclosure
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <Collapsible defaultOpen>
            <CollapsibleTrigger>
              <span className="flex items-center gap-3">
                Advanced routing rules
                <Badge variant="secondary">03</Badge>
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-0">
              <dl className="divide-y divide-border">
                <Rule label="Primary region" value="fra1" />
                <Rule label="Failover region" value="iad1" />
                <Rule label="Health threshold" value="3 checks" />
              </dl>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Trigger" detail="button" />
            <Specification term="State" detail="controlled" />
            <Specification term="Search" detail="until-found" />
            <Specification term="Motion" detail="measured" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Compact">
          <Collapsible className="max-w-lg">
            <CollapsibleTrigger>3 environment variables</CollapsibleTrigger>
            <CollapsibleContent>
              <code className="font-mono text-xs leading-relaxed text-muted-foreground">
                DATABASE_URL · API_TOKEN · LOG_LEVEL
              </code>
            </CollapsibleContent>
          </Collapsible>
        </PreviewRow>
        <PreviewRow label="Disabled">
          <Collapsible className="max-w-lg" disabled>
            <CollapsibleTrigger>Inherited organization policy</CollapsibleTrigger>
            <CollapsibleContent>This policy cannot be changed in this project.</CollapsibleContent>
          </Collapsible>
        </PreviewRow>
      </div>
    </section>
  );
}

function Rule({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-2.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono text-xs">{value}</dd>
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
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
