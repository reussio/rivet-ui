import { ComponentExample } from "@/app/component-example";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/rivetui/components/breadcrumb/breadcrumb";

const primaryCode = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<div className="w-full border border-border">
  <div className="border-b border-border bg-muted/20 px-4 py-3">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#projects">Projects</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#rivet">Rivet UI</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Production</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
  <div className="p-4 sm:p-5">
    <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
      Environment / production
    </p>
    <p className="mt-2 text-lg font-semibold tracking-tight">Frankfurt gateway</p>
  </div>
</div>`;

const collapsedCode = `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export function CollapsedExample() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#workspace">Workspace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Observability</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}`;

const customCode = `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export function CustomExample() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#deployments">Deployments</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>→</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>8F31C2A</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}`;

export function BreadcrumbPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="flex min-h-44 items-center p-5 sm:p-8">
          <div className="w-full border border-border">
            <div className="border-b border-border bg-muted/20 px-4 py-3">
              <ProjectBreadcrumb />
            </div>
            <div className="p-4 sm:p-5">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                Environment / production
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight">Frankfurt gateway</p>
            </div>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow label="Collapsed" code={collapsedCode}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#workspace">Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Observability</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PreviewRow>
      <PreviewRow label="Custom" code={customCode}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#deployments">Deployments</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>→</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>8F31C2A</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PreviewRow>
    </div>
  );
}

function ProjectBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#rivet">Rivet UI</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Production</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
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
      <div className="flex min-w-0 flex-wrap items-center p-4">{children}</div>
    </ComponentExample>
  );
}
