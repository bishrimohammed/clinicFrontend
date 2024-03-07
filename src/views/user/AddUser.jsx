import React, { useRef } from "react";
import { Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";

import { useAddUser } from "./hooks/useAddUser";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TextInput from "../../components/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import NumberInput from "../../components/inputs/NumberInput";
const schema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  middleName: yup.string().required("middleName is required"),
  lastName: yup.string(),
  email: yup.string().email("invalid email").required("Email is required"),
  // password: yup.string().required("Password is required"),
  //confirmPassword: yup.string().required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
  phone: yup.string().required("phone is required"),
  role: yup.string().required("role is required"),
  age: yup.string().required("age is required"),
});
const AddUser = () => {
  const { mutate, isPending } = useAddUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      phone: "",
      role: "",
      email: "",
      age: "",
      gender: "",
      lastName: "",
      middleName: "",
      firstName: "",
    },
    resolver: yupResolver(schema),
  });
  console.log(errors);

  const submitHandler = (data) => {
    //console.log(data);
    mutate(data);
  };
  return (
    <Container>
      <div className="mb-4">
        <h4>Add User</h4>
      </div>
      <hr />
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Row>
          <Col>
            <TextInput
              errors={errors.firstName}
              name="firstName"
              register={register}
              label="first name"
            />
          </Col>

          <Col>
            <TextInput
              errors={errors.middleName}
              name="middleName"
              register={register}
              label="middle name"
            />
          </Col>

          <Col>
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
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>sex</Form.Label>
              <Form.Select
                // ref={genderref}
                {...register("gender")}
                name="gender"
                aria-label="Default select example"
              >
                <option>Select Sex</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <NumberInput
              errors={errors.age}
              name="age"
              register={register}
              label="Age"
            />
          </Col>
          <Col>
            <TextInput
              errors={errors.phone}
              name="phone"
              register={register}
              label="phone"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                errors={errors.email}
                name="email"
                {...register("email")}
                type="email"
                placeholder="example@gmail.com"
                isInvalid={errors.email}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                // ref={roleref}
                {...register("role")}
                name="role"
                aria-label="Default select example"
              >
                <option>Select role</option>
                <option value="doctor">doctor</option>
                <option value="cashier">cashier</option>
                <option value="laboratorian">laboratorian</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                //ref={passwordref}
                disabled={true}
                // {...register("password")}
                type="password"
                placeholder="123456"
              />
              <Form.Text>default value for user 123456</Form.Text>
            </Form.Group>
          </Col>
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
              Register User
            </Button>
          </Col>
        </div>
      </Form>
    </Container>
  );
};

export default AddUser;
