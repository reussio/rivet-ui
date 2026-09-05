"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { Check, Copy } from "lucide-react";
import * as React from "react";

import { SyntaxHighlight } from "@/lib/syntax-highlight";
import { cn } from "@/lib/utils";

type TerminalCommand<TValue extends string = string> = {
  label: string;
  value: TValue;
  command: string;
  language?: string;
};

type TerminalCommandList = readonly [TerminalCommand, ...TerminalCommand[]];

type StringWithAutocomplete<TValue extends string> = TValue | (string & Record<never, never>);

type TerminalCommonProps = Omit<React.ComponentProps<"div">, "children" | "defaultValue"> & {
  label?: React.ReactNode;
  prompt?: React.ReactNode | false;
  copyable?: boolean;
  language?: string;
};

type TerminalSingleProps = TerminalCommonProps & {
  command: string;
  commands?: never;
  defaultValue?: never;
  value?: never;
  onValueChange?: never;
};

type TerminalVariantsProps<TCommands extends TerminalCommandList = TerminalCommandList> =
  TerminalCommonProps & {
    command?: never;
    commands: TCommands;
    defaultValue?: StringWithAutocomplete<NoInfer<TCommands[number]["value"]>>;
    value?: StringWithAutocomplete<NoInfer<TCommands[number]["value"]>>;
    onValueChange?: (value: string) => void;
  };

type TerminalProps<TCommands extends TerminalCommandList = TerminalCommandList> =
  | TerminalSingleProps
  | TerminalVariantsProps<TCommands>;

function Terminal<const TCommands extends TerminalCommandList>(
  props: TerminalVariantsProps<TCommands>,
): React.JSX.Element;
function Terminal(props: TerminalSingleProps): React.JSX.Element;
function Terminal(props: TerminalProps) {
  if (props.commands !== undefined) {
    return <TerminalVariants {...props} />;
  }

  return <TerminalSingle {...props} />;
}

function TerminalSingle({
  command,
  label = "Terminal",
  prompt = "$",
  copyable = true,
  language = "shell",
  className,
  ...props
}: TerminalSingleProps) {
  return (
    <div
      data-slot="terminal"
      className={cn("border border-border bg-background", className)}
      {...props}
    >
      <TerminalHeader label={label}>
        {copyable ? <TerminalCopyButton value={command} /> : null}
      </TerminalHeader>
      <TerminalCode command={command} prompt={prompt} language={language} />
    </div>
  );
}

function TerminalVariants<const TCommands extends TerminalCommandList>({
  commands,
  defaultValue,
  value,
  onValueChange,
  label = "Terminal",
  prompt = "$",
  copyable = true,
  language = "shell",
  className,
  ...props
}: TerminalVariantsProps<TCommands>) {
  const firstValue = commands[0].value;
  const initialValue = commands.some((item) => item.value === defaultValue)
    ? (defaultValue ?? firstValue)
    : firstValue;
  const [internalValue, setInternalValue] = React.useState(initialValue);
  const selectedValue = value ?? internalValue;
  const selectedCommand = commands.find((item) => item.value === selectedValue) ?? commands[0];

  function handleValueChange(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  return (
    <TabsPrimitive.Root
      data-slot="terminal"
      value={selectedValue}
      onValueChange={handleValueChange}
      className={cn("border border-border bg-background", className)}
      {...props}
    >
      <TerminalHeader label={label}>
        <TabsPrimitive.List
          data-slot="terminal-list"
          activateOnFocus
          aria-label="Command variants"
          className="flex min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {commands.map((item) => (
            <TabsPrimitive.Tab
              key={item.value}
              data-slot="terminal-trigger"
              value={item.value}
              className="inline-flex min-h-11 flex-none cursor-pointer items-center border-l border-border px-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted/60 hover:text-foreground focus-visible:z-10 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 data-active:bg-foreground data-active:text-background motion-reduce:transition-none"
            >
              {item.label}
            </TabsPrimitive.Tab>
          ))}
        </TabsPrimitive.List>
        {copyable ? (
          <TerminalCopyButton key={selectedCommand.value} value={selectedCommand.command} />
        ) : null}
      </TerminalHeader>

      {commands.map((item) => (
        <TabsPrimitive.Panel
          key={item.value}
          data-slot="terminal-panel"
          value={item.value}
          className="outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
        >
          <TerminalCode
            command={item.command}
            prompt={prompt}
            language={item.language ?? language}
          />
        </TabsPrimitive.Panel>
      ))}
    </TabsPrimitive.Root>
  );
}

function TerminalHeader({
  label,
  children,
}: {
  label: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="terminal-header"
      className="flex min-h-11 min-w-0 items-stretch border-b border-border bg-muted/20"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 px-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
        <span className="truncate">{label}</span>
      </div>
      <div className="flex min-w-0 max-w-[75%] items-stretch">{children}</div>
    </div>
  );
}

function TerminalCode({
  command,
  prompt,
  language,
}: {
  command: string;
  prompt: React.ReactNode | false;
  language: string;
}) {
  return (
    <div data-slot="terminal-content" className="min-w-0 overflow-x-auto px-4 py-4 sm:px-5">
      <pre
        className={cn(
          "min-w-max font-mono text-[0.8125rem] leading-6 text-foreground",
          prompt !== false && "grid grid-cols-[auto_1fr] items-start gap-3",
        )}
      >
        {prompt !== false ? (
          <span className="select-none text-muted-foreground" aria-hidden="true">
            {prompt}
          </span>
        ) : null}
        <SyntaxHighlight code={command} language={language} />
      </pre>
    </div>
  );
}

function TerminalCopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      data-slot="terminal-copy"
      onClick={copyCommand}
      className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center border-l border-border text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted/60 hover:text-foreground focus-visible:z-10 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none"
      aria-label={copied ? "Command copied" : "Copy command"}
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Command copied to clipboard" : ""}
      </span>
    </button>
  );
}

export type { TerminalCommand, TerminalProps };
export { Terminal };
