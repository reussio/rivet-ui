import { AlertTriangle, KeyRound, Trash2 } from "lucide-react";

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
} from "@/registry/rivet/components/alert-dialog/alert-dialog";
import { Button } from "@/registry/rivet/components/button/button";

export function AlertDialogPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="alert-dialog-preview-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 042
          </p>
          <h2
            id="alert-dialog-preview-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Alert Dialog
          </h2>
        </div>
        <span className="border border-destructive/35 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-destructive">
          Confirm
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
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

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Role" detail="alertdialog" />
            <Specification term="Focus" detail="cancel first" />
            <Specification term="Outside" detail="blocked" />
            <Specification term="Escape" detail="dismiss" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Standard">
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" size="sm" />}>
              <KeyRound aria-hidden="true" />
              Revoke API key
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Revoke this API key?</AlertDialogTitle>
                <AlertDialogDescription>
                  Requests using this key will fail immediately. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
                <AlertDialogAction render={<Button variant="destructive" />}>
                  Revoke key
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            Reserve confirmation for actions whose effect is difficult or impossible to reverse.
          </p>
        </PreviewRow>
      </div>
    </section>
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

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right">{detail}</dd>
    </div>
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

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="flex min-w-0 flex-wrap items-center gap-4 p-4">{children}</div>
    </div>
  );
}
