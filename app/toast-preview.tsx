"use client";

import { AlertTriangle, Check, LoaderCircle } from "lucide-react";

import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import { Toaster, ToastProvider, useToast } from "@/registry/rivetui/components/toast/toast";

const successCode = `"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster, ToastProvider, useToast } from "@/components/ui/toast"

function DeployButton() {
  const toast = useToast()

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col items-start gap-4 border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Production deployment</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Publish the current revision and receive non-blocking feedback.
          </p>
        </div>
        <Button onClick={() => toast.add({
          title: "Deployment ready",
          description: "Revision 8f31c2a is serving production traffic.",
          type: "success",
          actionProps: { children: "View" },
        })}>
          <Check aria-hidden="true" />
          Deploy
        </Button>
      </div>
    </div>
  )
}

export function ToastExample() {
  return (
    <ToastProvider>
      <DeployButton />
      <Toaster />
    </ToastProvider>
  )
}`;

const typesCode = `"use client"

import { AlertTriangle, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"

export function ToastTypes() {
  const toast = useToast()

  return (
    <div className="flex max-w-2xl flex-wrap items-center gap-3">
      <Button variant="outline" size="sm" onClick={() => toast.add({
        title: "Build queued",
        description: "Waiting for an available build worker.",
        type: "warning",
      })}>
        <LoaderCircle aria-hidden="true" />
        Queued
      </Button>
      <Button variant="destructive" size="sm" onClick={() => toast.add({
        title: "Deployment failed",
        description: "The health check did not return a successful response.",
        type: "error",
        priority: "high",
        timeout: 0,
      })}>
        <AlertTriangle aria-hidden="true" />
        Failure
      </Button>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        Urgent failures use assertive announcements and remain visible until dismissed.
      </p>
    </div>
  )
}`;

export function ToastPreview() {
  return (
    <ToastProvider timeout={5000}>
      <ToastControls />
      <Toaster />
    </ToastProvider>
  );
}

function ToastControls() {
  const toast = useToast();

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Success feedback"
        description="Confirm completed work without interrupting the current task."
        code={successCode}
      >
        <div className="w-full max-w-2xl">
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
      </ComponentExample>

      <ComponentExample
        title="Priority and tone"
        description="Use persistent, assertive feedback only for failures that require attention."
        code={typesCode}
      >
        <div className="flex max-w-2xl flex-wrap items-center gap-3">
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
        </div>
      </ComponentExample>
    </div>
  );
}
