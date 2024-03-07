// import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetLabCompleted } from "./hooks/useGetLabCompleted";

const LabCompletedList = () => {
  const navigate = useNavigate();

  const { data, isPending, error } = useGetLabCompleted();

  if (isPending) return <Spinner animation="grow" />;
  if (error) return <div>error... + {error.message}</div>;
  return (
    <Container>
      {data.length !== 0 ? (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Date Requested</th>
              <th>Patient</th>
              <th>Requested By</th>
              <th>Reported By</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 &&
              data.map((lab, index) => (
                <tr
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/patients/history/${lab.medicalId._id}/viewlabresult`,
                      {
                        state: lab,
                      }
                    )
                  }
                >
                  <td>{lab.orderTime}</td>
                  <td>{lab.medicalId.patientId.name}</td>
                  {/* <td>{history.labrequest.requestBy.username}</td> */}

                  <td>{lab.requestBy.username}</td>
                  <td>{lab.reportedBy.username}</td>
                  <td>{lab.status}</td>
                  <td>acti</td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div className="p-2 text-center bg-success bg-opacity-25 text-dark">
          There is no Lab Result for this history
        </div>
      )}
    </Container>
  );
};

export default LabCompletedList;
