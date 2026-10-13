"use client";

import { ArrowRight, Clock3, ListFilter, Rocket, Settings2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  type DrawerSnapPoint,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/rivetui/components/drawer/drawer";

const snapPoints: DrawerSnapPoint[] = [0.34, 0.72];

export function DrawerPreview() {
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[0]);

  return (
    <section className="w-full border border-border bg-background" aria-labelledby="drawer-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Overlay / Gesture
          </p>
          <h2 id="drawer-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Drawer
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Swipe enabled
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-5 border border-border p-5">
            <div className="min-w-0">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Deployment / Mobile actions
              </p>
              <p className="mt-2 text-sm font-medium">Production deployment</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Keep the current view visible while presenting focused actions.
              </p>
            </div>

            <Drawer>
              <DrawerTrigger render={<Button />}>
                Actions
                <ListFilter aria-hidden="true" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Deployment actions</DrawerTitle>
                  <DrawerDescription>
                    Choose the next operation for the production deployment.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerBody className="grid gap-2">
                  <ActionRow icon={Rocket} label="Promote deployment" detail="Move the alias now" />
                  <ActionRow icon={Settings2} label="Configure runtime" detail="Region and scale" />
                  <ActionRow icon={Clock3} label="View activity" detail="Latest events" />
                </DrawerBody>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
                  <DrawerClose render={<Button />}>
                    Continue
                    <ArrowRight aria-hidden="true" />
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Gesture" detail="Drag / Swipe" />
            <Specification term="Focus" detail="Trapped" />
            <Specification term="Scroll" detail="Locked" />
            <Specification term="Snap" detail="Optional" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Snap points">
          <Drawer
            snapPoints={snapPoints}
            snapPoint={snapPoint}
            onSnapPointChange={setSnapPoint}
            snapToSequentialPoints
          >
            <DrawerTrigger render={<Button variant="outline" size="sm" />}>
              Open snap drawer
            </DrawerTrigger>
            <DrawerContent className="h-[72dvh] max-h-[42rem]">
              <DrawerHeader>
                <DrawerTitle>Release queue</DrawerTitle>
                <DrawerDescription>
                  Drag between the compact and expanded positions.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="divide-y divide-border p-0">
                {releaseItems.map((item, index) => (
                  <div key={item} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 p-4">
                    <span className="font-mono text-[0.625rem] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </DrawerBody>
              <DrawerFooter>
                <span className="mr-auto self-center font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {snapPoint === snapPoints[0] ? "Compact" : "Expanded"}
                </span>
                <DrawerClose render={<Button size="sm" />}>Done</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Snap points accept viewport fractions, pixels, or rem values and can be controlled.
          </p>
        </PreviewRow>
      </div>
    </section>
  );
}

const releaseItems = [
  "Resolve the release commit from the main branch.",
  "Restore workspace dependencies from the shared cache.",
  "Run type checks and build the production bundle.",
  "Upload immutable assets to the edge network.",
  "Warm the runtime in each selected region.",
  "Move the production alias to the new deployment.",
] as const;

function ActionRow({
  icon: Icon,
  label,
  detail,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  label: string;
  detail: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-3 border border-border p-3 text-left outline-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <span className="grid size-9 shrink-0 place-items-center border border-border text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{detail}</span>
      </span>
      <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
    </button>
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
