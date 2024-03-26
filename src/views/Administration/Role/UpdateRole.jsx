import React, { useMemo } from "react";
import { useGetRoleById } from "./hooks/useGetRoleById";
import { useLocation, useParams } from "react-router-dom";

import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetPermissions } from "./hooks/useGetPermissions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateRole } from "./hooks/useUpdateRole";
const roleSchema = yup.object().shape({
  roleName: yup.string().required("Name is required"),
  permissions: yup.array().of(
    yup.object().shape({
      value: yup.boolean().required("Value is required"),
      // value: yup.boolean(),
      permissionId: yup.number().required("permissionId is required"),
    })
  ),
});
const UpdateRole = () => {
  const { roleId } = useParams();
  const { state } = useLocation();
  // console.log(state);
  const { data: permissions } = useGetPermissions();
  // const { data: role } = useGetRoleById(roleId);
  const { mutate, isPending } = useUpdateRole();
  // const dd = useMemo(() => role, [isPending]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleName: state?.name,
      permissions: [],
    },
    resolver: yupResolver(roleSchema),
  });
  // console.log(role);

  const submitHandler = (data) => {
    console.log(data);

    const selectedPermission = data.permissions
      .filter((p) => p.value === true)
      .map((p) => p.permissionId);
    console.log(selectedPermission);

    const previousPermissions = state.permissions.map((p) => p.id);
    console.log(previousPermissions);
    const newPermissions = selectedPermission.filter(
      (id) => !previousPermissions.includes(id)
    );
    const reducedPermissions = previousPermissions.filter(
      (id) => !selectedPermission.includes(id)
    );

    // console.log("new permissions " + newPermissions);
    // // reduce permissions
    // console.log("reduced permissions " + reducedPermissions);
    const role = {
      name: data.roleName,
      selectedPermission,
    };
    // return;
    console.log(role);
    mutate({ role, roleId: state.id });
  };
  return (
    <div className="p-3">
      <h4>Update Role</h4>

      <Form onSubmit={handleSubmit(submitHandler)} className="mt-3">
        <Form.Group className="">
          <Form.Label>Role Name</Form.Label>
          <Form.Control
            type="text"
            // disabled={true}
            defaultValue={role?.name}
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
                  defaultChecked={state?.permissions?.some(
                    (permission) => permission.id === p.id
                  )}
                  // defaultValue={role?.permissions?.some(
                  //   (permission) => permission.id === p.id
                  // )}
                  label={p.name}
                  name={`permissions[${index}].value`}
                  {...register(`permissions[${index}].value`)}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            type="submit"
            className="btn btn-primary px-3 py-1"
            // onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending && <Spinner animation="border" variant="primary" />}
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateRole;
