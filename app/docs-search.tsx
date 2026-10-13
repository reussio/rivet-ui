"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  CommandBar,
  type CommandBarAction,
  CommandBarTrigger,
} from "@/registry/rivetui/components/command-bar/command-bar";
import { KeyboardShortcut } from "@/registry/rivetui/components/keyboard-shortcut/keyboard-shortcut";

type DocsSearchItem = {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly group: string;
};

function DocsSearch({ items }: { items: readonly DocsSearchItem[] }) {
  const router = useRouter();
  const actions: readonly CommandBarAction[] = items.map((item) => ({
    id: item.slug,
    label: item.name,
    description: item.description,
    group: item.group,
    keywords: [item.slug, `@rivetui/${item.slug}`],
  }));

  return (
    <CommandBar
      actions={actions}
      label="Search Rivet UI documentation"
      placeholder="Search components"
      emptyMessage="No component matches your search."
      onActionSelect={(action) => router.push(`/components/${action.id}`)}
    >
      <CommandBarTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="group h-9 justify-start gap-0 px-0 font-normal text-muted-foreground hover:text-foreground"
            aria-label="Search documentation"
          />
        }
      >
        <span className="grid size-9 place-items-center border-r border-transparent transition-colors group-hover:border-border sm:border-border">
          <Search className="size-4" aria-hidden="true" />
        </span>
        <span className="hidden min-w-40 px-3 text-left text-xs sm:block lg:min-w-52">
          Search components
        </span>
        <KeyboardShortcut keys={["mod", "K"]} size="sm" className="mr-2 hidden md:inline-flex" />
      </CommandBarTrigger>
    </CommandBar>
  );
}

export type { DocsSearchItem };
export { DocsSearch };
