import { FileText, Plus } from "lucide-react";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/rivetui/components/dialog/dialog";
import { Field, FieldDescription, FieldLabel } from "@/registry/rivetui/components/field/field";
import { Input } from "@/registry/rivetui/components/input/input";

export function DialogPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="dialog-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 012
          </p>
          <h2 id="dialog-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Dialog
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Modal
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="flex flex-col gap-5 border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Deployments / 03
              </p>
              <p className="mt-1 text-sm font-medium">Create a production deployment</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Configure the source branch and public alias before deployment.
              </p>
            </div>

            <Dialog>
              <DialogTrigger render={<Button />}>
                <Plus aria-hidden="true" />
                New deployment
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New deployment</DialogTitle>
                  <DialogDescription>
                    Create a production deployment from a repository branch.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody className="grid gap-5">
                  <Field>
                    <FieldLabel htmlFor="deployment-name">Deployment name</FieldLabel>
                    <Input id="deployment-name" placeholder="Production gateway" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="source-branch">Source branch</FieldLabel>
                    <Input id="source-branch" defaultValue="main" />
                    <FieldDescription>The branch is built from its latest commit.</FieldDescription>
                  </Field>
                </DialogBody>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                  <DialogClose render={<Button />}>Create deployment</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Focus" detail="trapped" />
            <Specification term="Scroll" detail="locked" />
            <Specification term="Dismiss" detail="outside / esc" />
            <Specification term="Portal" detail="body" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Scale">
          <ScaleDialog label="Compact" className="max-w-sm" />
          <ScaleDialog label="Wide" className="max-w-2xl" />
        </PreviewRow>

        <PreviewRow label="Overflow">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" size="sm" />}>
              <FileText aria-hidden="true" />
              Long content
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Deployment manifest</DialogTitle>
                <DialogDescription>
                  The outer viewport keeps tall content reachable on small screens.
                </DialogDescription>
              </DialogHeader>
              <DialogBody className="divide-y divide-border p-0">
                {manifestSections.map((section, index) => (
                  <div key={section} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 p-4">
                    <span className="font-mono text-[0.625rem] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed">{section}</p>
                  </div>
                ))}
              </DialogBody>
              <DialogFooter>
                <DialogClose render={<Button size="sm" />}>Done</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            The dialog remains centered while short and becomes viewport-scrollable when its content
            exceeds the available height.
          </p>
        </PreviewRow>
      </div>
    </section>
  );
}

const manifestSections = [
  "Resolve the source branch and lock the deployment commit.",
  "Install workspace dependencies in an isolated build environment.",
  "Run type checks, static analysis, and the production build.",
  "Upload immutable artifacts to the regional edge network.",
  "Warm the production runtime before routing external traffic.",
  "Attach the configured alias and publish deployment metadata.",
  "Record the release in the workspace audit log.",
] as const;

function ScaleDialog({ label, className }: { label: string; className: string }) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>{label}</DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{label} dialog</DialogTitle>
          <DialogDescription>
            Width is composed through className while the narrow-screen limit remains intact.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button size="sm" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
