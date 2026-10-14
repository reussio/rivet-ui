import { ComponentExample } from "@/app/component-example";
import { Badge } from "@/registry/rivetui/components/badge/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/rivetui/components/collapsible/collapsible";

const primaryCode = `import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

<Collapsible defaultOpen>
  <CollapsibleTrigger>
    <span className="flex items-center gap-3">
      Advanced routing rules
      <Badge variant="secondary">03</Badge>
    </span>
  </CollapsibleTrigger>
  <CollapsibleContent className="p-0">
    <dl className="divide-y divide-border">
      <Rule label="Primary region" value="fra1" />
      <Rule label="Failover region" value="iad1" />
      <Rule label="Health threshold" value="3 checks" />
    </dl>
  </CollapsibleContent>
</Collapsible>

function Rule({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-2.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono text-xs">{value}</dd>
    </div>
  )
}`;

const compactCode = `import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
export function CompactExample() {
  return (
    <>
      <Collapsible className="max-w-lg">
        <CollapsibleTrigger>3 environment variables</CollapsibleTrigger>
        <CollapsibleContent>
          <code className="font-mono text-xs leading-relaxed text-muted-foreground">
            DATABASE_URL · API_TOKEN · LOG_LEVEL
          </code>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}`;

export function CollapsiblePreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Reveal secondary detail in place while keeping the trigger and content structurally connected."
        note="Use disabled on Collapsible when the disclosure should remain visible but unavailable."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
          <Collapsible defaultOpen>
            <CollapsibleTrigger>
              <span className="flex items-center gap-3">
                Advanced routing rules
                <Badge variant="secondary">03</Badge>
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-0">
              <dl className="divide-y divide-border">
                <Rule label="Primary region" value="fra1" />
                <Rule label="Failover region" value="iad1" />
                <Rule label="Health threshold" value="3 checks" />
              </dl>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Compact content"
        description="The content region accepts concise inline information as well as structured layouts."
        code={compactCode}
      >
        <Collapsible className="max-w-lg">
          <CollapsibleTrigger>3 environment variables</CollapsibleTrigger>
          <CollapsibleContent>
            <code className="font-mono text-xs leading-relaxed text-muted-foreground">
              DATABASE_URL · API_TOKEN · LOG_LEVEL
            </code>
          </CollapsibleContent>
        </Collapsible>
      </PreviewRow>
    </div>
  );
}

function Rule({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-2.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono text-xs">{value}</dd>
    </div>
  );
}

function PreviewRow({
  label,
  children,
  code,
  description,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
}) {
  return (
    <ComponentExample title={label} description={description} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
