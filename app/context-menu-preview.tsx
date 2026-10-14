import { Copy, Eye, GitBranch, RefreshCw, Trash2 } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/rivetui/components/context-menu/context-menu";

const primaryCode = `import { Copy, Eye, GitBranch, RefreshCw, Trash2 } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger
    tabIndex={0}
    aria-label="Deployment artifact actions"
    className="group grid min-h-56 select-none place-items-center border border-dashed border-border bg-muted/10 p-6 text-center outline-none transition-colors hover:border-foreground/40 hover:bg-muted/25 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
  >
    <div>
      <span className="mx-auto mb-4 grid size-10 place-items-center border border-border bg-background font-mono text-xs text-muted-foreground group-hover:text-foreground">↗</span>
      <p className="text-sm font-semibold">Deployment artifact</p>
      <p className="mt-1 text-sm text-muted-foreground">Right click or long press this surface.</p>
      <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">build_84f2 · fra1 · ready</p>
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-60">
    <ContextMenuGroup>
      <ContextMenuLabel>Artifact</ContextMenuLabel>
      <ContextMenuItem><Eye aria-hidden="true" />Inspect<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>
      <ContextMenuItem><Copy aria-hidden="true" />Copy identifier<ContextMenuShortcut>⌘ C</ContextMenuShortcut></ContextMenuItem>
      <ContextMenuItem><RefreshCw aria-hidden="true" />Redeploy</ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger><GitBranch aria-hidden="true" />Promote to</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Preview</ContextMenuItem>
          <ContextMenuItem>Staging</ContextMenuItem>
          <ContextMenuItem>Production</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuItem destructive><Trash2 aria-hidden="true" />Delete artifact</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

const selectionCode = `import { Copy, Eye, GitBranch, RefreshCw, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
export function SelectionExample() {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger
          tabIndex={0}
          aria-label="Canvas layer options"
          className="flex min-h-24 w-full max-w-xl select-none items-center justify-between border border-border px-4 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <span className="text-sm font-medium">Canvas layers</span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            Context available
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuGroup>
            <ContextMenuLabel>Visibility</ContextMenuLabel>
            <ContextMenuCheckboxItem defaultChecked>Grid guides</ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem defaultChecked>Safe area</ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem disabled>Baseline grid</ContextMenuCheckboxItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}`;

export function ContextMenuPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="p-5 sm:p-8">
          <ContextMenu>
            <ContextMenuTrigger
              tabIndex={0}
              aria-label="Deployment artifact actions"
              className="group grid min-h-56 select-none place-items-center border border-dashed border-border bg-muted/10 p-6 text-center outline-none transition-colors hover:border-foreground/40 hover:bg-muted/25 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <div>
                <span className="mx-auto mb-4 grid size-10 place-items-center border border-border bg-background font-mono text-xs text-muted-foreground group-hover:text-foreground">
                  ↗
                </span>
                <p className="text-sm font-semibold">Deployment artifact</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Right click or long press this surface.
                </p>
                <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                  build_84f2 · fra1 · ready
                </p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-60">
              <ContextMenuGroup>
                <ContextMenuLabel>Artifact</ContextMenuLabel>
                <ContextMenuItem>
                  <Eye aria-hidden="true" />
                  Inspect
                  <ContextMenuShortcut>Enter</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Copy aria-hidden="true" />
                  Copy identifier
                  <ContextMenuShortcut>⌘ C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <RefreshCw aria-hidden="true" />
                  Redeploy
                </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <GitBranch aria-hidden="true" />
                    Promote to
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Preview</ContextMenuItem>
                    <ContextMenuItem>Staging</ContextMenuItem>
                    <ContextMenuItem>Production</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuItem destructive>
                <Trash2 aria-hidden="true" />
                Delete artifact
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </ComponentExample>

      <PreviewRow label="Selection" code={selectionCode}>
        <ContextMenu>
          <ContextMenuTrigger
            tabIndex={0}
            aria-label="Canvas layer options"
            className="flex min-h-24 w-full max-w-xl select-none items-center justify-between border border-border px-4 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <span className="text-sm font-medium">Canvas layers</span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
              Context available
            </span>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuGroup>
              <ContextMenuLabel>Visibility</ContextMenuLabel>
              <ContextMenuCheckboxItem defaultChecked>Grid guides</ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem defaultChecked>Safe area</ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem disabled>Baseline grid</ContextMenuCheckboxItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </PreviewRow>
    </div>
  );
}

function PreviewRow({
  label,
  children,
  code,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
