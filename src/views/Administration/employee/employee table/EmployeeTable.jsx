import React, { useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import SearchInput from "../../../../components/inputs/SearchInput";
// import { COLUMNS } from "../utils/COLUMNS.js";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { COLUMNS } from "../utils/COLUMNS";
import { FaUserLock } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";

const EmployeeTable = ({
  setAddEmployeeModal,
  handleShowEdit,
  setData_to_be_Edited,
  Data,
  isPending,
  setSelectedEmployee,
  setShowDelete,
}) => {
  console.log("rerer");
  //   return <span onClick={() => setAddEmployeeModal(false)}>fdvfdv</span>;
  const employeeData = useMemo(() => Data, [isPending]);
  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: employeeData,
    getCoreRowModel: getCoreRowModel(),
  });
  const [search, setSearch] = useState("");
  //   console.log(tableInstance.getRowModel());
  return (
    <>
      <div className=" d-flex justify-content-between align-items-center w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />
        <Button className=" ms-auto" onClick={() => setAddEmployeeModal(true)}>
          {"  "}
          New Employee
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl, index) => {
                  return (
                    <th key={columnEl.id}>
                      {flexRender(
                        columnEl.column.columnDef.header,
                        columnEl.getContext()
                      )}
                    </th>
                  );
                })}
                <th>Actions</th>
              </tr>
            );
          })}
          {/* <tr>
            <th>Employee Number</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Position</th>
            <th>Start Date</th>
            <th>Status</th>
          </tr> */}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr
                key={rowEl.id}
                style={{ cursor: "pointer", zIndex: "-1" }}
                onClick={() => {
                  //   alert(JSON.stringify(rowEl.original));
                  console.log("llllll");
                }}
              >
                {rowEl.getVisibleCells().map((cellEl, index) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  );
                })}
                <td>
                  {
                    <div className="d-flex align-items-center gap-1">
                      <span
                        style={{ zIndex: "99" }}
                        className="p-1 bg-primary text-white d-flex align-items-center justify-content-center"
                        onClick={(event) => {
                          event.stopPropagation();

                          setData_to_be_Edited(rowEl.original);
                          handleShowEdit();
                        }}
                      >
                        <TbEdit />
                      </span>
                      <span
                        className="p-1 bg-warning text-white d-flex align-items-center justify-content-center"
                        onClick={(event) => {
                          event.stopPropagation();
                          // console.log(JSON.stringify(rowEl.original));
                          // alert(JSON.stringify(rowEl.original));
                          setSelectedEmployee({
                            id: rowEl.original.id,
                            selectedFor: "deactive",
                          });
                          setShowDelete(true);
                        }}
                      >
                        <FaUserLock />
                      </span>
                      <span
                        className="p-1 bg-danger text-white d-flex align-items-center justify-content-center"
                        onClick={(event) => {
                          event.stopPropagation();

                          setSelectedEmployee({
                            id: rowEl.original.id,
                            selectedFor: "delete",
                          });
                        }}
                      >
                        <RiDeleteBin6Line />
                      </span>
                    </div>
                  }
                </td>
              </tr>
            );
          })}
          {/* {employeeData?.map((e, index) => (
            <tr key={index}>
              <td>{e.firstName}</td>
              <td>{e.middleName}</td>
              <td>{e.firstName}</td>
              <td>{e.firstName}</td>
              <td>{e.firstName}</td>
              <td>{e.firstName}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </>
  );
};
const MemoizedEmployeeTable = React.memo(EmployeeTable);
export default MemoizedEmployeeTable;
