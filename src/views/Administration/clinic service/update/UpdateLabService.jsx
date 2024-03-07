import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
//import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateLabService } from "../hooks/useLabService";
import { useLaboratoryTestPricing } from "../../../patient/hooks/useGetLaboratoryTests";
const schema = yup
  .object()
  .shape({
    test_name: yup.string().required("lab test name is required"),
    price: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .moreThan(0)
      .required("price is required"),
    isPanel: yup.boolean(),
    panelGroup: yup.array(),
    lab_category: yup.string(),
    unit: yup.string(),
    referenceRange: yup.string(),
  })
  .required();
const UpdateLabService = () => {
  const { state } = useLocation();
  // console.log(state);
  const { mutate, isPending } = useUpdateLabService();
  const { data: Labtests } = useLaboratoryTestPricing();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      test_name: state.test_name,
      price: state.price,
      isPanel: state.isPanel,
      panelGroup: state.panelGroup.map((t) => t._id),
      lab_category: state.lab_category.name,
      unit: state.unit,
      referenceRange: state.referenceRange,
    },
    resolver: yupResolver(schema),
  });
  //console.log(errors);
  const submitHandler = (data) => {
    // console.log(data);
    // return;
    mutate(data);
  };
  const pG = watch("panelGroup");
  const isPanelWatch = watch("isPanel");
  // console.log(errors);
  return (
    <Container className="p-0">
      <h5 className="p-2 mt-1 mb-3 bluewhite-bg">
        Edit Laboratory Pricing Item{" "}
      </h5>
      <div className="p-2 boxshadow borderRadius7px">
        <Form onSubmit={handleSubmit(submitHandler)} noValidate className="">
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="test_name">Name : </Form.Label>
                <Form.Control
                  type="text"
                  name="test_name"
                  id="test_name"
                  {...register("test_name")}
                  placeholder="Enter Test Name"
                  //isValid={touchedFields.test_name && !errors.test_name}
                  isInvalid={errors.test_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.test_name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="price">Price : </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  id="price"
                  {...register("price")}
                  placeholder="enter price"
                  isInvalid={errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="Category">Category : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Disabled readonly input"
                  aria-label="Disabled input example"
                  readOnly
                  {...register("lab_category")}
                  id="Category"
                  name="lab_category"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="isPanel" className="me-2">
                  Is Panel :{" "}
                </Form.Label>
                <Form.Check
                  inline
                  value={true}
                  name="isPanel"
                  defaultChecked={state.isPanel}
                  type="checkbox"
                  id="isPanel"
                  {...register("isPanel")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="panelGroup" className="me-2">
                  panelGroup :
                </Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  {...register("panelGroup")}
                  disabled={!isPanelWatch}
                  defaultValue={pG}
                >
                  {/* <option value={""}>Default select</option> */}
                  {Labtests?.filter(
                    (lab) => lab.lab_category._id === state.lab_category?._id
                  ).map((labb, index) => (
                    <option
                      key={index}
                      value={labb._id}
                      // selected={state.panelGroup.some((t) => t._id == labb._id)}
                    >
                      {labb.test_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-1">
                <Form.Label>reference Range:</Form.Label>
                <Form.Control
                  placeholder="reference Range"
                  {...register("referenceRange")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>unit:</Form.Label>
                <Form.Control
                  placeholder="unit of test"
                  {...register("unit")}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
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
        </Form>
      </div>
    </Container>
  );
};

export default UpdateLabService;
