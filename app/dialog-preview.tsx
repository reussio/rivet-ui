import { FileText, Plus } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
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

const primaryCode = `import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

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
</div>`;

const overflowCode = `import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
const manifestSections = [
  "Resolve the source branch and lock the deployment commit.",
  "Install workspace dependencies in an isolated build environment.",
  "Run type checks, static analysis, and the production build.",
  "Upload immutable artifacts to the regional edge network.",
  "Warm the production runtime before routing external traffic.",
  "Attach the configured alias and publish deployment metadata.",
  "Record the release in the workspace audit log.",
] as const;
export function OverflowExample() {
  return (
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
  );
}`;

export function DialogPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Keep a focused task in context with a clear title, supporting copy, and explicit actions."
        note={
          <>
            Compose the width with <code>className</code>; the responsive viewport limit remains
            intact.
          </>
        }
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow
        label="Long content"
        description="The dialog becomes viewport-scrollable while its layout remains centered."
        code={overflowCode}
      >
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
