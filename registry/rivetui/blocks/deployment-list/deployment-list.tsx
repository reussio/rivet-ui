"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/rivetui/components/alert-dialog/alert-dialog";
import { Button } from "@/registry/rivetui/components/button/button";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/registry/rivetui/components/data-list/data-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/rivetui/components/dropdown-menu/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/rivetui/components/pagination/pagination";
import { Status } from "@/registry/rivetui/components/status/status";

type DeploymentState = "building" | "degraded" | "ready";

type Deployment = {
  id: string;
  name: string;
  branch: string;
  region: string;
  updatedAt: string;
  state: DeploymentState;
};

type DeploymentListProps = React.ComponentProps<"section"> & {
  deployments?: readonly Deployment[];
  onDelete?: (deployment: Deployment) => void;
  onInspect?: (deployment: Deployment) => void;
  onRedeploy?: (deployment: Deployment) => void;
};

const exampleDeployments: readonly Deployment[] = [
  {
    id: "dpl_9x31",
    name: "api-gateway",
    branch: "main",
    region: "fra1",
    updatedAt: "2 min ago",
    state: "ready",
  },
  {
    id: "dpl_7n14",
    name: "event-worker",
    branch: "release/42",
    region: "lhr1",
    updatedAt: "8 min ago",
    state: "building",
  },
  {
    id: "dpl_4p82",
    name: "admin-console",
    branch: "main",
    region: "iad1",
    updatedAt: "21 min ago",
    state: "degraded",
  },
];

const statusTone = {
  ready: "success",
  building: "neutral",
  degraded: "warning",
} as const;

function DeploymentList({
  className,
  deployments = exampleDeployments,
  onDelete,
  onInspect,
  onRedeploy,
  ...props
}: DeploymentListProps) {
  return (
    <section
      aria-labelledby="deployment-list-title"
      className={cn("w-full max-w-5xl border border-border bg-background", className)}
      {...props}
    >
      <header className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            Production / Deployments
          </p>
          <h2 id="deployment-list-title" className="mt-2 text-xl font-semibold tracking-[-0.035em]">
            Recent deployments
          </h2>
        </div>
        <Button type="button" size="sm">
          Create deployment
        </Button>
      </header>

      <ul className="divide-y divide-border" aria-label="Deployments">
        {deployments.map((deployment) => (
          <li
            key={deployment.id}
            className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.8fr)_auto] lg:items-center"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="truncate text-sm font-semibold">{deployment.name}</h3>
                <Status tone={statusTone[deployment.state]} className="text-xs capitalize">
                  {deployment.state}
                </Status>
              </div>
              <p className="mt-1 truncate font-mono text-[0.6875rem] text-muted-foreground">
                {deployment.id} · {deployment.branch}
              </p>
            </div>

            <DataList
              orientation="horizontal"
              size="sm"
              className="grid-cols-2 border-0 sm:grid-cols-2 [&>[data-slot=data-list-item]]:border-0 [&>[data-slot=data-list-item]]:p-0"
            >
              <DataListItem>
                <DataListLabel>Region</DataListLabel>
                <DataListValue className="font-mono">{deployment.region}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Updated</DataListLabel>
                <DataListValue>{deployment.updatedAt}</DataListValue>
              </DataListItem>
            </DataList>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button type="button" variant="outline" size="sm" />}>
                Actions
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{deployment.name}</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onInspect?.(deployment)}>
                    Inspect
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRedeploy?.(deployment)}>
                    Redeploy
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger
                    render={<DropdownMenuItem destructive closeOnClick={false} />}
                  >
                    Delete deployment
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete {deployment.name}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This removes the deployment record and its generated artifacts. This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel render={<Button variant="outline" />}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        render={<Button variant="destructive" />}
                        onClick={() => onDelete?.(deployment)}
                      >
                        Delete deployment
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>

      <footer className="border-t border-border px-3 py-3">
        <Pagination aria-label="Deployment pages">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious aria-disabled="true" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive aria-label="Page 1">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" aria-label="Page 2">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </footer>
    </section>
  );
}

export type { Deployment, DeploymentListProps, DeploymentState };
export { DeploymentList, exampleDeployments };
