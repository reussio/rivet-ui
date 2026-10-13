"use client";

import { Ellipsis, RotateCcw, Trash2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
  type DataTableRowSelectionState,
  DataTableSelectCell,
  DataTableSelectHeader,
} from "@/registry/rivetui/components/data-table/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/rivetui/components/dropdown-menu/dropdown-menu";
import { Status } from "@/registry/rivetui/components/status/status";

type Deployment = {
  id: string;
  name: string;
  region: string;
  requests: number;
  status: "Building" | "Paused" | "Ready";
  updated: string;
};

const deployments: readonly Deployment[] = [
  {
    id: "dpl_8f31c2a",
    name: "Production gateway",
    status: "Ready",
    region: "fra1",
    requests: 28410,
    updated: "2 min ago",
  },
  {
    id: "dpl_0c74ae1",
    name: "Checkout worker",
    status: "Building",
    region: "iad1",
    requests: 9842,
    updated: "8 min ago",
  },
  {
    id: "dpl_4b90df7",
    name: "Asset transformer",
    status: "Ready",
    region: "lhr1",
    requests: 6209,
    updated: "21 min ago",
  },
  {
    id: "dpl_a812e65",
    name: "Legacy webhook",
    status: "Paused",
    region: "sfo1",
    requests: 0,
    updated: "3 hr ago",
  },
  {
    id: "dpl_b171fe4",
    name: "Billing processor",
    status: "Ready",
    region: "fra1",
    requests: 15803,
    updated: "5 hr ago",
  },
  {
    id: "dpl_9e307bd",
    name: "Search indexer",
    status: "Ready",
    region: "ams1",
    requests: 11592,
    updated: "7 hr ago",
  },
  {
    id: "dpl_42aa114",
    name: "Email dispatcher",
    status: "Building",
    region: "iad1",
    requests: 4437,
    updated: "9 hr ago",
  },
  {
    id: "dpl_7d0ce31",
    name: "Audit stream",
    status: "Ready",
    region: "sin1",
    requests: 7910,
    updated: "12 hr ago",
  },
];

const columnHelper = createDataTableColumnHelper<Deployment>();
const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => <DataTableSelectHeader table={table} />,
    cell: ({ row }) => <DataTableSelectCell row={row} label={`Select ${row.original.name}`} />,
    enableHiding: false,
    enableSorting: false,
    meta: {
      label: "Selection",
      headerClassName: "w-12 pr-0",
      cellClassName: "w-12 pr-0",
    },
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deployment" />,
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.name}</p>
        <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground">
          {row.original.id}
        </p>
      </div>
    ),
    meta: { label: "Deployment" },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <DeploymentStatus status={row.original.status} />,
    meta: { label: "Status" },
  }),
  columnHelper.accessor("region", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Region" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs uppercase tracking-[0.08em]">{row.original.region}</span>
    ),
    meta: { label: "Region" },
  }),
  columnHelper.accessor("requests", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requests" />,
    cell: ({ row }) => row.original.requests.toLocaleString("en-US"),
    meta: {
      label: "Requests",
      headerClassName: "text-right",
      cellClassName: "text-right font-mono text-xs tabular-nums",
    },
  }),
  columnHelper.accessor("updated", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated" />,
    meta: { label: "Updated" },
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <DeploymentActions name={row.original.name} />,
    enableHiding: false,
    enableSorting: false,
    meta: {
      label: "Actions",
      headerClassName: "w-12",
      cellClassName: "w-12",
    },
  }),
]);

export function DataTablePreview() {
  const [rowSelection, setRowSelection] = React.useState<DataTableRowSelectionState>({});

  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="data-table-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / Data
          </p>
          <h2
            id="data-table-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Data Table
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Interactive
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 p-5 sm:p-8 lg:border-r lg:border-border">
          <DataTable
            aria-label="Deployments"
            columns={columns}
            data={deployments}
            getRowId={(deployment) => deployment.id}
            pagination={{ pageSize: 5, pageSizeOptions: [5, 10, 20] }}
            rowSelection={rowSelection}
            search={{
              columnIds: ["name", "region", "status"],
              label: "Search deployments",
              placeholder: "Search deployments…",
            }}
            tableClassName="min-w-[52rem]"
            onRowSelectionChange={setRowSelection}
            toolbar={(table) => (
              <Button
                variant="outline"
                size="sm"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={() => table.resetRowSelection(true)}
              >
                <RotateCcw aria-hidden="true" />
                Clear selection
              </Button>
            )}
          />
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Columns" detail="Typed" />
            <Specification term="Sorting" detail="Multi" />
            <Specification term="Filtering" detail="Scoped" />
            <Specification term="Selection" detail="Range" />
            <Specification term="Pagination" detail="Client" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Empty">
          <DataTable
            aria-label="Empty deployments"
            className="max-w-4xl"
            columns={columns}
            data={[]}
            pagination={false}
            search="name"
            tableClassName="min-w-[42rem]"
          />
        </PreviewRow>
        <PreviewRow label="Loading">
          <DataTable
            aria-label="Loading deployments"
            className="max-w-4xl"
            columns={columns}
            data={[]}
            loading
            pagination={false}
            tableClassName="min-w-[42rem]"
          />
        </PreviewRow>
      </div>
    </section>
  );
}

function DeploymentStatus({ status }: { status: Deployment["status"] }) {
  const tone = status === "Ready" ? "success" : status === "Building" ? "warning" : "neutral";
  return <Status tone={tone}>{status}</Status>;
}

function DeploymentActions({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" />}
        aria-label={`Open actions for ${name}`}
      >
        <Ellipsis aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuItem>View deployment</DropdownMenuItem>
          <DropdownMenuItem>Copy identifier</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <Trash2 aria-hidden="true" />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right">{detail}</dd>
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
