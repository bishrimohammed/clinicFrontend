import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../components/inputs/TextInput";
import NumberInput from "../../components/inputs/NumberInput";
import { useAddPatient } from "./hooks/useAddPatient";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";
const schema = yup.object().shape({
  firstName: yup.string().required("first Name is required"),
  middleName: yup.string().required("middle Name is required"),
  lastName: yup.string().required(" lastName is required"),
  phone: yup.string().required("phone Number is required"),
  gender: yup.string().required("gender is required"),
  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .required("age is required"),
  woreda: yup.string(),
  kebele: yup.string(),
  address: yup.object().shape({
    street: yup.string().required("street is required"),
    woreda_id: yup.string().required("woreda is required"),

    phone: yup.string().required("phone is required"),
  }),
  birth_date: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue && typeof originalValue === "string") {
        const parsedDate = new Date(originalValue);
        return isNaN(parsedDate) ? originalValue : parsedDate;
      }
      return value;
    })
    .max(new Date(Date.now()))
    .typeError("Type an end date"),
});
const NewPatient = () => {
  const { mutateAsync, isPending } = useAddPatient();
  const [isbirthdateknown, setIsbirthdateknown] = useState(true);
  const woredas = useQuery({
    queryKey: ["woredas"],
    queryFn: async () => Axiosinstance.get("/woreda").then((res) => res.data),
    staleTime: 5 * 1000 * 1000,
  });
  console.log(woredas.data);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      age: "",
      gender: "",
      kebele: "",
      phone: "",
      woreda: "",
      // birth_date: new Date().toISOString().substring(0, 10),
    },
    resolver: yupResolver(schema),
  });
  // setValue("birth_date", new Date().toISOString().substring(0, 10));
  const AgeWacher = watch("age");
  const dc = new Date().toISOString().substring(0, 10);
  console.log(AgeWacher);
  if (isbirthdateknown) {
    const today = new Date().toISOString().substring(0, 10);
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - AgeWacher);
    // setValue("birth_date", date.toISOString().substring(0, 10));
  }
  const calulateBirthDatefromAge = (age) => {
    const today = new Date().toISOString().substring(0, 10);
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - age);
    // setValue("birth_date", date.toISOString().substring(0, 10));
    return date.toISOString().substring(0, 10);
  };
  // const age = calulateBirthDatefromAge(20);
  // console.log(age);
  const submitHandler = async (data) => {
    console.log(data);
    //e.preventDefault();
    mutateAsync(data).then((res) => {
      console.log(res);
    });
    return;
  };

  return (
    <Container className="p-3">
      <div className="p-3 bg-hrun-box hrunboxshadow">
        <div className="mb-3">
          <h4> Patient Information</h4>
        </div>
        <hr className="mt-1" />
        <Form onSubmit={handleSubmit(submitHandler)}>
          <h6 className="border-bottom border-1 p-1 mb-3 fw-bold">
            Basic Information
          </h6>
          <Row>
            <Col>
              <TextInput
                label="First Name"
                register={register}
                name="firstName"
                errors={errors.firstName}
              />
            </Col>

            <Col>
              <TextInput
                label="Middle Name"
                register={register}
                name="middleName"
                errors={errors.middleName}
              />
            </Col>

            <Col>
              <TextInput
                label="Last Name"
                register={register}
                name="lastName"
                errors={errors.lastName}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  {...register("gender")}
                  isInvalid={errors.gender}
                  aria-label="Default select example"
                >
                  <option value="">Select Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </Form.Select>
                <Form.Control.Feedback type="inValid">
                  {errors.gender?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/* <NumberInput
                label="Age"
                register={register}
                name="age"
                errors={errors.age}
              /> */}
              <Form.Group className="mb-3">
                <div className="d-flex gap-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Check
                    type="switch"
                    size="sm"
                    checked={isbirthdateknown}
                    label="is known"
                    // value={isbirthdateknown}
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setIsbirthdateknown(e.target.checked);
                    }}
                  />
                </div>

                <Form.Control
                  type="number"
                  disabled={isbirthdateknown}
                  {...register("age")}
                  isInvalid={errors.age}
                  placeholder="Enter..."
                />
                <Form.Control.Feedback type="inValid">
                  {errors?.age?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="birth_date"
                  {...register("birth_date")}
                  disabled={!isbirthdateknown}
                  value={calulateBirthDatefromAge(AgeWacher)}
                />
              </Form.Group>
            </Col>
            {/* <Col>
              <TextInput
                label="Phone"
                register={register}
                name="phone"
                errors={errors.phone}
              />
            </Col> */}
          </Row>
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Address Information
          </h6>
          <Row>
            <Col md={4} sm={12}>
              <Form.Group>
                <Form.Label>Street Address</Form.Label>
                <Form.Control type="text" {...register("address.street")} />
              </Form.Group>
            </Col>

            <Col md={4} sm={12}>
              <Form.Group>
                <Form.Label>Woreda</Form.Label>
                {/* <Form.Control type="text" {...register("address.street")} /> */}
                <Form.Select {...register("address.woreda_id")}>
                  <option value="">Select Woreda</option>
                  {woredas?.data?.map((woreda, index) => (
                    <option key={index} value={woreda._id}>
                      {woreda.name} {woreda.subCity_id?.Subcity_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4} sm={12}>
              <TextInput
                label="Alternative Phone"
                register={register}
                name="phone"
                errors={errors.phone}
              />
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Region</Form.Label>
                <Form.Select>
                  // Region in ethiopia
                  <option>Select Region</option>
                  <option value="addis ababa">Addis Ababa</option>
                  <option value="oromia">Oromia</option>
                  <option value="amhara">Amhara</option>
                  <option value="tigray">tigray</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Select>
                  // city in ethiopia
                  <option>Select City</option>
                  <option value="addis ababa">Addis Ababa</option>
                  <option value="adama">Adama</option>
                  <option value="mekelle">Mekelle</option>
                  <option value="bahir dahir">Bahir Dahir</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Region</Form.Label>
                <Form.Select>
                  // Region in ethiopia
                  <option>Select Region</option>
                  <option value="addis ababa">Addis Ababa</option>
                  <option value="oromia">Oromia</option>
                  <option value="amhara">Amhara</option>
                  <option value="tigray">tigray</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                label="Woreda"
                register={register}
                name="woreda"
                errors={errors.woreda}
              />
            </Col>
            <Col>
              <TextInput
                label="Kebele"
                register={register}
                name="kebele"
                errors={errors.kebele}
              />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <hr />
          <div className="d-flex justifyContentEnd">
            <Col>
              <Button
                variant="primary"
                disabled={isPending}
                className="w-100"
                type="submit"
              >
                {isPending && <Spinner animation="border" size="sm" />}
                Register Patient
              </Button>
            </Col>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default NewPatient;
