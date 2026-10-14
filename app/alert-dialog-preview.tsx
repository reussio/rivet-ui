import { AlertTriangle, Trash2 } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/rivetui/components/alert-dialog/alert-dialog";
import { Button } from "@/registry/rivetui/components/button/button";

const primaryCode = `import { AlertTriangle, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

<div className="flex flex-col gap-5 border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
  <div className="min-w-0">
    <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
      Environment / Production
    </p>
    <p className="mt-1 text-sm font-medium">Frankfurt edge runtime</p>
    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
      18 deployments are attached to this environment.
    </p>
  </div>
  <AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    <Trash2 aria-hidden="true" />
    Delete environment
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <div className="mb-2 flex size-9 items-center justify-center border border-destructive/35 bg-destructive/10 text-destructive">
        <AlertTriangle className="size-4" aria-hidden="true" />
      </div>
      <AlertDialogTitle>Delete production environment?</AlertDialogTitle>
      <AlertDialogDescription>
        This removes the environment and its deployment history permanently. Active traffic will
        stop immediately.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogBody className="p-0">
      <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-5 py-3">
          <dt className="text-muted-foreground">Environment</dt>
          <dd>production</dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-5 py-3">
          <dt className="text-muted-foreground">Region</dt>
          <dd>fra1</dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-5 py-3">
          <dt className="text-muted-foreground">Deployments</dt>
          <dd>18</dd>
        </div>
      </dl>
    </AlertDialogBody>
    <AlertDialogFooter>
      <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
      <AlertDialogAction render={<Button variant="destructive" />}>
        Delete permanently
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
  </AlertDialog>
</div>`;

export function AlertDialogPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Require an explicit decision before an action with destructive or irreversible consequences."
        note="Use Dialog for ordinary workflows. Alert Dialog intentionally prevents dismissal without choosing an action or canceling."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
          <div className="flex flex-col gap-5 border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Environment / Production
              </p>
              <p className="mt-1 text-sm font-medium">Frankfurt edge runtime</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                18 deployments are attached to this environment.
              </p>
            </div>

            <DeleteEnvironmentDialog />
          </div>
        </div>
      </ComponentExample>
    </div>
  );
}

function DeleteEnvironmentDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <Trash2 aria-hidden="true" />
        Delete environment
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mb-2 flex size-9 items-center justify-center border border-destructive/35 bg-destructive/10 text-destructive">
            <AlertTriangle className="size-4" aria-hidden="true" />
          </div>
          <AlertDialogTitle>Delete production environment?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the environment and its deployment history permanently. Active traffic will
            stop immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody className="p-0">
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Detail term="Environment" detail="production" />
            <Detail term="Region" detail="fra1" />
            <Detail term="Deployments" detail="18" />
          </dl>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button variant="destructive" />}>
            Delete permanently
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Detail({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-5 py-3">
      <dt className="text-muted-foreground">{term}</dt>
      <dd>{detail}</dd>
    </div>
  );
}
