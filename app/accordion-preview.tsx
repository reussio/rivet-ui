import { ComponentExample } from "@/app/component-example";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/rivetui/components/accordion/accordion";

const primaryCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const deploymentQuestions = [
  {
    value: "rollbacks",
    question: "How are failed deployments rolled back?",
    answer: "The last healthy immutable release remains available. Promote it to production to restore traffic without rebuilding artifacts.",
  },
  {
    value: "regions",
    question: "Can one service run in multiple regions?",
    answer: "Yes. Add regions to the deployment policy and define how traffic is distributed between healthy instances.",
  },
  {
    value: "variables",
    question: "When do environment variables take effect?",
    answer: "Variable changes create a new deployment revision. Existing revisions keep their original encrypted configuration.",
  },
]

export function DeploymentQuestions() {
  return (
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
  )
}`;

const multipleCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export function MultipleExample() {
  return (
    <>
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
    </>
  );
}`;

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
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow label="Multiple" code={multipleCode}>
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
  );
}

function PreviewRow({
  label,
  children,
  code,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
