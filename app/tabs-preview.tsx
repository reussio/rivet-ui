import { ComponentExample } from "@/app/component-example";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/rivetui/components/tabs/tabs";

const primaryCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList aria-label="Project details">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsTrigger value="logs" disabled>Logs</TabsTrigger>
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

function PanelHeader({ eyebrow, title, description }) {
  return (
    <div>
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function Metric({ term, detail }) {
  return (
    <div className="p-3">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {term}
      </dt>
      <dd className="mt-1 text-sm font-medium">{detail}</dd>
    </div>
  )
}`;

const verticalCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
export function VerticalExample() {
  return (
    <>
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
    </>
  );
}`;

const manualModeCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function ManualModeExample() {
  return (
    <>
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
    </>
  );
}`;

export function TabsPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow label="Vertical" code={verticalCode}>
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
      <PreviewRow label="Manual mode" code={manualModeCode}>
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

function PreviewRow({
  label,
  children,
  code,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <ComponentExample title={label} code={code}>
      <div className="min-w-0 p-4">{children}</div>
    </ComponentExample>
  );
}
