"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/rivetui/components/card/card";
import {
  CommandBar,
  type CommandBarAction,
  CommandBarTrigger,
} from "@/registry/rivetui/components/command-bar/command-bar";
import { KeyboardShortcut } from "@/registry/rivetui/components/keyboard-shortcut/keyboard-shortcut";
import { SearchField } from "@/registry/rivetui/components/search-field/search-field";
import { Status } from "@/registry/rivetui/components/status/status";

type DashboardService = {
  id: string;
  name: string;
  description: string;
  environment: string;
  state: "attention" | "healthy" | "paused";
};

type CommandDashboardProps = React.ComponentProps<"section"> & {
  commandBarHotkey?: boolean;
  onCommandSelect?: (action: CommandBarAction) => void;
  services?: readonly DashboardService[];
};

const exampleServices: readonly DashboardService[] = [
  {
    id: "gateway",
    name: "API Gateway",
    description: "Routes public traffic across three regions.",
    environment: "Production",
    state: "healthy",
  },
  {
    id: "worker",
    name: "Event Worker",
    description: "Processes billing and lifecycle events.",
    environment: "Production",
    state: "attention",
  },
  {
    id: "console",
    name: "Admin Console",
    description: "Internal operational interface.",
    environment: "Preview",
    state: "paused",
  },
];

const statusTone = {
  healthy: "success",
  attention: "warning",
  paused: "neutral",
} as const;

function CommandDashboard({
  className,
  commandBarHotkey = true,
  onCommandSelect,
  services = exampleServices,
  ...props
}: CommandDashboardProps) {
  const [query, setQuery] = React.useState("");
  const filteredServices = services.filter((service) =>
    [service.name, service.description, service.environment, service.state]
      .join(" ")
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase()),
  );
  const commands: readonly CommandBarAction[] = [
    {
      id: "deploy",
      label: "Create deployment",
      description: "Start a production deployment",
      group: "Deploy",
    },
    {
      id: "logs",
      label: "Open live logs",
      description: "Stream logs from the selected service",
      group: "Inspect",
    },
    {
      id: "incident",
      label: "Declare incident",
      description: "Open the incident response workflow",
      group: "Operations",
    },
  ];

  return (
    <section
      aria-labelledby="command-dashboard-title"
      className={cn("w-full max-w-5xl border border-border bg-background", className)}
      {...props}
    >
      <header className="grid gap-5 border-b border-border p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            Operations / Overview
          </p>
          <h2
            id="command-dashboard-title"
            className="mt-3 text-2xl font-semibold tracking-[-0.04em]"
          >
            Command dashboard
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Search services, inspect health, and open common operational actions.
          </p>
        </div>
        <CommandBar
          actions={commands}
          hotkey={commandBarHotkey}
          label="Operational commands"
          placeholder="Search operational commands"
          onActionSelect={onCommandSelect}
        >
          <CommandBarTrigger render={<Button type="button" variant="outline" />}>
            Quick actions
            <KeyboardShortcut keys={["mod", "K"]} size="sm" />
          </CommandBarTrigger>
        </CommandBar>
      </header>

      <div className="border-b border-border p-5 sm:p-6">
        <SearchField
          value={query}
          onValueChange={setQuery}
          placeholder="Search services, environments, or states"
          aria-label="Search services"
        />
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="border-0">
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.environment}</CardDescription>
              <CardAction>
                <Status tone={statusTone[service.state]} className="text-xs capitalize">
                  {service.state}
                </Status>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
              <Button type="button" variant="ghost" size="sm" className="mt-5 px-0">
                Open service
              </Button>
            </CardContent>
          </Card>
        ))}
        {filteredServices.length === 0 ? (
          <div className="col-span-full bg-background px-5 py-14 text-center">
            <p className="text-sm font-medium">No services found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another name, environment, or state.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export type { CommandDashboardProps, DashboardService };
export { CommandDashboard, exampleServices };
