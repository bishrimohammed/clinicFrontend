import React from "react";
import { useGetClinicInformation } from "./hooks/useGetClinicInformation";
import { Button, Container, Image, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ClinicInformation = () => {
  const { data, isPending, error } = useGetClinicInformation();
  const navigate = useNavigate();
  if (isPending) return <Spinner animation="border" />;
  if (error) return <div>erroo {error.message}</div>;
  console.log(import.meta.env.VITE_HOST_URL + data?.logo);
  return (
    <Container fluid className="p-3  mb-5">
      <div className="p-1   bg-hrun-box hrunboxshadow">
        <h5 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
          Clinic Profile Information
        </h5>
        {false ? (
          <Table responsive striped bordered>
            <thead>
              <th>#</th>
              <th>clinic name</th>
              <th>address</th>
              <th>phone</th>
              <th>email</th>
              <th>website</th>
              <th>logo</th>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate("/administrations/setting/editclinicinfo", {
                      state: data,
                    })
                  }
                >
                  <td>{index + 1}</td>
                  <td>{data?.name}</td>
                  <td>{data?.address?.street}</td>
                  <td>{data?.address?.phone_1}</td>
                  <td>{data?.address?.email}</td>
                  <td>{data?.website_url}</td>
                  <td>
                    <Image
                      src={import.meta.env.VITE_HOST_URL + data?.logo}
                      alt="logo"
                      style={{ objectFit: "contain", objectPosition: "center" }}
                      width={30}
                      fluid
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Button
            className="mt-3"
            onClick={() => navigate("/administrations/setting/addclinicinfo")}
          >
            + Add Clinic Information
          </Button>
        )}
      </div>
    </Container>
  );
};

export default ClinicInformation;
