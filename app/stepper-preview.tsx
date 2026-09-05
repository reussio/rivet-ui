import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/registry/rivet/blocks/stepper/stepper";

const deploymentSteps = [
  { step: 1, title: "Project", description: "Choose the source." },
  { step: 2, title: "Configure", description: "Set build options." },
  { step: 3, title: "Review", description: "Verify the release." },
  { step: 4, title: "Deploy", description: "Publish revision." },
] as const;

export function StepperPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="stepper-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 025
          </p>
          <h2 id="stepper-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Stepper
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Sequence
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 p-5 sm:p-8 lg:border-r lg:border-border">
          <Stepper defaultValue={2} aria-label="Deployment setup">
            {deploymentSteps.map((item) => (
              <DemoStep key={item.step} {...item} />
            ))}
          </Stepper>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="States" detail="3" />
            <Specification term="Layouts" detail="2" />
            <Specification term="Input" detail="native" />
            <Specification term="Mode" detail="controlled" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Vertical">
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
        </PreviewRow>

        <PreviewRow label="Disabled step">
          <Stepper defaultValue={2} aria-label="Release sequence" className="max-w-2xl">
            <DemoStep step={1} title="Build" description="Artifacts ready." />
            <DemoStep step={2} title="Review" description="Approval required." />
            <DemoStep step={3} title="Release" description="Locked until approval." disabled />
          </Stepper>
        </PreviewRow>
      </div>
    </section>
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

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd>{detail}</dd>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
