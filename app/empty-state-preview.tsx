import { ArrowRight, PackageOpen, SearchX } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateLabel,
  EmptyStateMedia,
  EmptyStateTitle,
} from "@/registry/rivetui/components/empty-state/empty-state";

const primaryCode = `import { ArrowRight, PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateLabel,
  EmptyStateMedia,
  EmptyStateTitle,
} from "@/components/ui/empty-state"

<EmptyState>
  <EmptyStateMedia>
    <PackageOpen />
  </EmptyStateMedia>
  <EmptyStateHeader>
    <EmptyStateLabel>Workspace / Empty</EmptyStateLabel>
    <EmptyStateTitle>No deployments yet</EmptyStateTitle>
    <EmptyStateDescription>
      Connect a repository and ship the first revision to create a deployment history.
    </EmptyStateDescription>
  </EmptyStateHeader>
  <EmptyStateActions>
    <Button>
      Create deployment
      <ArrowRight aria-hidden="true" />
    </Button>
    <Button variant="outline">Import project</Button>
  </EmptyStateActions>
  <EmptyStateFooter>New deployments will appear here automatically.</EmptyStateFooter>
</EmptyState>`;

const compactCode = `import { ArrowRight, PackageOpen, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateLabel,
  EmptyStateMedia,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
export function CompactExample() {
  return (
    <>
      <EmptyState size="sm" className="max-w-xl">
        <EmptyStateMedia>
          <SearchX />
        </EmptyStateMedia>
        <EmptyStateHeader>
          <EmptyStateTitle>No matching projects</EmptyStateTitle>
          <EmptyStateDescription>
            Try another search term or clear the active filters.
          </EmptyStateDescription>
        </EmptyStateHeader>
        <EmptyStateActions>
          <Button variant="outline" size="sm">
            Clear filters
          </Button>
        </EmptyStateActions>
      </EmptyState>
    </>
  );
}`;

const unframedCode = `import { ArrowRight, PackageOpen, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateLabel,
  EmptyStateMedia,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
export function UnframedExample() {
  return (
    <>
      <EmptyState variant="plain" size="sm" className="max-w-xl items-start text-left">
        <EmptyStateHeader className="items-start">
          <EmptyStateLabel>Activity</EmptyStateLabel>
          <EmptyStateTitle>Nothing to review</EmptyStateTitle>
          <EmptyStateDescription>
            New events will appear here as soon as the project changes.
          </EmptyStateDescription>
        </EmptyStateHeader>
      </EmptyState>
    </>
  );
}`;

export function EmptyStatePreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="p-5 sm:p-8">
          <EmptyState>
            <EmptyStateMedia>
              <PackageOpen />
            </EmptyStateMedia>
            <EmptyStateHeader>
              <EmptyStateLabel>Workspace / Empty</EmptyStateLabel>
              <EmptyStateTitle>No deployments yet</EmptyStateTitle>
              <EmptyStateDescription>
                Connect a repository and ship the first revision to create a deployment history.
              </EmptyStateDescription>
            </EmptyStateHeader>
            <EmptyStateActions>
              <Button>
                Create deployment
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button variant="outline">Import project</Button>
            </EmptyStateActions>
            <EmptyStateFooter>New deployments will appear here automatically.</EmptyStateFooter>
          </EmptyState>
        </div>
      </ComponentExample>

      <PreviewRow label="Compact" code={compactCode}>
        <EmptyState size="sm" className="max-w-xl">
          <EmptyStateMedia>
            <SearchX />
          </EmptyStateMedia>
          <EmptyStateHeader>
            <EmptyStateTitle>No matching projects</EmptyStateTitle>
            <EmptyStateDescription>
              Try another search term or clear the active filters.
            </EmptyStateDescription>
          </EmptyStateHeader>
          <EmptyStateActions>
            <Button variant="outline" size="sm">
              Clear filters
            </Button>
          </EmptyStateActions>
        </EmptyState>
      </PreviewRow>
      <PreviewRow label="Unframed" code={unframedCode}>
        <EmptyState variant="plain" size="sm" className="max-w-xl items-start text-left">
          <EmptyStateHeader className="items-start">
            <EmptyStateLabel>Activity</EmptyStateLabel>
            <EmptyStateTitle>Nothing to review</EmptyStateTitle>
            <EmptyStateDescription>
              New events will appear here as soon as the project changes.
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
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
