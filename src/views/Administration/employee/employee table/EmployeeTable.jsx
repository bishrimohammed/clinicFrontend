import React, { useMemo, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import SearchInput from "../../../../components/inputs/SearchInput";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSortDown, FaSortUp } from "react-icons/fa";
// import { RiEditLine } from "react-icons/ri";
// import { COLUMNS } from "../utils/COLUMNS.js";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { COLUMNS } from "../utils/COLUMNS";
import { FaUserLock } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
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
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => COLUMNS, []);
  // console.log(refetch);
  const tableInstance = useReactTable({
    columns: columns,
    data: Data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      globalFilter: debouncedValue,
      pagination: pagination,
      sorting,
    },
    onGlobalFilterChange: setSearch,
    debugTable: true,
  });

  //   console.log(tableInstance.getRowModel());
  return (
    <>
      <div className=" d-flex justify-content-between flex-wrap gap-2 align-items-center w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />
        <Button className=" ms-auto " onClick={() => setAddEmployeeModal(true)}>
          {"  "}
          +Add Employee
        </Button>
      </div>

      <Table striped bordered hover responsive className="mt-2">
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl, index) => {
                  return (
                    <th key={columnEl.id} colSpan={columnEl.colSpan}>
                      {columnEl.isPlaceholder ? null : (
                        <div
                          className={
                            columnEl.column?.getCanSort()
                              ? "cursor-pointer select-none sort"
                              : ""
                          }
                          onClick={columnEl.column.getToggleSortingHandler()}
                          title={
                            columnEl.column.getCanSort()
                              ? columnEl.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : columnEl.column.getNextSortingOrder() ===
                                  "desc"
                                ? "Sort descending"
                                : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
                          {{
                            asc: <FaSortUp />,
                            desc: <FaSortDown />,
                          }[columnEl.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}

                <th>Actions</th>
              </tr>
            );
          })}
          {/* {tableInstance.getHeaderGroups().map((headerEl) => {
            <th key={headerEl.id} colSpan={headerEl.colSpan}>
              {headerEl.isPlaceholder ? null : (
                <div
                  className={
                    headerEl.column?.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }
                  onClick={headerEl.column.getToggleSortingHandler()}
                  title={
                    headerEl.column.getCanSort()
                      ? headerEl.column.getNextSortingOrder() === "asc"
                        ? "Sort ascending"
                        : headerEl.column.getNextSortingOrder() === "desc"
                        ? "Sort descending"
                        : "Clear sort"
                      : undefined
                  }
                >
                  {flexRender(
                    headerEl.column.columnDef.header,
                    headerEl.getContext()
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[headerEl.column.getIsSorted()] ?? null}
                </div>
              )}
            </th>;
          })} */}
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
                <td className="p-0">
                  <Dropdown
                    onClick={(e) => e.stopPropagation()}
                    className="p-0"
                  >
                    <Dropdown.Toggle
                      caret="false"
                      className="employee-dropdown px-3"
                    >
                      <span style={{ color: "red" }} className="text-dark">
                        <BsThreeDotsVertical />
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="d-flex gap-2 align-items-center"
                        role="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setData_to_be_Edited(rowEl.original);
                          handleShowEdit();
                        }}
                      >
                        <RiEditLine /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex gap-2 align-items-center"
                        role="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedEmployee({
                            id: rowEl.original.id,
                            selectedFor: "deactivate",
                          });
                          setShowDelete(true);
                        }}
                      >
                        <FaUserLock /> Deactivate
                      </Dropdown.Item>
                      <Dropdown.Item
                        role="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedEmployee({
                            id: rowEl.original.id,
                            selectedFor: "delete",
                          });
                          setShowDelete(true);
                        }}
                        className="d-flex gap-2 align-items-center"
                      >
                        <RiDeleteBin6Line /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
          {/* {tableInstance
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })} */}
        </tbody>
        {/* {tableInstance.getRowModel().rows.map((rowEl) => {
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
                  <Dropdown onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Toggle
                      caret="false"
                      className="employee-dropdown px-3"
                    >
                      <span style={{ color: "red" }} className="text-dark">
                        <BsThreeDotsVertical />
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="d-flex gap-2 align-items-center"
                        role="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setData_to_be_Edited(rowEl.original);
                          handleShowEdit();
                        }}
                      >
                        <RiEditLine /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex gap-2 align-items-center"
                        role="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedEmployee({
                            id: rowEl.original.id,
                            selectedFor: "deactivate",
                          });
                          setShowDelete(true);
                        }}
                      >
                        <FaUserLock /> Deactivate
                      </Dropdown.Item>
                      <Dropdown.Item
                        role="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedEmployee({
                            id: rowEl.original.id,
                            selectedFor: "delete",
                          });
                          setShowDelete(true);
                        }}
                        className="d-flex gap-2 align-items-center"
                      >
                        <RiDeleteBin6Line /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  
                </td>
              </tr>
            );
          })}  */}
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
