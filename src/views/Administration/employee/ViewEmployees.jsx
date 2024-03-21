import React, { useCallback, useMemo, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddEmployeeModal from "./AddEmployeeModal";
import { useGetEmployees } from "./hooks/useGetEmployees";
import EmployeeTable from "./employee table/EmployeeTable";
import { toast } from "react-toastify";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

const ViewEmployees = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: null,
    selectedFor: "",
  });
  const { data, isPending, error } = useGetEmployees();
  // let editData;
  console.log(selectedEmployee);
  const navigate = useNavigate();
  const employeeData = useMemo(() => data, [isPending]);
  const handleClose = useCallback(() => setShow(false), [show]);
  const handleShow = useCallback(() => setShow(true), []);

  const handleCloseEdit = useCallback(() => setShowEdit(false), []);
  const handleShowEdit = (value) => setShowEdit(true);

  // const setData_to_be_Edited = (value) => {
  //   console.log(value);
  //   editData = value;
  // };
  if (isPending) return "lood...";

  if (error) return toast.error(error.message);
  return (
    <>
      <Container className="p-3">
        {/* <div>ViewEmployees</div> */}
        <div className=" border-bottom border-1 mb-1">
          {/* <h4 className="mb-2">View Employees</h4> */}
          <h4 className=" p-2 mb-0 fw-bold">View Employees</h4>
        </div>
        {/* <hr className="mt-0" /> */}

        <EmployeeTable
          setAddEmployeeModal={setShow}
          Data={employeeData}
          isPending={isPending}
          handleShowEdit={handleShowEdit}
          setData_to_be_Edited={setEditData}
          setSelectedEmployee={setSelectedEmployee}
          setShowDelete={setShowDelete}
        />
      </Container>
      <AddEmployeeModal show={show} handleClose={handleClose} />
      {showEdit && editData && (
        <EditEmployeeModal
          empoyeeData={editData}
          show={showEdit}
          handleClose={handleCloseEdit}
        />
      )}
      {selectedEmployee.id && showDelete && (
        <DeleteEmployeeModal show={showDelete} handleClose={setShowDelete} />
      )}
    </>
  );
};

export default ViewEmployees;
