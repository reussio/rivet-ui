import { ComponentExample } from "@/app/component-example";
import { Badge } from "@/registry/rivetui/components/badge/badge";

const primaryCode = `import { Badge } from "@/components/ui/badge"

<div className="border border-border">
  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-4">
    <div>
      <p className="text-sm font-medium">Release candidate</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Deployment metadata for the current revision.
      </p>
    </div>
    <Badge>Stable</Badge>
  </div>
  <dl className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
    <div className="flex items-center justify-between gap-4 p-4 sm:grid sm:gap-3">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">Version</dt>
      <dd><Badge variant="outline">v2.4.0</Badge></dd>
    </div>
    <div className="flex items-center justify-between gap-4 p-4 sm:grid sm:gap-3">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">Region</dt>
      <dd><Badge variant="secondary">fra1</Badge></dd>
    </div>
    <div className="flex items-center justify-between gap-4 p-4 sm:grid sm:gap-3">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">Commit</dt>
      <dd><Badge variant="outline">8f31c2a</Badge></dd>
    </div>
  </dl>
</div>`;

const variantsCode = `import { Badge } from "@/components/ui/badge";
export function VariantsExample() {
  return (
    <>
      <Badge>Stable</Badge>
      <Badge variant="secondary">Preview</Badge>
      <Badge variant="outline">v2.4.0</Badge>
      <Badge variant="destructive">Blocked</Badge>
    </>
  );
}`;

export function BadgePreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Attach compact categorical or technical metadata to the content it describes."
        note="Keep badge labels short. Use Status instead when the value represents a changing operational state."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
          <div className="border border-border">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-4">
              <div>
                <p className="text-sm font-medium">Release candidate</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Deployment metadata for the current revision.
                </p>
              </div>
              <Badge>Stable</Badge>
            </div>
            <dl className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <Metadata term="Version">
                <Badge variant="outline">v2.4.0</Badge>
              </Metadata>
              <Metadata term="Region">
                <Badge variant="secondary">fra1</Badge>
              </Metadata>
              <Metadata term="Commit">
                <Badge variant="outline">8f31c2a</Badge>
              </Metadata>
            </dl>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Variants"
        description="Choose visual emphasis by meaning rather than using every variant in the same interface."
        code={variantsCode}
      >
        <Badge>Stable</Badge>
        <Badge variant="secondary">Preview</Badge>
        <Badge variant="outline">v2.4.0</Badge>
        <Badge variant="destructive">Blocked</Badge>
      </PreviewRow>
    </div>
  );
}

function Metadata({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 sm:grid sm:gap-3">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {term}
      </dt>
      <dd>{children}</dd>
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
      <div className="flex min-w-0 flex-wrap items-center gap-4 p-4">{children}</div>
    </ComponentExample>
  );
}
