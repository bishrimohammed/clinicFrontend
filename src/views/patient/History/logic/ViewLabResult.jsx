import React from "react";
import { Container, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ViewLabResult = () => {
  const { state } = useLocation();
  return (
    <Container>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Result</th>
            <th>ABN</th>
            <th>Ref Renge</th>
            <th>unit</th>
            <th>Note</th>
            <th>Order Time</th>
            <th>Report Time</th>
          </tr>
        </thead>
        <tbody>
          {state.testResult.map((test, index) => (
            <tr key={index}>
              <td>{test.testId.test_name}</td>
              <td>{test.resultValue}</td>
              <td>ABN</td>
              <td>{test.referenceRange}</td>
              <td>{test.unit}</td>
              <td>{test.comment}</td>
              <td>{state.orderTime}</td>
              <td>{state.reportTime}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewLabResult;
