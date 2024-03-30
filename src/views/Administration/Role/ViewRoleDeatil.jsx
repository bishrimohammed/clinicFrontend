import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

const ViewRoleDeatil = ({ show, handleClose, role }) => {
  // console.log(role);
  return (
    <Modal size="lg" show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View Role Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-2">
          <div>
            <span className="fw-bold">Role Name : </span> {role.name}
          </div>
          <div>
            <span className="fw-bold">Status : </span>{" "}
            {role.status ? "active" : "inactive"}
          </div>
          <div>
            <span className="fw-bold d-flex align-items-center gap-3">
              Permissions :
            </span>{" "}
            <div className="d-flex flex-wrap gap-2 mt-2">
              {role.permissions?.map((p) => (
                <span
                  key={p.id}
                  className="py-1 px-2 text-white"
                  style={{ backgroundColor: "#666" }}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewRoleDeatil;
