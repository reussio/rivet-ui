import { Settings2 } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import { Field, FieldLabel } from "@/registry/rivetui/components/field/field";
import { Input } from "@/registry/rivetui/components/input/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/rivetui/components/popover/popover";

const primaryCode = `import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

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
      <PopoverClose render={<Button variant="outline" size="sm" />}>Cancel</PopoverClose>
      <PopoverClose render={<Button size="sm" />}>Apply</PopoverClose>
    </div>
  </PopoverContent>
  </Popover>
</div>`;

const placementCode = `import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
function PlacementPopover({ side }: { side: "top" | "right" | "bottom" | "left" }) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>{side}</PopoverTrigger>
      <PopoverContent side={side} className="w-64">
        <PopoverTitle>{\`\${side[0].toUpperCase()}\${side.slice(1)} placement\`}</PopoverTitle>
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
export function PlacementExample() {
  return (
    <>
      <PlacementPopover side="top" />
      <PlacementPopover side="right" />
      <PlacementPopover side="bottom" />
      <PlacementPopover side="left" />
    </>
  );
}`;

const compositionCode = `import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
export function CompositionExample() {
  return (
    <>
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
    </>
  );
}`;

export function PopoverPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow label="Placement" code={placementCode}>
        <PlacementPopover side="top" />
        <PlacementPopover side="right" />
        <PlacementPopover side="bottom" />
        <PlacementPopover side="left" />
      </PreviewRow>
      <PreviewRow label="Composition" code={compositionCode}>
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
