import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddLabResultModal from "./AddLabResultModal";
import UseLabByHistoryId from "../../hooks/UseLabByHistoryId";
import { format, formatHour } from "../../../../utils/formatDate";

const AddLabResult = () => {
  // const [history, setHistory] = useState(null);
  const [show, setShow] = useState(false);

  const { historyId } = useParams();
  const { data } = UseLabByHistoryId(historyId);
  let allTestOrdered = [];
  data?.investigations?.map((test) =>
    test.isPanel
      ? allTestOrdered.push(...test.panelGroup)
      : allTestOrdered.push(test)
  );
  // console.log(allTestOrdered);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <AddLabResultModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        lab={allTestOrdered}
        labId={data?._id}
      />

      <h3>Add Lab Results</h3>
      <h6>clinical finding</h6>
      <p>{data?.clinical_finding}</p>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Date Requested</th>
            <th>Test Name</th>

            <th>Requested By</th>

            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {data?.investigations.map((inves, index) => (
            <tr key={index}>
              <td>
                {format(data?.orderTime)} {formatHour(data?.orderTime)}
              </td>
              <td>{inves.test_name}</td>
              <td>{data?.requestBy.username}</td>

              <td>{data?.status}</td>
            </tr>
          ))}

          <tr></tr>
        </tbody>
      </Table>
      <div className="d-flex w-100  justify-content-end">
        <div>
          <Button
            onClick={handleShow}
            className="ms-3"
            variant="success"
            type="button"
          >
            + Add Lab Result
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddLabResult;
