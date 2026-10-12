"use client";

import * as React from "react";

import { ColorPicker } from "@/registry/rivet/components/color-picker/color-picker";

const brandPresets = ["#0F172A", "#2563EB", "#0891B2", "#16A34A", "#CA8A04", "#DC2626"];

export function ColorPickerPreview() {
  const [color, setColor] = React.useState("#2563EB");
  const rgba = hexToRgba(color);

  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="color-picker-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 041
          </p>
          <h2
            id="color-picker-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Color picker
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          7 color models
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex min-h-72 items-center justify-center p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="grid w-full max-w-lg border border-border sm:grid-cols-[8rem_minmax(0,1fr)]">
            <div
              className="min-h-28 border-b border-border sm:border-r sm:border-b-0"
              style={{ backgroundColor: toRgba(rgba) }}
              aria-hidden="true"
            />
            <div className="p-4">
              <label
                htmlFor="brand-color"
                className="mb-2 block font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]"
              >
                Brand color
              </label>
              <ColorPicker
                id="brand-color"
                name="brandColor"
                value={color}
                onValueChange={setColor}
                inputs={["rgb", "hex", "rgba", "ryb", "cmyk", "hsl", "hsv"]}
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Every input edits the same normalized color value.
              </p>
            </div>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Hex" detail={color} />
            <Specification term="Red" detail={String(rgba.r)} />
            <Specification term="Green" detail={String(rgba.g)} />
            <Specification term="Blue" detail={String(rgba.b)} />
            <Specification term="Alpha" detail={String(rgba.a)} />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Default">
          <ColorPicker className="max-w-sm" />
        </PreviewRow>
        <PreviewRow label="RGB display">
          <ColorPicker
            className="max-w-sm"
            defaultValue="#0891B2"
            displayFormat="rgb"
            inputs="cmyk"
          />
        </PreviewRow>
        <PreviewRow label="Alpha">
          <ColorPicker
            className="max-w-sm"
            defaultValue="rgba(37, 99, 235, 0.45)"
            displayFormat="rgba"
            inputs="rgba"
          />
        </PreviewRow>
        <PreviewRow label="Presets only">
          <ColorPicker className="max-w-sm" defaultValue="#2563EB" presets={brandPresets} />
        </PreviewRow>
        <PreviewRow label="RYB">
          <ColorPicker className="max-w-sm" defaultValue="#EA580C" inputs="ryb" />
        </PreviewRow>
        <PreviewRow label="HSL / HSV">
          <ColorPicker className="max-w-sm" defaultValue="#16A34A" inputs={["hsl", "hsv"]} />
        </PreviewRow>
        <PreviewRow label="Disabled">
          <ColorPicker className="max-w-sm" defaultValue="#2563EB" inputs="rgb" disabled />
        </PreviewRow>
      </div>
    </section>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right tabular-nums">{detail}</dd>
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

function hexToRgba(value: string) {
  const alpha = value.length === 9 ? Number.parseInt(value.slice(7, 9), 16) / 255 : 1;

  return {
    r: Number.parseInt(value.slice(1, 3), 16),
    g: Number.parseInt(value.slice(3, 5), 16),
    b: Number.parseInt(value.slice(5, 7), 16),
    a: Number(alpha.toFixed(2)),
  };
}

function toRgba(color: { r: number; g: number; b: number; a: number }) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}
