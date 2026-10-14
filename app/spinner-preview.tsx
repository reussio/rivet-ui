import { ComponentExample } from "@/app/component-example";
import { Button } from "@/registry/rivetui/components/button/button";
import { Spinner } from "@/registry/rivetui/components/spinner/spinner";

const primaryCode = `import { Spinner } from "@/components/ui/spinner"

<div className="flex items-center gap-3 border border-border px-4 py-3 text-sm">
  <Spinner aria-label="Building deployment" />
  Building deployment
</div>`;

const inControlCode = `import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
export function InControlExample() {
  return (
    <>
      <Button disabled>
        <Spinner aria-hidden="true" />
        Deploying
      </Button>
    </>
  );
}`;

export function SpinnerPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Communicate short, indeterminate work without shifting nearby content."
        note={
          <>
            The available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.
          </>
        }
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="flex min-h-40 items-center justify-center p-5 sm:p-8">
          <div className="flex items-center gap-3 border border-border px-4 py-3 text-sm">
            <Spinner aria-label="Building deployment" />
            Building deployment
          </div>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Inside a control"
        description="Hide the decorative spinner from assistive technology when the button already names the action."
        code={inControlCode}
      >
        <Button disabled>
          <Spinner aria-hidden="true" />
          Deploying
        </Button>
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
