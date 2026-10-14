"use client";

import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  LoadingBar,
  LoadingBarProvider,
  useLoadingBar,
} from "@/registry/rivetui/components/loading-bar/loading-bar";

const primaryCode = `import { LoadingBar } from "@/components/ui/loading-bar"

<div className="relative min-h-40 overflow-hidden border border-border bg-muted/10 p-5">
  <LoadingBar position="absolute" label="Loading deployment route" />
  <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
    Application shell
  </p>
  <p className="mt-12 max-w-sm text-sm leading-6 text-muted-foreground">
    Indeterminate navigation progress remains anchored to the top edge without shifting layout.
  </p>
</div>`;

const globalHookCode = `import { Button } from "@/components/ui/button";
import { LoadingBar, LoadingBarProvider, useLoadingBar } from "@/components/ui/loading-bar";
function LoadingBarControls() {
  const loadingBar = useLoadingBar();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" onClick={() => loadingBar.start("Loading deployment")}>
        Start
      </Button>
      <Button size="sm" variant="outline" onClick={() => loadingBar.setProgress(68)}>
        Set 68%
      </Button>
      <Button size="sm" variant="outline" onClick={loadingBar.complete}>
        Complete
      </Button>
      <Button size="sm" variant="ghost" onClick={loadingBar.reset}>
        Reset
      </Button>
      <span
        className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground"
        aria-live="polite"
      >
        {loadingBar.active
          ? loadingBar.value === undefined
            ? "Running"
            : \`\${loadingBar.value}%\`
          : "Idle"}
      </span>
    </div>
  );
}
export function GlobalHookExample() {
  return (
    <>
      <LoadingBarControls />
    </>
  );
}`;

const determinateCode = `import { Button } from "@/components/ui/button";
import { LoadingBar, LoadingBarProvider, useLoadingBar } from "@/components/ui/loading-bar";
export function DeterminateExample() {
  return (
    <>
      <div className="grid gap-4">
        {[24, 68, 100].map((value) => (
          <div key={value} className="relative h-8 overflow-hidden border border-border">
            <LoadingBar position="absolute" value={value} label={\`Loading \${value}% complete\`} />
            <span className="flex h-full items-center px-3 font-mono text-[0.625rem] tabular-nums text-muted-foreground">
              {value}%
            </span>
          </div>
        ))}
      </div>
    </>
  );
}`;

export function LoadingBarPreview() {
  return (
    <div className="relative">
      <LoadingBarProvider
        position="absolute"
        label="Loading preview operation"
        completionDuration={350}
      >
        <div className="mt-8 grid gap-12">
          <ComponentExample
            title="Default"
            description="Anchor indeterminate navigation progress to the application edge without shifting content."
            code={primaryCode}
            previewClassName="p-0"
          >
            <div className="p-5 sm:p-8">
              <div className="relative min-h-40 overflow-hidden border border-border bg-muted/10 p-5">
                <LoadingBar position="absolute" label="Loading deployment route" />
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Application shell
                </p>
                <p className="mt-12 max-w-sm text-sm leading-6 text-muted-foreground">
                  Indeterminate navigation progress remains anchored to the top edge without
                  shifting layout.
                </p>
              </div>
            </div>
          </ComponentExample>

          <PreviewRow
            label="Global controller"
            description="Start, update, complete, or reset the shared bar from any descendant of LoadingBarProvider."
            code={globalHookCode}
          >
            <LoadingBarControls />
          </PreviewRow>
          <PreviewRow
            label="Determinate progress"
            description="Provide a numeric value when the operation exposes measurable progress."
            note="Set active={false} or call reset() to return the global bar to its idle state."
            code={determinateCode}
          >
            <div className="grid gap-4">
              {[24, 68, 100].map((value) => (
                <div key={value} className="relative h-8 overflow-hidden border border-border">
                  <LoadingBar
                    position="absolute"
                    value={value}
                    label={`Loading ${value}% complete`}
                  />
                  <span className="flex h-full items-center px-3 font-mono text-[0.625rem] tabular-nums text-muted-foreground">
                    {value}%
                  </span>
                </div>
              ))}
            </div>
          </PreviewRow>
        </div>
      </LoadingBarProvider>
    </div>
  );
}

function LoadingBarControls() {
  const loadingBar = useLoadingBar();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" onClick={() => loadingBar.start("Loading deployment")}>
        Start
      </Button>
      <Button size="sm" variant="outline" onClick={() => loadingBar.setProgress(68)}>
        Set 68%
      </Button>
      <Button size="sm" variant="outline" onClick={loadingBar.complete}>
        Complete
      </Button>
      <Button size="sm" variant="ghost" onClick={loadingBar.reset}>
        Reset
      </Button>
      <span
        className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground"
        aria-live="polite"
      >
        {loadingBar.active
          ? loadingBar.value === undefined
            ? "Running"
            : `${loadingBar.value}%`
          : "Idle"}
      </span>
    </div>
  );
}

function PreviewRow({
  label,
  children,
  code,
  description,
  note,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
  note?: string;
}) {
  return (
    <ComponentExample title={label} description={description} note={note} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
