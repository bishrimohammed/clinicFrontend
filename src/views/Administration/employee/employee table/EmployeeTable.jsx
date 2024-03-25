import React, { useMemo, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import SearchInput from "../../../../components/inputs/SearchInput";
// import { COLUMNS } from "../utils/COLUMNS.js";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { COLUMNS } from "../utils/COLUMNS";
import { FaUserLock } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import useDebounce from "../../../../hooks/useDebounce";

const EmployeeTable = ({
  setAddEmployeeModal,
  handleShowEdit,
  setData_to_be_Edited,
  Data,
  isPending,
  setSelectedEmployee,
  setShowDelete,
  setShowViewEmployee,
  setEmployee,
}) => {
  // console.log("isPending : " + isPending);
  // console.log("isFetching : " + isFetching);
  //   return <span onClick={() => setAddEmployeeModal(false)}>fdvfdv</span>;
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const debouncedValue = useDebounce(search, 500);
  const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => COLUMNS, []);
  // console.log(refetch);
  const tableInstance = useReactTable({
    columns: columns,
    data: Data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      globalFilter: debouncedValue,
      pagination: pagination,
    },
    onGlobalFilterChange: setSearch,
  });

  //   console.log(tableInstance.getRowModel());
  return (
    <>
      <div className=" d-flex justify-content-between flex-wrap gap-2 align-items-center w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />
        <Button className=" ms-auto " onClick={() => setAddEmployeeModal(true)}>
          {"  "}
          New Employee
        </Button>
      </div>

      <Table striped bordered hover responsive className="mt-2">
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
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr
                key={rowEl.id}
                style={{ cursor: "pointer", zIndex: "-1" }}
                onClick={() => {
                  setShowViewEmployee(true);
                  setEmployee(rowEl.original);
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
                          setSelectedEmployee({
                            id: rowEl.original.id,
                            selectedFor: "deactivate",
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
                          setShowDelete(true);
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
        </tbody>
      </Table>
      <div className="d-flex align-items-center gap-2">
        <button
          className="border-0"
          style={{ outline: "none" }}
          onClick={() => tableInstance.firstPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          &lt;&lt;
        </button>
        <button
          // className="btn btn-outline-secondary"
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          &lt;
        </button>
        <button
          // className="btn btn-outline-secondary"
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          &gt;
        </button>
        <button
          // className="btn btn-outline-secondary"
          onClick={() => tableInstance.lastPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          &gt;&gt;
        </button>
        <span className="d-flex align-items-center gap-1">
          <div>Page</div>
          <strong className="d-flex align-items-center gap-1">
            {tableInstance.getState().pagination.pageIndex + 1} of{" "}
            {tableInstance.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="d-flex align-items-center gap-1">
          | Go to page:
          <input
            type="number"
            value={tableInstance.getState().pagination.pageIndex + 1}
            // defaultValue={tableInstance.options.state.pagination.pageIndex}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              tableInstance.setPageIndex(page);
            }}
            className="form-control w-25"
          />
        </span>
        <select
          value={tableInstance.getState().pagination.pageSize}
          // value={tableInstance.options.state.pagination.pageIndex}
          onChange={(e) => {
            tableInstance.setPageSize(Number(e.target.value));
          }}
          // className="form-select"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
// const MemoizedEmployeeTable = React.memo(EmployeeTable);
// export default MemoizedEmployeeTable;
export default EmployeeTable;
