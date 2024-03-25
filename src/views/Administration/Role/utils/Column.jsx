import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();
export const columns = [
  { Header: "Role Number", accessorKey: "id" },
  {
    header: "Role Name",
    accessorKey: "name",
  },
  columnHelper.accessor("status", {
    cell: (s) => {
      // console.log(url);
      return s.getValue() == true ? (
        <span className="py-0 px-1 text-center text-white bg-success">
          active
        </span>
      ) : (
        <span className="py-0 px-1 text-center text-white bg-danger">
          inactive
        </span>
      );
    },
  }),
];
