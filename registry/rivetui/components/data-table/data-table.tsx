"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import {
  type CellData,
  type Column,
  type ColumnDef,
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrIncludes,
  filterFn_equals,
  filterFn_includesString,
  filterFn_inDateRange,
  filterFn_inNumberRange,
  filterFn_weakEquals,
  functionalUpdate,
  globalFilteringFeature,
  metaHelper,
  type OnChangeFn,
  type ReactTable,
  type Row,
  type RowData,
  type RowSelectionState,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  type Table,
  type TableOptions,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Columns2,
  Minus,
  Search,
  X,
} from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type DataTableColumnMeta = {
  cellClassName?: string;
  headerClassName?: string;
  label?: string;
};

const dataTableFeatures = tableFeatures({
  columnVisibilityFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    arrIncludes: filterFn_arrIncludes,
    equals: filterFn_equals,
    inDateRange: filterFn_inDateRange,
    inNumberRange: filterFn_inNumberRange,
    includesString: filterFn_includesString,
    weakEquals: filterFn_weakEquals,
  },
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowSelectionFeature,
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

type DataTableFeatures = typeof dataTableFeatures;
type DataTableCoreInstance<TData extends RowData> = Table<DataTableFeatures, TData>;
type DataTableInstance<TData extends RowData> = ReactTable<DataTableFeatures, TData>;
type DataTableColumnDef<TData extends RowData, TValue extends CellData = CellData> = ColumnDef<
  DataTableFeatures,
  TData,
  TValue
>;
type DataTableInitialState = NonNullable<TableOptions<DataTableFeatures, RowData>["initialState"]>;
type DataTableRowSelectionState = RowSelectionState;

type DataTableSearchOptions = {
  columnIds?: readonly string[];
  label?: string;
  placeholder?: string;
};

type DataTablePaginationOptions = {
  pageSize?: number;
  pageSizeOptions?: readonly number[];
};

type DataTableProps<TData extends RowData> = {
  "aria-label"?: string;
  className?: string;
  columns: TableOptions<DataTableFeatures, TData>["columns"];
  data: readonly TData[];
  defaultRowSelection?: DataTableRowSelectionState;
  emptyState?: React.ReactNode;
  getRowId?: TableOptions<DataTableFeatures, TData>["getRowId"];
  initialState?: TableOptions<DataTableFeatures, TData>["initialState"];
  loading?: boolean;
  loadingRows?: number;
  onRowSelectionChange?: (rowSelection: DataTableRowSelectionState) => void;
  pagination?: false | DataTablePaginationOptions;
  rowSelection?: DataTableRowSelectionState;
  search?: string | DataTableSearchOptions;
  tableClassName?: string;
  toolbar?: React.ReactNode | ((table: DataTableInstance<TData>) => React.ReactNode);
};

function DataTable<TData extends RowData>({
  "aria-label": ariaLabel = "Data table",
  className,
  columns,
  data,
  defaultRowSelection,
  emptyState,
  getRowId,
  initialState,
  loading = false,
  loadingRows = 5,
  onRowSelectionChange,
  pagination = {},
  rowSelection,
  search,
  tableClassName,
  toolbar,
}: DataTableProps<TData>) {
  const [internalRowSelection, setInternalRowSelection] =
    React.useState<DataTableRowSelectionState>(
      () => rowSelection ?? defaultRowSelection ?? initialState?.rowSelection ?? {},
    );
  const controlledRowSelection = rowSelection !== undefined;
  const resolvedRowSelection = rowSelection ?? internalRowSelection;
  const handleRowSelectionChange = React.useCallback<OnChangeFn<DataTableRowSelectionState>>(
    (updater) => {
      const nextRowSelection = functionalUpdate(updater, resolvedRowSelection);

      if (!controlledRowSelection) {
        setInternalRowSelection(nextRowSelection);
      }

      onRowSelectionChange?.(nextRowSelection);
    },
    [controlledRowSelection, onRowSelectionChange, resolvedRowSelection],
  );
  const searchOptions = normalizeSearchOptions(search);
  const paginationOptions = pagination === false ? undefined : pagination;
  const initialPageSize = paginationOptions?.pageSize ?? 10;
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId,
    initialState: {
      ...initialState,
      rowSelection: resolvedRowSelection,
      pagination: initialState?.pagination ?? {
        pageIndex: 0,
        pageSize: initialPageSize,
      },
    },
    globalFilterFn: "includesString",
    state: { rowSelection: resolvedRowSelection },
    onRowSelectionChange: handleRowSelectionChange,
    getColumnCanGlobalFilter: (column) => {
      if (!column.accessorFn) {
        return false;
      }

      return searchOptions?.columnIds ? searchOptions.columnIds.includes(column.id) : true;
    },
    manualPagination: pagination === false,
  });
  const hideableColumns = table.getAllLeafColumns().filter((column) => column.getCanHide());
  const toolbarContent = typeof toolbar === "function" ? toolbar(table) : toolbar;
  const showToolbar = Boolean(searchOptions || toolbarContent || hideableColumns.length > 0);
  const visibleColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);
  const rows = table.getRowModel().rows;

  return (
    <div
      data-slot="data-table"
      className={cn("w-full border border-border bg-background", className)}
    >
      {showToolbar ? (
        <DataTableToolbar table={table} search={searchOptions} hideableColumns={hideableColumns}>
          {toolbarContent}
        </DataTableToolbar>
      ) : null}

      <div data-slot="data-table-container" className="w-full overflow-x-auto">
        <table
          data-slot="data-table-table"
          aria-label={ariaLabel}
          aria-busy={loading || undefined}
          className={cn("w-full caption-bottom border-collapse text-sm", tableClassName)}
        >
          <thead data-slot="data-table-header" className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      aria-sort={
                        sorted === "asc"
                          ? "ascending"
                          : sorted === "desc"
                            ? "descending"
                            : undefined
                      }
                      className={cn(
                        "h-10 whitespace-nowrap px-4 text-left align-middle font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground",
                        header.column.columnDef.meta?.headerClassName,
                      )}
                    >
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody data-slot="data-table-body">
            {loading ? (
              <DataTableLoadingRows columns={visibleColumnCount} rows={Math.max(1, loadingRows)} />
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className="border-b border-border transition-colors duration-100 last:border-b-0 hover:bg-muted/40 data-[state=selected]:bg-muted motion-reduce:transition-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        "whitespace-nowrap px-4 py-3 align-middle",
                        cell.column.columnDef.meta?.cellClassName,
                      )}
                    >
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={visibleColumnCount} className="h-36 px-4 text-center">
                  {emptyState ?? (
                    <div className="mx-auto max-w-sm">
                      <p className="text-sm font-medium">No results</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Adjust the active filters or provide a different query.
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paginationOptions ? <DataTablePagination table={table} options={paginationOptions} /> : null}

      {loading ? (
        <span role="status" className="sr-only">
          Loading table data
        </span>
      ) : null}
    </div>
  );
}

type DataTableColumnHeaderProps<TData extends RowData, TValue extends CellData> = Omit<
  React.ComponentProps<"button">,
  "children"
> & {
  column: Column<DataTableFeatures, TData, TValue>;
  title: React.ReactNode;
};

function DataTableColumnHeader<TData extends RowData, TValue extends CellData>({
  className,
  column,
  title,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <span className={className}>{title}</span>;
  }

  const sorted = column.getIsSorted();
  const nextOrder = column.getNextSortingOrder();
  const label =
    nextOrder === "asc"
      ? `Sort ${getColumnLabel(column)} ascending`
      : nextOrder === "desc"
        ? `Sort ${getColumnLabel(column)} descending`
        : `Clear sorting for ${getColumnLabel(column)}`;

  return (
    <button
      type="button"
      data-slot="data-table-column-header"
      aria-label={label}
      className={cn(
        "-mx-2 inline-flex h-8 cursor-pointer items-center gap-2 px-2 text-left outline-none transition-colors duration-100 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none",
        className,
      )}
      onClick={column.getToggleSortingHandler()}
      {...props}
    >
      <span>{title}</span>
      {sorted === "asc" ? (
        <ArrowUp className="size-3.5" aria-hidden="true" />
      ) : sorted === "desc" ? (
        <ArrowDown className="size-3.5" aria-hidden="true" />
      ) : (
        <ChevronsUpDown className="size-3.5 opacity-60" aria-hidden="true" />
      )}
      {column.getSortIndex() > 0 ? (
        <span className="text-[0.5625rem] tabular-nums">{column.getSortIndex() + 1}</span>
      ) : null}
    </button>
  );
}

function DataTableSelectHeader<TData extends RowData>({
  label = "Select all rows on this page",
  table,
}: {
  label?: string;
  table: DataTableCoreInstance<TData>;
}) {
  const checked = table.getIsAllPageRowsSelected();
  const indeterminate = !checked && table.getIsSomePageRowsSelected();

  return (
    <DataTableCheckbox
      aria-label={label}
      checked={checked}
      indeterminate={indeterminate}
      onCheckedChange={(nextChecked) => table.toggleAllPageRowsSelected(nextChecked)}
    />
  );
}

function DataTableSelectCell<TData extends RowData>({
  label = "Select row",
  row,
}: {
  label?: string;
  row: Row<DataTableFeatures, TData>;
}) {
  return (
    <DataTableCheckbox
      aria-label={label}
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onClick={(event) => {
        row.getToggleSelectedHandler()({
          target: { checked: !row.getIsSelected() },
          shiftKey: event.shiftKey,
          nativeEvent: event.nativeEvent,
        });
      }}
    />
  );
}

function DataTableToolbar<TData extends RowData>({
  children,
  hideableColumns,
  search,
  table,
}: {
  children?: React.ReactNode;
  hideableColumns: ReturnType<DataTableInstance<TData>["getAllLeafColumns"]>;
  search?: DataTableSearchOptions;
  table: DataTableInstance<TData>;
}) {
  const searchId = React.useId();
  const query = String(table.state.globalFilter ?? "");

  return (
    <div
      data-slot="data-table-toolbar"
      className="flex min-w-0 flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center"
    >
      {search ? (
        <div className="relative w-full sm:min-w-48 sm:flex-1 sm:max-w-sm">
          <label htmlFor={searchId} className="sr-only">
            {search.label ?? "Search table"}
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            autoComplete="off"
            data-1p-ignore
            data-lpignore="true"
            placeholder={search.placeholder ?? "Search rows…"}
            className="h-10 w-full appearance-none border border-input bg-background py-2 pr-10 pl-10 text-sm outline-none transition-[border-color,box-shadow] duration-100 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 [&::-webkit-search-cancel-button]:appearance-none motion-reduce:transition-none"
            onChange={(event) => table.setGlobalFilter(event.currentTarget.value)}
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear table search"
              className="absolute top-px right-px inline-flex h-[calc(100%-2px)] w-10 cursor-pointer items-center justify-center border-l border-input text-muted-foreground outline-none transition-colors duration-100 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 motion-reduce:transition-none"
              onClick={() => table.setGlobalFilter("")}
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:ml-auto sm:flex-nowrap">
        {children}
        {hideableColumns.length > 0 ? (
          <DataTableViewOptions table={table} columns={hideableColumns} />
        ) : null}
      </div>
    </div>
  );
}

function DataTableViewOptions<TData extends RowData>({
  columns,
  table: _table,
}: {
  columns: ReturnType<DataTableInstance<TData>["getAllLeafColumns"]>;
  table: DataTableInstance<TData>;
}) {
  return (
    <MenuPrimitive.Root>
      <MenuPrimitive.Trigger
        render={<DataTableControlButton />}
        aria-label="Choose visible columns"
      >
        <Columns2 aria-hidden="true" />
        Columns
        <ChevronDown aria-hidden="true" />
      </MenuPrimitive.Trigger>
      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner align="end" sideOffset={6} className="isolate z-50 outline-none">
          <MenuPrimitive.Popup className="min-w-52 origin-(--transform-origin) border border-border bg-popover p-1 text-popover-foreground outline-none transition-[opacity,transform] duration-100 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none">
            <MenuPrimitive.Group>
              <MenuPrimitive.GroupLabel className="px-3 py-2 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Visible columns
              </MenuPrimitive.GroupLabel>
              {columns.map((column) => (
                <MenuPrimitive.CheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  className="relative flex min-h-9 cursor-default select-none items-center py-2 pr-3 pl-9 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                  onCheckedChange={(checked) => column.toggleVisibility(checked)}
                >
                  <MenuPrimitive.CheckboxItemIndicator className="absolute left-3 grid size-4 place-items-center">
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </MenuPrimitive.CheckboxItemIndicator>
                  {getColumnLabel(column)}
                </MenuPrimitive.CheckboxItem>
              ))}
            </MenuPrimitive.Group>
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  );
}

function DataTablePagination<TData extends RowData>({
  options,
  table,
}: {
  options: DataTablePaginationOptions;
  table: DataTableInstance<TData>;
}) {
  const filteredRows = table.getFilteredRowModel().rows.length;
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const pageCount = table.getPageCount();
  const currentPage = pageCount === 0 ? 0 : table.state.pagination.pageIndex + 1;
  const pageSizeOptions = normalizePageSizeOptions(
    options.pageSizeOptions,
    table.state.pagination.pageSize,
  );

  return (
    <div
      data-slot="data-table-pagination"
      className="flex min-w-0 flex-col gap-3 border-t border-border px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p
        className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground"
        aria-live="polite"
      >
        {selectedRows > 0
          ? `${selectedRows} of ${filteredRows} rows selected`
          : `${filteredRows} ${filteredRows === 1 ? "row" : "rows"}`}
      </p>

      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:justify-end">
        <label className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
          Rows
          <span className="relative">
            <select
              aria-label="Rows per page"
              value={table.state.pagination.pageSize}
              className="h-8 cursor-pointer appearance-none border border-input bg-background pr-8 pl-3 font-mono text-xs text-foreground outline-none transition-[border-color,box-shadow] duration-100 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none"
              onChange={(event) => table.setPageSize(Number(event.currentTarget.value))}
            >
              {pageSizeOptions.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </span>
        </label>

        <span className="min-w-20 text-center font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground tabular-nums">
          {String(currentPage).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-1">
          <DataTableControlButton
            size="icon"
            aria-label="First page"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.firstPage()}
          >
            <ChevronFirst aria-hidden="true" />
          </DataTableControlButton>
          <DataTableControlButton
            size="icon"
            aria-label="Previous page"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft aria-hidden="true" />
          </DataTableControlButton>
          <DataTableControlButton
            size="icon"
            aria-label="Next page"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ChevronRight aria-hidden="true" />
          </DataTableControlButton>
          <DataTableControlButton
            size="icon"
            aria-label="Last page"
            disabled={!table.getCanLastPage()}
            onClick={() => table.lastPage()}
          >
            <ChevronLast aria-hidden="true" />
          </DataTableControlButton>
        </div>
      </div>
    </div>
  );
}

function DataTableControlButton({
  className,
  size = "text",
  type = "button",
  ...props
}: React.ComponentProps<"button"> & { size?: "icon" | "text" }) {
  return (
    <button
      type={type}
      data-slot="data-table-control"
      className={cn(
        "inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap border border-border bg-background px-3 text-xs font-medium outline-none transition-[background-color,border-color,color,opacity] duration-100 hover:border-foreground/40 hover:bg-muted focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none [&_svg]:size-3.5 [&_svg]:shrink-0",
        size === "icon" && "w-8 px-0",
        className,
      )}
      {...props}
    />
  );
}

function DataTableCheckbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="data-table-checkbox"
      className={cn(
        "relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center border border-input bg-background text-primary-foreground outline-none transition-[background-color,border-color,box-shadow,opacity] duration-100 after:absolute after:-inset-2.5 hover:border-foreground/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-checked:border-primary data-checked:bg-primary data-indeterminate:border-primary data-indeterminate:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-40 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="group/indicator grid place-items-center text-current [&_svg]:size-3">
        <Check
          className="group-data-[indeterminate]/indicator:hidden"
          strokeWidth={2.5}
          aria-hidden="true"
        />
        <Minus
          className="hidden group-data-[indeterminate]/indicator:block"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

function DataTableLoadingRows({ columns, rows }: { columns: number; rows: number }) {
  return Array.from({ length: rows }, (_, rowIndex) => (
    // Skeleton rows are a fixed, non-interactive sequence with no retained item state.
    // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton order and identity never change.
    <tr key={`loading-${rowIndex}`} className="border-b border-border last:border-b-0">
      {Array.from({ length: columns }, (_, columnIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton cells are positional placeholders.
        <td key={`loading-${rowIndex}-${columnIndex}`} className="px-4 py-3">
          <span
            className={cn(
              "block h-4 animate-pulse bg-muted motion-reduce:animate-none",
              columnIndex % 3 === 0 ? "w-24" : "w-16",
            )}
          />
        </td>
      ))}
    </tr>
  ));
}

function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>();
}

function normalizeSearchOptions(search: string | DataTableSearchOptions | undefined) {
  if (!search) {
    return undefined;
  }

  return typeof search === "string" ? { columnIds: [search] } : search;
}

function normalizePageSizeOptions(options: readonly number[] | undefined, current: number) {
  return Array.from(new Set([...(options ?? [10, 20, 50]), current]))
    .filter((value) => Number.isInteger(value) && value > 0)
    .sort((left, right) => left - right);
}

function getColumnLabel<TData extends RowData, TValue extends CellData>(
  column: Column<DataTableFeatures, TData, TValue>,
) {
  const header = column.columnDef.header;

  if (column.columnDef.meta?.label) {
    return column.columnDef.meta.label;
  }

  if (typeof header === "string") {
    return header;
  }

  return column.id
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/^./, (character) => character.toUpperCase());
}

export type {
  DataTableColumnDef,
  DataTableColumnHeaderProps,
  DataTableColumnMeta,
  DataTableInitialState,
  DataTableInstance,
  DataTablePaginationOptions,
  DataTableProps,
  DataTableRowSelectionState,
  DataTableSearchOptions,
};
export {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
  DataTableSelectCell,
  DataTableSelectHeader,
};
