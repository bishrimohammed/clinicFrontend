import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();
export const COLUMNS = [
  {
    header: "Name",
    id: "Name",
    accessorFn: (row) =>
      `${row.employee.firstName} ${row.employee.middleName} ${row.employee.lastName}`,
  },
  {
    id: "Gender",
    accessorFn: (row) => `${row.employee.gender}`,
  },
  columnHelper.accessor("status", {
    cell: (s) => {
      // console.log(url);
      return s.getValue() == true ? (
        <span className="text-center text-white bg-success">active</span>
      ) : (
        <span className="py-0 px-1 text-center text-white bg-danger">
          inactive
        </span>
      );
    },
  }),
  {
    header: "email",
    accessorKey: "email",
  },
  {
    id: "phone",
    accessorFn: (row) => `${row.employee.address.phone_1}`,
  },
  {
    id: "Role",
    header: "Role",
    accessorFn: (row) => `${row.role.name}`,
  },
];
