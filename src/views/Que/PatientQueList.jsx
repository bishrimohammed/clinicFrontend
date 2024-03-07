import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  useGetPatientWaitingList,
  usePatientCheckin,
  usePatientCheckout,
} from "./hooks/usePatientWaiting";

const PatientQueList = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const {
    data: waitinglist,
    isLoading,
    isError,
    error,
  } = useGetPatientWaitingList();
  const { mutate: checkinmutate } = usePatientCheckin();
  const { mutate: checkoutmutate } = usePatientCheckout();

  if (isLoading) return <Spinner animation="grow" />;
  if (isError) return <div>error {error.message}</div>;
  return (
    <Container>
      <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
        <h4 className="d-flex justify-content-center align-items-center mb-0">
          Patients queue
        </h4>
        {currentUser.role === "cashier" && (
          <Link to="/patientque/addtoque" className="btn btn-primary">
            Admit Patient
          </Link>
        )}
      </div>
      <hr className="bg-primary my-2" />

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>patient Name</th>
            <th>sex</th>
            <th>card Number</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {waitinglist.length !== 0 ? (
            waitinglist?.map((que, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${que.patient?.name}`}</td>
                <td>{que.patient?.gender}</td>
                <td>{que.patient?.cardNumber}</td>
                <td>{que.status}</td>
                {currentUser.role === "doctor" && (
                  <>
                    <td>
                      {que.status === "waiting" ? (
                        <Button
                          onClick={() => checkinmutate(que._id)}
                          variant="primary"
                          disabled={que.status === "checkedout"}
                        >
                          checkin
                        </Button>
                      ) : (
                        <Button
                          onClick={() => checkoutmutate(que._id)}
                          variant="danger"
                          disabled={que.status === "checkedout"}
                        >
                          {que.status === "checkedout"
                            ? "completed"
                            : "checkout"}
                        </Button>
                      )}
                    </td>
                    <td>
                      <NavLink to={`/patients/history/${que.history}`}>
                        <Button>view</Button>
                      </NavLink>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>no patient is Assigned</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PatientQueList;
