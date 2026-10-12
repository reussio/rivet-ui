"use client";

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/registry/rivetui/components/progress/progress";

export function ProgressPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="progress-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 023
          </p>
          <h2 id="progress-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Progress
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Task state
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="border border-border p-5">
            <Progress value={72}>
              <ProgressLabel>Uploading deployment artifacts</ProgressLabel>
              <ProgressValue />
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <div className="mt-4 flex justify-between gap-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
              <span>36.8 MB / 51.2 MB</span>
              <span>12 sec remaining</span>
            </div>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Role" detail="progressbar" />
            <Specification term="Range" detail="custom" />
            <Specification term="Value" detail="formatted" />
            <Specification term="State" detail="3 modes" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="States">
          <div className="grid w-full gap-6 sm:grid-cols-3">
            <Progress value={38}>
              <ProgressLabel>Building</ProgressLabel>
              <ProgressValue />
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <Progress value={100}>
              <ProgressLabel>Complete</ProgressLabel>
              <ProgressValue />
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <Progress value={null} aria-valuetext="Waiting for build worker">
              <ProgressLabel>Waiting</ProgressLabel>
              <ProgressValue>{() => "Queued"}</ProgressValue>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>
        </PreviewRow>
        <PreviewRow label="Custom range">
          <Progress
            value={7}
            min={0}
            max={10}
            className="max-w-xl"
            getAriaValueText={(_, value) => `${value ?? 0} of 10 build steps complete`}
          >
            <ProgressLabel>Release pipeline</ProgressLabel>
            <ProgressValue>{(_, value) => `${value ?? 0} / 10`}</ProgressValue>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
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
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
