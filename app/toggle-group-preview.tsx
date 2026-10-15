import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";

import { ComponentExample } from "@/app/component-example";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/rivetui/components/toggle-group/toggle-group";

const alignmentCode = `import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function TextAlignment() {
  return (
    <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`;

const formattingCode = `import { Bold, Italic, Underline } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function TextFormatting() {
  return (
    <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
    </ToggleGroup>
  )
}`;

const verticalCode = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ViewDensity() {
  return (
    <ToggleGroup
      orientation="vertical"
      defaultValue={["comfortable"]}
      aria-label="View density"
    >
      <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
      <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
      <ToggleGroupItem value="spacious" disabled>Spacious</ToggleGroupItem>
    </ToggleGroup>
  )
}`;

export function ToggleGroupPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Single selection"
        description="Use one pressed item for mutually exclusive view or formatting modes."
        code={alignmentCode}
      >
        <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </ComponentExample>

      <ComponentExample
        title="Multiple selection"
        description="Enable multiple independent options when more than one state may be active."
        code={formattingCode}
      >
        <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text formatting">
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </ComponentExample>

      <ComponentExample
        title="Vertical"
        description="Match orientation to the visual arrangement so arrow-key navigation remains predictable."
        code={verticalCode}
      >
        <ToggleGroup
          orientation="vertical"
          defaultValue={["comfortable"]}
          aria-label="View density"
        >
          <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
          <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
          <ToggleGroupItem value="spacious" disabled>
            Spacious
          </ToggleGroupItem>
        </ToggleGroup>
      </ComponentExample>
    </div>
  );
}
