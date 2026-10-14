"use client";

import * as React from "react";
import { ComponentExample } from "@/app/component-example";
import { ColorPicker } from "@/registry/rivetui/components/color-picker/color-picker";

const primaryCode = `"use client"

import * as React from "react"
import { ColorPicker } from "@/components/ui/color-picker"

export function BrandColorPicker() {
  const [color, setColor] = React.useState("#2563EB")
  const rgba = hexToRgba(color)

  return (
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
          inputs={["rgb", "hex", "rgba"]}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Every input edits the same normalized color value.
        </p>
      </div>
    </div>
  )
}

function hexToRgba(value: string) {
  const alpha = value.length === 9 ? Number.parseInt(value.slice(7, 9), 16) / 255 : 1
  return {
    r: Number.parseInt(value.slice(1, 3), 16),
    g: Number.parseInt(value.slice(3, 5), 16),
    b: Number.parseInt(value.slice(5, 7), 16),
    a: Number(alpha.toFixed(2)),
  }
}

function toRgba(color: { r: number; g: number; b: number; a: number }) {
  return \`rgba(\${color.r}, \${color.g}, \${color.b}, \${color.a})\`
}`;

const alphaCode = `import { ColorPicker } from "@/components/ui/color-picker"

<ColorPicker
  defaultValue="rgba(37, 99, 235, 0.45)"
  displayFormat="rgba"
  inputs="rgba"
/>`;

const presetsOnlyCode = `import { ColorPicker } from "@/components/ui/color-picker"

const brandPresets = ["#0F172A", "#2563EB", "#0891B2", "#16A34A", "#CA8A04", "#DC2626"];

<ColorPicker defaultValue="#2563EB" presets={brandPresets} />`;

const brandPresets = ["#0F172A", "#2563EB", "#0891B2", "#16A34A", "#CA8A04", "#DC2626"];

export function ColorPickerPreview() {
  const [color, setColor] = React.useState("#2563EB");
  const rgba = hexToRgba(color);

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Controlled"
        description="Keep the selected color in application state while exposing only the required input modes."
        note="Pass one mode or an array to inputs. Supported modes are hex, rgb, rgba, ryb, cmyk, hsl, and hsv. displayFormat only changes the closed trigger value."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="flex min-h-72 items-center justify-center p-5 sm:p-8">
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
                inputs={["rgb", "hex", "rgba"]}
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Every input edits the same normalized color value.
              </p>
            </div>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Transparency"
        description="Use an alpha-capable format when opacity is part of the value."
        code={alphaCode}
        note="Switching to a format without alpha intentionally returns the color to full opacity."
      >
        <ColorPicker
          className="max-w-sm"
          defaultValue="rgba(37, 99, 235, 0.45)"
          displayFormat="rgba"
          inputs="rgba"
        />
      </PreviewRow>
      <PreviewRow
        label="Presets only"
        description="Omit input modes when users should choose from a controlled palette."
        code={presetsOnlyCode}
        note="The presets array is optional. When disabled, editing is locked but the displayed value can still be copied."
      >
        <ColorPicker className="max-w-sm" defaultValue="#2563EB" presets={brandPresets} />
      </PreviewRow>
    </div>
  );
}

function PreviewRow({
  label,
  children,
  code,
  description,
  note,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
  note?: string;
}) {
  return (
    <ComponentExample title={label} description={description} note={note} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
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
