import { Copy, Ellipsis, Eye, GitBranch, Settings2, Trash2 } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/rivetui/components/dropdown-menu/dropdown-menu";

const primaryCode = `import { Copy, Ellipsis, Eye, GitBranch, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<div className="flex items-center justify-between gap-4 border border-border p-4">
  <div className="min-w-0">
    <p className="font-medium">Production gateway</p>
    <p className="mt-1 truncate font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
      dep_01K2M7Q9 · fra1
    </p>
  </div>
  <DropdownMenu>
  <DropdownMenuTrigger
    render={<Button variant="ghost" size="icon-sm" />}
    aria-label="Open deployment actions"
  >
    <Ellipsis aria-hidden="true" />
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-60">
    <DropdownMenuGroup>
      <DropdownMenuLabel>Deployment</DropdownMenuLabel>
      <DropdownMenuItem>
        <Eye aria-hidden="true" />
        View details
        <DropdownMenuShortcut>Enter</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Copy aria-hidden="true" />
        Copy identifier
        <DropdownMenuShortcut>⌘ C</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <GitBranch aria-hidden="true" />
          Promote to
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Preview</DropdownMenuItem>
          <DropdownMenuItem>Staging</DropdownMenuItem>
          <DropdownMenuItem>Production</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive>
      <Trash2 aria-hidden="true" />
      Remove deployment
    </DropdownMenuItem>
  </DropdownMenuContent>
  </DropdownMenu>
</div>`;

const selectionCode = `import { Copy, Ellipsis, Eye, GitBranch, Settings2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function SelectionExample() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
          <Settings2 aria-hidden="true" />
          View options
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Display</DropdownMenuLabel>
            <DropdownMenuCheckboxItem defaultChecked>Runtime status</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem defaultChecked>Request volume</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem disabled>Build duration</DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup defaultValue="compact">
            <DropdownMenuLabel>Density</DropdownMenuLabel>
            <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}`;

export function DropdownMenuPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between gap-4 border border-border p-4">
            <div className="min-w-0">
              <p className="font-medium">Production gateway</p>
              <p className="mt-1 truncate font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                dep_01K2M7Q9 · fra1
              </p>
            </div>
            <DeploymentMenu />
          </div>
        </div>
      </ComponentExample>

      <PreviewRow label="Selection" code={selectionCode}>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
            <Settings2 aria-hidden="true" />
            View options
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Display</DropdownMenuLabel>
              <DropdownMenuCheckboxItem defaultChecked>Runtime status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem defaultChecked>Request volume</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem disabled>Build duration</DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup defaultValue="compact">
              <DropdownMenuLabel>Density</DropdownMenuLabel>
              <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </PreviewRow>
    </div>
  );
}

function DeploymentMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" />}
        aria-label="Open deployment actions"
      >
        <Ellipsis aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Deployment</DropdownMenuLabel>
          <DropdownMenuItem>
            <Eye aria-hidden="true" />
            View details
            <DropdownMenuShortcut>Enter</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy aria-hidden="true" />
            Copy identifier
            <DropdownMenuShortcut>⌘ C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <GitBranch aria-hidden="true" />
              Promote to
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Preview</DropdownMenuItem>
              <DropdownMenuItem>Staging</DropdownMenuItem>
              <DropdownMenuItem>Production</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <Trash2 aria-hidden="true" />
          Remove deployment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">{children}</div>
    </ComponentExample>
  );
}
