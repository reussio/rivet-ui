"use client";

import { Ellipsis, RotateCcw, Trash2 } from "lucide-react";
import * as React from "react";
import { ComponentExample } from "@/app/component-example";
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

const primaryCode = `"use client"

import { Ellipsis, RotateCcw, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
  type DataTableRowSelectionState,
  DataTableSelectCell,
  DataTableSelectHeader,
} from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Status } from "@/components/ui/status"

type Deployment = {
  id: string
  name: string
  status: "Ready" | "Building" | "Paused"
  region: string
  requests: number
  updated: string
}

const deployments: Deployment[] = [
  { id: "dpl_8f31c2a", name: "Production gateway", status: "Ready", region: "fra1", requests: 28410, updated: "2 min ago" },
  { id: "dpl_0c74ae1", name: "Checkout worker", status: "Building", region: "iad1", requests: 9842, updated: "8 min ago" },
  { id: "dpl_4b90df7", name: "Asset transformer", status: "Ready", region: "lhr1", requests: 6209, updated: "21 min ago" },
  { id: "dpl_a812e65", name: "Legacy webhook", status: "Paused", region: "sfo1", requests: 0, updated: "3 hr ago" },
  { id: "dpl_b171fe4", name: "Billing processor", status: "Ready", region: "fra1", requests: 15803, updated: "5 hr ago" },
  { id: "dpl_9e307bd", name: "Search indexer", status: "Ready", region: "ams1", requests: 11592, updated: "7 hr ago" },
  { id: "dpl_42aa114", name: "Email dispatcher", status: "Building", region: "iad1", requests: 4437, updated: "9 hr ago" },
  { id: "dpl_7d0ce31", name: "Audit stream", status: "Ready", region: "sin1", requests: 7910, updated: "12 hr ago" },
]

const columnHelper = createDataTableColumnHelper<Deployment>()
const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => <DataTableSelectHeader table={table} />,
    cell: ({ row }) => <DataTableSelectCell row={row} label={\`Select \${row.original.name}\`} />,
    enableHiding: false,
    enableSorting: false,
    meta: { label: "Selection", headerClassName: "w-12 pr-0", cellClassName: "w-12 pr-0" },
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
    meta: { label: "Requests", headerClassName: "text-right", cellClassName: "text-right font-mono text-xs tabular-nums" },
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
    meta: { label: "Actions", headerClassName: "w-12", cellClassName: "w-12" },
  }),
])

export function DeploymentsTable() {
  const [rowSelection, setRowSelection] = useState<DataTableRowSelectionState>({})

  return (
    <DataTable
      aria-label="Deployments"
      columns={columns}
      data={deployments}
      getRowId={(deployment) => deployment.id}
      pagination={{ pageSize: 5, pageSizeOptions: [5, 10, 20] }}
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      search={{
        columnIds: ["name", "region", "status"],
        label: "Search deployments",
        placeholder: "Search deployments…",
      }}
      tableClassName="min-w-[52rem]"
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
  )
}

function DeploymentStatus({ status }: { status: Deployment["status"] }) {
  const tone = status === "Ready" ? "success" : status === "Building" ? "warning" : "neutral"
  return <Status tone={tone}>{status}</Status>
}

function DeploymentActions({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" />}
        aria-label={\`Open actions for \${name}\`}
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
        <DropdownMenuItem destructive><Trash2 aria-hidden="true" />Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`;

const emptyCode = `import { Ellipsis, RotateCcw, Trash2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
  type DataTableRowSelectionState,
  DataTableSelectCell,
  DataTableSelectHeader,
} from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Status } from "@/components/ui/status";
type Deployment = {
  id: string;
  name: string;
  status: "Ready" | "Building" | "Paused";
  region: string;
  requests: number;
  updated: string;
};
const columnHelper = createDataTableColumnHelper<Deployment>();
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

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => <DataTableSelectHeader table={table} />,
    cell: ({ row }) => <DataTableSelectCell row={row} label={\`Select \${row.original.name}\`} />,
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
function DeploymentStatus({ status }: { status: Deployment["status"] }) {
  const tone = status === "Ready" ? "success" : status === "Building" ? "warning" : "neutral";
  return <Status tone={tone}>{status}</Status>;
}
function DeploymentActions({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" />}
        aria-label={\`Open actions for \${name}\`}
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
        <DropdownMenuItem destructive><Trash2 aria-hidden="true" />Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function EmptyExample() {
  return (
    <>
      <DataTable
        aria-label="Empty deployments"
        className="max-w-4xl"
        columns={columns}
        data={[]}
        pagination={false}
        search="name"
        tableClassName="min-w-[42rem]"
      />
    </>
  );
}`;

const loadingCode = `import { Ellipsis, RotateCcw, Trash2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
  type DataTableRowSelectionState,
  DataTableSelectCell,
  DataTableSelectHeader,
} from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Status } from "@/components/ui/status";
type Deployment = {
  id: string;
  name: string;
  status: "Ready" | "Building" | "Paused";
  region: string;
  requests: number;
  updated: string;
};
const columnHelper = createDataTableColumnHelper<Deployment>();
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

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => <DataTableSelectHeader table={table} />,
    cell: ({ row }) => <DataTableSelectCell row={row} label={\`Select \${row.original.name}\`} />,
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
function DeploymentStatus({ status }: { status: Deployment["status"] }) {
  const tone = status === "Ready" ? "success" : status === "Building" ? "warning" : "neutral";
  return <Status tone={tone}>{status}</Status>;
}
function DeploymentActions({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" />}
        aria-label={\`Open actions for \${name}\`}
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
        <DropdownMenuItem destructive><Trash2 aria-hidden="true" />Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function LoadingExample() {
  return (
    <>
      <DataTable
        aria-label="Loading deployments"
        className="max-w-4xl"
        columns={columns}
        data={[]}
        loading
        pagination={false}
        tableClassName="min-w-[42rem]"
      />
    </>
  );
}`;

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
    <div className="mt-8 grid gap-12">
      <ComponentExample title="Default" code={primaryCode} previewClassName="p-0">
        <div className="min-w-0 p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow label="Empty" code={emptyCode}>
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
      <PreviewRow label="Loading" code={loadingCode}>
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
