"use client";

import { ComponentExample } from "@/app/component-example";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/registry/rivetui/components/slider/slider";

const defaultCode = `import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/components/ui/slider"

export function AllocationSlider() {
  return (
    <Slider defaultValue={64} name="previewAllocation" className="max-w-lg">
      <SliderLabel>CPU allocation</SliderLabel>
      <SliderValue>{([value]) => \`\${value}%\`}</SliderValue>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb />
        </SliderTrack>
      </SliderControl>
    </Slider>
  )
}`;

const rangeCode = `import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/components/ui/slider"

export function DeploymentWindow() {
  return (
    <Slider defaultValue={[24, 72]} className="max-w-lg">
      <SliderLabel>Deployment window</SliderLabel>
      <SliderValue>{(values) => values.join(" – ")}</SliderValue>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb index={0} aria-label="Window start" />
          <SliderThumb index={1} aria-label="Window end" />
        </SliderTrack>
      </SliderControl>
    </Slider>
  )
}`;

const disabledCode = `import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/components/ui/slider"

export function DisabledSlider() {
  return (
    <Slider defaultValue={38} disabled className="max-w-lg">
      <SliderLabel>Memory limit</SliderLabel>
      <SliderValue>{([value]) => \`\${value}%\`}</SliderValue>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb />
        </SliderTrack>
      </SliderControl>
    </Slider>
  )
}`;

export function SliderPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Single value"
        description="Combine a visible label and value with the native keyboard-accessible control."
        code={defaultCode}
      >
        <Slider defaultValue={64} name="previewAllocation" className="max-w-lg">
          <SliderLabel>CPU allocation</SliderLabel>
          <SliderValue>{([value]) => `${value}%`}</SliderValue>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </ComponentExample>

      <ComponentExample
        title="Range"
        description="Two thumbs define a bounded interval while sharing one track and value readout."
        code={rangeCode}
      >
        <Slider defaultValue={[24, 72]} className="max-w-lg">
          <SliderLabel>Deployment window</SliderLabel>
          <SliderValue>{(values) => values.join(" – ")}</SliderValue>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb index={0} aria-label="Window start" />
              <SliderThumb index={1} aria-label="Window end" />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </ComponentExample>

      <ComponentExample
        title="Disabled"
        description="The selected value remains legible while pointer and keyboard interaction are unavailable."
        code={disabledCode}
      >
        <Slider defaultValue={38} disabled className="max-w-lg">
          <SliderLabel>Memory limit</SliderLabel>
          <SliderValue>{([value]) => `${value}%`}</SliderValue>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </ComponentExample>
    </div>
  );
}
