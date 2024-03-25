import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDeactivateRole } from "./hooks/useDeactivateRole";

const DeactivateRoleModal = ({ show, handleClose, roleId }) => {
  const deactiveMutation = useDeactivateRole();
  console.log("jbeId");
  const clickHandler = () => {
    deactiveMutation.mutateAsync(roleId).then(async (res) => {
      if (res.status === 200) {
        // await refetch();
        handleClose(false);
      }
    });
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
      <Modal.Body>{`Are you sure you want to Deactivate role?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={deactiveMutation.isPending}
          onClick={clickHandler}
        >
          {deactiveMutation.isPending && (
            <Spinner animation="border" size="sm" />
          )}
          Deactivate
        </Button>
      </div>
    </Modal>
  );
};

export default DeactivateRoleModal;
