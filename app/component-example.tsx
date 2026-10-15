"use client";

import { type ReactNode, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/registry/rivetui/components/code-block/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/rivetui/components/tabs/tabs";

type ComponentExampleProps = {
  children: ReactNode;
  code: string;
  description?: ReactNode;
  note?: ReactNode;
  previewClassName?: string;
  title: string;
};

function ComponentExample({
  children,
  code,
  description,
  note,
  previewClassName,
  title,
}: ComponentExampleProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <article
      data-slot="component-example"
      data-example-title={title}
      data-test-ready={ready ? "true" : "false"}
      className="min-w-0"
    >
      <div className="max-w-2xl">
        <h3 className="text-base font-semibold tracking-[-0.02em]">{title}</h3>
        {description ? (
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
        {note ? (
          <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-3 border-l border-border pl-3 text-sm leading-6 text-muted-foreground">
            <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-foreground">
              Note
            </span>
            <div>{note}</div>
          </div>
        ) : null}
      </div>

      <Tabs defaultValue="preview" className="mt-4">
        <TabsList aria-label={`${title} example view`}>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" keepMounted className="p-0">
          <div
            data-slot="component-example-preview"
            className={cn(
              "flex min-h-64 min-w-0 items-center justify-center p-5 sm:p-8 [&>*]:min-w-0 [&>*]:max-w-full",
              previewClassName,
            )}
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code" className="min-w-0 overflow-hidden p-0">
          <CodeBlock
            filename="example.tsx"
            language="tsx"
            code={code}
            softWrap
            className="w-full max-w-full border-0"
          />
        </TabsContent>
      </Tabs>
    </article>
  );
}

export type { ComponentExampleProps };
export { ComponentExample };
