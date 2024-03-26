import React from "react";
import { useDeactivateUser } from "./hooks/useDeactivateUser";
import { Button, Modal, Spinner } from "react-bootstrap";

const UserDeactivateModal = ({ show, handleClose, userId }) => {
  const deactiveMutation = useDeactivateUser();
  console.log("jbeId");
  const clickHandler = () => {
    deactiveMutation.mutateAsync(userId).then(async (res) => {
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

export default UserDeactivateModal;
