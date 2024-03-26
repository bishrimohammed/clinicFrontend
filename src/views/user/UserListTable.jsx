import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import SearchInput from "../../components/inputs/SearchInput";
import { Button, Table } from "react-bootstrap";
import useDebounce from "../../hooks/useDebounce";
import { COLUMNS } from "./utils/Columns";
import { useGetUsers } from "./hooks/useGetUsers";
import { useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { FaUserLock } from "react-icons/fa";

const UserListTable = ({
  roles,
  isPending,
  setShowDeactivateModal,
  setShowViewUser,
  setShowViewEdit,
}) => {
  const navigate = useNavigate();
  // const { data: users, isPending, error } = useGetUsers();
  const Columns = useMemo(() => COLUMNS, []);
  const rowData = useMemo(() => roles, [isPending]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const debouncedValue = useDebounce(search, 500);
  const tableInstance = useReactTable({
    columns: Columns,
    data: roles,
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
  if (isPending) {
    return <Spinner animation="border" />;
  }
  return (
    <div>
      <div className=" d-flex justify-content-between flex-wrap gap-2 align-items-center w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />
        <Button
          className=" ms-auto border-0"
          style={{ backgroundColor: "#9007b6" }}
          onClick={() => navigate("newuser")}
        >
          {"  "}+ Add User
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
          {tableInstance.getRowModel()?.rows?.map((rowEl) => {
            return (
              <tr
                key={rowEl.id}
                style={{ cursor: "pointer", zIndex: "-1" }}
                onClick={() => {
                  //   setShowViewEmployee(true);
                  //   setEmployee(rowEl.original);
                  setShowViewUser({
                    isShow: true,
                    user: rowEl.original,
                  });
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
                          // setData_to_be_Edited(rowEl.original);
                          // handleShowEdit();
                          //   navigate(`edit/${rowEl.original.id}`, {
                          //     state: rowEl.original,
                          //   });
                          navigate(`edit/${rowEl.original.id}`, {
                            state: rowEl.original,
                          });
                          //   setShowViewEdit({
                          //     isShow: true,
                          //     user: rowEl.original,
                          //   });
                        }}
                      >
                        <TbEdit />
                      </span>
                      <span
                        className="p-1 bg-warning text-white d-flex align-items-center justify-content-center"
                        onClick={(event) => {
                          event.stopPropagation();
                          //   navigate(`edit/${rowEl.original.id}`, {
                          //     state: rowEl.original,
                          //   });
                          setShowDeactivateModal({
                            userId: rowEl.original.id,
                            isShow: true,
                          });
                          // setShowDelete(true);
                        }}
                      >
                        <FaUserLock />
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
    </div>
  );
};

export default UserListTable;
