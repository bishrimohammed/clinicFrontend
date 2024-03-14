import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  Button,
  Image,
  Spinner,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useState } from "react";

import { useAddClinicInfo } from "./hooks/useAddClinicInfo";

import { useGetWoredas } from "../../../hooks/useGetWoredas";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),

  logo: yup.mixed().required("Please select an image file"),
  card_valid_date: yup
    .number()
    .positive()
    .required("Card is valid date is required"),
  website_url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Invalid url!"
    ),
  address: yup.object().shape({
    street: yup.string().required("street is required"),
    woreda_id: yup.string().required("woreda is required"),
    house_number: yup.string(),
    email: yup.string().email("Invalid email"),
    phone_1: yup
      .string()
      .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
      .required("Phone number is required"),
    // validate phone number start with 09 or 07 it must me 10 digit
    phone_2: yup
      .string()
      // .matches(/^(09|07)?\d{8}$/, "Phone number is invalid")
      .nullable(),
  }),
});

const AddClinicInfo = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const { mutate, isPending } = useAddClinicInfo();
  const { data: woredas } = useGetWoredas();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("logo", data.logo[0]);
    formData.append("card_valid_date", data.card_valid_date);
    formData.append("website_url", data.website_url);
    formData.append("address", JSON.stringify(data.address));
    mutate(formData);
  };
  console.log(errors);
  return (
    <Container className="p-3  mb-5">
      <div className=" bg-hrun-box hrunboxshadow">
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Row>
            <Col md={4} sm={12} className="mb-2">
              {" "}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name")}
                  isInvalid={errors.name}
                />

                <Form.Control.Feedback type="invalid" className="text-small">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={8} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Logo</Form.Label>
                <div className="d-flex align-items-center justify-content-between gap-4 p-1">
                  <Form.Control
                    type="file"
                    className="border-1"
                    accept="image/png, image/jpeg"
                    // onChange={handleImageChange}
                    id="logo"
                    name="logo"
                    // {...register("logo")}
                    //ref={ref}
                    {...register("logo", {
                      onChange: (e) =>
                        setPreviewImage(URL.createObjectURL(e.target.files[0])),
                    })}
                    isInvalid={errors.logo}
                  />
                  <Form.Control.Feedback type="invalid" className="text-small">
                    {errors.logo?.message}
                  </Form.Control.Feedback>
                  <div>
                    {getValues("logo")?.length === 1 && (
                      <Image
                        src={previewImage}
                        /* {previewImage} */ width={30}
                        height={10}
                        fluid
                      />
                    )}
                  </div>
                </div>

                {/* {errors.logo && (
                  <Form.Text className="text-danger">
                    {errors.logo.message}
                  </Form.Text>
                )} */}
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  {...register("website_url")}
                  isInvalid={errors.website_url}
                />
                {errors.website_url && (
                  <Form.Text className="text-danger">
                    {errors.website_url?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group controlId="phone">
                <Form.Label>card_valid_date</Form.Label>
                <Form.Control
                  type="number"
                  {...register("card_valid_date")}
                  isInvalid={errors.card_valid_date}
                />
                {errors.card_valid_date && (
                  <Form.Text className="text-danger">
                    {errors.card_valid_date?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Address Information
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
              <Form.Control.Feedback
                type="inValid"
                className="small text-danger"
              >
                {errors?.address?.phone_1?.message}
              </Form.Control.Feedback>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("address.email", {})}
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
              <Form.Group>
                <Form.Label>Woreda</Form.Label>

                <Form.Select
                  {...register("address.woreda_id")}
                  isInvalid={errors.address?.woreda_id}
                >
                  <option value="">Select Woreda</option>
                  {woredas?.map((woreda, index) => (
                    <option key={index} value={woreda.id}>
                      {woreda.name} {woreda.SubCity?.Subcity_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  {...register("address.street")}
                  isInvalid={errors.address?.street}
                />
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
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Alternative Phone</Form.Label>
                <Form.Control
                  type="number"
                  {...register("address.phone_2", {
                    pattern: {
                      value: /^(09|07)?\d{8}$/,
                      message: "phone number is invalid",
                    },
                  })}
                  placeholder="09/07********"
                  isInvalid={errors.address?.phone_2}
                />
                <Form.Control.Feedback
                  type="inValid"
                  className="small tetx-danger"
                >
                  {errors?.address?.phone_2?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" disabled={isPending} type="submit">
            {isPending && <Spinner animation="border" size="sm" />}
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddClinicInfo;
