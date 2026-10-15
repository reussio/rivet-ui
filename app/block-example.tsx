"use client";

import { type ReactNode, useEffect, useState } from "react";

import { CodeBlock } from "@/registry/rivetui/components/code-block/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/rivetui/components/tabs/tabs";

type BlockExampleProps = {
  children: ReactNode;
  code: string;
  title: string;
};

function BlockExample({ children, code, title }: BlockExampleProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div data-slot="block-example" data-test-ready={ready ? "true" : "false"}>
      <Tabs defaultValue="preview">
        <TabsList aria-label={`${title} view`}>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" keepMounted className="min-w-0 overflow-hidden p-0">
          <div
            data-slot="block-preview"
            className="flex min-h-[34rem] min-w-0 items-center justify-center overflow-x-auto p-3 sm:p-6 lg:p-8 [&>*]:min-w-0"
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code" className="min-w-0 overflow-hidden p-0">
          <CodeBlock
            filename={`${title.toLowerCase().replaceAll(" ", "-")}.tsx`}
            language="tsx"
            code={code}
            softWrap
            className="w-full max-w-full border-0"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { BlockExample };
