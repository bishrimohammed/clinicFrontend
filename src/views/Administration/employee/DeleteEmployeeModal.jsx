import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDeleteEmployee } from "./hooks/useDeleteEmployee";
import { useDeactivateEmployee } from "./hooks/useDeactivateEmployee";

const DeleteEmployeeModal = ({ show, handleClose, employeeId, action }) => {
  const deleteMutation = useDeleteEmployee();
  const deactiveMutation = useDeactivateEmployee();

  // console.log(employeeId);
  const clickHandler = () => {
    if (action === "delete") {
      deleteMutation.mutateAsync(employeeId).then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          handleClose(false);
        }
      });
    } else {
      deactiveMutation.mutateAsync(employeeId).then(async (res) => {
        if (res.status === 200) {
          // refetch();
          handleClose(false);
        }
      });
    }
  };
  return (
    <Modal
      size="sm"
      show={show}
      onHide={() => handleClose(false)}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>{`Are you sure you want to ${action} employee?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={deleteMutation.isPending || deactiveMutation.isPending}
          onClick={clickHandler}
        >
          {(deleteMutation.isPending || deactiveMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )}
          {action === "delete" ? "Delete" : "Deactivate"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteEmployeeModal;
