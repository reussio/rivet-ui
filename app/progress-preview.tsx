"use client";

import { ComponentExample } from "@/app/component-example";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/registry/rivetui/components/progress/progress";

const primaryCode = `import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress"

<div className="border border-border p-5">
  <Progress value={72}>
    <ProgressLabel>Uploading deployment artifacts</ProgressLabel>
    <ProgressValue />
    <ProgressTrack><ProgressIndicator /></ProgressTrack>
  </Progress>
  <div className="mt-4 flex justify-between gap-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
    <span>36.8 MB / 51.2 MB</span>
    <span>12 sec remaining</span>
  </div>
</div>`;

const statesCode = `import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress";
export function StatesExample() {
  return (
    <>
      <div className="grid w-full gap-6 sm:grid-cols-3">
        <Progress value={38}>
          <ProgressLabel>Building</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <Progress value={100}>
          <ProgressLabel>Complete</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <Progress value={null} aria-valuetext="Waiting for build worker">
          <ProgressLabel>Waiting</ProgressLabel>
          <ProgressValue>{() => "Queued"}</ProgressValue>
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>
    </>
  );
}`;

export function ProgressPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Pair the visual track with a visible label and value."
        note={
          <>
            Non-percentage ranges use <code>min</code>, <code>max</code>, and a custom value
            formatter on the same composition.
          </>
        }
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
          <div className="border border-border p-5">
            <Progress value={72}>
              <ProgressLabel>Uploading deployment artifacts</ProgressLabel>
              <ProgressValue />
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <div className="mt-4 flex justify-between gap-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
              <span>36.8 MB / 51.2 MB</span>
              <span>12 sec remaining</span>
            </div>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Progress states"
        description="Use a numeric value for determinate progress and null while the duration is unknown."
        code={statesCode}
      >
        <div className="grid w-full gap-6 sm:grid-cols-3">
          <Progress value={38}>
            <ProgressLabel>Building</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
          <Progress value={100}>
            <ProgressLabel>Complete</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
          <Progress value={null} aria-valuetext="Waiting for build worker">
            <ProgressLabel>Waiting</ProgressLabel>
            <ProgressValue>{() => "Queued"}</ProgressValue>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </div>
      </PreviewRow>
    </div>
  );
}

function PreviewRow({
  label,
  description,
  children,
  code,
}: {
  label: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} description={description} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
