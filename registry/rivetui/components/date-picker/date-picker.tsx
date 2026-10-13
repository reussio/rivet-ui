"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { CalendarDays, CalendarRange, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import {
  type DateRange,
  DayPicker,
  getDefaultClassNames,
  type PropsBase,
  type PropsRange,
  type PropsSingle,
} from "react-day-picker";

import { cn } from "@/lib/utils";

function Calendar({
  captionLayout = "dropdown",
  className,
  classNames,
  components,
  defaultMonth,
  endMonth,
  month,
  showOutsideDays = true,
  startMonth,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();
  const referenceYear = (month ?? defaultMonth ?? new Date()).getFullYear();

  return (
    <DayPicker
      captionLayout={captionLayout}
      showOutsideDays={showOutsideDays}
      defaultMonth={defaultMonth}
      endMonth={endMonth ?? new Date(referenceYear + 20, 11)}
      month={month}
      startMonth={startMonth ?? new Date(referenceYear - 100, 0)}
      className={cn("w-[17.25rem] max-w-full bg-popover p-3 text-popover-foreground", className)}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 sm:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-2", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex h-8 items-center justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          "inline-flex size-8 cursor-pointer items-center justify-center border border-transparent text-muted-foreground outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-border hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          "inline-flex size-8 cursor-pointer items-center justify-center border border-transparent text-muted-foreground outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-border hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-8 items-center justify-center px-10",
          defaultClassNames.month_caption,
        ),
        caption_label: cn(
          "inline-flex items-center gap-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em]",
          defaultClassNames.caption_label,
        ),
        dropdowns: cn("flex h-8 items-center justify-center gap-1", defaultClassNames.dropdowns),
        dropdown_root: cn(
          "relative inline-flex h-8 items-center gap-1 border border-transparent px-2 text-foreground outline-none transition-[background-color,border-color,box-shadow] duration-100 hover:border-border hover:bg-muted has-[:focus-visible]:border-ring has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40 motion-reduce:transition-none",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 cursor-pointer opacity-0 outline-none",
          defaultClassNames.dropdown,
        ),
        month_grid: cn("w-full table-fixed border-collapse", defaultClassNames.month_grid),
        weekdays: cn(defaultClassNames.weekdays),
        weekday: cn(
          "h-8 w-9 text-center font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground",
          defaultClassNames.weekday,
        ),
        week: cn(defaultClassNames.week),
        week_number_header: cn("size-9", defaultClassNames.week_number_header),
        week_number: cn(
          "size-9 text-center font-mono text-[0.625rem] text-muted-foreground",
          defaultClassNames.week_number,
        ),
        day: cn(
          "relative size-9 p-0 text-center text-sm [&:has([aria-selected])]:bg-muted",
          defaultClassNames.day,
        ),
        day_button: cn(
          "inline-flex size-9 cursor-pointer items-center justify-center border border-transparent bg-transparent text-sm outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-border hover:bg-muted focus-visible:relative focus-visible:z-10 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none",
          defaultClassNames.day_button,
        ),
        selected: cn(
          "[&_button]:border-primary [&_button]:bg-primary [&_button]:text-primary-foreground",
          defaultClassNames.selected,
        ),
        range_start: cn(
          "[&_button]:border-primary [&_button]:bg-primary [&_button]:text-primary-foreground",
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          "bg-muted [&_button]:border-transparent [&_button]:bg-muted [&_button]:text-foreground",
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          "[&_button]:border-primary [&_button]:bg-primary [&_button]:text-primary-foreground",
          defaultClassNames.range_end,
        ),
        today: cn("[&_button]:border-border [&_button]:font-semibold", defaultClassNames.today),
        outside: cn("[&_button]:text-muted-foreground/45", defaultClassNames.outside),
        disabled: cn(
          "[&_button]:pointer-events-none [&_button]:opacity-30",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        footer: cn(
          "mt-2 border-t border-border pt-3 text-sm text-muted-foreground",
          defaultClassNames.footer,
        ),
        ...classNames,
      }}
      components={{
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => (
          <div ref={rootRef} data-slot="calendar" className={cn(rootClassName)} {...rootProps} />
        ),
        Chevron: ({ className: chevronClassName, orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;

          if (orientation === "up" || orientation === "down") {
            return (
              <ChevronDown
                className={cn("size-3.5", orientation === "up" && "rotate-180", chevronClassName)}
                aria-hidden="true"
              />
            );
          }

          return <Icon className={cn("size-4", chevronClassName)} aria-hidden="true" />;
        },
        ...components,
      }}
      {...props}
    />
  );
}

type DatePickerProps = Omit<
  React.ComponentProps<"button">,
  "defaultValue" | "name" | "onChange" | "value"
> & {
  calendarProps?: Omit<PropsBase & PropsSingle, "mode" | "onSelect" | "selected">;
  dateFormat?: Intl.DateTimeFormatOptions;
  defaultOpen?: boolean;
  defaultValue?: Date;
  formatLocale?: Intl.LocalesArgument;
  name?: string;
  onOpenChange?: PopoverPrimitive.Root.Props["onOpenChange"];
  onValueChange?: (date: Date | undefined) => void;
  open?: boolean;
  placeholder?: string;
  value?: Date;
};

type DateRangePickerProps = Omit<
  React.ComponentProps<"button">,
  "defaultValue" | "name" | "onChange" | "value"
> & {
  calendarProps?: Omit<PropsBase & PropsRange, "mode" | "onSelect" | "selected">;
  dateFormat?: Intl.DateTimeFormatOptions;
  defaultOpen?: boolean;
  defaultValue?: DateRange;
  formatLocale?: Intl.LocalesArgument;
  fromName?: string;
  onOpenChange?: PopoverPrimitive.Root.Props["onOpenChange"];
  onValueChange?: (range: DateRange | undefined) => void;
  open?: boolean;
  placeholder?: string;
  toName?: string;
  value?: DateRange;
};

function DatePicker({
  calendarProps,
  children,
  className,
  dateFormat = { dateStyle: "medium" },
  defaultOpen,
  defaultValue,
  disabled,
  formatLocale,
  name,
  onOpenChange,
  onValueChange,
  open,
  placeholder = "Select date",
  value,
  ...props
}: DatePickerProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const selected = value ?? uncontrolledValue;
  const actionsRef = React.useRef<PopoverPrimitive.Root.Actions>(null);
  const formatter = React.useMemo(
    () => new Intl.DateTimeFormat(formatLocale, dateFormat),
    [dateFormat, formatLocale],
  );

  const handleSelect = (nextDate: Date | undefined) => {
    if (value === undefined) {
      setUncontrolledValue(nextDate);
    }

    onValueChange?.(nextDate);

    if (nextDate) {
      actionsRef.current?.close();
    }
  };

  const handleClear = () => {
    if (value === undefined) {
      setUncontrolledValue(undefined);
    }

    onValueChange?.(undefined);
    actionsRef.current?.close();
  };

  return (
    <PopoverPrimitive.Root
      actionsRef={actionsRef}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <PopoverPrimitive.Trigger
        render={
          <button
            type="button"
            data-slot="date-picker-trigger"
            className={cn(
              "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2 border border-input bg-background px-3 text-left text-sm outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-foreground/40 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
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
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">
              {selected ? formatter.format(selected) : placeholder}
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
            data-slot="date-picker-content"
            className="w-[min(17.25rem,var(--available-width))] overflow-auto border border-border bg-popover text-popover-foreground outline-none transition-opacity duration-100 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 motion-reduce:transition-none"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Date
              </span>
              <output className="truncate font-mono text-xs tabular-nums" aria-live="polite">
                {selected ? formatter.format(selected) : "Not selected"}
              </output>
            </div>
            <Calendar
              {...calendarProps}
              mode="single"
              selected={selected}
              autoFocus={calendarProps?.autoFocus ?? true}
              defaultMonth={calendarProps?.defaultMonth ?? selected}
              onSelect={handleSelect}
            />
            <div className="flex items-center border-t border-border p-2">
              <button
                type="button"
                className="h-8 cursor-pointer px-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none"
                onClick={() => handleSelect(new Date())}
              >
                Today
              </button>
              {selected ? (
                <button
                  type="button"
                  className="h-8 cursor-pointer px-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none"
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
          value={selected ? formatInputDate(selected) : ""}
          disabled={disabled}
        />
      ) : null}
    </PopoverPrimitive.Root>
  );
}

function DateRangePicker({
  calendarProps,
  children,
  className,
  dateFormat = { dateStyle: "medium" },
  defaultOpen,
  defaultValue,
  disabled,
  formatLocale,
  fromName,
  onOpenChange,
  onValueChange,
  open,
  placeholder = "Select date range",
  toName,
  value,
  ...props
}: DateRangePickerProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<DateRange | undefined>(
    defaultValue,
  );
  const selected = value ?? uncontrolledValue;
  const actionsRef = React.useRef<PopoverPrimitive.Root.Actions>(null);
  const formatter = React.useMemo(
    () => new Intl.DateTimeFormat(formatLocale, dateFormat),
    [dateFormat, formatLocale],
  );

  const handleSelect = (nextRange: DateRange | undefined) => {
    if (value === undefined) {
      setUncontrolledValue(nextRange);
    }

    onValueChange?.(nextRange);

    if (nextRange?.from && nextRange.to) {
      actionsRef.current?.close();
    }
  };

  const handleClear = () => {
    if (value === undefined) {
      setUncontrolledValue(undefined);
    }

    onValueChange?.(undefined);
    actionsRef.current?.close();
  };

  return (
    <PopoverPrimitive.Root
      actionsRef={actionsRef}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <PopoverPrimitive.Trigger
        render={
          <button
            type="button"
            data-slot="date-range-picker-trigger"
            className={cn(
              "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2 border border-input bg-background px-3 text-left text-sm outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-foreground/40 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 motion-reduce:transition-none",
              !selected?.from && "text-muted-foreground",
              className,
            )}
            disabled={disabled}
            {...props}
          />
        }
      >
        {children ?? (
          <>
            <CalendarRange className="size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">
              {formatRange(selected, formatter, placeholder)}
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
            data-slot="date-range-picker-content"
            className="w-[min(17.25rem,var(--available-width))] overflow-auto border border-border bg-popover text-popover-foreground outline-none transition-opacity duration-100 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 motion-reduce:transition-none"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Date range
              </span>
              <output className="truncate font-mono text-xs tabular-nums" aria-live="polite">
                {formatRange(selected, formatter, "Not selected")}
              </output>
            </div>
            <Calendar
              {...calendarProps}
              mode="range"
              selected={selected}
              autoFocus={calendarProps?.autoFocus ?? true}
              defaultMonth={calendarProps?.defaultMonth ?? selected?.from}
              min={calendarProps?.min ?? 1}
              resetOnSelect={calendarProps?.resetOnSelect ?? true}
              onSelect={handleSelect}
            />
            <div className="flex items-center border-t border-border p-2">
              <button
                type="button"
                className="h-8 cursor-pointer px-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none"
                onClick={() => {
                  const today = new Date();
                  handleSelect({ from: today, to: today });
                }}
              >
                Today
              </button>
              {selected?.from ? (
                <button
                  type="button"
                  className="h-8 cursor-pointer px-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none"
                  onClick={handleClear}
                >
                  Clear
                </button>
              ) : null}
            </div>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>

      {fromName ? (
        <input
          type="hidden"
          name={fromName}
          value={selected?.from ? formatInputDate(selected.from) : ""}
          disabled={disabled}
        />
      ) : null}
      {toName ? (
        <input
          type="hidden"
          name={toName}
          value={selected?.to ? formatInputDate(selected.to) : ""}
          disabled={disabled}
        />
      ) : null}
    </PopoverPrimitive.Root>
  );
}

function formatRange(
  range: DateRange | undefined,
  formatter: Intl.DateTimeFormat,
  placeholder: string,
) {
  if (!range?.from) {
    return placeholder;
  }

  if (!range.to) {
    return `${formatter.format(range.from)} – …`;
  }

  return `${formatter.format(range.from)} – ${formatter.format(range.to)}`;
}

function formatInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export type { DatePickerProps, DateRangePickerProps };
export { Calendar, DatePicker, DateRangePicker };
