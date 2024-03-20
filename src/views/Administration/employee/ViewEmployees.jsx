import React, { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddEmployeeModal from "./AddEmployeeModal";

const ViewEmployees = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  return (
    <>
      <Container className="p-3">
        {/* <div>ViewEmployees</div> */}
        <Button className="mb-2 ms-auto" onClick={() => setShow(true)}>
          {" "}
          New Employee
        </Button>
        <Table striped bordered hover>
          {/* // provide list of registered employees in a tabular format with
          columns employee number, avatar (or photo), name (full name in one
          column) , age, gender, position, start date, status (active/inactive
          to track employees who have resigned) */}
          <thead>
            <tr>
              <th>Employee Number</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Position</th>
              <th>Start Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </Table>
      </Container>
      <AddEmployeeModal show={show} handleClose={handleClose} />
    </>
  );
};

export default ViewEmployees;
