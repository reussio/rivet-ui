import { CodeBlock } from "@/registry/rivetui/components/code-block/code-block";

const exampleCode = `import { Button } from "@/components/ui/button"

export function DeployButton() {
  return <Button>Deploy revision</Button>
}`;

export function CodeBlockPreview() {
  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="code-block-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 028
          </p>
          <h2
            id="code-block-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Code Block
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Source
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 p-5 sm:p-8 lg:border-r lg:border-border">
          <CodeBlock
            filename="deploy-button.tsx"
            language="tsx"
            code={exampleCode}
            showLineNumbers
            highlightLinesOnHover
          />
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Code" detail="Plain" />
            <Specification term="Metadata" detail="2" />
            <Specification term="Copy" detail="Native" />
            <Specification term="Lines" detail="Optional" />
            <Specification term="Hover" detail="Opt-in" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Compact">
          <CodeBlock
            filename="install.sh"
            language="shell"
            code="bunx --bun shadcn@latest add @rivetui/button"
            highlightLinesOnHover
            className="max-w-2xl"
          />
        </PreviewRow>
        <PreviewRow label="Content only">
          <CodeBlock
            code={'const region = "eu-central-1"'}
            copyable={false}
            className="max-w-2xl"
          />
        </PreviewRow>
      </div>
    </section>
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
