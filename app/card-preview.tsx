import { ArrowUpRight, Ellipsis, Server } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/rivetui/components/card/card";

const primaryCode = `import { ArrowUpRight, Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

function Metric({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="p-4">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {term}
      </dt>
      <dd className="mt-2 text-xl font-semibold tracking-tight">{detail}</dd>
    </div>
  )
}`;

const compositionCode = `import { ArrowUpRight, Ellipsis, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export function CompositionExample() {
  return (
    <>
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
    </>
  );
}`;

export function CardPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Compose only the regions needed to create clear hierarchy around related content and actions."
        note="CardHeader and CardFooter are optional. A content-only card is valid when extra regions would add no useful structure."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow
        label="Composition"
        description="Adapt the same primitive to metrics, settings, or action-oriented content without adding new card variants."
        code={compositionCode}
      >
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
    </div>
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

function PreviewRow({
  label,
  children,
  code,
  description,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
}) {
  return (
    <ComponentExample title={label} description={description} code={code}>
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </ComponentExample>
  );
}
