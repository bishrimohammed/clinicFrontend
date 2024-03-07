import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UseGetLabRequested } from "./hooks/UseGetLabRequested";

const LabRequestedList = () => {
  const navigate = useNavigate();

  const { data, isPending, error } = UseGetLabRequested();
  console.log(data);
  if (isPending) return <Spinner animation="grow" />;
  if (error) return <div>error... + {error.message}</div>;
  return (
    <Container>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Date Requested</th>
            <th>Patient</th>

            <th>Requested By</th>

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
                    `/patients/history/${lab.medicalId._id}/addlabresult`
                  )
                }
              >
                <td>{lab.orderTime}</td>
                <td>{lab.medicalId.patientId.name}</td>
                {/* <td>{history.labrequest.requestBy.username}</td> */}

                <td>{lab.requestBy.username}</td>
                <td>{lab.status}</td>
                <td>acti</td>
              </tr>
            ))}

          <tr></tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default LabRequestedList;
