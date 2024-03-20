import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextInput from "../../../components/inputs/TextInput";
import { useGetWoredas } from "../../../hooks/useGetWoredas";
import { Employeeschema } from "./utils/schema";
import { useGetRegions } from "../../../hooks/useGetRegions";
import { useGetCities } from "../../../hooks/useGetCities";
import { useGetSubCities } from "../../../hooks/useGetSubCities";
import { useAddEmployee } from "./hooks/useAddEmployee";

const AddEmployee = () => {
  const { data: woredas } = useGetWoredas();
  const { data: regions } = useGetRegions();
  const { data: cities } = useGetCities();
  const { data: subcities } = useGetSubCities();

  const { mutate } = useAddEmployee();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(Employeeschema),
  });

  const submitHandler = (data) => {
    console.log(data.Emergency);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);
    // formData.append("position", data.position);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("date_of_hire", data.date_of_hire);
    formData.append("position", data.position);
    formData.append("photo", data.photo[0]);
    formData.append("address", JSON.stringify(data.address));
    formData.append("Emergency", JSON.stringify(data.Emergency));
    // console.log(formData);
    mutate(formData);
  };
  const getMaxYear = (value) => {
    const today = new Date().toISOString().substring(0, 10);
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - value);
    return date.toISOString().substring(0, 10);
  };

  const theSameAddressASEmpl = watch("Emergency.the_same_address_as_employee");
  const realationwacher = watch("Emergency.relation");
  const AddressregionWatcher = watch("address.region_id");
  const AddresscityWatcher = watch("address.city_id");
  const SubCityAddressWatcher = watch("address.subcity_id");
  const AddressWoredaWacher = watch("address.woreda_id");
  const EmergencyregionWatcher = watch("Emergency.region_id");
  const EmergencycityWatcher = watch("Emergency.city_id");
  const EmergencySubCityWatcher = watch("Emergency.subcity_id");
  let EmergencySection;
  if (theSameAddressASEmpl) {
    EmergencySection = (
      <>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              disabled={true}
              placeholder="09/07********"
              {...register("address.phone_1")}
            />
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              disabled={true}
              {...register("address.email", {})}
              // placeholder="example@example.com"
              // isInvalid={errors.address?.email}
            />
            <Form.Control.Feedback type="inValid" className="small text-danger">
              {errors?.address?.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Region</Form.Label>
            <Form.Select
              disabled={true}
              {...register("address.region_id")}
              aria-label="Default select example"
            >
              <option value="">please select</option>
              {regions?.map((region, index) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              disabled={true}
              // {...register("address.city_id")}
              aria-label="Default select example"
              value={
                cities.filter((city) => city.id == AddresscityWatcher)[0]?.name
              }
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>SubCity</Form.Label>
            <Form.Control
              disabled={true}
              // {...register("address.subcity_id")}
              name="role"
              aria-label="Default select example"
              value={
                subcities.filter(
                  (subcity) => subcity.id == SubCityAddressWatcher
                )[0]?.Subcity_name
              }
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>Woreda</Form.Label>

            <Form.Control
              disabled={true}
              {...register("address.woreda_id")}
              // isInvalid={errors.address?.woreda_id}
              value={
                woredas.filter((w) => w.id == AddressWoredaWacher)[0]
                  ?.Subcity_name
              }
            >
              {/* <option value="">Select Woreda</option>
              {woredas?.map((woreda, index) => (
                <option key={index} value={woreda.id}>
                  {woreda.name} {woreda.SubCity?.Subcity_name}
                </option>
              ))} */}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="number"
              disabled={true}
              {...register("address.house_number")}
              isInvalid={errors.address?.house_number}
            />
          </Form.Group>
        </Col>
      </>
    );
  } else {
    EmergencySection = (
      <>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="09/07********"
              {...register("Emergency.phone_1")}
              isInvalid={errors.Emergency?.phone_1}
            />
          </Form.Group>
          <Form.Control.Feedback type="inValid" className="small text-danger">
            {errors?.Emergency?.phone_1?.message}
          </Form.Control.Feedback>
        </Col>

        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Region</Form.Label>
            <Form.Select
              // ref={roleref}
              {...register("Emergency.region_id")}
              isInvalid={errors.Emergency?.region_id}
              aria-label="Default select example"
            >
              <option value="">please select</option>
              {regions?.map((region, index) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Select
              // ref={roleref}
              {...register("Emergency.city_id")}
              aria-label="Default select example"
              isInvalid={errors.Emergency?.city_id}
            >
              <option value="">please select</option>
              {cities
                ?.filter((city) => city.region_id == EmergencyregionWatcher)
                .map((c, index) => (
                  <option key={c.name} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>SubCity</Form.Label>
            <Form.Select
              {...register("Emergency.subcity_id")}
              aria-label="Default select example"
              isInvalid={errors.Emergency?.subcity_id}
            >
              <option value="">please select</option>
              {subcities
                ?.filter((subcity) =>
                  AddresscityWatcher
                    ? subcity.city_id == EmergencycityWatcher
                    : subcity
                )
                .map((sc, index) => (
                  <option key={sc.Subcity_name + sc.id} value={sc.id}>
                    {sc.Subcity_name}
                  </option>
                ))}
              {/* <option>Select role</option> */}
              {/* <option value="Bole">Bole</option>
              <option value="lideta">lideta</option>
              <option value="kirkos">kirkos</option>
              <option value="aba_gada">Aba Gada</option>
              <option value="lugo">Lugo</option>
              <option value="bole">Bole</option>
              <option value="boku">Boku</option>
              <option value="dabe">Dabe</option>
              <option value="dembala">Dembala</option>
              <option value="tana">Tana</option>
              <option value="facilo">Facilo</option>
              <option value="gish_abay">Gish Abay</option>
              <option value="atse_tewodros">Atse Tewodros</option>
              <option value="dagmawi_menelek">Dagmawi Menelek</option>
              <option value="belayzelk">Belayzelk </option> */}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>Woreda</Form.Label>

            <Form.Select
              {...register("Emergency.woreda_id")}
              isInvalid={errors.Emergency?.woreda_id}
            >
              <option value="">please select</option>
              {woredas
                ?.filter((w) => w.subCity_id == EmergencySubCityWatcher)
                ?.map((woreda, index) => (
                  <option key={index} value={woreda.id}>
                    {woreda.name} {woreda.SubCity?.Subcity_name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="number"
              {...register("Emergency.house_number")}
              isInvalid={errors.Emergency?.house_number}
            />
          </Form.Group>
        </Col>
      </>
    );
  }
  return (
    <Container className="p-2 px-3">
      <h4 className="mb-3 p-2">Add Employee</h4>

      <Form
        onSubmit={handleSubmit(submitHandler)}
        encType="multipart/form-data"
      >
        <Row>
          <Col md={4} sm={12}>
            <TextInput
              errors={errors.firstName}
              name="firstName"
              register={register}
              label="first name"
            />
          </Col>

          <Col md={4} sm={12}>
            <TextInput
              errors={errors.middleName}
              name="middleName"
              register={register}
              label="middle name"
            />
          </Col>

          <Col md={4} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>last name</Form.Label>
              <Form.Control
                {...register("lastName")}
                name="lastName"
                id="lastName"
                type="text"
                placeholder="Enter..."
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                // ref={genderref}
                {...register("gender")}
                name="gender"
                aria-label="Default select example"
                isInvalid={errors.gender}
              >
                <option value="">please select</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>photo</Form.Label>
              <Form.Control
                {...register("photo")}
                type="file"
                name="photo"
                placeholder="Enter..."
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                {...register("date_of_birth")}
                // defaultValue={getMaxYear(18)}
                // min={getMaxYear(18)}
                // max={new Date().toISOString().substring(0, 10)}
                max={getMaxYear(18)}
                isInvalid={errors.date_of_birth}
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group>
              <Form.Label>Date of Hire</Form.Label>
              <Form.Control
                type="date"
                {...register("date_of_hire")}
                max={new Date().toISOString().substring(0, 10)}
                isInvalid={errors.date_of_hire}
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Select
                // ref={genderref}
                {...register("position")}
                name="position"
                aria-label="Default select example"
                isInvalid={errors.position}
              >
                <option value="">please select</option>
                <option value="Doctor">Doctor</option>
                <option value="Cashier">Cashier</option>
                <option value="Nurse">Nurse</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
          Home Address Information
        </h6>
        <Row>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="09/07********"
                {...register("address.phone_1")}
                isInvalid={errors.address?.phone_1}
              />
            </Form.Group>
            <Form.Control.Feedback type="inValid" className="small text-danger">
              {errors?.address?.phone_1?.message}
            </Form.Control.Feedback>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("address.email")}
                placeholder="example@example.com"
                isInvalid={errors.address?.email}
              />
              <Form.Control.Feedback
                type="inValid"
                className="small text-danger"
              >
                {errors?.address?.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group className="mb-3">
              <Form.Label>Region</Form.Label>
              <Form.Select
                {...register("address.region_id")}
                aria-label="Default select example"
                isInvalid={errors.address?.region_id}
              >
                <option value="">please select</option>
                {regions?.map((region, index) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}

                {/* <option value="Oromia">Oromia</option>
                <option value="Afar">Afar</option> */}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Select
                // ref={roleref}
                {...register("address.city_id")}
                aria-label="Default select example"
                isInvalid={errors.address?.city_id}
              >
                <option value="">please select</option>
                {cities
                  ?.filter((city) => city.region_id == AddressregionWatcher)
                  .map((c, index) => (
                    <option key={c.name} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group className="mb-3">
              <Form.Label>SubCity</Form.Label>
              <Form.Select
                // ref={roleref}
                {...register("address.subcity_id")}
                aria-label="Default select example"
                isInvalid={errors.address?.subcity_id}
                // defaultValue="1"
              >
                <option value="">please select</option>
                {subcities
                  ?.filter((subcity) => subcity.city_id == AddresscityWatcher)
                  .map((sc, index) => (
                    <option key={sc.Subcity_name + sc.id} value={sc.id}>
                      {sc.Subcity_name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Woreda</Form.Label>

              <Form.Select
                {...register("address.woreda_id")}
                isInvalid={errors.address?.woreda_id}
              >
                <option value="">Select Woreda</option>
                {woredas
                  ?.filter((w) => w.subCity_id == SubCityAddressWatcher)
                  ?.map((woreda, index) => (
                    <option key={index} value={woreda.id}>
                      {woreda.name} {woreda.SubCity?.Subcity_name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>House Number</Form.Label>
              <Form.Control
                type="number"
                {...register("address.house_number")}
                isInvalid={errors.address?.house_number}
              />
            </Form.Group>
          </Col>
        </Row>

        <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
          Emergency Contact Information
        </h6>
        <Row>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                {...register("Emergency.firstName")}
                isInvalid={errors.Emergency?.firstName}
              />
            </Form.Group>
          </Col>

          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                {...register("Emergency.middleName")}
                isInvalid={errors.Emergency?.middleName}
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                {...register("Emergency.lastName")}
                isInvalid={errors.Emergency?.lastName}
              />
            </Form.Group>
          </Col>

          <Col md={4} sm={12} className="mb-2">
            <Form.Group className="mb-3">
              <Form.Label>Relation Ship</Form.Label>
              <Form.Select
                {...register("Emergency.relation")}
                aria-label="Default select example"
              >
                {/* <option>Select role</option> */}
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Spouse">Spouse</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {realationwacher === "Other" && (
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Relation Ship Type</Form.Label>
                <Form.Control
                  {...register("Emergency.other_relation")}
                  aria-label="Default select example"
                  isInvalid={errors.Emergency?.other_relation}
                ></Form.Control>
              </Form.Group>
            </Col>
          )}
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Same Address as Employee</Form.Label>
              <Form.Check
                type="checkbox"
                // placeholder="09/07********"
                {...register("Emergency.the_same_address_as_employee")}
                // isInvalid={errors.address?.phone_1}
              />
            </Form.Group>
            {/* <Form.Control.Feedback type="inValid" className="small text-danger">
              {errors?.address?.phone_1?.message}
            </Form.Control.Feedback> */}
          </Col>
          {EmergencySection}
        </Row>
        <hr />
        <div className="d-flex justifyContentEnd">
          <Col>
            <Button
              variant="primary"
              //   disabled={isPending}
              className="w-100"
              type="submit"
            >
              {/* {isPending && <Spinner animation="border" size="sm" />} */}
              <span className="fw-bold">+</span> Add Employee
            </Button>
          </Col>
        </div>
      </Form>
    </Container>
  );
};

export default AddEmployee;
