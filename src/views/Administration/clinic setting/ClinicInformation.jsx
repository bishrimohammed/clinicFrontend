import React from "react";
import { useGetClinicInformation } from "../../hooks/useGetClinicInformation";
import { Button, Container, Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ClinicInformation = () => {
  const { data, isPending, error } = useGetClinicInformation();
  const navigate = useNavigate();
  if (isPending) return <Spinner animation="border" />;
  if (error) return <div>erroo {error.message}</div>;
  return (
    <Container className="p-3  mb-5">
      <div className="p-1   bg-hrun-box hrunboxshadow">
        <h3>Clinic Information</h3>
        {data ? (
          <div>
            <p>Name: {data.name}</p>
            <p>Location: {data.location}</p>
            <p>Phone: {data.phone}</p>
            <p>Website: {data.website}</p>
            <p>
              Logo:
              {data.logo && (
                <Image src={data?.logo} fluid width={70} alt="Clinic Logo" />
              )}
            </p>
          </div>
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
