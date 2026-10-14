"use client";

import * as React from "react";

import { ComponentExample } from "@/app/component-example";
import { Field, FieldError, FieldLabel } from "@/registry/rivetui/components/field/field";
import { Rating } from "@/registry/rivetui/components/rating/rating";

const defaultCode = `"use client"

import * as React from "react"

import { Rating } from "@/components/ui/rating"

export function ExperienceRating() {
  const [value, setValue] = React.useState(4)

  return (
    <div className="flex items-center gap-4">
      <Rating
        name="experience"
        value={value}
        onValueChange={setValue}
        aria-label="Deployment experience"
      />
      <output>{value} / 5</output>
    </div>
  )
}`;

const sizesCode = `import { Rating } from "@/components/ui/rating"

export function RatingSizes() {
  return (
    <div className="grid gap-4">
      <Rating size="sm" defaultValue={3} aria-label="Small rating" />
      <Rating size="md" defaultValue={4} aria-label="Medium rating" />
      <Rating size="lg" defaultValue={5} aria-label="Large rating" />
    </div>
  )
}`;

const validationCode = `import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Rating } from "@/components/ui/rating"

export function RequiredRating() {
  return (
    <Field>
      <FieldLabel id="rating-label">Support experience</FieldLabel>
      <Rating
        name="supportRating"
        required
        aria-invalid
        aria-labelledby="rating-label"
        aria-describedby="rating-error"
      />
      <FieldError id="rating-error">Select a rating before continuing.</FieldError>
    </Field>
  )
}`;

export function RatingPreview() {
  const [rating, setRating] = React.useState(4);

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Controlled"
        description="Read the selected score immediately while preserving native form behavior."
        code={defaultCode}
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Rating
            name="previewExperience"
            value={rating}
            onValueChange={setRating}
            aria-label="Deployment experience"
          />
          <output className="font-mono text-xs tabular-nums" aria-live="polite">
            {String(rating).padStart(2, "0")} / 05
          </output>
        </div>
      </ComponentExample>

      <ComponentExample
        title="Sizes"
        description="Use the size that matches the surrounding control density."
        code={sizesCode}
      >
        <div className="grid gap-4">
          <Rating size="sm" defaultValue={3} aria-label="Small rating" />
          <Rating size="md" defaultValue={4} aria-label="Medium rating" />
          <Rating size="lg" defaultValue={5} aria-label="Large rating" />
        </div>
      </ComponentExample>

      <ComponentExample
        title="Required"
        description="Connect required ratings to a visible and announced validation message."
        code={validationCode}
      >
        <Field className="w-full max-w-lg">
          <FieldLabel id="preview-rating-label">Support experience</FieldLabel>
          <Rating
            name="previewSupportRating"
            required
            aria-invalid
            aria-labelledby="preview-rating-label"
            aria-describedby="preview-rating-error"
          />
          <FieldError id="preview-rating-error">Select a rating before continuing.</FieldError>
        </Field>
      </ComponentExample>
    </div>
  );
}
