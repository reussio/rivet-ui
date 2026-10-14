"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/registry/rivetui/components/code-block/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/rivetui/components/tabs/tabs";

type ComponentExampleProps = {
  children: ReactNode;
  code: string;
  description: string;
  previewClassName?: string;
  title: string;
};

function ComponentExample({
  children,
  code,
  description,
  previewClassName,
  title,
}: ComponentExampleProps) {
  return (
    <article>
      <div className="max-w-2xl">
        <h3 className="text-base font-semibold tracking-[-0.02em]">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{description}</p>
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
              "flex min-h-64 min-w-0 items-center justify-center p-5 sm:p-8",
              previewClassName,
            )}
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code" className="p-0">
          <CodeBlock filename="example.tsx" language="tsx" code={code} className="border-0" />
        </TabsContent>
      </Tabs>
    </article>
  );
}

export type { ComponentExampleProps };
export { ComponentExample };
