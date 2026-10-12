"use client";

import * as React from "react";

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/registry/rivetui/components/slider/slider";

export function SliderPreview() {
  const [allocation, setAllocation] = React.useState(64);

  return (
    <section className="w-full border border-border bg-background" aria-labelledby="slider-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 040
          </p>
          <h2 id="slider-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Slider
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Input
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-64 items-center justify-center p-5 sm:p-8 lg:border-r lg:border-border">
          <Slider
            name="cpuAllocation"
            value={allocation}
            onValueChange={setAllocation}
            className="max-w-lg"
          >
            <SliderLabel>CPU allocation</SliderLabel>
            <SliderValue>{([value]) => `${value}%`}</SliderValue>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Value" detail={`${allocation}%`} />
            <Specification term="Step" detail="1" />
            <Specification term="Keys" detail="arrows / pgup" />
            <Specification term="Commit" detail="pointer / key" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Range">
          <Slider defaultValue={[24, 72]} className="max-w-lg">
            <SliderLabel>Deployment window</SliderLabel>
            <SliderValue>{(formatted) => formatted.join(" – ")}</SliderValue>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb index={0} aria-label="Start of deployment window" />
                <SliderThumb index={1} aria-label="End of deployment window" />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </PreviewRow>

        <PreviewRow label="Stepped">
          <Slider defaultValue={3} min={0} max={5} step={1} className="max-w-lg">
            <SliderLabel>Replica count</SliderLabel>
            <SliderValue />
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </PreviewRow>

        <PreviewRow label="Disabled">
          <Slider defaultValue={38} disabled className="max-w-lg">
            <SliderLabel>Memory limit</SliderLabel>
            <SliderValue>{([value]) => `${value}%`}</SliderValue>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb />
              </SliderTrack>
            </SliderControl>
          </Slider>
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
