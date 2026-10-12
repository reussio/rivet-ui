import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/rivet/components/accordion/accordion";

const deploymentQuestions = [
  {
    value: "rollbacks",
    question: "How are failed deployments rolled back?",
    answer:
      "The last healthy immutable release remains available. Promote it to production to restore traffic without rebuilding artifacts.",
  },
  {
    value: "regions",
    question: "Can one service run in multiple regions?",
    answer:
      "Yes. Add regions to the deployment policy and define how traffic is distributed between healthy instances.",
  },
  {
    value: "variables",
    question: "When do environment variables take effect?",
    answer:
      "Variable changes create a new deployment revision. Existing revisions keep their original encrypted configuration.",
  },
] as const;

export function AccordionPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="accordion-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 019
          </p>
          <h2
            id="accordion-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Accordion
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Disclosure set
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <Accordion defaultValue={["rollbacks"]}>
            {deploymentQuestions.map((item, index) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>
                  <span className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                    <span className="font-mono text-[0.625rem] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-14">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Header" detail="h3 + button" />
            <Specification term="Keys" detail="tab / enter" />
            <Specification term="Mode" detail="single / multi" />
            <Specification term="Search" detail="until-found" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Multiple">
          <Accordion multiple defaultValue={["build", "deploy"]} className="max-w-2xl">
            <AccordionItem value="build">
              <AccordionTrigger>Build pipeline</AccordionTrigger>
              <AccordionContent>
                Install, validate, and compile the immutable release artifact.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="deploy">
              <AccordionTrigger>Deployment pipeline</AccordionTrigger>
              <AccordionContent>
                Upload the artifact, run health checks, and move production traffic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="legacy" disabled>
              <AccordionTrigger>Legacy pipeline</AccordionTrigger>
              <AccordionContent>This workflow is unavailable for new projects.</AccordionContent>
            </AccordionItem>
          </Accordion>
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
    <div className="grid md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
