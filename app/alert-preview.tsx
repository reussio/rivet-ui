import { AlertTriangle, Check, CircleAlert, Info } from "lucide-react";

import {
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/registry/rivet/blocks/alert/alert";
import { Button } from "@/registry/rivet/blocks/button/button";

export function AlertPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="alert-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 022
          </p>
          <h2 id="alert-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Alert
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Message
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <Alert variant="warning">
            <AlertIcon>
              <AlertTriangle aria-hidden="true" />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>Production variables changed</AlertTitle>
              <AlertDescription>
                Create a new deployment before the updated values can serve traffic.
              </AlertDescription>
            </AlertContent>
            <AlertAction>
              <Button variant="outline" size="sm">
                Review
              </Button>
            </AlertAction>
          </Alert>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Role" detail="alert" />
            <Specification term="Regions" detail="04" />
            <Specification term="Tone" detail="semantic" />
            <Specification term="Action" detail="optional" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="States">
          <div className="grid w-full gap-3">
            <Alert>
              <AlertIcon>
                <Info aria-hidden="true" />
              </AlertIcon>
              <AlertContent>
                <AlertTitle>Deployment queued</AlertTitle>
                <AlertDescription>
                  A build worker will begin processing this revision shortly.
                </AlertDescription>
              </AlertContent>
            </Alert>
            <Alert variant="success">
              <AlertIcon>
                <Check aria-hidden="true" />
              </AlertIcon>
              <AlertContent>
                <AlertTitle>Health checks passed</AlertTitle>
                <AlertDescription>
                  All configured regions are accepting production traffic.
                </AlertDescription>
              </AlertContent>
            </Alert>
            <Alert variant="destructive">
              <AlertIcon>
                <CircleAlert aria-hidden="true" />
              </AlertIcon>
              <AlertContent>
                <AlertTitle>Deployment failed</AlertTitle>
                <AlertDescription>
                  The runtime did not start within the configured timeout.
                </AlertDescription>
              </AlertContent>
            </Alert>
          </div>
        </PreviewRow>
      </div>
    </section>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right">{detail}</dd>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
