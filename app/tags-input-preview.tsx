"use client";

import { ComponentExample } from "@/app/component-example";
import { TagsInput, TagsInputLabel } from "@/registry/rivetui/components/tags-input/tags-input";

const defaultCode = `import { TagsInput, TagsInputLabel } from "@/components/ui/tags-input"

export function DeploymentTags() {
  return (
    <div className="grid max-w-md gap-2">
      <TagsInputLabel htmlFor="deployment-tags">Deployment tags</TagsInputLabel>
      <TagsInput
        id="deployment-tags"
        defaultValue={["production", "eu-central"]}
        placeholder="Add a tag"
        maxTags={6}
      />
    </div>
  )
}`;

export function TagsInputPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Capture compact free-form values without opening a separate selection surface."
        note="Press Enter or comma to add a tag. Paste comma-separated values, or press Backspace on an empty input to remove the last tag."
        code={defaultCode}
      >
        <div className="grid w-full max-w-md gap-2">
          <TagsInputLabel htmlFor="deployment-tags-preview">Deployment tags</TagsInputLabel>
          <TagsInput
            id="deployment-tags-preview"
            defaultValue={["production", "eu-central"]}
            placeholder="Add a tag"
            maxTags={6}
          />
        </div>
      </ComponentExample>
    </div>
  );
}
