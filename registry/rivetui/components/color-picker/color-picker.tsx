"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Check, Copy, TriangleAlert } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const DEFAULT_COLOR = "#18181B";
const DEFAULT_DISPLAY_FORMAT: ColorPickerInput = "hex";
const FALLBACK_COLOR: Color = { r: 24, g: 24, b: 27, a: 1 };
const COLOR_DRAG_UPDATE_INTERVAL = 12;
const COPY_FEEDBACK_DURATION = 1800;
const COPY_FEEDBACK_FADE_DURATION = 100;
const TRANSPARENCY_GRID_STYLE: React.CSSProperties = {
  backgroundColor: "var(--background)",
  backgroundImage:
    "linear-gradient(45deg, var(--border) 25%, transparent 25%), linear-gradient(-45deg, var(--border) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--border) 75%), linear-gradient(-45deg, transparent 75%, var(--border) 75%)",
  backgroundPosition: "0 0, 0 3px, 3px -3px, -3px 0",
  backgroundSize: "6px 6px",
};

type ColorPickerInput = "hex" | "rgb" | "rgba" | "ryb" | "cmyk" | "hsl" | "hsv";
type NumericColorPickerInput = Exclude<ColorPickerInput, "hex">;
type ChannelName = "r" | "g" | "b" | "a" | "y" | "c" | "m" | "k" | "h" | "s" | "l" | "v";
type ChannelDrafts = Partial<Record<ChannelName, string>>;
type ChannelValues = Partial<Record<ChannelName, number>>;
type ChannelDraftState = {
  input: ColorPickerInput | undefined;
  values: ChannelDrafts;
};
type CopyStatus = "idle" | "success" | "error";

type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type ChannelDefinition = {
  name: ChannelName;
  minimum: number;
  maximum: number;
  step: number;
};

type InputDefinition = {
  channels: readonly ChannelDefinition[];
  hint: string;
  label: string;
};

const RGB_CHANNELS = [
  { name: "r", minimum: 0, maximum: 255, step: 1 },
  { name: "g", minimum: 0, maximum: 255, step: 1 },
  { name: "b", minimum: 0, maximum: 255, step: 1 },
] as const satisfies readonly ChannelDefinition[];

const INPUT_DEFINITIONS: Record<NumericColorPickerInput, InputDefinition> = {
  rgb: {
    label: "RGB channels",
    hint: "Red, green, and blue use 0–255.",
    channels: RGB_CHANNELS,
  },
  rgba: {
    label: "RGBA channels",
    hint: "RGB uses 0–255; alpha uses 0–1.",
    channels: [...RGB_CHANNELS, { name: "a", minimum: 0, maximum: 1, step: 0.01 }],
  },
  ryb: {
    label: "RYB channels",
    hint: "Approximate paint-model channels use 0–255.",
    channels: [
      { name: "r", minimum: 0, maximum: 255, step: 1 },
      { name: "y", minimum: 0, maximum: 255, step: 1 },
      { name: "b", minimum: 0, maximum: 255, step: 1 },
    ],
  },
  cmyk: {
    label: "CMYK channels",
    hint: "Cyan, magenta, yellow, and key use 0–100.",
    channels: [
      { name: "c", minimum: 0, maximum: 100, step: 1 },
      { name: "m", minimum: 0, maximum: 100, step: 1 },
      { name: "y", minimum: 0, maximum: 100, step: 1 },
      { name: "k", minimum: 0, maximum: 100, step: 1 },
    ],
  },
  hsl: {
    label: "HSL channels",
    hint: "Hue uses 0–360; saturation and lightness use 0–100.",
    channels: [
      { name: "h", minimum: 0, maximum: 360, step: 1 },
      { name: "s", minimum: 0, maximum: 100, step: 1 },
      { name: "l", minimum: 0, maximum: 100, step: 1 },
    ],
  },
  hsv: {
    label: "HSV channels",
    hint: "Hue uses 0–360; saturation and value use 0–100.",
    channels: [
      { name: "h", minimum: 0, maximum: 360, step: 1 },
      { name: "s", minimum: 0, maximum: 100, step: 1 },
      { name: "v", minimum: 0, maximum: 100, step: 1 },
    ],
  },
};

type ColorPickerProps = Omit<
  React.ComponentProps<"button">,
  "defaultValue" | "name" | "onChange" | "value"
> & {
  defaultOpen?: boolean;
  defaultValue?: string;
  displayFormat?: ColorPickerInput;
  inputs?: ColorPickerInput | readonly ColorPickerInput[];
  name?: string;
  onOpenChange?: PopoverPrimitive.Root.Props["onOpenChange"];
  onValueChange?: (value: string) => void;
  open?: boolean;
  presets?: readonly string[];
  value?: string;
};

function ColorPicker({
  children,
  className,
  defaultOpen,
  defaultValue = DEFAULT_COLOR,
  disabled,
  displayFormat = DEFAULT_DISPLAY_FORMAT,
  inputs,
  name,
  onOpenChange,
  onValueChange,
  open,
  presets,
  value,
  ...props
}: ColorPickerProps) {
  const initialColor = parseColor(defaultValue) ?? FALLBACK_COLOR;
  const [uncontrolledColor, setUncontrolledColor] = React.useState(initialColor);
  const selectedColor =
    value === undefined ? uncontrolledColor : (parseColor(value) ?? initialColor);
  const selectedValue = serializeColor(selectedColor);
  const displayedValue = formatDisplayValue(selectedColor, displayFormat);
  const normalizedPresets = (presets ?? [])
    .map(parseColor)
    .filter((preset): preset is Color => preset !== null)
    .filter(
      (preset, index, colors) =>
        colors.findIndex((color) => serializeColor(color) === serializeColor(preset)) === index,
    );
  const enabledInputs = normalizeInputs(inputs, normalizedPresets.length > 0);
  const [selectedInput, setSelectedInput] = React.useState<ColorPickerInput | undefined>(
    enabledInputs[0],
  );
  const activeInput =
    selectedInput && enabledInputs.includes(selectedInput) ? selectedInput : enabledInputs[0];
  const [hexDraft, setHexDraft] = React.useState(selectedValue);
  const [channelDraftState, setChannelDraftState] = React.useState<ChannelDraftState>(() => ({
    input: activeInput,
    values: getChannelDrafts(selectedColor, activeInput),
  }));
  const channelDrafts =
    channelDraftState.input === activeInput
      ? channelDraftState.values
      : getChannelDrafts(selectedColor, activeInput);
  const colorInputId = React.useId();
  const hexInputId = React.useId();
  const [copyStatus, setCopyStatus] = React.useState<CopyStatus>("idle");
  const [copyFeedbackVisible, setCopyFeedbackVisible] = React.useState(false);
  const copyTimeoutRef = React.useRef<number | null>(null);
  const copyResetTimeoutRef = React.useRef<number | null>(null);
  const hexIsValid = parseHex(hexDraft) !== null;

  React.useEffect(() => {
    const synchronizedColor = parseColor(selectedValue) ?? FALLBACK_COLOR;
    setHexDraft(selectedValue);
    setChannelDraftState((currentState) => {
      if (
        activeInput === "cmyk" &&
        currentState.input === activeInput &&
        channelDraftsMatchColor(currentState.values, activeInput, synchronizedColor)
      ) {
        return currentState;
      }

      return {
        input: activeInput,
        values: getChannelDrafts(synchronizedColor, activeInput),
      };
    });
  }, [activeInput, selectedValue]);

  React.useEffect(
    () => () => {
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }

      if (copyResetTimeoutRef.current !== null) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
    },
    [],
  );

  const updateColor = (nextColor: Color) => {
    const normalizedColor = normalizeColor(nextColor);

    if (value === undefined) {
      setUncontrolledColor(normalizedColor);
    }

    onValueChange?.(serializeColor(normalizedColor));
  };

  const commitHexDraft = () => {
    const nextColor = parseHex(hexDraft);

    if (nextColor) {
      updateColor(nextColor);
      setHexDraft(serializeColor(nextColor));
      return;
    }

    setHexDraft(selectedValue);
  };

  const updateChannel = (channel: ChannelName, nextDraft: string) => {
    const nextDrafts = { ...channelDrafts, [channel]: nextDraft };
    setChannelDraftState({ input: activeInput, values: nextDrafts });

    if (!activeInput || activeInput === "hex") {
      return;
    }

    const nextColor = channelDraftsToColor(nextDrafts, activeInput, selectedColor);

    if (nextColor) {
      updateColor(nextColor);
    }
  };

  const resetChannelDrafts = () => {
    if (
      activeInput === "cmyk" &&
      channelDraftsMatchColor(channelDrafts, activeInput, selectedColor)
    ) {
      return;
    }

    setChannelDraftState({
      input: activeInput,
      values: getChannelDrafts(selectedColor, activeInput),
    });
  };

  const selectInput = (nextInput: ColorPickerInput) => {
    if (nextInput === activeInput) {
      return;
    }

    const nextColor = inputSupportsAlpha(nextInput) ? selectedColor : { ...selectedColor, a: 1 };
    const nextValue = serializeColor(nextColor);

    setHexDraft(nextValue);
    setChannelDraftState({
      input: nextInput,
      values: getChannelDrafts(nextColor, nextInput),
    });
    setSelectedInput(nextInput);

    if (nextColor.a !== selectedColor.a) {
      updateColor(nextColor);
    }
  };

  const copyDisplayedValue = async () => {
    if (copyTimeoutRef.current !== null) {
      window.clearTimeout(copyTimeoutRef.current);
    }

    if (copyResetTimeoutRef.current !== null) {
      window.clearTimeout(copyResetTimeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(displayedValue);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }

    setCopyFeedbackVisible(true);
    copyTimeoutRef.current = window.setTimeout(() => {
      setCopyFeedbackVisible(false);
      copyResetTimeoutRef.current = window.setTimeout(
        () => setCopyStatus("idle"),
        COPY_FEEDBACK_FADE_DURATION,
      );
    }, COPY_FEEDBACK_DURATION);
  };

  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";

  return (
    <PopoverPrimitive.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      {children ? (
        <PopoverPrimitive.Trigger
          render={
            <button
              type="button"
              data-slot="color-picker-trigger"
              className={cn(
                "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2 border border-input bg-background px-3 text-left text-sm outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-foreground/40 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
                className,
              )}
              disabled={disabled}
              {...props}
            />
          }
        >
          {children}
        </PopoverPrimitive.Trigger>
      ) : (
        <div
          data-slot="color-picker-control"
          className={cn(
            "group/color-picker flex h-10 w-full min-w-0 border border-input bg-background transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-foreground/40 has-[:focus-visible]:border-ring has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40 motion-reduce:transition-none",
            disabled && "bg-muted text-muted-foreground",
            invalid &&
              "border-destructive has-[:focus-visible]:border-destructive has-[:focus-visible]:ring-destructive/25",
            className,
          )}
        >
          <PopoverPrimitive.Trigger
            render={
              <button
                type="button"
                data-slot="color-picker-trigger"
                className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-3 text-left text-sm outline-none disabled:cursor-not-allowed"
                disabled={disabled}
                {...props}
              />
            }
          >
            <ColorSwatch color={selectedColor} className="size-4 shrink-0" />
            <span className="min-w-0 flex-1 truncate font-mono text-xs uppercase tabular-nums">
              {displayedValue}
            </span>
          </PopoverPrimitive.Trigger>
          <button
            type="button"
            data-slot="color-picker-copy"
            className={cn(
              "pointer-events-none inline-flex w-10 shrink-0 cursor-pointer items-center justify-center border-l border-transparent text-muted-foreground opacity-0 outline-none transition-[background-color,border-color,color,opacity] duration-100 group-hover/color-picker:pointer-events-auto group-hover/color-picker:border-border group-hover/color-picker:opacity-100 hover:bg-muted hover:text-foreground focus-visible:z-10 focus-visible:border-border focus-visible:bg-muted focus-visible:text-foreground focus-visible:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:border-border [@media(hover:none)]:opacity-100 motion-reduce:transition-none",
              copyStatus !== "idle" && copyFeedbackVisible && "border-border opacity-100",
              copyStatus === "success" && "text-foreground",
              copyStatus === "error" && "text-destructive",
            )}
            aria-label={
              copyStatus === "success"
                ? `${displayFormat.toUpperCase()} color copied`
                : copyStatus === "error"
                  ? `Could not copy ${displayFormat.toUpperCase()} color. Try again`
                  : `Copy ${displayFormat.toUpperCase()} color`
            }
            onClick={copyDisplayedValue}
          >
            {copyStatus === "success" ? (
              <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
            ) : copyStatus === "error" ? (
              <TriangleAlert className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Copy className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            )}
            <span className="sr-only" aria-live="polite">
              {copyStatus === "success"
                ? `${displayFormat.toUpperCase()} color copied to clipboard`
                : copyStatus === "error"
                  ? `Could not copy ${displayFormat.toUpperCase()} color`
                  : ""}
            </span>
          </button>
        </div>
      )}

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          align="start"
          side="bottom"
          sideOffset={6}
          className="isolate z-50"
        >
          <PopoverPrimitive.Popup
            data-slot="color-picker-content"
            className="w-[min(19rem,var(--available-width))] border border-border bg-popover text-popover-foreground outline-none transition-opacity duration-100 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 motion-reduce:transition-none"
          >
            <PopoverPrimitive.Title className="sr-only">Choose color</PopoverPrimitive.Title>

            {activeInput ? (
              <>
                <div className="border-b border-border p-3">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span
                      id={`${colorInputId}-label`}
                      className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em]"
                    >
                      Custom color
                    </span>
                    <span className="font-mono text-[0.625rem] tabular-nums text-muted-foreground">
                      {selectedColor.r} {selectedColor.g} {selectedColor.b}
                      {selectedColor.a < 1 ? ` / ${formatNumber(selectedColor.a, 2)}` : null}
                    </span>
                  </div>
                  <ColorSurface
                    id={colorInputId}
                    labelledBy={`${colorInputId}-label`}
                    color={selectedColor}
                    disabled={disabled}
                    onChange={updateColor}
                  />
                </div>

                <div className="p-3">
                  {enabledInputs.length > 1 ? (
                    <fieldset className="mb-3">
                      <legend className="sr-only">Color input format</legend>
                      <div className="flex flex-wrap gap-px border border-border bg-border">
                        {enabledInputs.map((input) => (
                          <button
                            key={input}
                            type="button"
                            aria-pressed={activeInput === input}
                            className={cn(
                              "h-8 min-w-[3.5rem] flex-1 basis-[calc(25%-1px)] cursor-pointer bg-popover px-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none",
                              activeInput === input &&
                                "bg-foreground text-background hover:bg-foreground hover:text-background",
                            )}
                            onClick={() => selectInput(input)}
                          >
                            {input}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}

                  {activeInput === "hex" ? (
                    <HexInput
                      id={hexInputId}
                      value={hexDraft}
                      valid={hexIsValid}
                      disabled={disabled}
                      onValueChange={(nextDraft) => {
                        const uppercaseDraft = nextDraft.toUpperCase();
                        setHexDraft(uppercaseDraft);

                        const nextColor = parseHex(uppercaseDraft);

                        if (nextColor) {
                          updateColor(nextColor);
                        }
                      }}
                      onCommit={commitHexDraft}
                    />
                  ) : (
                    <ChannelInputs
                      input={activeInput}
                      drafts={channelDrafts}
                      disabled={disabled}
                      onChange={updateChannel}
                      onBlur={resetChannelDrafts}
                    />
                  )}
                </div>
              </>
            ) : null}

            {normalizedPresets.length > 0 ? (
              <div className={cn("p-3", activeInput && "border-t border-border")}>
                <p className="mb-2 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em]">
                  Presets
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {normalizedPresets.map((presetColor) => {
                    const presetValue = serializeColor(presetColor);

                    return (
                      <button
                        key={presetValue}
                        type="button"
                        aria-label={`Use color ${presetValue}`}
                        aria-pressed={selectedValue === presetValue}
                        className="relative aspect-square cursor-pointer border border-foreground/20 outline-none transition-[border-color,box-shadow] duration-100 hover:border-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed motion-reduce:transition-none"
                        onClick={() => updateColor(presetColor)}
                        disabled={disabled}
                      >
                        <ColorSwatch
                          color={presetColor}
                          className="pointer-events-none absolute inset-0 border-0"
                        />
                        {selectedValue === presetValue ? (
                          <Check
                            className={cn(
                              "absolute inset-0 z-10 m-auto size-3.5",
                              getContrastColor(presetColor) === "dark"
                                ? "text-black"
                                : "text-white",
                            )}
                            strokeWidth={3}
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {!activeInput && normalizedPresets.length === 0 ? (
              <PopoverPrimitive.Description className="p-3 text-sm text-muted-foreground">
                No color options configured.
              </PopoverPrimitive.Description>
            ) : null}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>

      {name ? <input type="hidden" name={name} value={selectedValue} disabled={disabled} /> : null}
    </PopoverPrimitive.Root>
  );
}

function ColorSwatch({ className, color }: { className?: string; color: Color }) {
  return (
    <span
      className={cn("relative overflow-hidden border border-foreground/20", className)}
      aria-hidden="true"
    >
      <span className="absolute inset-0" style={TRANSPARENCY_GRID_STYLE} aria-hidden="true" />
      <span
        className="absolute inset-0"
        style={{ backgroundColor: toCssColor(color) }}
        aria-hidden="true"
      />
    </span>
  );
}

function ColorSurface({
  color,
  disabled,
  id,
  labelledBy,
  onChange,
}: {
  color: Color;
  disabled?: boolean;
  id: string;
  labelledBy: string;
  onChange: (color: Color) => void;
}) {
  const hsv = rgbToHsv(color);
  const calculatedSaturation = hsv.s ?? 0;
  const calculatedBrightness = hsv.v ?? 0;
  const calculatedHue = hsv.h ?? 0;
  const hueRef = React.useRef(calculatedHue);
  const saturationRef = React.useRef(calculatedSaturation);
  const brightnessRef = React.useRef(calculatedBrightness);
  const lastEmittedColorRef = React.useRef<string | null>(null);
  const colorValue = serializeColor(color);

  if (colorValue !== lastEmittedColorRef.current) {
    if (calculatedSaturation > 0) {
      hueRef.current = calculatedHue;
    }

    saturationRef.current = calculatedSaturation;
    brightnessRef.current = calculatedBrightness;
  }

  const hue = hueRef.current;
  const saturation = saturationRef.current;
  const brightness = brightnessRef.current;
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const markerRef = React.useRef<HTMLSpanElement>(null);
  const pointerBoundsRef = React.useRef<DOMRect | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  const lastChangeTimeRef = React.useRef(0);
  const pointerPositionRef = React.useRef<{ brightness: number; saturation: number } | null>(null);
  const pendingColorRef = React.useRef<Color | null>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const emitColor = (nextColor: Color) => {
    const normalizedColor = normalizeColor(nextColor);
    lastEmittedColorRef.current = serializeColor(normalizedColor);
    onChangeRef.current(normalizedColor);
  };

  const positionMarker = (nextSaturation: number, nextBrightness: number) => {
    if (!markerRef.current) {
      return;
    }

    markerRef.current.style.left = `${nextSaturation}%`;
    markerRef.current.style.top = `${100 - nextBrightness}%`;
  };

  React.useLayoutEffect(() => {
    const pointerPosition = pointerPositionRef.current;

    if (pointerBoundsRef.current && pointerPosition) {
      if (markerRef.current) {
        markerRef.current.style.left = `${pointerPosition.saturation}%`;
        markerRef.current.style.top = `${100 - pointerPosition.brightness}%`;
      }
      return;
    }

    if (markerRef.current) {
      markerRef.current.style.left = `${saturation}%`;
      markerRef.current.style.top = `${100 - brightness}%`;
    }
  }, [brightness, saturation]);

  React.useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  const commitScheduledChange = (time: number) => {
    if (time - lastChangeTimeRef.current < COLOR_DRAG_UPDATE_INTERVAL) {
      animationFrameRef.current = requestAnimationFrame(commitScheduledChange);
      return;
    }

    animationFrameRef.current = null;
    const pendingColor = pendingColorRef.current;
    pendingColorRef.current = null;

    if (pendingColor) {
      lastChangeTimeRef.current = time;
      emitColor(pendingColor);
    }
  };

  const scheduleChange = (nextColor: Color) => {
    pendingColorRef.current = nextColor;

    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(commitScheduledChange);
    }
  };

  const flushPendingChange = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const pendingColor = pendingColorRef.current;
    pendingColorRef.current = null;

    if (pendingColor) {
      lastChangeTimeRef.current = performance.now();
      emitColor(pendingColor);
    }
  };

  const updateSaturationAndBrightness = (nextSaturation: number, nextBrightness: number) => {
    saturationRef.current = nextSaturation;
    brightnessRef.current = nextBrightness;
    positionMarker(nextSaturation, nextBrightness);
    emitColor(hsvToRgb(hueRef.current, nextSaturation, nextBrightness, color.a));
  };

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    const bounds = pointerBoundsRef.current ?? event.currentTarget.getBoundingClientRect();
    const nextSaturation = clamp(((event.clientX - bounds.left) / bounds.width) * 100, 0, 100);
    const nextBrightness = clamp(
      100 - ((event.clientY - bounds.top) / bounds.height) * 100,
      0,
      100,
    );

    pointerPositionRef.current = {
      brightness: nextBrightness,
      saturation: nextSaturation,
    };
    saturationRef.current = nextSaturation;
    brightnessRef.current = nextBrightness;
    positionMarker(nextSaturation, nextBrightness);

    scheduleChange(hsvToRgb(hueRef.current, nextSaturation, nextBrightness, color.a));
  };

  return (
    <div>
      <fieldset
        id={id}
        aria-labelledby={labelledBy}
        data-slot="color-picker-surface-controls"
        className="relative min-w-0 border-0 p-0"
        disabled={disabled}
      >
        <label htmlFor={`${id}-saturation`} className="sr-only">
          Saturation
        </label>
        <input
          id={`${id}-saturation`}
          type="range"
          min={0}
          max={100}
          step={1}
          value={saturation}
          aria-valuetext={`${Math.round(saturation)}% saturation`}
          className="peer/saturation sr-only"
          onChange={(event) =>
            updateSaturationAndBrightness(Number(event.target.value), brightness)
          }
        />
        <label htmlFor={`${id}-brightness`} className="sr-only">
          Brightness
        </label>
        <input
          id={`${id}-brightness`}
          type="range"
          min={0}
          max={100}
          step={1}
          value={brightness}
          aria-valuetext={`${Math.round(brightness)}% brightness`}
          className="peer/brightness sr-only"
          onChange={(event) =>
            updateSaturationAndBrightness(saturation, Number(event.target.value))
          }
        />
        <div
          ref={surfaceRef}
          data-slot="color-picker-surface"
          className={cn(
            "relative h-28 w-full touch-none cursor-crosshair overflow-hidden outline-none select-none peer-focus-visible/saturation:ring-2 peer-focus-visible/saturation:ring-ring/40 peer-focus-visible/brightness:ring-2 peer-focus-visible/brightness:ring-ring/40",
            disabled && "cursor-not-allowed opacity-50",
          )}
          style={{
            backgroundColor: `hsl(${hue} 100% 50%)`,
            backgroundImage:
              "linear-gradient(to top, rgb(0 0 0), transparent), linear-gradient(to right, rgb(255 255 255), transparent)",
          }}
          aria-hidden="true"
          onPointerDown={(event) => {
            if (disabled) {
              return;
            }

            pointerBoundsRef.current = event.currentTarget.getBoundingClientRect();
            event.currentTarget.setPointerCapture(event.pointerId);
            updateFromPointer(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              updateFromPointer(event);
            }
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              updateFromPointer(event);
              flushPendingChange();
              event.currentTarget.releasePointerCapture(event.pointerId);
            }

            pointerBoundsRef.current = null;
            pointerPositionRef.current = null;
          }}
          onPointerCancel={(event) => {
            flushPendingChange();

            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }

            pointerBoundsRef.current = null;
            pointerPositionRef.current = null;
          }}
        >
          <span
            ref={markerRef}
            className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 border-2 border-white outline outline-1 outline-black/60"
            style={{ left: `${saturation}%`, top: `${100 - brightness}%` }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 border border-foreground/20"
            aria-hidden="true"
          />
        </div>
        <span
          className="pointer-events-none absolute bottom-2 left-2 border border-border bg-background/90 px-1.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] opacity-0 peer-focus-visible/saturation:opacity-100"
          aria-hidden="true"
        >
          Saturation {Math.round(saturation)}%
        </span>
        <span
          className="pointer-events-none absolute bottom-2 left-2 border border-border bg-background/90 px-1.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] opacity-0 peer-focus-visible/brightness:opacity-100"
          aria-hidden="true"
        >
          Brightness {Math.round(brightness)}%
        </span>
      </fieldset>

      <div className="relative mt-2 h-5">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 border border-foreground/20"
          style={{
            background:
              "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          }}
          aria-hidden="true"
        />
        <label htmlFor={`${id}-hue`} className="sr-only">
          Hue
        </label>
        <input
          id={`${id}-hue`}
          type="range"
          min={0}
          max={360}
          step={1}
          value={hue}
          aria-label="Hue"
          onChange={(event) => {
            const nextHue = Number(event.target.value);
            hueRef.current = nextHue;

            if (surfaceRef.current) {
              surfaceRef.current.style.backgroundColor = `hsl(${nextHue} 100% 50%)`;
            }

            scheduleChange(hsvToRgb(nextHue, saturation, brightness, color.a));
          }}
          onPointerUp={flushPendingChange}
          onPointerCancel={flushPendingChange}
          onBlur={flushPendingChange}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-foreground [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-solid [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-background"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function HexInput({
  disabled,
  id,
  onCommit,
  onValueChange,
  valid,
  value,
}: {
  disabled?: boolean;
  id: string;
  onCommit: () => void;
  onValueChange: (value: string) => void;
  valid: boolean;
  value: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em]"
      >
        Hex value
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onBlur={onCommit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onCommit();
          }
        }}
        maxLength={9}
        spellCheck="false"
        autoComplete="off"
        aria-invalid={!valid}
        aria-describedby={`${id}-hint`}
        className="h-10 w-full border border-input bg-background px-3 font-mono text-sm uppercase tabular-nums outline-none transition-[border-color,box-shadow] duration-100 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none"
        disabled={disabled}
      />
      <p
        id={`${id}-hint`}
        className={cn("mt-2 text-xs text-muted-foreground", !valid && "text-destructive")}
      >
        Use 3, 4, 6, or 8 hexadecimal digits.
      </p>
    </div>
  );
}

function ChannelInputs({
  disabled,
  drafts,
  input,
  onBlur,
  onChange,
}: {
  disabled?: boolean;
  drafts: ChannelDrafts;
  input: NumericColorPickerInput;
  onBlur: () => void;
  onChange: (channel: ChannelName, value: string) => void;
}) {
  const definition = INPUT_DEFINITIONS[input];
  const rangeChannel =
    input === "rgba"
      ? definition.channels.find((channel) => channel.name === "a")
      : input === "cmyk"
        ? definition.channels.find((channel) => channel.name === "k")
        : undefined;

  return (
    <fieldset>
      <legend className="mb-2 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em]">
        {definition.label}
      </legend>
      <div
        className={cn(
          "grid gap-2",
          definition.channels.length === 4 ? "grid-cols-4" : "grid-cols-3",
        )}
      >
        {definition.channels.map((channel) => {
          const draft = drafts[channel.name] ?? "";
          const invalid = !isValidChannelDraft(channel, draft);

          return (
            <label key={channel.name} className="min-w-0">
              <span className="mb-1.5 block font-mono text-[0.625rem] uppercase text-muted-foreground">
                {channel.name}
              </span>
              <input
                type="number"
                inputMode="decimal"
                min={channel.minimum}
                max={channel.maximum}
                step={channel.step}
                value={draft}
                onChange={(event) => onChange(channel.name, event.target.value)}
                onBlur={onBlur}
                aria-invalid={invalid}
                className="h-10 w-full min-w-0 border border-input bg-background px-2 font-mono text-sm tabular-nums outline-none transition-[border-color,box-shadow] duration-100 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none"
                disabled={disabled}
              />
            </label>
          );
        })}
      </div>
      {rangeChannel && (input === "rgba" || input === "cmyk") ? (
        <ChannelRange
          channel={rangeChannel}
          drafts={drafts}
          input={input}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
        />
      ) : null}
      <p className="mt-2 text-xs text-muted-foreground">{definition.hint}</p>
    </fieldset>
  );
}

function ChannelRange({
  channel,
  disabled,
  drafts,
  input,
  onBlur,
  onChange,
}: {
  channel: ChannelDefinition;
  disabled?: boolean;
  drafts: ChannelDrafts;
  input: "rgba" | "cmyk";
  onBlur: () => void;
  onChange: (channel: ChannelName, value: string) => void;
}) {
  const rangeId = React.useId();
  const draft = drafts[channel.name] ?? "";
  const parsedValue = Number(draft);
  const value = Number.isFinite(parsedValue)
    ? clamp(parsedValue, channel.minimum, channel.maximum)
    : channel.minimum;
  const percentage = ((value - channel.minimum) / (channel.maximum - channel.minimum)) * 100;
  const label = input === "rgba" ? "Alpha" : "Key / Black";
  const trackBackground = getChannelRangeBackground(input, drafts);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={rangeId}
          className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em]"
        >
          {label}
        </label>
        <output
          htmlFor={rangeId}
          className="font-mono text-[0.625rem] tabular-nums text-muted-foreground"
        >
          {Math.round(percentage)}%
        </output>
      </div>
      <div className="relative mt-1 h-5">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden border border-foreground/20"
          style={input === "rgba" ? TRANSPARENCY_GRID_STYLE : undefined}
          aria-hidden="true"
        >
          <span
            className="absolute inset-0"
            style={{ background: trackBackground }}
            aria-hidden="true"
          />
        </div>
        <input
          id={rangeId}
          type="range"
          min={channel.minimum}
          max={channel.maximum}
          step={channel.step}
          value={value}
          aria-label={label}
          aria-valuetext={`${Math.round(percentage)}% ${label.toLowerCase()}`}
          onChange={(event) => onChange(channel.name, event.target.value)}
          onBlur={onBlur}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-foreground [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-solid [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-background"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function getChannelRangeBackground(input: "rgba" | "cmyk", drafts: ChannelDrafts) {
  if (input === "rgba") {
    const red = clamp(Number(drafts.r) || 0, 0, 255);
    const green = clamp(Number(drafts.g) || 0, 0, 255);
    const blue = clamp(Number(drafts.b) || 0, 0, 255);

    return `linear-gradient(to right, rgb(${red} ${green} ${blue} / 0), rgb(${red} ${green} ${blue}))`;
  }

  const cyan = clamp(Number(drafts.c) || 0, 0, 100);
  const magenta = clamp(Number(drafts.m) || 0, 0, 100);
  const yellow = clamp(Number(drafts.y) || 0, 0, 100);
  const baseColor = cmykToRgb(cyan, magenta, yellow, 0, 1);

  return `linear-gradient(to right, ${toCssColor(baseColor)}, rgb(0 0 0))`;
}

function normalizeInputs(
  inputs: ColorPickerInput | readonly ColorPickerInput[] | undefined,
  hasPresets: boolean,
) {
  let requestedInputs: readonly ColorPickerInput[];

  if (inputs === undefined) {
    requestedInputs = hasPresets ? [] : ["rgb"];
  } else {
    requestedInputs = typeof inputs === "string" ? [inputs] : inputs;
  }

  const normalizedInputs = requestedInputs.filter(
    (input, index) => requestedInputs.indexOf(input) === index,
  );

  return normalizedInputs;
}

function inputSupportsAlpha(input: ColorPickerInput) {
  return input === "hex" || input === "rgba";
}

function getChannelDrafts(color: Color, input: ColorPickerInput | undefined): ChannelDrafts {
  if (!input || input === "hex") {
    return {};
  }

  const channels = colorToChannels(color, input);

  return Object.fromEntries(
    INPUT_DEFINITIONS[input].channels.map((channel) => [
      channel.name,
      formatNumber(channels[channel.name] ?? 0, channel.step < 1 ? 2 : 0),
    ]),
  );
}

function colorToChannels(color: Color, input: NumericColorPickerInput): ChannelValues {
  switch (input) {
    case "rgb":
      return { r: color.r, g: color.g, b: color.b };
    case "rgba":
      return { r: color.r, g: color.g, b: color.b, a: color.a };
    case "ryb":
      return rgbToRyb(color);
    case "cmyk":
      return rgbToCmyk(color);
    case "hsl":
      return rgbToHsl(color);
    case "hsv":
      return rgbToHsv(color);
  }
}

function channelDraftsToColor(
  drafts: ChannelDrafts,
  input: NumericColorPickerInput,
  fallback: Color,
) {
  const definition = INPUT_DEFINITIONS[input];

  if (
    definition.channels.some((channel) => !isValidChannelDraft(channel, drafts[channel.name] ?? ""))
  ) {
    return null;
  }

  const value = (channel: ChannelName) => Number(drafts[channel]);

  switch (input) {
    case "rgb":
      return normalizeColor({ r: value("r"), g: value("g"), b: value("b"), a: fallback.a });
    case "rgba":
      return normalizeColor({ r: value("r"), g: value("g"), b: value("b"), a: value("a") });
    case "ryb":
      return rybToRgb(value("r"), value("y"), value("b"), fallback.a);
    case "cmyk":
      return cmykToRgb(value("c"), value("m"), value("y"), value("k"), fallback.a);
    case "hsl":
      return hslToRgb(value("h"), value("s"), value("l"), fallback.a);
    case "hsv":
      return hsvToRgb(value("h"), value("s"), value("v"), fallback.a);
  }
}

function channelDraftsMatchColor(
  drafts: ChannelDrafts,
  input: NumericColorPickerInput,
  color: Color,
) {
  const draftColor = channelDraftsToColor(drafts, input, color);

  return draftColor !== null && serializeColor(draftColor) === serializeColor(color);
}

function parseColor(value: string) {
  const hexColor = parseHex(value);

  if (hexColor) {
    return hexColor;
  }

  const match = value
    .trim()
    .match(
      /^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*(\d*\.?\d+)\s*)?\)$/i,
    );

  if (!match) {
    return null;
  }

  const [, red, green, blue, alpha] = match;
  const color = {
    r: Number(red),
    g: Number(green),
    b: Number(blue),
    a: alpha === undefined ? 1 : Number(alpha),
  };

  if (
    !Number.isFinite(color.r) ||
    !Number.isFinite(color.g) ||
    !Number.isFinite(color.b) ||
    !Number.isFinite(color.a) ||
    color.r < 0 ||
    color.r > 255 ||
    color.g < 0 ||
    color.g > 255 ||
    color.b < 0 ||
    color.b > 255 ||
    color.a < 0 ||
    color.a > 1
  ) {
    return null;
  }

  return normalizeColor(color);
}

function parseHex(value: string) {
  const normalizedValue = value.trim().replace(/^#/, "");

  if (!/^(?:[0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(normalizedValue)) {
    return null;
  }

  const expandedValue =
    normalizedValue.length <= 4
      ? normalizedValue
          .split("")
          .map((character) => character + character)
          .join("")
      : normalizedValue;

  return {
    r: Number.parseInt(expandedValue.slice(0, 2), 16),
    g: Number.parseInt(expandedValue.slice(2, 4), 16),
    b: Number.parseInt(expandedValue.slice(4, 6), 16),
    a: expandedValue.length === 8 ? Number.parseInt(expandedValue.slice(6, 8), 16) / 255 : 1,
  };
}

function rgbToRyb(color: Color): ChannelValues {
  let red = color.r;
  let green = color.g;
  let blue = color.b;
  const white = Math.min(red, green, blue);

  red -= white;
  green -= white;
  blue -= white;

  const maximumGreen = Math.max(red, green, blue);
  let yellow = Math.min(red, green);

  red -= yellow;
  green -= yellow;

  if (blue > 0 && green > 0) {
    blue /= 2;
    green /= 2;
  }

  yellow += green;
  blue += green;

  const maximumYellow = Math.max(red, yellow, blue);

  if (maximumYellow > 0) {
    const normalization = maximumGreen / maximumYellow;
    red *= normalization;
    yellow *= normalization;
    blue *= normalization;
  }

  return {
    r: Math.round(red + white),
    y: Math.round(yellow + white),
    b: Math.round(blue + white),
  };
}

function rybToRgb(redValue: number, yellowValue: number, blueValue: number, alpha: number): Color {
  let red = redValue;
  let yellow = yellowValue;
  let blue = blueValue;
  const white = Math.min(red, yellow, blue);

  red -= white;
  yellow -= white;
  blue -= white;

  const maximumYellow = Math.max(red, yellow, blue);
  let green = Math.min(yellow, blue);

  yellow -= green;
  blue -= green;

  if (blue > 0 && green > 0) {
    blue *= 2;
    green *= 2;
  }

  red += yellow;
  green += yellow;

  const maximumGreen = Math.max(red, green, blue);

  if (maximumGreen > 0) {
    const normalization = maximumYellow / maximumGreen;
    red *= normalization;
    green *= normalization;
    blue *= normalization;
  }

  return normalizeColor({
    r: red + white,
    g: green + white,
    b: blue + white,
    a: alpha,
  });
}

function rgbToCmyk(color: Color): ChannelValues {
  const red = color.r / 255;
  const green = color.g / 255;
  const blue = color.b / 255;
  const key = 1 - Math.max(red, green, blue);

  if (key >= 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  return {
    c: Math.round(((1 - red - key) / (1 - key)) * 100),
    m: Math.round(((1 - green - key) / (1 - key)) * 100),
    y: Math.round(((1 - blue - key) / (1 - key)) * 100),
    k: Math.round(key * 100),
  };
}

function cmykToRgb(
  cyanValue: number,
  magentaValue: number,
  yellowValue: number,
  keyValue: number,
  alpha: number,
): Color {
  const cyan = cyanValue / 100;
  const magenta = magentaValue / 100;
  const yellow = yellowValue / 100;
  const key = keyValue / 100;

  return normalizeColor({
    r: 255 * (1 - cyan) * (1 - key),
    g: 255 * (1 - magenta) * (1 - key),
    b: 255 * (1 - yellow) * (1 - key),
    a: alpha,
  });
}

function rgbToHsl(color: Color): ChannelValues {
  const red = color.r / 255;
  const green = color.g / 255;
  const blue = color.b / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  const lightness = (maximum + minimum) / 2;
  let hue = 0;

  if (delta !== 0) {
    if (maximum === red) {
      hue = 60 * (((green - blue) / delta) % 6);
    } else if (maximum === green) {
      hue = 60 * ((blue - red) / delta + 2);
    } else {
      hue = 60 * ((red - green) / delta + 4);
    }
  }

  if (hue < 0) {
    hue += 360;
  }

  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

function hslToRgb(
  hueValue: number,
  saturationValue: number,
  lightnessValue: number,
  alpha: number,
) {
  const hue = normalizeHue(hueValue);
  const saturation = saturationValue / 100;
  const lightness = lightnessValue / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const offset = lightness - chroma / 2;
  const [red, green, blue] = hueToRgbChannels(hue, chroma, secondary);

  return normalizeColor({
    r: (red + offset) * 255,
    g: (green + offset) * 255,
    b: (blue + offset) * 255,
    a: alpha,
  });
}

function rgbToHsv(color: Color): ChannelValues {
  const red = color.r / 255;
  const green = color.g / 255;
  const blue = color.b / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  let hue = 0;

  if (delta !== 0) {
    if (maximum === red) {
      hue = 60 * (((green - blue) / delta) % 6);
    } else if (maximum === green) {
      hue = 60 * ((blue - red) / delta + 2);
    } else {
      hue = 60 * ((red - green) / delta + 4);
    }
  }

  if (hue < 0) {
    hue += 360;
  }

  return {
    h: Math.round(hue),
    s: Math.round((maximum === 0 ? 0 : delta / maximum) * 100),
    v: Math.round(maximum * 100),
  };
}

function hsvToRgb(hueValue: number, saturationValue: number, valueValue: number, alpha: number) {
  const hue = normalizeHue(hueValue);
  const saturation = saturationValue / 100;
  const value = valueValue / 100;
  const chroma = value * saturation;
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const offset = value - chroma;
  const [red, green, blue] = hueToRgbChannels(hue, chroma, secondary);

  return normalizeColor({
    r: (red + offset) * 255,
    g: (green + offset) * 255,
    b: (blue + offset) * 255,
    a: alpha,
  });
}

function hueToRgbChannels(hue: number, chroma: number, secondary: number) {
  if (hue < 60) {
    return [chroma, secondary, 0];
  }
  if (hue < 120) {
    return [secondary, chroma, 0];
  }
  if (hue < 180) {
    return [0, chroma, secondary];
  }
  if (hue < 240) {
    return [0, secondary, chroma];
  }
  if (hue < 300) {
    return [secondary, 0, chroma];
  }

  return [chroma, 0, secondary];
}

function normalizeHue(value: number) {
  return ((value % 360) + 360) % 360;
}

function normalizeColor(color: Color): Color {
  return {
    r: Math.round(clamp(color.r, 0, 255)),
    g: Math.round(clamp(color.g, 0, 255)),
    b: Math.round(clamp(color.b, 0, 255)),
    a: clamp(color.a, 0, 1),
  };
}

function serializeColor(color: Color) {
  const normalizedColor = normalizeColor(color);
  const opaqueHex = toOpaqueHex(normalizedColor);
  const alphaHex = toHexByte(normalizedColor.a * 255);

  return alphaHex === "FF" ? opaqueHex : opaqueHex + alphaHex;
}

function formatDisplayValue(color: Color, format: ColorPickerInput) {
  if (format === "hex") {
    return serializeColor(color);
  }

  const channels = colorToChannels(color, format);
  const value = (channel: ChannelName, precision = 0) =>
    formatNumber(channels[channel] ?? 0, precision);

  switch (format) {
    case "rgb":
      return `rgb(${value("r")}, ${value("g")}, ${value("b")})`;
    case "rgba":
      return `rgba(${value("r")}, ${value("g")}, ${value("b")}, ${value("a", 2)})`;
    case "ryb":
      return `ryb(${value("r")}, ${value("y")}, ${value("b")})`;
    case "cmyk":
      return `cmyk(${value("c")}%, ${value("m")}%, ${value("y")}%, ${value("k")}%)`;
    case "hsl":
      return `hsl(${value("h")}, ${value("s")}%, ${value("l")}%)`;
    case "hsv":
      return `hsv(${value("h")}, ${value("s")}%, ${value("v")}%)`;
  }
}

function toOpaqueHex(color: Color) {
  return `#${toHexByte(color.r)}${toHexByte(color.g)}${toHexByte(color.b)}`;
}

function toCssColor(color: Color) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

function toHexByte(value: number) {
  return Math.round(clamp(value, 0, 255))
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
}

function formatNumber(value: number, precision: number) {
  return String(Number(value.toFixed(precision)));
}

function isValidChannelDraft(channel: ChannelDefinition, value: string) {
  if (value.trim() === "") {
    return false;
  }

  const number = Number(value);
  return Number.isFinite(number) && number >= channel.minimum && number <= channel.maximum;
}

function getContrastColor(color: Color) {
  const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;

  return luminance > 0.62 || color.a < 0.45 ? "dark" : "light";
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export type { ColorPickerInput, ColorPickerProps };
export { ColorPicker };
