import { ArrowRight, PanelRightOpen, SlidersHorizontal } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
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
  SheetTitle,
  SheetTrigger,
} from "@/registry/rivetui/components/sheet/sheet";

const primaryCode = `import { ArrowRight, PanelRightOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
        <FieldDescription>Warm instances available before traffic arrives.</FieldDescription>
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

function MetadataRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border px-3 py-2.5 last:border-b-0">
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm">{value}</span>
    </div>
  )
}`;

const scrollingCode = `import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const activityItems = [
  "Deployment queued from the main branch.",
  "Build environment initialized in Frankfurt.",
  "Workspace dependencies restored from cache.",
  "Type checks and production build completed.",
  "Immutable assets uploaded to the edge network.",
  "Runtime health checks passed in all regions.",
  "Production alias moved to the new deployment.",
] as const;
export function ScrollingExample() {
  return (
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
  );
}`;

export function SheetPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Open contextual controls from the viewport edge without replacing the current page."
        note={
          <>
            Set <code>side</code> to <code>right</code>, <code>left</code>, <code>top</code>, or
            <code>bottom</code> according to the surrounding layout.
          </>
        }
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow
        label="Long content"
        description="Keep the header and footer fixed while the body scrolls independently."
        code={scrollingCode}
      >
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

function PreviewRow({
  label,
  description,
  children,
  code,
}: {
  label: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} description={description} code={code}>
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </ComponentExample>
  );
}
