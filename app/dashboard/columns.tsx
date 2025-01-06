import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staffActionStatus } from "./constants"; // Ensure it has `value`, `label`, and `color`
import { CustomerData } from "./types";

export const columns: ColumnDef<CustomerData>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="min-w-[250px] md:min-w-[200px]">
        {row.getValue("company")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone Number
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="min-w-[150px] md:min-w-[150px]">
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="min-w-[150px] md:min-w-[150px]">
        {row.getValue("country")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
        </Button>
      );
    },
    cell: ({ row }) => {
      const statusValue = row.getValue("status");

      const status = staffActionStatus.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (s: any) => s.value === statusValue,
      );

      if (!status) return <div>No Status</div>;

      return (
        <Badge className="w-max hover:cursor-pointer" variant={status.color}>
          {status.label}
        </Badge>
      );
    },
  },
];
