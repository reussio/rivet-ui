"use client";

import { ArrowRight, Clock3, ListFilter, Rocket, Settings2 } from "lucide-react";
import * as React from "react";
import { ComponentExample } from "@/app/component-example";
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

const primaryCode = `import { ArrowRight, Clock3, ListFilter, Rocket, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

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

function ActionRow({ icon: Icon, label, detail }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 border border-border p-3 text-left"
    >
      <span className="grid size-9 place-items-center border border-border text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{detail}</span>
      </span>
      <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
    </button>
  )
}`;

const snapPointsCode = `import { ArrowRight, Clock3, ListFilter, Rocket, Settings2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/drawer";
const snapPoints: DrawerSnapPoint[] = [0.34, 0.72];

const releaseItems = [
  "Resolve the release commit from the main branch.",
  "Restore workspace dependencies from the shared cache.",
  "Run type checks and build the production bundle.",
  "Upload immutable assets to the edge network.",
  "Warm the runtime in each selected region.",
  "Move the production alias to the new deployment.",
] as const;
export function SnapPointsExample() {
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[0]);
  return (
    <>
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
            <DrawerDescription>Drag between the compact and expanded positions.</DrawerDescription>
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
    </>
  );
}`;

const snapPoints: DrawerSnapPoint[] = [0.34, 0.72];

export function DrawerPreview() {
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[0]);

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow label="Snap points" code={snapPointsCode}>
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

function PreviewRow({
  label,
  children,
  code,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} code={code}>
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </ComponentExample>
  );
}
