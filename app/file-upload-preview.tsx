"use client";

import * as React from "react";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadMessage,
} from "@/registry/rivet/components/file-upload/file-upload";

const maxSize = 5 * 1024 * 1024;

export function FileUploadPreview() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="file-upload-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 037
          </p>
          <h2
            id="file-upload-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            File upload
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Input
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <FileUpload
            value={files}
            onValueChange={setFiles}
            accept=".png,.jpg,.jpeg,.pdf,.json"
            maxFiles={4}
            maxSize={maxSize}
            multiple
          >
            <FileUploadDropzone />
            <FileUploadMessage />
            <FileUploadList />
          </FileUpload>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Select" detail="click / drop" />
            <Specification term="Files" detail="04 max" />
            <Specification term="Limit" detail="05 MB" />
            <Specification term="State" detail={files.length ? `${files.length} ready` : "empty"} />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Single">
          <FileUpload accept="image/*" maxSize={maxSize} className="max-w-xl">
            <FileUploadDropzone className="min-h-28 p-4" />
            <FileUploadMessage />
            <FileUploadList />
          </FileUpload>
        </PreviewRow>

        <PreviewRow label="Disabled">
          <FileUpload disabled className="max-w-xl">
            <FileUploadDropzone className="min-h-28 p-4" />
          </FileUpload>
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
      <div className="min-w-0 p-4">{children}</div>
    </div>
  );
}
