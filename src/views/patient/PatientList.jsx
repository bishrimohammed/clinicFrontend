/* eslint-disable react/prop-types */
import { Container, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { useSearchPatient } from "./hooks/useSearchPatient";

import React, { useState } from "react";
import SearchInput from "../../components/inputs/SearchInput";
import useDebounce from "../../hooks/useDebounce";
import { BiEdit } from "react-icons/bi";
const StripedRowExample = ({ searchValue }) => {
  const currentUser = useSelector((state) => state.auth.user);

  const {
    data: patients,
    isLoading,
    isError,
    error,
  } = useSearchPatient(searchValue);

  if (isLoading) return <Spinner animation="grow" />;
  if (isError) return <div>error {error.message}</div>;
  return (
    <>
      <>
        <hr className="bg-primary my-2" />{" "}
        {/* <SearchInput searchvalue={search} setSearch={setSearch} /> */}
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>sex</th>
              <th>status</th>
              <th>Age</th>
              <th>phone</th>

              <th>card no</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length !== 0 ? (
              patients.map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${patient.name}`}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.status ? "patient" : "inpatient"}</td>
                  <td>{patient.age}</td>
                  <td>{patient.phone}</td>

                  <td>{patient.cardNumber}</td>

                  {currentUser.role === "cashier" && (
                    <td>
                      <NavLink
                        to={`/patients/editpatient/${patient._id}`}
                        state={patient}
                      >
                        <BiEdit size={20} />
                      </NavLink>
                    </td>
                  )}

                  {currentUser.role === "doctor" && (
                    <td>
                      <NavLink to={`/patients/view/${patient._id}`}>
                        view
                      </NavLink>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td>no patient</td>
              </tr>
            )}
          </tbody>
        </Table>
      </>
    </>
  );
};
const MemoizedPatientLists = React.memo(StripedRowExample);
const PatientList = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);
  return (
    <>
      <Container className="p-3">
        <div className="p-3 bg-hrun-box">
          <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
            <h4 className="d-flex justify-content-center align-items-center mb-0">
              Patients List
            </h4>
            {currentUser.role === "cashier" && (
              <Link to="/patients/newpatient" className="btn btn-primary">
                Add Patient
              </Link>
            )}
          </div>
          <hr />
          <SearchInput searchvalue={search} setSearch={setSearch} />
          <MemoizedPatientLists searchValue={debouncedValue} />
        </div>
      </Container>

      {/* <Container className="p-3">
        <div className="p-3 bg-hrun-box">
          <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
            <h4 className="d-flex justify-content-center align-items-center mb-0">
              Patients List
            </h4>
            {currentUser.role === "cashier" && (
              <Link to="/patient/newpatient" className="btn btn-primary">
                Add Patient
              </Link>
            )}
          </div>
          <StripedRowExample />
        </div>
      </Container> */}
    </>
  );
};

export default PatientList;
