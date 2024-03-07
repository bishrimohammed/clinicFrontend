import React, { useState, useRef, useEffect } from "react";

import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../components/inputs/TextInput";
import NumberInput from "../../components/inputs/NumberInput";
import { useUpdateUser } from "./hooks/useUpdateUser";
const schema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  middleName: yup.string().required("middleName is required"),
  lastName: yup.string(),
  email: yup.string().email("invalid email").required("Email is required"),
  // password: yup.string().required("Password is required"),
  //confirmPassword: yup.string().required("Confirm password is required"),
  gender: yup.string().required("gender is required"),
  phone: yup.string().required("phone is required"),
  role: yup.string().required("role is required"),
  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .min(18, "age must be grater that 18")
    .required("age is required"),
});
const UpdateUser = () => {
  const roleref = useRef();

  const { state } = useLocation();
  const currentUser = useSelector((state) => state.auth.user);
  let username = state.username.split(" ");
  // console.log(state);
  const navigate = useNavigate();
  const {
    register,

    reset,
    formState: { errors },

    handleSubmit,
  } = useForm({
    defaultValues: {
      phone: state.phone,
      role: state.role,
      email: state.email,
      age: state.age,
      gender: state.gender,
      lastName: username[2],
      middleName: username[1],
      firstName: username[0],
    },
    resolver: yupResolver(schema),
  });
  const { mutateAsync, isPending } = useUpdateUser();

  const handleUpdate = (data) => {
    mutateAsync(data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        reset({
          age: "",
          firstName: "",
          lastName: "",
          gender: "",
          role: "",
          email: "",
          middleName: "",
          phone: "",
        });
        navigate(-1);
        //  setValue("price", "");
        //  setValue("drugname", "");
      }
    });
  };
  return (
    <Container>
      <div className="mb-4">
        <h4>Update User</h4>
      </div>
      <hr />
      <Form onSubmit={handleSubmit(handleUpdate)}>
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
                //ref={lastNameref}
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
                {...register("gender")}
                disabled={true}
                name="gender"
                aria-label="Default select example"
              >
                <option value="">Select Sex</option>
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
                disabled
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
                {...register("role")}
                name="role"
                disabled
                aria-label="Default select example"
              >
                <option>Select role</option>
                <option value="doctor">doctor</option>
                <option value="cashier">cashier</option>
                <option value="laboratorian">laboratorian</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        <hr />
        <div className="d-flex justifyContentEnd">
          <Button
            variant="danger"
            type="button"
            className="me-3"
            onClick={() => navigate(-1)}
          >
            Return
          </Button>
          <Button variant="primary" disabled={isPending} type="submit">
            {isPending && <Spinner animation="border" size="sm" />}
            Update
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateUser;
