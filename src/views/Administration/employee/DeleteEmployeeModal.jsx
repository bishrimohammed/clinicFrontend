import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteEmployeeModal = ({ show, handleClose }) => {
  return (
    <Modal size="sm" show={show} onHide={() => handleClose(false)} centered>
      <Modal.Body>Are you sure you want to delete employee?</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleClose(false)}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteEmployeeModal;
