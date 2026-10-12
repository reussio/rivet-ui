"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { ChevronDown, ChevronUp, Clock3 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type TimeParts = {
  hours: number;
  minutes: number;
  seconds: number;
};

type TimePickerProps = Omit<
  React.ComponentProps<"button">,
  "defaultValue" | "name" | "onChange" | "value"
> & {
  defaultOpen?: boolean;
  defaultValue?: string;
  hourCycle?: 12 | 24;
  minuteStep?: number;
  name?: string;
  onOpenChange?: PopoverPrimitive.Root.Props["onOpenChange"];
  onValueChange?: (value: string | undefined) => void;
  open?: boolean;
  placeholder?: string;
  secondStep?: number;
  showSeconds?: boolean;
  value?: string;
};

const emptyTime: TimeParts = { hours: 12, minutes: 0, seconds: 0 };

function TimePicker({
  children,
  className,
  defaultOpen,
  defaultValue,
  disabled,
  hourCycle = 24,
  minuteStep: minuteStepProp = 1,
  name,
  onOpenChange,
  onValueChange,
  open,
  placeholder = "Select time",
  secondStep: secondStepProp = 1,
  showSeconds = false,
  value: valueProp,
  ...props
}: TimePickerProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const selectedValue = valueProp ?? uncontrolledValue;
  const selected = parseTime(selectedValue);
  const [draft, setDraft] = React.useState<TimeParts>(() => selected ?? emptyTime);
  const actionsRef = React.useRef<PopoverPrimitive.Root.Actions>(null);
  const minuteStep = normalizeStep(minuteStepProp, 59);
  const secondStep = normalizeStep(secondStepProp, 59);

  const commitValue = (nextValue: string | undefined) => {
    if (valueProp === undefined) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const commitTime = (nextTime: TimeParts) => {
    setDraft(nextTime);
    commitValue(formatTimeValue(nextTime, showSeconds));
  };

  const handleOpenChange: PopoverPrimitive.Root.Props["onOpenChange"] = (
    nextOpen,
    eventDetails,
  ) => {
    if (nextOpen) {
      setDraft(selected ?? emptyTime);
    }

    onOpenChange?.(nextOpen, eventDetails);
  };

  const handleClear = () => {
    commitValue(undefined);
    actionsRef.current?.close();
  };

  return (
    <PopoverPrimitive.Root
      actionsRef={actionsRef}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <PopoverPrimitive.Trigger
        render={
          <button
            type="button"
            data-slot="time-picker-trigger"
            className={cn(
              "flex h-10 w-full min-w-0 items-center gap-2 border border-input bg-background px-3 text-left text-sm outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-foreground/40 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
              !selected && "text-muted-foreground",
              className,
            )}
            disabled={disabled}
            {...props}
          />
        }
      >
        {children ?? (
          <>
            <Clock3 className="size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate font-mono tabular-nums">
              {selected ? formatDisplayTime(selected, hourCycle, showSeconds) : placeholder}
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </>
        )}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          align="start"
          side="bottom"
          sideOffset={6}
          className="isolate z-50"
        >
          <PopoverPrimitive.Popup
            data-slot="time-picker-content"
            className={cn(
              "overflow-hidden border border-border bg-popover text-popover-foreground outline-none transition-opacity duration-100 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 motion-reduce:transition-none",
              hourCycle === 12
                ? showSeconds
                  ? "w-[min(18.5rem,var(--available-width))]"
                  : "w-[min(13.5rem,var(--available-width))]"
                : showSeconds
                  ? "w-[min(15rem,var(--available-width))]"
                  : "w-[min(11rem,var(--available-width))]",
            )}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Time
              </span>
              <output className="font-mono text-sm tabular-nums" aria-live="polite">
                {formatDisplayTime(draft, hourCycle, showSeconds)}
              </output>
            </div>

            <fieldset className="flex items-end justify-center gap-2 px-3 py-4">
              <legend className="sr-only">Time</legend>
              <TimeSegment
                label="Hour"
                value={hourCycle === 12 ? toTwelveHour(draft.hours) : draft.hours}
                min={hourCycle === 12 ? 1 : 0}
                max={hourCycle === 12 ? 12 : 23}
                autoFocus
                onValueChange={(hours) => {
                  commitTime({
                    ...draft,
                    hours:
                      hourCycle === 12
                        ? fromTwelveHour(hours, draft.hours >= 12 ? "PM" : "AM")
                        : hours,
                  });
                }}
              />

              <TimeDivider />

              <TimeSegment
                label="Minute"
                value={draft.minutes}
                min={0}
                max={59}
                step={minuteStep}
                onValueChange={(minutes) => {
                  commitTime({ ...draft, minutes });
                }}
              />

              {showSeconds ? (
                <>
                  <TimeDivider />
                  <TimeSegment
                    label="Second"
                    value={draft.seconds}
                    min={0}
                    max={59}
                    step={secondStep}
                    onValueChange={(seconds) => {
                      commitTime({ ...draft, seconds });
                    }}
                  />
                </>
              ) : null}

              {hourCycle === 12 ? (
                <div className="grid gap-2">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Period
                  </span>
                  <div className="grid h-[6.75rem] grid-rows-2 border border-border">
                    {(["AM", "PM"] as const).map((period) => {
                      const active = period === (draft.hours >= 12 ? "PM" : "AM");

                      return (
                        <button
                          key={period}
                          type="button"
                          className="min-w-11 border-b border-border px-2 font-mono text-xs outline-none transition-colors duration-100 last:border-b-0 hover:bg-muted focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 data-active:bg-foreground data-active:text-background motion-reduce:transition-none"
                          data-active={active ? "" : undefined}
                          aria-pressed={active}
                          onClick={() => {
                            commitTime({
                              ...draft,
                              hours: fromTwelveHour(toTwelveHour(draft.hours), period),
                            });
                          }}
                        >
                          {period}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </fieldset>

            <div className="flex items-center border-t border-border p-2">
              <button
                type="button"
                className="h-8 px-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none"
                onClick={() => commitTime(getCurrentTime())}
              >
                Now
              </button>
              {selected ? (
                <button
                  type="button"
                  className="h-8 px-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none"
                  onClick={handleClear}
                >
                  Clear
                </button>
              ) : null}
            </div>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>

      {name ? (
        <input
          type="hidden"
          name={name}
          value={selected ? formatTimeValue(selected, showSeconds) : ""}
          disabled={disabled}
        />
      ) : null}
    </PopoverPrimitive.Root>
  );
}

function TimeSegment({
  autoFocus,
  label,
  max,
  min,
  onValueChange,
  step = 1,
  value,
}: {
  autoFocus?: boolean;
  label: string;
  max: number;
  min: number;
  onValueChange: (value: number) => void;
  step?: number;
  value: number;
}) {
  return (
    <NumberFieldPrimitive.Root
      value={value}
      min={min}
      max={max}
      step={step}
      snapOnStep
      format={{ minimumIntegerDigits: 2, useGrouping: false }}
      onValueChange={(nextValue) => {
        if (nextValue !== null) {
          onValueChange(nextValue);
        }
      }}
      className="grid gap-2"
    >
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <div className="grid w-14 border border-border">
        <NumberFieldPrimitive.Increment
          className="flex h-8 items-center justify-center border-b border-border text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <ChevronUp className="size-3.5" aria-hidden="true" />
        </NumberFieldPrimitive.Increment>
        <NumberFieldPrimitive.Input
          autoFocus={autoFocus}
          className="h-10 w-full bg-transparent px-1 text-center font-mono text-base tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
          aria-label={label}
          inputMode="numeric"
        />
        <NumberFieldPrimitive.Decrement
          className="flex h-8 items-center justify-center border-t border-border text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </NumberFieldPrimitive.Decrement>
      </div>
    </NumberFieldPrimitive.Root>
  );
}

function TimeDivider() {
  return (
    <span className="mb-[2.375rem] font-mono text-base text-muted-foreground" aria-hidden="true">
      :
    </span>
  );
}

function parseTime(value: string | undefined): TimeParts | undefined {
  if (!value) {
    return undefined;
  }

  const match = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value);

  if (!match) {
    return undefined;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3] ?? 0);

  if (hours > 23 || minutes > 59 || seconds > 59) {
    return undefined;
  }

  return { hours, minutes, seconds };
}

function formatTimeValue(time: TimeParts, showSeconds: boolean) {
  const value = `${padTimePart(time.hours)}:${padTimePart(time.minutes)}`;

  return showSeconds ? `${value}:${padTimePart(time.seconds)}` : value;
}

function formatDisplayTime(time: TimeParts, hourCycle: 12 | 24, showSeconds: boolean) {
  const hours = hourCycle === 12 ? toTwelveHour(time.hours) : time.hours;
  const value = `${padTimePart(hours)}:${padTimePart(time.minutes)}`;
  const withSeconds = showSeconds ? `${value}:${padTimePart(time.seconds)}` : value;

  return hourCycle === 12 ? `${withSeconds} ${time.hours >= 12 ? "PM" : "AM"}` : withSeconds;
}

function padTimePart(value: number) {
  return String(value).padStart(2, "0");
}

function toTwelveHour(hours: number) {
  return hours % 12 || 12;
}

function fromTwelveHour(hours: number, period: "AM" | "PM") {
  return (hours % 12) + (period === "PM" ? 12 : 0);
}

function normalizeStep(step: number, max: number) {
  if (!Number.isFinite(step)) {
    return 1;
  }

  return Math.min(max, Math.max(1, Math.floor(step)));
}

function getCurrentTime(): TimeParts {
  const now = new Date();

  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

export type { TimePickerProps };
export { TimePicker };
