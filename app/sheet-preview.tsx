import { ArrowRight, PanelRightOpen, SlidersHorizontal } from "lucide-react";

import { Button } from "@/registry/rivetui/components/button/button";
import { Field, FieldDescription, FieldLabel } from "@/registry/rivetui/components/field/field";
import { Input } from "@/registry/rivetui/components/input/input";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  type SheetSide,
  SheetTitle,
  SheetTrigger,
} from "@/registry/rivetui/components/sheet/sheet";

export function SheetPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="sheet-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Overlay / Sheet
          </p>
          <h2 id="sheet-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Sheet
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Modal panel
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-5 border border-border p-5">
            <div className="min-w-0">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Environment / Production
              </p>
              <p className="mt-2 text-sm font-medium">Runtime configuration</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Review regional and scaling controls without leaving the deployment.
              </p>
            </div>

            <Sheet>
              <SheetTrigger render={<Button />}>
                Configure
                <PanelRightOpen aria-hidden="true" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Runtime configuration</SheetTitle>
                  <SheetDescription>
                    Changes are applied to the next production deployment.
                  </SheetDescription>
                </SheetHeader>
                <SheetBody className="grid content-start gap-6">
                  <Field>
                    <FieldLabel htmlFor="sheet-region">Primary region</FieldLabel>
                    <Input id="sheet-region" defaultValue="fra1" />
                    <FieldDescription>Frankfurt, Germany · eu-central</FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sheet-instances">Minimum instances</FieldLabel>
                    <Input id="sheet-instances" type="number" defaultValue="2" min="0" />
                    <FieldDescription>
                      Warm instances available before traffic arrives.
                    </FieldDescription>
                  </Field>
                  <div className="border border-border">
                    <MetadataRow label="Runtime" value="Node.js 24" />
                    <MetadataRow label="Memory" value="1024 MB" />
                    <MetadataRow label="Timeout" value="30 s" />
                  </div>
                </SheetBody>
                <SheetFooter>
                  <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
                  <SheetClose render={<Button />}>
                    Save changes
                    <ArrowRight aria-hidden="true" />
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Focus" detail="Trapped" />
            <Specification term="Scroll" detail="Locked" />
            <Specification term="Dismiss" detail="Outside / Esc" />
            <Specification term="Sides" detail="04" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Sides">
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <SideSheet key={side} side={side} />
          ))}
        </PreviewRow>

        <PreviewRow label="Scrolling">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="sm" />}>
              <SlidersHorizontal aria-hidden="true" />
              Activity panel
            </SheetTrigger>
            <SheetContent side="left" className="max-w-sm">
              <SheetHeader>
                <SheetTitle>Deployment activity</SheetTitle>
                <SheetDescription>Recent events from the production environment.</SheetDescription>
              </SheetHeader>
              <SheetBody className="divide-y divide-border p-0">
                {activityItems.map((item, index) => (
                  <div key={item} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 p-4">
                    <span className="font-mono text-[0.625rem] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </SheetBody>
              <SheetFooter>
                <SheetClose render={<Button size="sm" />}>Done</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Header and footer stay fixed while the body handles long content independently.
          </p>
        </PreviewRow>
      </div>
    </section>
  );
}

const activityItems = [
  "Deployment queued from the main branch.",
  "Build environment initialized in Frankfurt.",
  "Workspace dependencies restored from cache.",
  "Type checks and production build completed.",
  "Immutable assets uploaded to the edge network.",
  "Runtime health checks passed in all regions.",
  "Production alias moved to the new deployment.",
] as const;

function SideSheet({ side }: { side: SheetSide }) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        {side[0].toUpperCase() + side.slice(1)}
      </SheetTrigger>
      <SheetContent side={side} className={side === "top" || side === "bottom" ? "max-h-80" : ""}>
        <SheetHeader>
          <SheetTitle>{side[0].toUpperCase() + side.slice(1)} sheet</SheetTitle>
          <SheetDescription>
            The same composition can enter from any viewport edge.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Use the side that best preserves context for the current task.
          </p>
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button size="sm" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border px-3 py-2.5 last:border-b-0">
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm">{value}</span>
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
