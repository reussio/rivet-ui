export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-16">
      <div className="flex w-full max-w-2xl flex-col gap-6 rounded-2xl border bg-background p-8 shadow-sm sm:p-12">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Rivet UI
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready for your first component.
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Add your source files under registry/rivet, register them in registry.json, and build
            the @rivet catalog with Bun.
          </p>
        </div>
        <code className="overflow-x-auto rounded-lg border bg-background px-4 py-3 font-mono text-xs text-muted-foreground">
          bun run registry:check
        </code>
      </div>
    </main>
  );
}
