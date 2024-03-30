import React from "react";
import { Button, Col, Image, Modal, Row, Table } from "react-bootstrap";
import { Host_URL } from "../../../utils/getHost_URL";
import { differenceInYears } from "date-fns";

const ViewEmployeeDetail = ({ show, handleClose, employee }) => {
  // console.log(employee);
  return (
    <Modal show={show} size="lg" onHide={handleClose}>
      <Modal.Header className="py-3" closeButton>
        <Modal.Title>Employee Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-0 py-2">
        {/* display employee information */}
        <div className="d-flex flex-column">
          <div>
            <div className="px-3 py-1 d-flex">
              <div className="d-flex gap-3 align-items-center p-2">
                {employee.photo ? (
                  <Image
                    className="rounded-circle"
                    //   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    src={Host_URL + employee.photo}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    alt=""
                    roundedCircle
                    width={80}
                    height={80}
                  />
                ) : (
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      fontSize: 25,
                      letterSpacing: 2,
                    }}
                    className=" bg-primary text-white d-flex align-items-center justify-content-center"
                  >
                    {employee.firstName.split("")[0].toUpperCase() +
                      employee.middleName.split("")[0].toUpperCase()}
                  </div>
                )}

                <div className="d-flex flex-column  justify-content-center align-items-start">
                  <h5 className=" mb-0">
                    {employee.firstName +
                      " " +
                      employee.middleName +
                      " " +
                      employee.lastName}
                  </h5>
                  <p className="mb-0 text-muted mt-1">
                    {employee.address.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-2" />
          <h6 className="border-bottom pt-1 pb-2 ps-2 mx-3 mb-3 ">
            Employee Information
          </h6>{" "}
          <Row className="px-3">
            <Col sm={6} className="px-4">
              <p className="mb-0 text-muted">Name</p>
              <p className="small">{employee.firstName}</p>
            </Col>
            <Col sm={6} className="px-4">
              <p className="mb-0 text-muted">Father Name</p>
              <p className="small">{employee.middleName}</p>
            </Col>
          </Row>
          <Row className="px-3">
            <Col sm={6} className="px-4">
              <p className="mb-0 text-muted">Grandfather Name</p>
              <p className="small">
                {employee.lastName ? (
                  employee.lastName
                ) : (
                  <span className="text-danger w-100 fw-bold">___</span>
                )}
              </p>
            </Col>
            <Col sm={6} className="px-4">
              <p className="mb-0 text-muted">Status</p>
              <p className="small">{employee.status ? "active" : "inactive"}</p>
            </Col>
          </Row>
          <Row className="px-3">
            <Col sm={6} className="px-4">
              <p className="mb-0 text-muted">Phone</p>
              <p className="small mb-3">{employee.address.phone_1}</p>
            </Col>
            <Col sm={6} className="px-4">
              <p className="mb-0 text-muted">Email</p>
              <p className="small mb-0">
                {employee.address?.email ? (
                  employee.address.email
                ) : (
                  <span className="text-danger w-100 fw-bold">___</span>
                )}
              </p>
            </Col>
          </Row>
          <Row className="px-3">
            <Col className="px-4">
              <p className="mb-0 text-muted">Position</p>
              <p className="small">{employee?.position}</p>
            </Col>
            <Col className="px-4">
              <p className="mb-0 text-muted">Gender</p>
              <p className="small">{employee?.gender}</p>
            </Col>
          </Row>
          <Row className="px-3">
            <Col className="px-4">
              <p className="mb-0 text-muted">Date of Birth</p>
              <p className="small mb-0">
                {new Date(employee.date_of_birth).toDateString()}
              </p>
            </Col>
            <Col className="px-4">
              <p className="mb-0 text-muted">Date of Hire</p>
              <p className="small ">
                {new Date(employee.date_of_hire).toDateString()}
              </p>
            </Col>
          </Row>
          <Row className="px-3">
            <Col className="px-4">
              <p className="mb-0 text-muted">Region</p>
              <p className="small">
                {employee.address?.woreda?.SubCity?.city?.region?.name}
              </p>
            </Col>
            <Col className="px-4">
              <p className="mb-0 text-muted">City</p>
              <p className="small ">
                {employee.address?.woreda?.SubCity?.city?.name}
              </p>
            </Col>
          </Row>
          <Row className="px-3">
            <Col className="px-4">
              <p className="mb-0 text-muted">Subcity</p>
              <p className="small">
                {employee.address?.woreda?.SubCity?.subCity_name}
              </p>
            </Col>
            <Col className="px-4">
              <p className="mb-0 text-muted">Woreda</p>
              <p className="small ">{employee.address?.woreda?.name}</p>
            </Col>
          </Row>
          <Row className="px-3">
            <Col className="px-4">
              <p className="mb-0 text-muted">House Number</p>
              <p className="small mb-0">
                {employee.address?.house_number ? (
                  employee.address?.house_number
                ) : (
                  <span className="text-danger w-100 fw-bold">___</span>
                )}
              </p>
            </Col>
            <Col className="px-4">
              {/* <p className="mb-0 text-muted">House Number</p>
              <p className="small mb-0">
                {employee.address?.house_number ? (
                  employee.address?.house_number
                ) : (
                  <span className="text-danger w-100 fw-bold">___</span>
                )}
              </p> */}
            </Col>
          </Row>
        </div>
        <h6 className="border-bottom pt-1 pb-2 ps-2 mx-3 mb-3 ">
          Emergency Contact Information
        </h6>
        <Row className="px-3">
          <Col className="px-4">
            <p className="mb-0 text-muted">Name</p>
            <p className="small">{employee.emergencyContact?.firstName}</p>
          </Col>
          <Col className="px-4">
            <p className="mb-0 text-muted">Father Name</p>
            <p className="small">{employee.emergencyContact?.middleName}</p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col className="px-4">
            <p className="mb-0 text-muted">Grandfather Name</p>
            <p className="small">
              {employee.emergencyContact?.lastName ? (
                employee.emergencyContact?.lastName
              ) : (
                <span className="text-danger w-100 fw-bold">___</span>
              )}
            </p>
          </Col>
          <Col className="px-4">
            <p className="mb-0 text-muted">Relationship</p>
            <p className="small">{employee.emergencyContact?.relationship}</p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col className="px-4">
            <p className="mb-0 text-muted">Same Address as employee</p>
            <p className="small">
              {employee.address_id === employee.emergencyContact.address_id
                ? "Yes"
                : "No"}
            </p>
          </Col>
          <Col className="px-4">
            <p className="mb-0 text-muted">Phone</p>
            <p className="small">{employee.emergencyContact.phone}</p>
          </Col>
        </Row>
        <Row className="px-3">
          {employee.address_id !== employee.emergencyContact.address_id && (
            <>
              {/* <Col sm={6} className="px-4">
                <p className="mb-0 text-muted">Email</p>
                <p className="small mb-0">
                  {employee.emergencyContact.address?.email ? (
                    employee.emergencyContact.address.email
                  ) : (
                    <span className="text-danger w-100 fw-bold">___</span>
                  )}
                </p>
              </Col> */}

              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted">Region</p>
                <p className="small">
                  {
                    employee.emergencyContact.address?.woreda?.SubCity?.city
                      ?.region?.name
                  }
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted">City</p>
                <p className="small ">
                  {
                    employee.emergencyContact.address?.woreda?.SubCity?.city
                      ?.name
                  }
                </p>
              </Col>

              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted">Sub City</p>
                <p className="small">
                  {
                    employee.emergencyContact.address?.woreda?.SubCity
                      ?.subCity_name
                  }
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted">Woreda</p>
                <p className="small ">
                  {employee.emergencyContact.address?.woreda?.name}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted">House Nember</p>
                <p className="small mb-0">
                  {employee.emergencyContact.address?.house_number ? (
                    employee.emergencyContact.address.house_number
                  ) : (
                    <span className="text-danger w-100 fw-bold">___</span>
                  )}
                </p>
              </Col>
            </>
          )}
        </Row>
        {/* <div className="d-flex gap-5 justify-content-around flex-md-row flex-column">
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
        </div> */}
      </Modal.Body>
    </Modal>
  );
};

export default ViewEmployeeDetail;
