"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/rivetui/components/tabs/tabs";

type PreviewView = "overview" | "examples";

function ComponentPreviewPanel({ children }: { children: React.ReactNode }) {
  const [view, setView] = React.useState<PreviewView>("overview");

  return (
    <Tabs
      value={view}
      onValueChange={(value) => {
        if (value === "overview" || value === "examples") {
          setView(value);
        }
      }}
      className="docs-preview mt-6"
    >
      <div className="relative">
        <TabsList aria-label="Preview views">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        <span className="pointer-events-none absolute inset-y-0 right-0 hidden items-center px-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
          Interactive
        </span>
      </div>

      <TabsContent value="overview" className="p-0">
        {view === "overview" ? (
          <div data-slot="component-preview-content" data-view="overview">
            {children}
          </div>
        ) : null}
      </TabsContent>
      <TabsContent value="examples" className="p-0">
        {view === "examples" ? (
          <div data-slot="component-preview-content" data-view="examples">
            {children}
          </div>
        ) : null}
      </TabsContent>
    </Tabs>
  );
}

export { ComponentPreviewPanel };
