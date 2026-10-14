import { LoaderCircle, Plus } from "lucide-react";

import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";

const variantsCode = `import { Button } from "@/components/ui/button"

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`;

const sizesCode = `import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-md" variant="outline" aria-label="Create item">
        <Plus aria-hidden="true" />
      </Button>
    </div>
  )
}`;

const statesCode = `import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonStates() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled>
        <LoaderCircle
          className="animate-spin motion-reduce:animate-none"
          aria-hidden="true"
        />
        Processing
      </Button>
    </div>
  )
}`;

export function ButtonPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Variants"
        description="Choose a visual weight that matches the importance and risk of the action."
        code={variantsCode}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </ComponentExample>

      <ComponentExample
        title="Sizes"
        description="Use explicit text and icon sizes to keep control density predictable."
        code={sizesCode}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon-md" variant="outline" aria-label="Create item">
            <Plus aria-hidden="true" />
          </Button>
        </div>
      </ComponentExample>

      <ComponentExample
        title="Unavailable actions"
        description="Pair the disabled state with a label that explains whether an action is blocked or still processing."
        code={statesCode}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button disabled>Disabled</Button>
          <Button disabled>
            <LoaderCircle className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Processing
          </Button>
        </div>
      </ComponentExample>
    </div>
  );
}
