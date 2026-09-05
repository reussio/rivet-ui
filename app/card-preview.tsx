import { ArrowUpRight, Ellipsis, Server } from "lucide-react";

import { Button } from "@/registry/rivet/blocks/button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/rivet/blocks/card/card";

export function CardPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="card-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 011
          </p>
          <h2 id="card-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Card
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Structure
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <Card className="mx-auto max-w-xl">
            <CardHeader>
              <CardTitle>Production gateway</CardTitle>
              <CardDescription>
                Public entry point for traffic routed through the Frankfurt region.
              </CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="Open gateway actions">
                  <Ellipsis aria-hidden="true" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="p-0">
              <dl className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <Metric term="Requests" detail="28.4k" />
                <Metric term="Latency" detail="84 ms" />
                <Metric term="Errors" detail="0.02%" />
              </dl>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="size-2 bg-foreground" aria-hidden="true" />
                Operational
              </span>
              <Button size="sm">
                Inspect
                <ArrowUpRight aria-hidden="true" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="div" />
            <Specification term="Radius" detail="0 px" />
            <Specification term="Regions" detail="03" />
            <Specification term="Variants" detail="none" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Composition">
          <div className="grid w-full gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Worker capacity</CardTitle>
                <CardDescription>Runtime allocation for the current environment.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-4">
                  <span className="font-mono text-3xl font-semibold tracking-[-0.04em]">72%</span>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                    18 / 25 active
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="size-4" aria-hidden="true" />
                  Private network
                </CardTitle>
                <CardDescription>
                  Isolate services from public ingress and route traffic internally.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Configure network
                </Button>
              </CardFooter>
            </Card>
          </div>
        </PreviewRow>

        <PreviewRow label="Content only">
          <Card className="w-full max-w-md">
            <CardContent>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                Build / 8f31c2a
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                Cards may contain a single region when a header or footer would add no useful
                hierarchy.
              </p>
            </CardContent>
          </Card>
        </PreviewRow>
      </div>
    </section>
  );
}

function Metric({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="p-4">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {term}
      </dt>
      <dd className="mt-2 text-xl font-semibold tracking-tight">{detail}</dd>
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
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </div>
  );
}
