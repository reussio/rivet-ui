import { ComponentExample } from "@/app/component-example";
import { Skeleton } from "@/registry/rivetui/components/skeleton/skeleton";

const primaryCode = `import { Skeleton } from "@/components/ui/skeleton"

<div className="border border-border" role="status" aria-label="Loading deployment details">
  <span className="sr-only">Loading deployment details</span>
  <div className="flex items-start justify-between gap-4 border-b border-border p-5">
    <div className="w-full max-w-sm space-y-3">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-6 w-52 max-w-full" />
      <Skeleton className="h-3 w-full" />
    </div>
    <Skeleton className="size-8 shrink-0" />
  </div>
  <div className="grid grid-cols-3 divide-x divide-border p-5">
    <MetricSkeleton />
    <MetricSkeleton />
    <MetricSkeleton />
  </div>
</div>

function MetricSkeleton() {
  return (
    <div className="space-y-3 px-4 first:pl-0 last:pr-0">
      <Skeleton className="h-2.5 w-12" />
      <Skeleton className="h-4 w-16 max-w-full" />
    </div>
  )
}`;

const textCode = `import { Skeleton } from "@/components/ui/skeleton";
export function TextExample() {
  return (
    <>
      <div className="w-full max-w-md space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </>
  );
}`;

const controlsCode = `import { Skeleton } from "@/components/ui/skeleton";
export function ControlsExample() {
  return (
    <>
      <Skeleton className="h-10 w-40" />
      <Skeleton className="size-10" />
      <Skeleton className="h-6 w-20" />
    </>
  );
}`;

export function SkeletonPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="p-5 sm:p-8">
          <div
            className="border border-border"
            role="status"
            aria-label="Loading deployment details"
          >
            <span className="sr-only">Loading deployment details</span>
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div className="w-full max-w-sm space-y-3">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-6 w-52 max-w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
              <Skeleton className="size-8 shrink-0" />
            </div>
            <div className="grid grid-cols-3 divide-x divide-border p-5">
              <MetricSkeleton />
              <MetricSkeleton />
              <MetricSkeleton />
            </div>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow label="Text" code={textCode}>
        <div className="w-full max-w-md space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </PreviewRow>
      <PreviewRow label="Controls" code={controlsCode}>
        <Skeleton className="h-10 w-40" />
        <Skeleton className="size-10" />
        <Skeleton className="h-6 w-20" />
      </PreviewRow>
    </div>
  );
}

function MetricSkeleton() {
  return (
    <div className="space-y-3 px-4 first:pl-0 last:pr-0">
      <Skeleton className="h-2.5 w-12" />
      <Skeleton className="h-4 w-16 max-w-full" />
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
      <div className="flex min-w-0 flex-wrap items-center gap-4 p-4">{children}</div>
    </ComponentExample>
  );
}
