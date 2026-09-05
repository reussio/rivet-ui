import { Terminal } from "@/registry/rivet/blocks/terminal/terminal";

const packageCommands = [
  {
    value: "bun",
    label: "Bun",
    command: "bun add lucide-react",
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
    <section className="w-full border border-border bg-background" aria-labelledby="terminal-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 024
          </p>
          <h2 id="terminal-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Terminal
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Command
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 p-5 sm:p-8 lg:border-r lg:border-border">
          <Terminal
            label="Install package"
            commands={packageCommands}
            defaultValue="bun"
            className="mx-auto max-w-3xl"
          />
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Input" detail="string" />
            <Specification term="Lines" detail="many" />
            <Specification term="Variants" detail="tabs" />
            <Specification term="Copy" detail="current" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Single command">
          <Terminal label="Repository" command="git status --short" className="max-w-2xl" />
        </PreviewRow>

        <PreviewRow label="Multiline">
          <Terminal
            label="Release pipeline"
            command={"bun install\nbun run check\nbun run build"}
            className="max-w-2xl"
          />
        </PreviewRow>

        <PreviewRow label="Output">
          <Terminal
            label="Build result"
            prompt={false}
            copyable={false}
            command={"✓ Compiled successfully\n✓ Generated 28 static pages\nDone in 2.84s"}
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
