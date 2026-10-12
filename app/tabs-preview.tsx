import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/rivetui/components/tabs/tabs";

export function TabsPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="tabs-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 008
          </p>
          <h2 id="tabs-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Tabs
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Navigation
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <Tabs defaultValue="overview">
            <TabsList aria-label="Project details">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="logs" disabled>
                Logs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <PanelHeader
                eyebrow="Project / rv_01"
                title="Production gateway"
                description="Live system status and current deployment configuration."
              />
              <dl className="mt-5 grid border border-border sm:grid-cols-3 sm:divide-x sm:divide-border">
                <Metric term="Region" detail="eu-central" />
                <Metric term="Runtime" detail="Bun 1.3" />
                <Metric term="Status" detail="Operational" />
              </dl>
            </TabsContent>
            <TabsContent value="activity">
              <PanelHeader
                eyebrow="Latest event"
                title="Deployment completed"
                description="Revision 8f31c2a became active in eu-central two minutes ago."
              />
            </TabsContent>
            <TabsContent value="settings">
              <PanelHeader
                eyebrow="Configuration"
                title="Runtime policy"
                description="Builds use the workspace defaults and require review before production."
              />
            </TabsContent>
            <TabsContent value="logs">
              <PanelHeader
                eyebrow="Unavailable"
                title="Runtime logs"
                description="Logging has not been enabled for this project."
              />
            </TabsContent>
          </Tabs>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Activation" detail="auto" />
            <Specification term="Keys" detail="arrows" />
            <Specification term="Loop" detail="yes" />
            <Specification term="Layout" detail="both" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Vertical">
          <Tabs defaultValue="network" orientation="vertical" className="max-w-2xl">
            <TabsList aria-label="Infrastructure settings">
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
            </TabsList>
            <TabsContent value="network">
              <PanelHeader
                eyebrow="Infrastructure"
                title="Private network"
                description="Services communicate through an isolated regional network."
              />
            </TabsContent>
            <TabsContent value="security">
              <PanelHeader
                eyebrow="Infrastructure"
                title="Access policy"
                description="Inbound connections require a verified service identity."
              />
            </TabsContent>
            <TabsContent value="storage">
              <PanelHeader
                eyebrow="Infrastructure"
                title="Persistent volumes"
                description="Encrypted volumes are replicated inside the primary region."
              />
            </TabsContent>
          </Tabs>
        </PreviewRow>

        <PreviewRow label="Manual mode">
          <Tabs defaultValue="build" className="max-w-2xl">
            <TabsList activateOnFocus={false} aria-label="Release stages">
              <TabsTrigger value="build">Build</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="build">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Arrow keys move focus. Enter or Space activates the focused tab.
              </p>
            </TabsContent>
            <TabsContent value="test">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Run unit, integration, and browser checks against the release candidate.
              </p>
            </TabsContent>
            <TabsContent value="review">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Review the change set and approve the production deployment.
              </p>
            </TabsContent>
          </Tabs>
        </PreviewRow>
      </div>
    </section>
  );
}

function PanelHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function Metric({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="p-3">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {term}
      </dt>
      <dd className="mt-1 text-sm font-medium">{detail}</dd>
    </div>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd>{detail}</dd>
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
