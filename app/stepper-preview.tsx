import { ComponentExample } from "@/app/component-example";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/registry/rivetui/components/stepper/stepper";

const deploymentSteps = [
  { step: 1, title: "Project", description: "Choose the source." },
  { step: 2, title: "Configure", description: "Set build options." },
  { step: 3, title: "Review", description: "Verify the release." },
  { step: 4, title: "Deploy", description: "Publish revision." },
] as const;

const defaultExampleCode = `import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

const steps = [
  { step: 1, title: "Project", description: "Choose the source." },
  { step: 2, title: "Configure", description: "Set build options." },
  { step: 3, title: "Review", description: "Verify the release." },
  { step: 4, title: "Deploy", description: "Publish revision." },
]

export function DeploymentStepper() {
  return (
    <Stepper defaultValue={2} aria-label="Deployment setup">
      {steps.map((item) => (
        <StepperItem key={item.step} step={item.step}>
          <StepperTrigger>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>{item.title}</StepperTitle>
              <StepperDescription>{item.description}</StepperDescription>
            </StepperContent>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
      ))}
    </Stepper>
  )
}`;

const verticalExampleCode = `import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

const steps = [
  { step: 1, title: "Workspace", description: "Repository connected." },
  { step: 2, title: "Runtime", description: "Build settings saved." },
  { step: 3, title: "Access", description: "Configure team permissions." },
  { step: 4, title: "Finish", description: "Create the workspace." },
]

export function WorkspaceStepper() {
  return (
    <Stepper
      defaultValue={3}
      orientation="vertical"
      aria-label="Workspace configuration"
      className="max-w-md"
    >
      {steps.map((item) => (
        <StepperItem key={item.step} step={item.step}>
          <StepperTrigger>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>{item.title}</StepperTitle>
              <StepperDescription>{item.description}</StepperDescription>
            </StepperContent>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
      ))}
    </Stepper>
  )
}`;

const disabledExampleCode = `import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

const steps = [
  { step: 1, title: "Build", description: "Artifacts ready." },
  { step: 2, title: "Review", description: "Approval required." },
  {
    step: 3,
    title: "Release",
    description: "Locked until approval.",
    disabled: true,
  },
]

export function ReleaseStepper() {
  return (
    <Stepper defaultValue={2} aria-label="Release sequence" className="max-w-2xl">
      {steps.map((item) => (
        <StepperItem key={item.step} step={item.step} disabled={item.disabled}>
          <StepperTrigger>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>{item.title}</StepperTitle>
              <StepperDescription>{item.description}</StepperDescription>
            </StepperContent>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
      ))}
    </Stepper>
  )
}`;

export function StepperPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Communicate the current position while keeping completed steps available."
        code={defaultExampleCode}
      >
        <Stepper defaultValue={2} aria-label="Deployment setup">
          {deploymentSteps.map((item) => (
            <DemoStep key={item.step} {...item} />
          ))}
        </Stepper>
      </ComponentExample>

      <ComponentExample
        title="Vertical"
        description="Use a vertical sequence when labels need more room or the available width is constrained."
        code={verticalExampleCode}
        previewClassName="items-start justify-start"
      >
        <Stepper
          defaultValue={3}
          orientation="vertical"
          aria-label="Workspace configuration"
          className="max-w-md"
        >
          <DemoStep step={1} title="Workspace" description="Repository connected." />
          <DemoStep step={2} title="Runtime" description="Build settings saved." />
          <DemoStep step={3} title="Access" description="Configure team permissions." />
          <DemoStep step={4} title="Finish" description="Create the workspace." />
        </Stepper>
      </ComponentExample>

      <ComponentExample
        title="Disabled step"
        description="Keep unavailable steps visible while preventing interaction until their prerequisite is complete."
        code={disabledExampleCode}
      >
        <Stepper defaultValue={2} aria-label="Release sequence" className="max-w-2xl">
          <DemoStep step={1} title="Build" description="Artifacts ready." />
          <DemoStep step={2} title="Review" description="Approval required." />
          <DemoStep step={3} title="Release" description="Locked until approval." disabled />
        </Stepper>
      </ComponentExample>
    </div>
  );
}

function DemoStep({
  step,
  title,
  description,
  disabled = false,
}: {
  step: number;
  title: string;
  description: string;
  disabled?: boolean;
}) {
  return (
    <StepperItem step={step} disabled={disabled}>
      <StepperTrigger>
        <StepperIndicator />
        <StepperContent>
          <StepperTitle>{title}</StepperTitle>
          <StepperDescription>{description}</StepperDescription>
        </StepperContent>
      </StepperTrigger>
      <StepperSeparator />
    </StepperItem>
  );
}
