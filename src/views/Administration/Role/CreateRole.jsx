import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetPermissions } from "./hooks/useGetPermissions";
import { useAddRole } from "./hooks/useAddRole";
const roleSchema = yup.object().shape({
  roleName: yup.string().required("Name is required"),
  permissions: yup.array().of(
    yup.object().shape({
      value: yup.boolean().required("Value is required"),
      // value: yup.boolean(),
      permissionId: yup.string().required("permissionId is required"),
    })
  ),
});
const CreateRole = () => {
  const { data: permissions } = useGetPermissions();
  const { mutate, isPending } = useAddRole();
  // console.log(permissions);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      permissions: [],
    },
    resolver: yupResolver(roleSchema),
  });
  // const permissions = [
  //   {
  //     name: "Create User",
  //     id: "1",
  //   },
  //   {
  //     name: "Read User",
  //     id: "2",
  //   },
  //   {
  //     name: "Update User",
  //     id: "3",
  //   },
  //   {
  //     name: "Delete User",
  //     id: "4",
  //   },
  // ];
  console.log(errors);
  const submitHandler = (data) => {
    // console.log(data);
    const selectedPermission = data.permissions
      .filter((p) => p.value === true)
      .map((p) => p.permissionId);
    // console.log(selectedPermission);
    const role = {
      name: data.roleName,
      permissions: selectedPermission,
    };
    console.log(role);
    mutate(role);
  };
  return (
    <div className="p-3">
      <h4>Create Role</h4>
      <Form onSubmit={handleSubmit(submitHandler)} className="mt-3">
        <Form.Group className="">
          <Form.Label>Role Name</Form.Label>
          <Form.Control
            type="text"
            // disabled={true}
            name="roleName"
            placeholder="role"
            {...register("roleName")}
            isInvalid={errors.roleName}
          />
        </Form.Group>{" "}
        <p className="my-3 fs-5">Permissions</p>
        <Row>
          {permissions?.map((p, index) => (
            <Col key={p.id} md={3} sm={6}>
              <input
                type="text"
                name={`permissions[${index}].permissionId`}
                {...register(`permissions[${index}].permissionId`)}
                hidden
                value={p.id}
              />
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label={p.name}
                  name={`permissions[${index}].value`}
                  {...register(`permissions[${index}].value`)}
                />
              </Form.Group>
            </Col>
          ))}
          {/* <Col md={3} sm={6}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="create User"
                {...register("active")}
              />
            </Form.Group>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Update User"
                {...register("active")}
              />
            </Form.Group>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="View User"
                {...register("active")}
              />
            </Form.Group>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Delete User"
                {...register("active")}
              />
            </Form.Group>
          </Col> */}
        </Row>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            type="submit"
            className="btn btn-primary px-3 py-1"
            // onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateRole;
