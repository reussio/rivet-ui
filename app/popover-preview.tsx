import { Settings2 } from "lucide-react";

import { Button } from "@/registry/rivet/components/button/button";
import { Field, FieldLabel } from "@/registry/rivet/components/field/field";
import { Input } from "@/registry/rivet/components/input/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/rivet/components/popover/popover";

export function PopoverPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="popover-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 010
          </p>
          <h2 id="popover-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Popover
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Surface
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="flex flex-col gap-5 border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Deployment / production
              </p>
              <p className="mt-1 text-sm font-medium">api.rivet.run</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Configure the public alias without leaving the current context.
              </p>
            </div>

            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                <Settings2 aria-hidden="true" />
                Configure
              </PopoverTrigger>
              <PopoverContent align="end">
                <PopoverTitle>Deployment alias</PopoverTitle>
                <PopoverDescription>
                  Update the public name used for this production deployment.
                </PopoverDescription>
                <Field className="mt-4">
                  <FieldLabel htmlFor="deployment-alias">Alias</FieldLabel>
                  <Input id="deployment-alias" defaultValue="api.rivet.run" />
                </Field>
                <div className="mt-4 flex justify-end gap-2">
                  <PopoverClose render={<Button variant="outline" size="sm" />}>
                    Cancel
                  </PopoverClose>
                  <PopoverClose render={<Button size="sm" />}>Apply</PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Focus" detail="first control" />
            <Specification term="Position" detail="collision aware" />
            <Specification term="Dismiss" detail="outside / esc" />
            <Specification term="Return" detail="trigger" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Placement">
          <PlacementPopover side="top" />
          <PlacementPopover side="right" />
          <PlacementPopover side="bottom" />
          <PlacementPopover side="left" />
        </PreviewRow>

        <PreviewRow label="Composition">
          <Popover modal="trap-focus">
            <PopoverTrigger render={<Button variant="outline" size="sm" />}>
              Trapped focus
            </PopoverTrigger>
            <PopoverContent side="top" align="start">
              <PopoverTitle>Focused task</PopoverTitle>
              <PopoverDescription>
                Tab stays within this surface until it is dismissed.
              </PopoverDescription>
              <div className="mt-4 flex justify-end">
                <PopoverClose render={<Button size="sm" />}>Done</PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Use trapped focus only when completing the popover task requires uninterrupted keyboard
            navigation.
          </p>
        </PreviewRow>
      </div>
    </section>
  );
}

function PlacementPopover({ side }: { side: "top" | "right" | "bottom" | "left" }) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>{side}</PopoverTrigger>
      <PopoverContent side={side} className="w-64">
        <PopoverTitle>{`${side[0].toUpperCase()}${side.slice(1)} placement`}</PopoverTitle>
        <PopoverDescription>
          The surface flips or shifts when the preferred side has no room.
        </PopoverDescription>
        <div className="mt-4 flex justify-end">
          <PopoverClose render={<Button variant="outline" size="sm" />}>Close</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
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
