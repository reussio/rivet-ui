import { AlertTriangle, Check, CircleAlert, Info } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import {
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/registry/rivetui/components/alert/alert";
import { Button } from "@/registry/rivetui/components/button/button";

const primaryCode = `import { AlertTriangle } from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

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
    <Button variant="outline" size="sm">Review</Button>
  </AlertAction>
</Alert>`;

const statesCode = `import { AlertTriangle, Check, CircleAlert, Info } from "lucide-react";
import {
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
export function StatesExample() {
  return (
    <>
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
    </>
  );
}`;

export function AlertPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow label="States" code={statesCode}>
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
