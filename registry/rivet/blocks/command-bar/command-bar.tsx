"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Search, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type CommandBarAction = {
  id: string;
  label: string;
  description?: string;
  group?: string;
  keywords?: readonly string[];
  shortcut?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
};

type CommandBarProps = Omit<
  DialogPrimitive.Root.Props<unknown>,
  "children" | "defaultOpen" | "onOpenChange" | "open"
> & {
  actions: readonly CommandBarAction[];
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onActionSelect?: (action: CommandBarAction) => void;
  label?: string;
  placeholder?: string;
  emptyMessage?: React.ReactNode;
  hotkey?: boolean;
  closeOnSelect?: boolean;
};

function CommandBar({
  actions,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onActionSelect,
  label = "Command bar",
  placeholder = "Search commands",
  emptyMessage = "No commands found.",
  hotkey = true,
  closeOnSelect = true,
  ...props
}: CommandBarProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listId = React.useId();
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen);
      }
      if (!nextOpen) {
        setQuery("");
        setActiveId(null);
      }
      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange],
  );

  React.useEffect(() => {
    if (!hotkey) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!open);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hotkey, open, setOpen]);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredActions = React.useMemo(() => {
    if (!normalizedQuery) {
      return actions;
    }

    return actions.filter((action) =>
      [action.label, action.description, action.group, ...(action.keywords ?? [])]
        .filter(Boolean)
        .some((value) => value?.toLocaleLowerCase().includes(normalizedQuery)),
    );
  }, [actions, normalizedQuery]);

  const enabledActions = filteredActions.filter((action) => !action.disabled);
  const activeAction =
    enabledActions.find((action) => action.id === activeId) ?? enabledActions.at(0) ?? null;

  const groupedActions = React.useMemo(() => {
    const groups = new Map<string, CommandBarAction[]>();
    for (const action of filteredActions) {
      const group = action.group ?? "Actions";
      const groupActions = groups.get(group) ?? [];
      groupActions.push(action);
      groups.set(group, groupActions);
    }
    return [...groups.entries()];
  }, [filteredActions]);

  function moveActive(direction: 1 | -1) {
    if (enabledActions.length === 0) {
      return;
    }
    const currentIndex = activeAction
      ? enabledActions.findIndex((action) => action.id === activeAction.id)
      : -1;
    const nextIndex = (currentIndex + direction + enabledActions.length) % enabledActions.length;
    setActiveId(enabledActions[nextIndex]?.id ?? null);
  }

  function selectAction(action: CommandBarAction) {
    if (action.disabled) {
      return;
    }
    action.onSelect?.();
    onActionSelect?.(action);
    if (closeOnSelect) {
      setOpen(false);
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Enter" && activeAction) {
      event.preventDefault();
      selectAction(activeAction);
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)} {...props}>
      {children}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-black/55 transition-opacity duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none dark:bg-black/70" />
        <DialogPrimitive.Viewport className="fixed inset-0 z-50 flex min-h-dvh items-start justify-center overflow-y-auto px-4 pt-[15vh] pb-8">
          <DialogPrimitive.Popup
            data-slot="command-bar"
            initialFocus={inputRef}
            className="w-full max-w-xl overflow-hidden border border-border bg-popover text-popover-foreground outline-none transition-[opacity,transform] duration-100 data-ending-style:translate-y-1 data-ending-style:opacity-0 data-starting-style:-translate-y-1 data-starting-style:opacity-0 motion-reduce:transition-none"
          >
            <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Search and select an available command.
            </DialogPrimitive.Description>

            <div className="relative border-b border-border">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                role="combobox"
                aria-autocomplete="list"
                aria-controls={listId}
                aria-expanded="true"
                aria-activedescendant={activeAction ? `${listId}-${activeAction.id}` : undefined}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveId(null);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                className="h-14 w-full bg-transparent pr-14 pl-11 text-sm outline-none placeholder:text-muted-foreground"
              />
              <DialogPrimitive.Close
                aria-label="Close command bar"
                className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <X className="size-4" aria-hidden="true" />
              </DialogPrimitive.Close>
            </div>

            <div
              id={listId}
              role="listbox"
              aria-label="Commands"
              className="max-h-80 overflow-y-auto p-2"
            >
              {groupedActions.map(([group, groupActions], groupIndex) => (
                <div key={group} className="py-1">
                  <div
                    id={`${listId}-group-${groupIndex}`}
                    className="px-3 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {group}
                  </div>
                  {groupActions.map((action) => {
                    const isActive = action.id === activeAction?.id;
                    return (
                      <button
                        key={action.id}
                        id={`${listId}-${action.id}`}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        disabled={action.disabled}
                        data-active={isActive ? "" : undefined}
                        onPointerMove={() => {
                          if (!action.disabled) {
                            setActiveId(action.id);
                          }
                        }}
                        onClick={() => selectAction(action)}
                        className={cn(
                          "flex min-h-12 w-full items-center gap-3 px-3 py-2 text-left text-sm outline-none transition-colors data-active:bg-accent data-active:text-accent-foreground disabled:pointer-events-none disabled:opacity-40",
                        )}
                      >
                        {action.icon ? (
                          <span className="grid size-5 shrink-0 place-items-center text-muted-foreground [&>svg]:size-4">
                            {action.icon}
                          </span>
                        ) : null}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{action.label}</span>
                          {action.description ? (
                            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                              {action.description}
                            </span>
                          ) : null}
                        </span>
                        {action.shortcut ? (
                          <kbd className="shrink-0 border border-border px-1.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
                            {action.shortcut}
                          </kbd>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ))}

              {filteredActions.length === 0 ? (
                <div className="px-3 py-10 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Viewport>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function CommandBarTrigger<Payload>(props: DialogPrimitive.Trigger.Props<Payload>) {
  return <DialogPrimitive.Trigger data-slot="command-bar-trigger" {...props} />;
}

export type { CommandBarAction, CommandBarProps };
export { CommandBar, CommandBarTrigger };
