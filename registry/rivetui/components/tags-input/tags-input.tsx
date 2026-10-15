"use client";

import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type TagsInputProps = Omit<
  React.ComponentProps<"input">,
  "className" | "defaultValue" | "onChange" | "type" | "value"
> & {
  addOnBlur?: boolean;
  className?: string;
  defaultValue?: readonly string[];
  inputClassName?: string;
  maxTags?: number;
  onValueChange?: (value: string[]) => void;
  removeTagLabel?: (tag: string) => string;
  validateTag?: (tag: string) => boolean;
  value?: readonly string[];
};

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(function TagsInput(
  {
    "aria-invalid": ariaInvalid,
    addOnBlur = true,
    className,
    defaultValue = [],
    disabled = false,
    form,
    inputClassName,
    maxTags = Number.POSITIVE_INFINITY,
    name,
    onBlur,
    onKeyDown,
    onPaste,
    onValueChange,
    readOnly = false,
    removeTagLabel = (tag) => `Remove ${tag}`,
    required,
    validateTag,
    value: valueProp,
    ...props
  },
  forwardedRef,
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>([...defaultValue]);
  const [inputValue, setInputValue] = React.useState("");
  const [announcement, setAnnouncement] = React.useState("");
  const value = valueProp ?? uncontrolledValue;
  const resolvedMaxTags = Math.max(1, maxTags);
  const atLimit = value.length >= resolvedMaxTags;
  const interactionDisabled = disabled || readOnly;
  const invalid = ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== "false";

  function updateValue(nextValue: string[]) {
    if (valueProp === undefined) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  function addTags(candidates: readonly string[]) {
    if (interactionDisabled) {
      return 0;
    }

    const nextValue = [...value];
    const knownTags = new Set(nextValue.map(normalizeTag));
    let added = 0;

    for (const candidate of candidates) {
      const tag = candidate.trim();

      if (!tag) {
        continue;
      }

      if (nextValue.length >= resolvedMaxTags) {
        setAnnouncement(`Maximum of ${resolvedMaxTags} tags reached.`);
        break;
      }

      if (validateTag && !validateTag(tag)) {
        setAnnouncement(`${tag} is not a valid tag.`);
        continue;
      }

      const normalizedTag = normalizeTag(tag);
      if (knownTags.has(normalizedTag)) {
        setAnnouncement(`${tag} is already added.`);
        continue;
      }

      nextValue.push(tag);
      knownTags.add(normalizedTag);
      added += 1;
    }

    if (added > 0) {
      updateValue(nextValue);
      setAnnouncement(added === 1 ? `${nextValue.at(-1)} added.` : `${added} tags added.`);
    }

    return added;
  }

  function commitInput() {
    const candidate = inputValue.trim();
    if (!candidate) {
      return;
    }

    const added = addTags([candidate]);
    const duplicate = value.some((tag) => normalizeTag(tag) === normalizeTag(candidate));

    if (added > 0 || duplicate) {
      setInputValue("");
    }
  }

  function removeTag(tag: string) {
    if (interactionDisabled) {
      return;
    }

    updateValue(value.filter((candidate) => candidate !== tag));
    setAnnouncement(`${tag} removed.`);
    inputRef.current?.focus();
  }

  return (
    <div
      data-slot="tags-input"
      data-disabled={disabled ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
      data-readonly={readOnly ? "" : undefined}
      className={cn(
        "flex min-h-10 w-full min-w-0 flex-wrap items-center gap-1.5 border border-input bg-background p-1.5 text-sm outline-none transition-[background-color,border-color,box-shadow,color,opacity] duration-100 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring/40 data-invalid:border-destructive data-invalid:has-[input:focus-visible]:border-destructive data-invalid:has-[input:focus-visible]:ring-destructive/25 data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:text-muted-foreground data-disabled:opacity-60 motion-reduce:transition-none",
        className,
      )}
    >
      {value.map((tag) => (
        <span
          key={tag}
          data-slot="tags-input-tag"
          className="inline-flex h-7 max-w-full items-center border border-border bg-muted/50 pl-2.5 text-xs font-medium text-foreground"
        >
          <span className="max-w-48 truncate">{tag}</span>
          <button
            type="button"
            data-slot="tags-input-remove"
            aria-label={removeTagLabel(tag)}
            disabled={interactionDisabled}
            className="ml-2 grid h-full w-7 shrink-0 cursor-pointer place-items-center border-l border-border text-muted-foreground outline-none transition-[background-color,box-shadow,color,opacity] duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
            onClick={() => removeTag(tag)}
          >
            <X className="size-3" aria-hidden="true" />
          </button>
        </span>
      ))}

      <input
        {...props}
        ref={(node) => {
          inputRef.current = node;
          setForwardedRef(forwardedRef, node);
        }}
        type="text"
        value={inputValue}
        aria-invalid={ariaInvalid}
        disabled={disabled}
        readOnly={readOnly || atLimit}
        required={required && value.length === 0}
        form={form}
        data-slot="tags-input-input"
        className={cn(
          "h-7 min-w-24 flex-[1_0_7rem] bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed read-only:cursor-default",
          inputClassName,
        )}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        onBlur={(event) => {
          onBlur?.(event);
          if (addOnBlur) {
            commitInput();
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);

          if (event.defaultPrevented || interactionDisabled) {
            return;
          }

          if ((event.key === "Enter" || event.key === ",") && inputValue.trim()) {
            event.preventDefault();
            commitInput();
          } else if (event.key === "Backspace" && !inputValue && value.length > 0) {
            event.preventDefault();
            removeTag(value[value.length - 1]);
          } else if (event.key === "Escape" && inputValue) {
            event.preventDefault();
            setInputValue("");
          }
        }}
        onPaste={(event) => {
          onPaste?.(event);

          if (event.defaultPrevented || interactionDisabled) {
            return;
          }

          const pastedText = event.clipboardData.getData("text");
          if (!/[\n\r,]/.test(pastedText)) {
            return;
          }

          event.preventDefault();
          addTags(pastedText.split(/[\n\r,]+/));
        }}
      />

      {name
        ? value.map((tag) => (
            <input
              key={`${name}-${tag}`}
              type="hidden"
              name={name}
              value={tag}
              form={form}
              disabled={disabled}
            />
          ))
        : null}

      <span role="status" className="sr-only">
        {announcement}
      </span>
    </div>
  );
});

function TagsInputLabel({ children, className, htmlFor, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      htmlFor={htmlFor}
      data-slot="tags-input-label"
      className={cn(
        "w-fit font-mono text-[0.6875rem] font-medium uppercase leading-none tracking-[0.14em] text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

function normalizeTag(tag: string) {
  return tag.toLocaleLowerCase();
}

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export type { TagsInputProps };
export { TagsInput, TagsInputLabel };
