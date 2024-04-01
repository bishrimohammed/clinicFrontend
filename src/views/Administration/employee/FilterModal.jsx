import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import * as yup from "yup";
const FilterSchema = yup.object().shape({
  status: yup.string(),
  position: yup.array().of(yup.string()),
  gender: yup.string(),
});
const status = [
  {
    value: "",
    label: "All",
  },

  {
    value: "true",
    label: "Active",
  },
  {
    value: "false",
    label: "Inactive",
  },
];
const FilterModal = ({ show, handleClose, setFilter }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      status: "",
      position: [],
      gender: "",
    },
    resolver: yupResolver(FilterSchema),
  });
  const positions = ["Doctor", "Nurse", "Receptionist", "Admin", "Cashier"];
  const submitHamder = (data) => {
    console.log(data);
    const position = data.position.filter((item) => {
      if (item !== "false" && item !== "true") {
        return item;
      }
    });
    console.log(position);
    setFilter({
      status: data.status,
      position: position,
      gender: data.gender,
    });
    handleClose(false);
  };
  return (
    <Modal size="md" show={show} onHide={() => handleClose(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter Employees</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHamder)}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            {/* {status.map((item, index) => (
              <Form.Check
                key={item.value}
                type="checkbox"
                id={item.label}
                {...register(`status.[${index}]`)}
                label={item.label}
                // value={item.label}
                defaultValue=""
              />
            ))} */}
            {/* <Form.Check
              type="checkbox"
              id="AActive"
              {...register(`status.[${0}]`)}
              label="Active"
              defaultValue=""
              // value={item.value}
            />
            <Form.Check
              type="checkbox"
              id="AiActive"
              {...register(`status.[${1}]`)}
              label="inActive"
              // value={item.value}
            /> */}
            <Form.Control as="select" {...register("status")}>
              {status.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            {positions.map((item, index) => (
              <Form.Check
                key={item}
                type="checkbox"
                id={item}
                {...register(`position.[${index}]`)}
                label={item}
                value={item}
                // defaultValue=""
              />
            ))}
            {/* <Form.Control as="select" multiple {...register("position")}>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
            </Form.Control> */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" {...register("gender")}>
              <option value="">please select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end gap-3 ">
            <Button variant="secondary" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button
              // variant="danger"
              type="submit"
              // disabled={deleteMutation.isPending || deactiveMutation.isPending}
              // onClick={clickHandler}
            >
              {/* {(deleteMutation.isPending || deactiveMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )} */}
              {/* {action === "delete" ? "Delete" : "Deactivate"} */}
              Ok
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
