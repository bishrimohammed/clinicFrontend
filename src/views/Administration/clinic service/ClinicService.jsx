import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const ClinicService = () => {
  return (
    <Container className="p-2  mb-5">
      <div className=" bg-hrun-box hrunboxshadow">
        <Outlet />
      </div>
    </Container>
  );
};

export default ClinicService;
