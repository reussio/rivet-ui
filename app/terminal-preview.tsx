import { ComponentExample } from "@/app/component-example";
import { Terminal } from "@/registry/rivetui/components/terminal/terminal";

const primaryCode = `import { Terminal } from "@/components/ui/terminal"

<Terminal
  label="Install package"
  defaultValue="bun"
  commands={[
    { value: "bun", label: "Bun", command: "bun add lucide-react --exact" },
    { value: "npm", label: "npm", command: "npm install lucide-react" },
    { value: "pnpm", label: "pnpm", command: "pnpm add lucide-react" },
  ]}
  className="mx-auto max-w-3xl"
/>`;

const commandFormsCode = `import { Terminal } from "@/components/ui/terminal"

<div className="grid gap-4">
  <Terminal label="Repository" command="git status --short" />
  <Terminal
    label="Release pipeline"
    command={"bun install\\nbun run check\\nbun run build"}
  />
</div>`;

const outputCode = `import { Terminal } from "@/components/ui/terminal";
export function OutputExample() {
  return (
    <>
      <Terminal
        label="Build result"
        prompt={false}
        copyable={false}
        language="text"
        command={"✓ Compiled successfully\\n✓ Generated 28 static pages\\nDone in 2.84s"}
        className="max-w-2xl"
      />
    </>
  );
}`;

const packageCommands = [
  {
    value: "bun",
    label: "Bun",
    command: "bun add lucide-react --exact",
  },
  {
    value: "npm",
    label: "npm",
    command: "npm install lucide-react",
  },
  {
    value: "pnpm",
    label: "pnpm",
    command: "pnpm add lucide-react",
  },
] as const;

export function TerminalPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Offer equivalent commands as typed variants when a workflow supports multiple package managers."
        note="The selected command variant is shared with other Terminal instances that use the same values."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="min-w-0 p-5 sm:p-8">
          <Terminal
            label="Install package"
            commands={packageCommands}
            defaultValue="bun"
            className="mx-auto max-w-3xl"
          />
        </div>
      </ComponentExample>

      <PreviewRow
        label="Command forms"
        description="Use one command for a direct action or preserve line breaks for a short sequence."
        code={commandFormsCode}
      >
        <div className="grid w-full gap-4">
          <Terminal label="Repository" command="git status --short" />
          <Terminal
            label="Release pipeline"
            command={"bun install\nbun run check\nbun run build"}
          />
        </div>
      </PreviewRow>
      <PreviewRow
        label="Output"
        description="Disable the prompt and copy action when the surface represents output rather than input."
        code={outputCode}
      >
        <Terminal
          label="Build result"
          prompt={false}
          copyable={false}
          language="text"
          command={"✓ Compiled successfully\n✓ Generated 28 static pages\nDone in 2.84s"}
          className="max-w-2xl"
        />
      </PreviewRow>
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
