"use client";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  LoadingBar,
  LoadingBarProvider,
  useLoadingBar,
} from "@/registry/rivetui/components/loading-bar/loading-bar";

export function LoadingBarPreview() {
  return (
    <div className="relative">
      <LoadingBarProvider
        position="absolute"
        label="Loading preview operation"
        completionDuration={350}
      >
        <section
          className="w-full border border-border bg-background"
          aria-labelledby="loading-bar-title"
        >
          <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
            <div className="space-y-2">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
                Primitive / 027
              </p>
              <h2
                id="loading-bar-title"
                className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
              >
                Loading Bar
              </h2>
            </div>
            <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
              Global
            </span>
          </header>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="p-5 sm:p-8 lg:border-r lg:border-border">
              <div className="relative min-h-40 overflow-hidden border border-border bg-muted/10 p-5">
                <LoadingBar position="absolute" label="Loading deployment route" />
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Application shell
                </p>
                <p className="mt-12 max-w-sm text-sm leading-6 text-muted-foreground">
                  Indeterminate navigation progress remains anchored to the top edge without
                  shifting layout.
                </p>
              </div>
            </div>

            <aside
              className="border-t border-border lg:border-t-0"
              aria-label="Component specification"
            >
              <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
                <Specification term="Anchor" detail="Top" />
                <Specification term="Modes" detail="2" />
                <Specification term="Height" detail="2 PX" />
                <Specification term="Control" detail="Hook" />
              </dl>
            </aside>
          </div>

          <div className="border-t border-border">
            <PreviewRow label="Global hook">
              <LoadingBarControls />
            </PreviewRow>
            <PreviewRow label="Determinate">
              <div className="grid gap-4">
                {[24, 68, 100].map((value) => (
                  <div key={value} className="relative h-8 overflow-hidden border border-border">
                    <LoadingBar
                      position="absolute"
                      value={value}
                      label={`Loading ${value}% complete`}
                    />
                    <span className="flex h-full items-center px-3 font-mono text-[0.625rem] tabular-nums text-muted-foreground">
                      {value}%
                    </span>
                  </div>
                ))}
              </div>
            </PreviewRow>
            <PreviewRow label="Idle">
              <div className="relative h-8 overflow-hidden border border-border">
                <LoadingBar position="absolute" active={false} />
                <span className="flex h-full items-center px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                  No active navigation
                </span>
              </div>
            </PreviewRow>
          </div>
        </section>
      </LoadingBarProvider>
    </div>
  );
}

function LoadingBarControls() {
  const loadingBar = useLoadingBar();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" onClick={() => loadingBar.start("Loading deployment")}>
        Start
      </Button>
      <Button size="sm" variant="outline" onClick={() => loadingBar.setProgress(68)}>
        Set 68%
      </Button>
      <Button size="sm" variant="outline" onClick={loadingBar.complete}>
        Complete
      </Button>
      <Button size="sm" variant="ghost" onClick={loadingBar.reset}>
        Reset
      </Button>
      <span
        className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground"
        aria-live="polite"
      >
        {loadingBar.active
          ? loadingBar.value === undefined
            ? "Running"
            : `${loadingBar.value}%`
          : "Idle"}
      </span>
    </div>
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
