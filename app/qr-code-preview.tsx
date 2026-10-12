import { ExternalLink, ScanLine } from "lucide-react";

import { QRCode } from "@/registry/rivet/components/qr-code/qr-code";

const docsUrl = "https://rivetui.reuss.dev";
const rivetMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='white'/%3E%3Cpath fill='black' d='M12 12h40v40H12zm8 8v24h24V20zm8 8h12v12H28z'/%3E%3C/svg%3E";

export function QRCodePreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="qr-code-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 048
          </p>
          <h2 id="qr-code-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            QR code
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Encoded data
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
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

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Format" detail="SVG" />
            <Specification term="Correction" detail="M" />
            <Specification term="Quiet zone" detail="04" />
            <Specification term="Contrast" detail="21:1" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Sizes">
          <QRCode value={docsUrl} size={88} aria-label="Small Rivet UI QR code" />
          <QRCode value={docsUrl} size={120} aria-label="Medium Rivet UI QR code" />
          <QRCode value={docsUrl} size={152} aria-label="Large Rivet UI QR code" />
        </PreviewRow>

        <PreviewRow label="With logo">
          <QRCode
            value={docsUrl}
            size={152}
            logo={{ src: rivetMark, size: 32 }}
            aria-label="Rivet UI documentation with embedded Rivet mark"
          />
          <div className="max-w-sm">
            <p className="text-sm font-medium">High correction</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Adding a logo automatically uses level H and clears the modules behind the mark.
            </p>
          </div>
        </PreviewRow>

        <PreviewRow label="Custom tone">
          <QRCode
            value="WIFI:T:WPA;S:Rivet Guest;P:engineered-components;;"
            size={152}
            foreground="#1F2937"
            background="#F5F5F4"
            aria-label="Rivet Guest Wi-Fi credentials"
          />
          <div className="max-w-sm">
            <p className="text-sm font-medium">Wi-Fi payload</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Custom colors remain possible when their contrast stays reliably high.
            </p>
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
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="flex min-w-0 flex-wrap items-center gap-6 overflow-x-auto p-4">
        {children}
      </div>
    </div>
  );
}
