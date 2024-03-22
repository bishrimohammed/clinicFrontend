import React from "react";
import { Button, Image, Modal, Table } from "react-bootstrap";
import { Host_URL } from "../../../utils/getHost_URL";
import { differenceInYears } from "date-fns";

const ViewEmployeeDetail = ({ show, handleClose, employee }) => {
  console.log(employee);
  return (
    <Modal show={show} fullscreen onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Table>
          <thead>
            <th>Name</th>
            <th>Photo</th>

            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>

            <th>Position</th>
            <th>Start Date</th>
            <th>Status</th>
          </thead>
          <tbody>
            <tr>
              <td>
                {employee.firstName} {employee.middleName} {employee.lastName}
              </td>
              <td>
                {employee.photo && (
                  <img src={Host_URL + employee.photo} width={50} height={50} />
                )}
              </td>
              <td>
                {differenceInYears(new Date(), employee.date_of_birth)} years
              </td>
              <td>{employee.gender}</td>
              <td>{employee.address?.phone_1}</td>
              <td>{employee.address?.email}</td>
              <td>{employee.position}</td>
            </tr>
          </tbody>
        </Table> */}

        {/* display employee information */}
        <div className="d-flex gap-5 justify-content-around flex-md-row flex-column">
          <div className="d-flex flex-column gap-2">
            <h6 className="border-bottom border-1 border-black py-2 mb-2 fw-bold">
              Employee Information
            </h6>
            <div>
              <span className="fw-bold">Employee Name : </span>{" "}
              {employee.firstName} {employee.middleName} {employee.lastName}
            </div>
            <div>
              <span className="fw-bold"> Date of Birth : </span>{" "}
              {new Date(employee.date_of_birth).toDateString()}
            </div>
            <div>
              {" "}
              <span className="fw-bold">Gender : </span> {employee.gender}
            </div>

            <div>
              {" "}
              <span className="fw-bold">Position : </span> {employee.position}
            </div>
            <div>
              {" "}
              <span className="fw-bold"> Start Date : </span>{" "}
              {new Date(employee.date_of_hire).toDateString()}
            </div>
            <>
              <div>
                {" "}
                <span className="fw-bold">Phone : </span>{" "}
                {employee.address?.phone_1}
              </div>
              <div>
                {" "}
                <span className="fw-bold">Email : </span>{" "}
                {employee.address?.email}
              </div>
              <div>
                {" "}
                <span className="fw-bold">Region : </span>{" "}
                {employee.address?.woreda?.SubCity?.city?.region?.name}
              </div>
              <div>
                {" "}
                <span className="fw-bold">City : </span>{" "}
                {employee.address?.woreda?.SubCity?.city?.name}
              </div>
              <div>
                {" "}
                <span className="fw-bold">SubCity : </span>{" "}
                {employee.address?.woreda?.SubCity?.subCity_name}
              </div>
              <div>
                {" "}
                <span className="fw-bold">Woreda : </span>{" "}
                {employee.address?.woreda?.name}
              </div>
            </>
            <div>
              {" "}
              <span className="fw-bold"> Status : </span>{" "}
              {employee.status ? (
                <span className="px-1 text-center text-white bg-success">
                  active
                </span>
              ) : (
                <span className="py-0 px-1 text-center text-white bg-danger">
                  inactive
                </span>
              )}
            </div>
            <div>
              <span className="fw-bold">Photo</span>{" "}
              <Image
                src={Host_URL + employee.photo}
                width={100}
                height={100}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <h6 className="border-bottom border-1 border-black py-2 mb-2 fw-bold">
              Emergency Contact Information
            </h6>
            <div>
              <span className="fw-bold"> Name : </span>{" "}
              {employee.emergencyContact?.firstName}{" "}
              {employee.emergencyContact?.middleName}{" "}
              {employee.emergencyContact?.lastName}
            </div>
            <div>
              <span className="fw-bold"> relationship : </span>{" "}
              {employee.emergencyContact.relationship !== "Other"
                ? employee.emergencyContact.relationship
                : employee.emergencyContact.other_relationship}
            </div>
            <div>
              {" "}
              <span className="fw-bold">Same address as employee : </span>{" "}
              {employee.address_id === employee.emergencyContact.address_id
                ? "Yes"
                : "No"}
            </div>
            {employee.address_id !== employee.emergencyContact.address_id && (
              <>
                <div>
                  {" "}
                  <span className="fw-bold">Phone : </span>{" "}
                  {employee.emergencyContact.address?.phone_1}
                </div>
                <div>
                  {" "}
                  <span className="fw-bold">Email : </span>{" "}
                  {employee.emergencyContact.address?.email}
                </div>
                <div>
                  {" "}
                  <span className="fw-bold">Region : </span>{" "}
                  {
                    employee.emergencyContact.address?.woreda?.SubCity?.city
                      ?.region?.name
                  }
                </div>
                <div>
                  {" "}
                  <span className="fw-bold">City : </span>{" "}
                  {
                    employee.emergencyContact.address?.woreda?.SubCity?.city
                      ?.name
                  }
                </div>
                <div>
                  {" "}
                  <span className="fw-bold">SubCity : </span>{" "}
                  {
                    employee.emergencyContact.address?.woreda?.SubCity
                      ?.subCity_name
                  }
                </div>
                <div>
                  {" "}
                  <span className="fw-bold">Woreda : </span>{" "}
                  {employee.emergencyContact.address?.woreda?.name}
                </div>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewEmployeeDetail;
