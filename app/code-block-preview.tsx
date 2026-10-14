import { ComponentExample } from "@/app/component-example";
import { CodeBlock } from "@/registry/rivetui/components/code-block/code-block";

const primaryCode = `import { CodeBlock } from "@/components/ui/code-block"

const exampleCode = \`import { Button } from "@/components/ui/button"

export function DeployButton() {
  return <Button>Deploy revision</Button>
}\`;

<CodeBlock
  filename="deploy-button.tsx"
  language="tsx"
  code={exampleCode}
  showLineNumbers
  highlightLinesOnHover
  softWrap
/>`;

const softWrapCode = `import { CodeBlock } from "@/components/ui/code-block";
export function WrappedCommand() {
  return (
    <CodeBlock
      filename="install.sh"
      language="shell"
      code="bunx --bun shadcn@latest add @rivetui/code-block @rivetui/terminal @rivetui/button"
      softWrap
      className="max-w-sm"
    />
  );
}`;

const contentOnlyCode = `import { CodeBlock } from "@/components/ui/code-block";
export function ContentOnlyExample() {
  return (
    <>
      <CodeBlock code={'const region = "eu-central-1"'} copyable={false} className="max-w-2xl" />
    </>
  );
}`;

const exampleCode = `import { Button } from "@/components/ui/button"

export function DeployButton() {
  return <Button>Deploy revision</Button>
}`;

export function CodeBlockPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="min-w-0 p-5 sm:p-8">
          <CodeBlock
            filename="deploy-button.tsx"
            language="tsx"
            code={exampleCode}
            showLineNumbers
            highlightLinesOnHover
            softWrap
          />
        </div>
      </ComponentExample>

      <PreviewRow label="Soft wrap" code={softWrapCode}>
        <CodeBlock
          filename="install.sh"
          language="shell"
          code="bunx --bun shadcn@latest add @rivetui/code-block @rivetui/terminal @rivetui/button"
          softWrap
          className="max-w-sm"
        />
      </PreviewRow>
      <PreviewRow label="Content only" code={contentOnlyCode}>
        <CodeBlock code={'const region = "eu-central-1"'} copyable={false} className="max-w-2xl" />
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
