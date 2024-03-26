import React, { useRef } from "react";
import { Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import { useAddUser } from "./hooks/useAddUser";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetEmplooyeDoesNotHaveAccount } from "./hooks/useGetEmplooyeDoesNotHaveAccount";
import { useGetRoles } from "../hooks/useGetRoles";
const schema = yup.object().shape({
  employeeId: yup.string().required("Employee is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password not match")
    .required("Confirm  Password is required"),
  // gender: yup.string().required("Gender is required"),
  // phone: yup.string().required("phone is required"),
  role: yup.string().required("role is required"),
  // age: yup.string().required("age is required"),
});
const AddUser = () => {
  const { mutate, isPending } = useAddUser();
  const { data: employees } = useGetEmplooyeDoesNotHaveAccount();
  const { data: roles, isPending: ispending } = useGetRoles();
  // const {data:permissions} = useGetPermissions()
  // console.log(roles);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      employeeId: "",
      role: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  // console.log(errors);
  // const roleWatcher = watch("role");
  const submitHandler = (data) => {
    console.log(data);
    mutate(data);
  };
  if (ispending) {
    return <Spinner animation="border" variant="primary" />;
  }
  // console.log(roles);
  return (
    <Container className="p-3">
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Row>
          <Col md={4} sm={6} className="mb-2">
            <Form.Group>
              <Form.Label>Employees</Form.Label>
              <Form.Select
                {...register("employeeId")}
                isInvalid={errors.employeeId}
              >
                <option value="">please select</option>
                {employees?.map((e, index) => (
                  <option key={index} value={e.id}>
                    {e.firstName} {e.middleName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.employeeId?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4} sm={6} className="mb-2">
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
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password")}
                type="password"
                placeholder="password"
                isInvalid={errors.password}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                {...register("confirmPassword")}
                type="password"
                placeholder="password"
                isInvalid={errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4} sm={6} className="mb-2">
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                // ref={roleref}
                {...register("role")}
                name="role"
                aria-label="Default select example"
                placeholder="confirm password"
                isInvalid={errors.role}
              >
                <option value="">Select role</option>
                {roles?.map((r, index) => (
                  <option key={index} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.role?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* <Row>
        <Col md={4} sm={6} className="mb-2">
           
           </Col>
           
          </Col>
        </Row> */}

        {/* <hr /> */}
        <div className="d-flex justifyContentEnd">
          <Button
            variant="primary"
            disabled={isPending}
            style={{ backgroundColor: "#9007b6" }}
            className="border-0"
            type="submit"
          >
            {isPending && <Spinner animation="border" size="sm" />}
            Register User
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddUser;
