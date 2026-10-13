"use client";

import * as React from "react";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivetui/components/field/field";
import { Rating } from "@/registry/rivetui/components/rating/rating";

const ratingCopy = [
  "No rating selected",
  "Needs substantial improvement",
  "Below expectations",
  "Solid with room to improve",
  "Strong deployment experience",
  "Exceptional deployment experience",
] as const;

export function RatingPreview() {
  const [rating, setRating] = React.useState(4);

  return (
    <section className="w-full border border-border bg-background" aria-labelledby="rating-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 044
          </p>
          <h2 id="rating-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Rating
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Single score
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <form
            className="mx-auto w-full max-w-xl border border-border"
            aria-label="Deployment feedback"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
              <div>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Deployment / bd-1184
                </p>
                <p className="mt-1 text-sm font-medium">Rate the deployment experience</p>
              </div>
              <output className="font-mono text-xs tabular-nums" aria-live="polite">
                {String(rating).padStart(2, "0")} / 05
              </output>
            </div>
            <div className="grid gap-4 p-5">
              <Rating
                name="deploymentRating"
                value={rating}
                onValueChange={setRating}
                aria-describedby="deployment-rating-description"
              />
              <p id="deployment-rating-description" className="text-sm text-muted-foreground">
                {ratingCopy[rating]}
              </p>
            </div>
            <div className="flex justify-end border-t border-border p-4">
              <Button type="submit" size="sm">
                Submit feedback
              </Button>
            </div>
          </form>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Role" detail="radiogroup" />
            <Specification term="Input" detail="radio" />
            <Specification term="Navigation" detail="arrows" />
            <Specification term="Form value" detail="native" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Sizes">
          <div className="flex flex-wrap items-center gap-4">
            <Rating size="sm" defaultValue={3} aria-label="Small rating" />
            <Rating defaultValue={4} aria-label="Medium rating" />
            <Rating size="lg" defaultValue={5} aria-label="Large rating" />
          </div>
        </PreviewRow>

        <PreviewRow label="Custom scale">
          <Field className="w-full max-w-lg">
            <FieldLabel id="priority-rating-label">Priority score</FieldLabel>
            <Rating
              max={3}
              defaultValue={2}
              name="priority"
              aria-labelledby="priority-rating-label"
              getItemLabel={(value, max) => `Priority ${value} of ${max}`}
            />
            <FieldDescription>Three steps for low, medium, or high priority.</FieldDescription>
          </Field>
        </PreviewRow>

        <PreviewRow label="Required">
          <Field className="w-full max-w-lg">
            <FieldLabel id="support-rating-label">Support experience</FieldLabel>
            <Rating
              name="supportRating"
              required
              aria-invalid="true"
              aria-labelledby="support-rating-label"
              aria-describedby="support-rating-error"
            />
            <FieldError id="support-rating-error">Select a rating before continuing.</FieldError>
          </Field>
        </PreviewRow>

        <PreviewRow label="Disabled">
          <Rating defaultValue={3} disabled aria-label="Archived rating" />
        </PreviewRow>
      </div>
    </section>
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
