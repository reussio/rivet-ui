"use client";

import { AlertTriangle, Check, LoaderCircle } from "lucide-react";

import { Button } from "@/registry/rivet/blocks/button/button";
import { Toaster, ToastProvider, useToast } from "@/registry/rivet/blocks/toast/toast";

export function ToastPreview() {
  return (
    <ToastProvider timeout={5000}>
      <section className="w-full border border-border bg-background" aria-labelledby="toast-title">
        <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
          <div className="space-y-2">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
              Primitive / 021
            </p>
            <h2 id="toast-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Toast
            </h2>
          </div>
          <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            Notification
          </span>
        </header>

        <ToastControls />
      </section>
      <Toaster />
    </ToastProvider>
  );
}

function ToastControls() {
  const toast = useToast();

  return (
    <>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="flex flex-col items-start gap-4 border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Production deployment</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Publish the current revision and receive non-blocking feedback.
              </p>
            </div>
            <Button
              onClick={() =>
                toast.add({
                  title: "Deployment ready",
                  description: "Revision 8f31c2a is serving production traffic.",
                  type: "success",
                  actionProps: { children: "View" },
                })
              }
            >
              <Check aria-hidden="true" />
              Deploy
            </Button>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Region" detail="live" />
            <Specification term="Priority" detail="polite / high" />
            <Specification term="Control" detail="Hook" />
            <Specification term="Dismiss" detail="timer / swipe" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Types">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.add({
                title: "Build queued",
                description: "Waiting for an available build worker.",
                type: "warning",
              })
            }
          >
            <LoaderCircle aria-hidden="true" />
            Queued
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() =>
              toast.add({
                title: "Deployment failed",
                description: "The health check did not return a successful response.",
                type: "error",
                priority: "high",
                timeout: 0,
              })
            }
          >
            <AlertTriangle aria-hidden="true" />
            Failure
          </Button>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Urgent failures use assertive announcements and remain visible until dismissed.
          </p>
        </PreviewRow>
      </div>
    </>
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
    <div className="grid md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </div>
  );
}
