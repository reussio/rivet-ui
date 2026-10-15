import type * as React from "react";

import { DocsSection } from "@/app/docs-section";

function BlockDetails({ children }: { children: React.ReactNode }) {
  return (
    <DocsSection
      id="details"
      eyebrow="Implementation notes"
      title="Composition and integration"
      description="The block owns layout and interaction structure while application data and backend behavior stay outside it."
      last
    >
      <div className="mt-8 grid gap-8 [&>[data-slot=component-api-heading]]:mt-0">{children}</div>
    </DocsSection>
  );
}

export { BlockDetails };
