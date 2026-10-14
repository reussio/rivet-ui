import { ComponentExample } from "@/app/component-example";
import { WebsiteLink } from "@/registry/rivetui/components/website-link/website-link";

const primaryCode = `import { WebsiteLink } from "@/components/ui/website-link"

<article className="w-full max-w-xl border border-border bg-muted/10 p-5 sm:p-6">
  <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
    Release note / 04
  </p>
  <p className="mt-4 text-base leading-8 text-muted-foreground">
    The component registry is documented on{" "}
    <WebsiteLink href="https://rivetui.reuss.dev" title="Rivet UI" target="_blank" /> and
    follows the installation workflow from{" "}
    <WebsiteLink href="https://ui.shadcn.com" title="shadcn/ui" target="_blank" />.
  </p>
</article>`;

const metadataCode = `import { WebsiteLink } from "@/components/ui/website-link"

<div className="flex flex-wrap items-center gap-4">
  <WebsiteLink href="https://github.com" target="_blank" />
  <WebsiteLink href="mailto:team@example.com" />
  <WebsiteLink href="tel:+49-30-123456" />
</div>`;

const layoutCode = `import { WebsiteLink } from "@/components/ui/website-link"

<div className="grid gap-5">
  <div className="flex flex-wrap items-center gap-3">
    <WebsiteLink href="https://rivetui.reuss.dev" title="Small" size="sm" />
    <WebsiteLink href="https://rivetui.reuss.dev" title="Medium" />
    <WebsiteLink href="https://rivetui.reuss.dev" title="Large" size="lg" />
  </div>
  <div className="max-w-56">
    <WebsiteLink
      href="https://nextjs.org/docs"
      title="Next.js documentation and framework reference"
    />
  </div>
</div>`;

export function WebsiteLinkPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Use website links inline when the destination identity is useful context."
        note="title is optional. When omitted, WebsiteLink resolves available page metadata and falls back to a readable host label."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="flex min-h-64 items-center justify-center p-5 sm:p-8">
          <article className="w-full max-w-xl border border-border bg-muted/10 p-5 sm:p-6">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              Release note / 04
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The component registry is documented on{" "}
              <WebsiteLink href="https://rivetui.reuss.dev" title="Rivet UI" target="_blank" /> and
              follows the installation workflow from{" "}
              <WebsiteLink href="https://ui.shadcn.com" title="shadcn/ui" target="_blank" />.
            </p>
          </article>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Metadata and protocols"
        description="HTTP links resolve site identity, while mail and telephone links use dedicated fallbacks."
        code={metadataCode}
      >
        <WebsiteLink href="https://github.com" target="_blank" />
        <WebsiteLink href="mailto:team@example.com" />
        <WebsiteLink href="tel:+49-30-123456" />
      </PreviewRow>
      <PreviewRow
        label="Sizing and overflow"
        description="Sizes align the link with surrounding typography; long titles truncate inside constrained layouts."
        code={layoutCode}
      >
        <div className="grid w-full gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <WebsiteLink href="https://rivetui.reuss.dev" title="Small" size="sm" />
            <WebsiteLink href="https://rivetui.reuss.dev" title="Medium" />
            <WebsiteLink href="https://rivetui.reuss.dev" title="Large" size="lg" />
          </div>
          <div className="max-w-56">
            <WebsiteLink
              href="https://nextjs.org/docs"
              title="Next.js documentation and framework reference"
            />
          </div>
        </div>
      </PreviewRow>
    </div>
  );
}

function PreviewRow({
  label,
  children,
  code,
  description,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
}) {
  return (
    <ComponentExample title={label} description={description} code={code}>
      <div className="flex min-w-0 flex-wrap items-center p-4">{children}</div>
    </ComponentExample>
  );
}
