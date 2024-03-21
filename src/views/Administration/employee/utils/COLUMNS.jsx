import { createColumnHelper } from "@tanstack/react-table";
import { Image } from "react-bootstrap";
import { differenceInYears } from "date-fns";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaUserLock } from "react-icons/fa";
const Host_URL =
  import.meta.env.VITE_REACT_DEV === "development"
    ? `${import.meta.env.VITE_API_BASE_DEVELOPMENT}/`
    : `${import.meta.env.VITE_API_BASE_PRODUCTION}/`;
// @tanstack/react-table columns
const columnHelper = createColumnHelper();
const ImageCell = ({ value }) => {
  return (
    <div>
      console.log(value)
      <img src={value} alt="" />
    </div>
  );
};
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
      return (
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
        <span className="  text-center text-white bg-success">active</span>
      ) : (
        <span className="py-0 px-1 text-center text-white bg-danger">
          inactive
        </span>
      );
    },
  }),
];
