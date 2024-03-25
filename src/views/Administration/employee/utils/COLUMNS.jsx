import { createColumnHelper } from "@tanstack/react-table";
import { Image } from "react-bootstrap";
import { differenceInYears } from "date-fns";

import { Host_URL } from "../../../../utils/getHost_URL";

const columnHelper = createColumnHelper();

export const COLUMNS = [
  {
    Header: "Employee Number",
    accessorKey: "id",
  },
  {
    id: "Employee Name",
    accessorFn: (row) => `${row.firstName} ${row.middleName} ${row.lastName}`,
  },
  columnHelper.accessor("photo", {
    cell: (url) => {
      // console.log(url);
      return url.getValue() ? (
        <Image
          width={30}
          height={30}
          roundedCircle
          // fluid
          // className="object-fit"
          style={{ objectFit: "cover", objectPosition: "center" }}
          src={Host_URL + url.getValue()}
          alt="hgkhv"
        />
      ) : (
        <div className="text-danger w-100 fw-bold">___</div>
      );
    },
  }),
  {
    header: "Age",
    accessorKey: "date_of_birth",
    accessorFn: (row) => {
      return differenceInYears(new Date(), row.date_of_birth) + " years";
    },
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Position",
    accessorKey: "position",
  },
  {
    header: "Start Date",
    accessorKey: "date_of_hire",
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
];
