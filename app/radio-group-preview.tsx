import { ComponentExample } from "@/app/component-example";
import {
  RadioGroup,
  RadioOption,
  RadioOptionDescription,
  RadioOptionLabel,
} from "@/registry/rivetui/components/radio-group/radio-group";

const defaultCode = `import {
  RadioGroup,
  RadioOption,
  RadioOptionDescription,
  RadioOptionLabel,
} from "@/components/ui/radio-group"

export function EnvironmentPicker() {
  return (
    <RadioGroup defaultValue="staging" aria-label="Deployment environment">
      <RadioOption value="development">
        <RadioOptionLabel>Development</RadioOptionLabel>
        <RadioOptionDescription>Used for local and internal testing.</RadioOptionDescription>
      </RadioOption>
      <RadioOption value="staging">
        <RadioOptionLabel>Staging</RadioOptionLabel>
        <RadioOptionDescription>Mirrors production for verification.</RadioOptionDescription>
      </RadioOption>
      <RadioOption value="production">
        <RadioOptionLabel>Production</RadioOptionLabel>
        <RadioOptionDescription>Routes the release to live traffic.</RadioOptionDescription>
      </RadioOption>
    </RadioGroup>
  )
}`;

const compactCode = `import { RadioGroup, RadioOption, RadioOptionLabel } from "@/components/ui/radio-group"

export function BackupFrequency() {
  return (
    <RadioGroup defaultValue="weekly" aria-label="Backup frequency" className="w-full sm:grid-cols-3">
      <RadioOption value="daily"><RadioOptionLabel>Daily</RadioOptionLabel></RadioOption>
      <RadioOption value="weekly"><RadioOptionLabel>Weekly</RadioOptionLabel></RadioOption>
      <RadioOption value="monthly"><RadioOptionLabel>Monthly</RadioOptionLabel></RadioOption>
    </RadioGroup>
  )
}`;

const disabledCode = `import {
  RadioGroup,
  RadioOption,
  RadioOptionDescription,
  RadioOptionLabel,
} from "@/components/ui/radio-group"

export function UpdateStrategy() {
  return (
    <RadioGroup defaultValue="automatic" aria-label="Update strategy">
      <RadioOption value="automatic">
        <RadioOptionLabel>Automatic</RadioOptionLabel>
      </RadioOption>
      <RadioOption value="manual">
        <RadioOptionLabel>Manual</RadioOptionLabel>
      </RadioOption>
      <RadioOption value="legacy" disabled>
        <RadioOptionLabel>Legacy scheduler</RadioOptionLabel>
        <RadioOptionDescription>Unavailable for new projects.</RadioOptionDescription>
      </RadioOption>
    </RadioGroup>
  )
}`;

export function RadioGroupPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="With descriptions"
        description="Explain consequences inside each option when labels alone are not sufficient."
        code={defaultCode}
        previewClassName="items-start"
      >
        <RadioGroup defaultValue="staging" aria-label="Deployment environment">
          <RadioOption value="development">
            <RadioOptionLabel>Development</RadioOptionLabel>
            <RadioOptionDescription>Used for local and internal testing.</RadioOptionDescription>
          </RadioOption>
          <RadioOption value="staging">
            <RadioOptionLabel>Staging</RadioOptionLabel>
            <RadioOptionDescription>Mirrors production for verification.</RadioOptionDescription>
          </RadioOption>
          <RadioOption value="production">
            <RadioOptionLabel>Production</RadioOptionLabel>
            <RadioOptionDescription>Routes the release to live traffic.</RadioOptionDescription>
          </RadioOption>
        </RadioGroup>
      </ComponentExample>

      <ComponentExample
        title="Compact grid"
        description="Short, comparable labels can share a responsive row."
        code={compactCode}
      >
        <RadioGroup
          defaultValue="weekly"
          aria-label="Backup frequency"
          className="w-full sm:grid-cols-3"
        >
          <RadioOption value="daily">
            <RadioOptionLabel>Daily</RadioOptionLabel>
          </RadioOption>
          <RadioOption value="weekly">
            <RadioOptionLabel>Weekly</RadioOptionLabel>
          </RadioOption>
          <RadioOption value="monthly">
            <RadioOptionLabel>Monthly</RadioOptionLabel>
          </RadioOption>
        </RadioGroup>
      </ComponentExample>

      <ComponentExample
        title="Disabled option"
        description="Disable individual choices without hiding why they are unavailable."
        code={disabledCode}
        previewClassName="items-start"
      >
        <RadioGroup defaultValue="automatic" aria-label="Update strategy">
          <RadioOption value="automatic">
            <RadioOptionLabel>Automatic</RadioOptionLabel>
          </RadioOption>
          <RadioOption value="manual">
            <RadioOptionLabel>Manual</RadioOptionLabel>
          </RadioOption>
          <RadioOption value="legacy" disabled>
            <RadioOptionLabel>Legacy scheduler</RadioOptionLabel>
            <RadioOptionDescription>Unavailable for new projects.</RadioOptionDescription>
          </RadioOption>
        </RadioGroup>
      </ComponentExample>
    </div>
  );
}
