import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "..";
import { DataTablePagination } from "../DataTablePagination";
import { Input } from "../../input";
import { SearchIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children?: React.ReactNode;
  isLoading?: boolean;
  hidePagination?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  hidePagination,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [sortOption, setSortOption] = React.useState("newest");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    table.getColumn("username")?.setFilterValue(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    table.setSorting([{ id: "username", desc: value === "newest" }]);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8">
          <div>
            <p className="mb-0 md:mb-2 font-bold">All Users</p>
            <p className="text-xs text-[#16C098]">Active Members</p>
          </div>

          <div className="flex space-x-4 mt-5 md:mt-0">
            <Input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearch}
              className="border-none bg-[#F9FBFF] rounded-md p-2 placeholder:text-[#B5B7C0] placeholder:text-xs placeholder:pl-8 pl-10"
              leftIcon={<SearchIcon width={20} color="#7E7E7E" />}
            />

            <select
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border-none bg-[#F9FBFF] rounded-md text-xs"
            >
              <option value="newest" className="text-[#3D3C42] font-semibold">
                Sort by: Newest
              </option>
              <option value="oldest" className="text-[#3D3C42] font-semibold">
                Sort by: Oldest
              </option>
            </select>
          </div>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-0">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="min-w-full">
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="text-xs min-w-full"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!hidePagination && <DataTablePagination table={table} />}
    </div>
  );
}
