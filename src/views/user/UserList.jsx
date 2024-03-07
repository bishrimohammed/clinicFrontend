import { Button, Spinner, Table } from "react-bootstrap";
import { BiSearch, BiEdit } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetUsers } from "./hooks/useGetUsers";
import { useActivateUser } from "./hooks/useActivateUser";
import { useDeactivateUser } from "./hooks/useDeactivateUser";

const UserList = () => {
  //const [users, setUser] = useState([]);
  const { data: users, isPending, error } = useGetUsers();
  const navigate = useNavigate();

  const { mutate: activateMut } = useActivateUser();
  const { mutate } = useDeactivateUser();

  if (isPending) return <Spinner animation="grow" />;
  if (error) return <div>error {error.message}</div>;
  return (
    <>
      <div className="d-flex justify-content-between p-2 mb-2">
        <h4>Users</h4>
        <div className="   ">
          <Button
            variant="success"
            type="button"
            onClick={() => navigate("/administrations/user/newuser")}
          >
            + Add User
          </Button>
        </div>
      </div>
      {/* <hr /> */}
      <div className="mb-3 me-2  d-flex align-items-center justify-content-end">
        <div className="search border border-2 border-color borderRadius7px">
          <input placeholder="Search..." className="border-0 p-2" />
          <button
            //variant="outline-secondary"
            className="border-0 py-2 px-3 bg-white"
            id="button-addon2"
          >
            <BiSearch size={20} />
          </button>
        </div>
      </div>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>gender</th>
            <th>status</th>
            <th>email</th>
            <th>phone</th>
            <th>role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length !== 0 &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${user.username}`}</td>
                <td>{user.gender}</td>
                <td>{user.status ? "active" : "inactive"}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>

                <td>
                  <NavLink
                    to={`/administrations/user/edit/${user._id}`}
                    state={user}
                  >
                    <BiEdit size={20} />
                  </NavLink>
                </td>
                <td>
                  {user.status ? (
                    <Button onClick={() => mutate(user._id)} variant="primary">
                      diactivate
                    </Button>
                  ) : (
                    <Button
                      onClick={() => activateMut(user._id)}
                      variant="danger"
                    >
                      activate
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
