"use client";

import { FileIcon, Upload, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type FileUploadErrorCode = "file-too-large" | "file-type-not-accepted" | "too-many-files";

type FileUploadRejection = {
  file: File;
  code: FileUploadErrorCode;
  message: string;
};

type FileUploadContextValue = {
  accept?: string;
  addFiles: (files: File[]) => void;
  disabled: boolean;
  error: string | null;
  errorId: string;
  files: File[];
  inputId: string;
  isDragging: boolean;
  maxFiles: number;
  maxSize?: number;
  multiple: boolean;
  open: () => void;
  removeFile: (file: File) => void;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

const FileUploadContext = React.createContext<FileUploadContextValue | null>(null);

function useFileUpload() {
  const context = React.useContext(FileUploadContext);

  if (!context) {
    throw new Error("useFileUpload must be used within a FileUpload.");
  }

  return context;
}

type FileUploadProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  accept?: string;
  defaultValue?: File[];
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  name?: string;
  onFileReject?: (rejection: FileUploadRejection) => void;
  onValueChange?: (files: File[]) => void;
  required?: boolean;
  value?: File[];
};

function FileUpload({
  accept,
  children,
  className,
  defaultValue = [],
  disabled = false,
  maxFiles: maxFilesProp,
  maxSize,
  multiple = false,
  name,
  onFileReject,
  onValueChange,
  required,
  value,
  ...props
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputId = React.useId();
  const errorId = React.useId();
  const [uncontrolledFiles, setUncontrolledFiles] = React.useState(defaultValue);
  const [error, setError] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const files = value ?? uncontrolledFiles;
  const maxFiles = multiple ? Math.max(1, maxFilesProp ?? Number.POSITIVE_INFINITY) : 1;

  const updateFiles = React.useCallback(
    (nextFiles: File[]) => {
      if (value === undefined) {
        setUncontrolledFiles(nextFiles);
      }

      onValueChange?.(nextFiles);
    },
    [onValueChange, value],
  );

  const addFiles = React.useCallback(
    (incomingFiles: File[]) => {
      if (disabled || incomingFiles.length === 0) {
        return;
      }

      const nextFiles = multiple ? [...files] : [];
      const knownFiles = new Set(nextFiles.map(getFileKey));
      const rejections: FileUploadRejection[] = [];
      let didAddFile = false;

      for (const file of incomingFiles) {
        const rejection = getFileRejection(file, accept, maxSize);

        if (rejection) {
          rejections.push(rejection);
          continue;
        }

        if (knownFiles.has(getFileKey(file))) {
          continue;
        }

        if (nextFiles.length >= maxFiles) {
          rejections.push({
            file,
            code: "too-many-files",
            message: `Only ${maxFiles} ${maxFiles === 1 ? "file" : "files"} can be selected.`,
          });
          continue;
        }

        nextFiles.push(file);
        knownFiles.add(getFileKey(file));
        didAddFile = true;
      }

      setError(rejections[0]?.message ?? null);
      rejections.forEach((rejection) => {
        onFileReject?.(rejection);
      });

      if (didAddFile) {
        updateFiles(nextFiles);
      }

      syncInputFiles(inputRef.current, didAddFile ? nextFiles : files);
    },
    [accept, disabled, files, maxFiles, maxSize, multiple, onFileReject, updateFiles],
  );

  const removeFile = React.useCallback(
    (file: File) => {
      if (disabled) {
        return;
      }

      setError(null);
      updateFiles(files.filter((candidate) => getFileKey(candidate) !== getFileKey(file)));
    },
    [disabled, files, updateFiles],
  );

  const open = React.useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  React.useEffect(() => {
    syncInputFiles(inputRef.current, files);
  }, [files]);

  const contextValue: FileUploadContextValue = {
    accept,
    addFiles,
    disabled,
    error,
    errorId,
    files,
    inputId,
    isDragging,
    maxFiles,
    maxSize,
    multiple,
    open,
    removeFile,
    setIsDragging,
  };

  return (
    <FileUploadContext.Provider value={contextValue}>
      <div
        data-slot="file-upload"
        data-disabled={disabled ? "" : undefined}
        className={cn("w-full", className)}
        {...props}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          data-slot="file-upload-input"
          className="peer sr-only"
          accept={accept}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          multiple={multiple}
          name={name}
          required={required}
          onChange={(event) => addFiles(Array.from(event.currentTarget.files ?? []))}
        />
        {children}
      </div>
    </FileUploadContext.Provider>
  );
}

type FileUploadDropzoneSize = "sm" | "md";

type FileUploadDropzoneProps = React.ComponentProps<"label"> & {
  size?: FileUploadDropzoneSize;
};

function FileUploadDropzone({
  children,
  className,
  htmlFor,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  size = "md",
  ...props
}: FileUploadDropzoneProps) {
  const {
    accept,
    addFiles,
    disabled,
    error,
    errorId,
    files,
    inputId,
    isDragging,
    maxFiles,
    maxSize,
    multiple,
    setIsDragging,
  } = useFileUpload();
  const constraints = [
    accept ? formatAccept(accept) : "Any format",
    Number.isFinite(maxFiles) ? `${maxFiles} ${maxFiles === 1 ? "file" : "files"}` : null,
    maxSize ? `Up to ${formatBytes(maxSize)}` : null,
  ].filter(Boolean);
  const compactLabel = isDragging
    ? "Release to add files"
    : files.length > 0
      ? multiple
        ? `${files.length} ${files.length === 1 ? "file" : "files"} selected`
        : files[0]?.name
      : multiple
        ? "Choose files"
        : "Choose file";

  return (
    <label
      htmlFor={htmlFor ?? inputId}
      data-slot="file-upload-dropzone"
      data-dragging={isDragging ? "" : undefined}
      data-size={size}
      aria-describedby={error ? errorId : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "group flex w-full cursor-pointer border border-dashed border-border bg-muted/10 font-sans text-foreground outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-foreground/40 hover:bg-muted/25 peer-focus-visible:border-ring peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40 data-[dragging]:border-foreground data-[dragging]:border-solid data-[dragging]:bg-muted/50 aria-disabled:pointer-events-none aria-disabled:bg-muted/40 aria-disabled:opacity-50 motion-reduce:transition-none",
        size === "md"
          ? "min-h-40 flex-col items-center justify-center p-6 text-center"
          : "h-10 min-w-0 items-center gap-2 overflow-hidden px-3 text-left",
        className,
      )}
      onDragEnter={(event) => {
        onDragEnter?.(event);
        if (!event.defaultPrevented && !disabled && hasFiles(event.dataTransfer)) {
          event.preventDefault();
          setIsDragging(true);
        }
      }}
      onDragOver={(event) => {
        onDragOver?.(event);
        if (!event.defaultPrevented && !disabled && hasFiles(event.dataTransfer)) {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
        }
      }}
      onDragLeave={(event) => {
        onDragLeave?.(event);
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsDragging(false);
        }
      }}
      onDrop={(event) => {
        onDrop?.(event);
        if (!event.defaultPrevented && !disabled && hasFiles(event.dataTransfer)) {
          event.preventDefault();
          setIsDragging(false);
          addFiles(Array.from(event.dataTransfer.files));
        }
      }}
      {...props}
    >
      {children ??
        (size === "sm" ? (
          <>
            <Upload
              className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground group-data-[dragging]:text-foreground"
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{compactLabel}</span>
            <span className="min-w-0 max-w-1/2 truncate font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
              {constraints.join(" · ")}
            </span>
          </>
        ) : (
          <>
            <span className="mb-4 flex size-10 items-center justify-center border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground group-data-[dragging]:border-foreground group-data-[dragging]:text-foreground">
              <Upload className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold">
              {isDragging ? "Release to add files" : "Drop files here or click to browse"}
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              {multiple
                ? "Select one or more files from your device."
                : "Select a file from your device."}
            </span>
            <span className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
              {constraints.join(" · ")}
            </span>
          </>
        ))}
    </label>
  );
}

type FileUploadListProps = Omit<React.ComponentProps<"ul">, "children"> & {
  children?: React.ReactNode | ((file: File, index: number) => React.ReactNode);
};

function FileUploadList({ children, className, ...props }: FileUploadListProps) {
  const { files } = useFileUpload();

  if (files.length === 0 && !children) {
    return null;
  }

  return (
    <ul
      data-slot="file-upload-list"
      className={cn("mt-3 border border-border", className)}
      {...props}
    >
      {typeof children === "function"
        ? files.map((file, index) => children(file, index))
        : (children ?? files.map((file) => <FileUploadItem key={getFileKey(file)} file={file} />))}
    </ul>
  );
}

type FileUploadItemProps = Omit<React.ComponentProps<"li">, "children"> & {
  children?: React.ReactNode;
  file: File;
};

function FileUploadItem({ children, className, file, ...props }: FileUploadItemProps) {
  const { disabled, removeFile } = useFileUpload();
  const extension = file.name.includes(".") ? file.name.split(".").pop() : undefined;

  return (
    <li
      data-slot="file-upload-item"
      className={cn(
        "flex min-w-0 items-center gap-3 border-b border-border p-3 last:border-b-0",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="flex size-9 shrink-0 items-center justify-center border border-border bg-muted/30 text-muted-foreground">
            <FileIcon className="size-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{file.name}</span>
            <span className="mt-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
              {extension ?? "File"} · {formatBytes(file.size)}
            </span>
          </span>
          <button
            type="button"
            data-slot="file-upload-remove"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center border border-transparent text-muted-foreground outline-none transition-[background-color,border-color,box-shadow,color] duration-100 hover:border-border hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none"
            aria-label={`Remove ${file.name}`}
            disabled={disabled}
            onClick={() => removeFile(file)}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </>
      )}
    </li>
  );
}

function FileUploadMessage({ children, className, role, ...props }: React.ComponentProps<"p">) {
  const { error, errorId } = useFileUpload();
  const content = children ?? error;

  if (!content) {
    return null;
  }

  return (
    <p
      id={errorId}
      data-slot="file-upload-message"
      role={role ?? (error ? "alert" : undefined)}
      className={cn("mt-2 text-sm leading-relaxed text-destructive", className)}
      {...props}
    >
      {content}
    </p>
  );
}

function getFileKey(file: File) {
  return `${file.name}:${file.size}:${file.type}:${file.lastModified}`;
}

function hasFiles(dataTransfer: DataTransfer) {
  return Array.from(dataTransfer.types).includes("Files");
}

function syncInputFiles(input: HTMLInputElement | null, files: File[]) {
  if (!input) {
    return;
  }

  if (files.length === 0) {
    input.value = "";
    return;
  }

  if (typeof DataTransfer === "undefined") {
    return;
  }

  try {
    const transfer = new DataTransfer();
    files.forEach((file) => {
      transfer.items.add(file);
    });
    input.files = transfer.files;
  } catch {
    // Some browsers expose FileList as read-only. The React value remains authoritative.
  }
}

function getFileRejection(
  file: File,
  accept?: string,
  maxSize?: number,
): FileUploadRejection | null {
  if (accept && !matchesAccept(file, accept)) {
    return {
      file,
      code: "file-type-not-accepted",
      message: `${file.name} does not match ${formatAccept(accept)}.`,
    };
  }

  if (maxSize && file.size > maxSize) {
    return {
      file,
      code: "file-too-large",
      message: `${file.name} exceeds ${formatBytes(maxSize)}.`,
    };
  }

  return null;
}

function matchesAccept(file: File, accept: string) {
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();
  const acceptedValues = accept
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (acceptedValues.length === 0) {
    return true;
  }

  return acceptedValues.some((value) => {
    if (value.startsWith(".")) {
      return fileName.endsWith(value);
    }

    if (value.endsWith("/*")) {
      return fileType.startsWith(value.slice(0, -1));
    }

    return fileType === value;
  });
}

function formatAccept(accept: string) {
  return accept
    .split(",")
    .map((value) => value.trim().replace(/^\./, ""))
    .filter(Boolean)
    .join(" / ")
    .toUpperCase();
}

function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  const formattedValue = Number.isInteger(value)
    ? value.toString()
    : value >= 10
      ? Math.round(value).toString()
      : value.toFixed(1);

  return `${formattedValue} ${units[index]}`;
}

export type {
  FileUploadDropzoneProps,
  FileUploadDropzoneSize,
  FileUploadErrorCode,
  FileUploadItemProps,
  FileUploadListProps,
  FileUploadProps,
  FileUploadRejection,
};
export {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
  FileUploadMessage,
  useFileUpload,
};
