import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Image, Spinner } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useAddClinicInfo } from "./hooks/useAddClinicInfo";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  phone: yup.string().required("Phone is required"),
  logo: yup.mixed().required("Logo is required"),
  website: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    ),
});

const AddClinicInfo = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const { mutate, isPending } = useAddClinicInfo();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const { onChange, onBlur, name, ref } = register("logo");
  const upload_preset = import.meta.env.VITE_REACT_APP_UPLOAD_PRESENT;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.logo[0]);
    formData.append("upload_preset", upload_preset);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dneuxrpez/image/upload",
        formData
      );
      //const imgData = await response.
      const clinicInfoData = {
        name: data.name,
        location: data.location,
        logo: response.data.secure_url,
        phone: data.phone,
        website: data.website,
      };
      mutate(clinicInfoData);
      // Handle saving clinicInfoData to the database or perform any other necessary actions
      console.log(clinicInfoData);
      //console.log(response);
    } catch (error) {
      console.log(error?.response);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" {...register("name")} />
        {errors.name && (
          <Form.Text className="text-danger">{errors.name.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" {...register("location")} />
        {errors.location && (
          <Form.Text className="text-danger">
            {errors.location.message}
          </Form.Text>
        )}
      </Form.Group>

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
            //ref={ref}
            {...register("logo", {
              onChange: (e) =>
                setPreviewImage(URL.createObjectURL(e.target.files[0])),
            })}
          />
          <div>
            {getValues("logo")?.length === 1 && (
              <Image
                src="https://res.cloudinary.com/dneuxrpez/image/upload/v1703347668/u2jtnvkgtskyjmdofq5h.jpg"
                /* {previewImage} */ width={70}
                fluid
              />
            )}
          </div>
        </div>

        {errors.logo && (
          <Form.Text className="text-danger">{errors.logo.message}</Form.Text>
        )}
      </Form.Group>
      {/*       <div>{previewImage && <Image src={previewImage} fluid width={50} />}</div> */}
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" {...register("phone")} />
        {errors.phone && (
          <Form.Text className="text-danger">{errors.phone.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="website">
        <Form.Label>Website</Form.Label>
        <Form.Control type="text" {...register("website")} />
        {errors.website && (
          <Form.Text className="text-danger">
            {errors.website.message}
          </Form.Text>
        )}
      </Form.Group>

      <Button variant="primary" disabled={isPending} type="submit">
        {isPending && <Spinner animation="border" size="sm" />}
        Submit
      </Button>
    </Form>
  );
};

export default AddClinicInfo;
