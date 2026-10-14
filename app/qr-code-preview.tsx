import { ExternalLink, ScanLine } from "lucide-react";
import { ComponentExample } from "@/app/component-example";
import { rivetMarkDataUrl } from "@/app/rivet-logo";
import { QRCode } from "@/registry/rivetui/components/qr-code/qr-code";

const primaryCode = `import { ExternalLink, ScanLine } from "lucide-react"
import { QRCode } from "@/components/ui/qr-code"

const docsUrl = "https://rivetui.reuss.dev"

export function DocumentationQrCode() {
  return <div className="mx-auto grid max-w-2xl border border-border sm:grid-cols-[auto_minmax(0,1fr)]">
  <div className="flex items-center justify-center border-b border-border bg-white p-5 sm:border-r sm:border-b-0">
    <QRCode value={docsUrl} size={184} aria-label="Open the Rivet UI documentation" />
  </div>
  <div className="flex min-w-0 flex-col justify-between gap-8 p-5 sm:p-6">
    <div>
      <span className="inline-flex size-9 items-center justify-center border border-border text-muted-foreground">
        <ScanLine className="size-4" aria-hidden="true" />
      </span>
      <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
        Destination / Documentation
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">Open Rivet UI</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Scan to open the component registry on another device.
      </p>
    </div>
    <a
      href={docsUrl}
      className="flex min-w-0 items-center gap-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground"
    >
      <span className="truncate">{docsUrl}</span>
      <ExternalLink className="ml-auto size-3.5 shrink-0" aria-hidden="true" />
    </a>
  </div>
  </div>
}`;

const withLogoCode = `import { QRCode } from "@/components/ui/qr-code"

<QRCode
  value="https://rivetui.reuss.dev"
  size={152}
  logo={{ src: "/logo.svg", size: 32 }}
  aria-label="Rivet UI documentation with embedded Rivet mark"
/>`;

const docsUrl = "https://rivetui.reuss.dev";

export function QRCodePreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Encode links, Wi-Fi credentials, passkey handoffs, or any other string payload."
        note="size, foreground, and background are presentation controls. Keep strong contrast and always provide an accessible label."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
          <div className="mx-auto grid max-w-2xl border border-border sm:grid-cols-[auto_minmax(0,1fr)]">
            <div className="flex items-center justify-center border-b border-border bg-white p-5 sm:border-r sm:border-b-0">
              <QRCode value={docsUrl} size={184} aria-label="Open the Rivet UI documentation" />
            </div>
            <div className="flex min-w-0 flex-col justify-between gap-8 p-5 sm:p-6">
              <div>
                <span className="inline-flex size-9 items-center justify-center border border-border text-muted-foreground">
                  <ScanLine className="size-4" aria-hidden="true" />
                </span>
                <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Destination / Documentation
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">Open Rivet UI</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Scan to open the component registry on another device.
                </p>
              </div>
              <a
                href={docsUrl}
                className="flex min-w-0 items-center gap-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="truncate">{docsUrl}</span>
                <ExternalLink className="ml-auto size-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </ComponentExample>

      <PreviewRow
        label="Embedded logo"
        description="Place a small brand mark in the center when the destination needs stronger visual identity."
        note="Adding a logo automatically uses high error correction and clears the modules behind the image."
        code={withLogoCode}
      >
        <QRCode
          value={docsUrl}
          size={152}
          logo={{ src: rivetMarkDataUrl, size: 32 }}
          aria-label="Rivet UI documentation with embedded Rivet mark"
        />
        <div className="max-w-sm">
          <p className="text-sm font-medium">High correction</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Adding a logo automatically uses level H and clears the modules behind the mark.
          </p>
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
      <div className="flex min-w-0 flex-wrap items-center gap-6 overflow-x-auto p-4">
        {children}
      </div>
    </ComponentExample>
  );
}
