"use client";

import * as React from "react";
import { ComponentExample } from "@/app/component-example";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadMessage,
} from "@/registry/rivetui/components/file-upload/file-upload";

const primaryCode = `"use client"

import * as React from "react"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadMessage,
} from "@/components/ui/file-upload"

export function DeploymentFiles() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      accept=".png,.jpg,.jpeg,.pdf,.json"
      maxFiles={4}
      maxSize={5 * 1024 * 1024}
      multiple
    >
      <FileUploadDropzone />
      <FileUploadMessage />
      <FileUploadList />
    </FileUpload>
  )
}`;

const singleCode = `import * as React from "react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadMessage,
} from "@/components/ui/file-upload";
const maxSize = 5 * 1024 * 1024;
export function SingleExample() {
  return (
    <>
      <FileUpload accept="image/*" maxSize={maxSize} className="max-w-xl">
        <FileUploadDropzone className="min-h-28 p-4" />
        <FileUploadMessage />
        <FileUploadList />
      </FileUpload>
    </>
  );
}`;

const maxSize = 5 * 1024 * 1024;

export function FileUploadPreview() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Accept multiple files with shared type, count, and size constraints."
        note={
          <>
            Set <code>disabled</code> on <code>FileUpload</code> to disable the dropzone and file
            controls together.
          </>
        }
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow
        label="Single file"
        description="Omit multiple when the workflow accepts exactly one file."
        code={singleCode}
      >
        <FileUpload accept="image/*" maxSize={maxSize} className="max-w-xl">
          <FileUploadDropzone className="min-h-28 p-4" />
          <FileUploadMessage />
          <FileUploadList />
        </FileUpload>
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
