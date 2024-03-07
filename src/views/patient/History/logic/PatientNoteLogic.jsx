/* eslint-disable react/prop-types */

import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import TextAreaInput from "../../../../components/inputs/TextAreaInput";

import { History_Note_schema } from "../note/utils/histirynote-validation";

import { useAddHistoryNote } from "../note/hooks/useAddHistoryNote";
import { useGetHistoryNote } from "../note/hooks/useGetHistoryNote";

const PatientNoteLogic = () => {
  const { historyId } = useParams();
  const { mutate, isPending } = useAddHistoryNote();
  const { data: history, isFetching, error } = useGetHistoryNote(historyId);
  //console.log(history);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      assesement: history?.assesement || "",
      chiefcomplaint: history?.chiefcomplaint || "",
      HPI: history?.HPI || "",
      plan: history?.plan || "",
      physicalExam: {
        vitals: {
          pulseRate: history?.physicalExam?.vitals?.pulseRate || "",
          SPO2: history?.physicalExam?.vitals?.SPO2 || "",
          SaO2: history?.physicalExam?.vitals?.SaO2 || "",
          respirationRate: history?.physicalExam?.vitals?.respirationRate || "",
          height: history?.physicalExam?.vitals?.height || "",
          weight: history?.physicalExam?.vitals?.weight || "",
          temperature: history?.physicalExam?.vitals?.temperature || "",
          Dbloodpressure: history?.physicalExam?.vitals?.Dbloodpressure || "",
          Sbloodpressure: history?.physicalExam?.vitals?.Sbloodpressure || "",
        },
        generalAppreance: {
          normal: history?.physicalExam?.generalAppreance?.normal || "",
          remark: history?.physicalExam?.generalAppreance?.remark || "",
        },
        CVS: {
          normal: history?.physicalExam?.CVS?.normal || "",
          remark: history?.physicalExam?.CVS?.remark || "",
        },
        CNS: {
          normal: history?.physicalExam?.CNS?.normal || "",
          remark: history?.physicalExam?.CNS?.remark || "",
        },
        Abdominal: {
          normal: history?.physicalExam?.Abdominal?.normal,
          remark: history?.physicalExam?.Abdominal?.remark || "",
        },

        HEENT: {
          normal: history?.physicalExam?.HEENT?.normal || "",
          remark: history?.physicalExam?.HEENT?.remark || "",
        },
        Musculoskeletal: {
          normal: history?.physicalExam?.Musculoskeletal?.normal || "",
          remark: history?.physicalExam?.Musculoskeletal?.remark || "",
        },
        Neurological: {
          normal: history?.physicalExam?.Neurological?.normal || "",
          remark: history?.physicalExam?.Neurological?.remark || "",
        },
        Respiratory: {
          normal: history?.physicalExam?.Respiratory?.normal || "",
          remark: history?.physicalExam?.Respiratory?.remark || "",
        },
      },
    },
    resolver: yupResolver(History_Note_schema),
  });

  if (isFetching) return <Spinner animation="grow" variant="primary" />;
  if (error) return <div>error : {error.message}</div>;

  const submitHandler = (data) => {
    // console.log(data);
    mutate({ ...data, historyId });
  };
  const handleSetvalue = (value) => {
    setValue("physicalExam.Abdominal.normal", value);
    setValue("physicalExam.CNS.normal", value);
    setValue("physicalExam.CVS.normal", value);

    setValue("physicalExam.Neurological.normal", value);
    setValue("physicalExam.Respiratory.normal", value);
    setValue("physicalExam.HEENT.normal", value);
    setValue("physicalExam.Musculoskeletal.normal", value);
    setValue("physicalExam.generalAppreance.normal", value);
    setValue("physicalExam.Abdominal.normal", value);
  };
  return (
    <Container>
      <hr />

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group className="mb-3 d-flex align-items-center gap-3">
          <Form.Label className="text-nowrap fw-bold">
            Chief complaint :
          </Form.Label>
          <Form.Control
            type="text"
            isInvalid={errors.chiefcomplaint}
            {...register("chiefcomplaint")}
            key="chiefcomplaint"
            name="chiefcomplaint"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex align-items-center gap-3">
          <Form.Label className="text-nowrap fw-bold">HPI :</Form.Label>
          <TextAreaInput
            errors={errors.HPI}
            register={register}
            key="HPI"
            name="HPI"
          />
        </Form.Group>

        <hr />
        <div>
          <div className="mb-3">
            <h5>physical exam</h5>
          </div>
          <hr className="mt-0 mb-3" />
          <>
            <div className="physical_vital border border-1 border-secondary-subtle rounded-1 px-2 py-3 mb-2">
              <Row>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>SBP</Form.Label>

                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.physicalExam?.vitals?.Sbloodpressure}
                      {...register("physicalExam.vitals.Sbloodpressure")}
                      name="physicalExam.vitals.Sbloodpressure"
                    />
                    <Form.Text muted>mmHg</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>DBP</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.physicalExam?.vitals?.Dbloodpressure}
                      {...register("physicalExam.vitals.Dbloodpressure")}
                      name="physicalExam.vitals.Dbloodpressure"
                    />
                    <Form.Text muted>mmHg</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.physicalExam?.vitals?.temperature}
                      {...register("physicalExam.vitals.temperature")}
                      name="physicalExam.vitals.temperature"
                    />
                    <Form.Text muted>
                      <sup>o</sup>C
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>PR</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.physicalExam?.vitals?.pulseRate}
                      {...register("physicalExam.vitals.pulseRate")}
                      name="physicalExam.vitals.pulseRate"
                    />
                    <Form.Text muted>breath/min</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>RR</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.physicalExam?.vitals?.respirationRate}
                      {...register("physicalExam.vitals.respirationRate")}
                      name="physicalExam.vitals.respirationRate"
                    />
                    <Form.Text muted>breath/min</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>SPO2</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.physicalExam?.vitals?.SPO2}
                      {...register("physicalExam.vitals.SPO2")}
                      name="physicalExam.vitals.SPO2"
                    />
                    <Form.Text muted>%</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>height</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.physicalExam?.vitals?.height}
                      {...register("physicalExam.vitals.height")}
                      name="physicalExam.vitals.height"
                    />
                    <Form.Text muted>cm</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>weight</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.physicalExam?.vitals?.weight}
                      {...register("physicalExam.vitals.weight")}
                      name="physicalExam.vitals.weight"
                    />
                    <Form.Text muted>kg</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-2 ">
                    <Form.Label>SaO2</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.physicalExam?.vitals?.SaO2}
                      {...register("physicalExam.vitals.SaO2")}
                      name="physicalExam.vitals.SaO2"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </div>
            {/* <hr className="mt-0 mb-3" /> */}
            <div>
              <div className="p-2 d-flex gap-2">
                <button
                  onClick={() => handleSetvalue("true")}
                  className="btn btn-outline-info"
                  type="button"
                >
                  all normal
                </button>
                <button
                  onClick={() => handleSetvalue("false")}
                  className="btn btn-outline-info"
                  type="button"
                >
                  all abnormal
                </button>
                <button
                  onClick={() => handleSetvalue("")}
                  className="btn btn-outline-info"
                  type="button"
                >
                  reset
                </button>
              </div>
              <Row className="border border-1 ">
                <Col xs={3} className="d-flex align-items-center"></Col>
                <Col xs={2} className="d-flex align-items-center ">
                  Normal
                </Col>
                <Col xs={2} className="d-flex align-items-center ">
                  Abnormal
                </Col>
                <Col xs={5}>Remark</Col>
              </Row>
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">General Appreance</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    defaultChecked={
                      history
                        ? history.physicalExam?.generalAppreance?.normal
                        : ""
                    }
                    //label="Normal"
                    value="true"
                    //name="generalAppreance"
                    type="radio"
                    name="physicalExam.generalAppreance.normal"
                    //isInvalid={errors.physicalExam?.generalAppreance?.normal}
                    {...register("physicalExam.generalAppreance.normal")}
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //  label="Abnoraml"
                    value="false"
                    defaultChecked={
                      history
                        ? !history.physicalExam?.generalAppreance?.normal
                        : ""
                    }
                    type="radio"
                    //isInvalid={errors.physicalExam?.generalAppreance?.normal}
                    {...register("physicalExam.generalAppreance.normal")}
                    name="physicalExam.generalAppreance.normal"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    // name="generalAppreanceRemark"
                    type="text"
                    //errors={errors.physicalExam?.generalAppreance?.remark}
                    {...register("physicalExam.generalAppreance.remark")}
                    name="physicalExam.generalAppreance.remark"
                  />
                </Col>
              </Row>
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">HEENT</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    value="true"
                    defaultChecked={history.physicalExam?.HEENT?.normal}
                    type="radio"
                    //isInvalid={errors.physicalExam?.HEENT?.normal}
                    {...register("physicalExam.HEENT.normal")}
                    name="physicalExam.HEENT.normal"
                  />
                </Col>

                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //  label="Abnoraml"
                    value="false"
                    // name="HEENT"
                    type="radio"
                    defaultChecked={!history.physicalExam?.HEENT?.normal}
                    isInvalid={errors.physicalExam?.HEENT?.normal}
                    {...register("physicalExam.HEENT.normal")}
                    name="physicalExam.HEENT.normal"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    //name="HEENTRemark"
                    type="text"
                    errors={errors.physicalExam?.HEENT?.remark}
                    {...register("physicalExam.HEENT.remark")}
                    name="physicalExam.HEENT.remark"
                  />
                </Col>
              </Row>
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">CVS</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    defaultChecked={history.physicalExam?.CVS?.normal}
                    value="true"
                    //name="CVS"
                    type="radio"
                    //isInvalid={errors.physicalExam?.CVS?.normal}
                    {...register("physicalExam.CVS.normal")}
                    name="physicalExam.CVS.normal"
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //  label="Abnoraml"
                    value="false"
                    defaultChecked={!history.physicalExam?.CVS?.normal}
                    type="radio"
                    //isInvalid={errors.physicalExam?.CVS?.normal}
                    {...register("physicalExam.CVS.normal")}
                    name="physicalExam.CVS.normal"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    defaultChecked={!history.physicalExam?.CVS?.normal}
                    type="text"
                    //isInvalid={errors.physicalExam?.CVS?.remark}
                    {...register("physicalExam.CVS.remark")}
                    name="physicalExam.CVS.remark"
                  />
                </Col>
              </Row>
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">CNS</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    defaultChecked={history.physicalExam?.CNS?.normal}
                    value="true"
                    //  name="CNS"
                    type="radio"
                    //isInvalid={errors.physicalExam?.CNS?.normal}
                    {...register("physicalExam.CNS.normal")}
                    name="physicalExam.CNS.normal"
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    defaultChecked={!history.physicalExam?.CNS?.normal}
                    value="false"
                    //name="CNS"
                    type="radio"
                    //isInvalid={errors.physicalExam?.CNS?.normal}
                    {...register("physicalExam.CNS.normal")}
                    name="physicalExam.CNS.normal"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    //name="CNSRemark"
                    type="text"
                    //isInvalid={errors.physicalExam?.CNS?.remark}
                    {...register("physicalExam.CNS.remark")}
                    name="physicalExam.CNS.remark"
                  />
                </Col>
              </Row>

              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">Respiratory</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    //defaultChecked={history.physicalExam?.Respiratory?.normal}
                    //isInvalid={errors.physicalExam?.Respiratory?.normal}
                    {...register("physicalExam.Respiratory.normal")}
                    name="physicalExam.Respiratory.normal"
                    value="true"
                    type="radio"
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //defaultChecked={!history.physicalExam?.Respiratory?.normal}
                    value="false"
                    //isInvalid={errors.physicalExam?.Respiratory?.normal}
                    {...register("physicalExam.Respiratory.normal")}
                    name="physicalExam.Respiratory.normal"
                    type="radio"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    //errors={errors.physicalExam?.Respiratory?.remark}
                    {...register("physicalExam.Respiratory.remark")}
                    name="physicalExam.Respiratory.remark"
                    type="text"
                  />
                </Col>
              </Row>

              {/* abdo */}
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">Abdominal</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    value="true"
                    defaultChecked={history.physicalExam?.Abdominal?.normal}
                    //isInvalid={errors.physicalExam?.Abdominal?.normal}
                    {...register("physicalExam.Abdominal.normal")}
                    name="physicalExam.Abdominal.normal"
                    type="radio"
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    value="false"
                    defaultChecked={!history.physicalExam?.Abdominal?.normal}
                    //isInvalid={errors.physicalExam?.Abdominal?.normal}
                    {...register("physicalExam.Abdominal.normal")}
                    name="physicalExam.Abdominal.normal"
                    type="radio"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    // //isInvalid={errors.physicalExam?.Abdominal?.remark}
                    {...register("physicalExam.Abdominal.remark")}
                    name="physicalExam.Abdominal.remark"
                    type="text"
                  />
                </Col>
              </Row>

              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">Musculoskeletal</Form.Label>
                </Col>

                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    value="true"
                    defaultChecked={
                      history.physicalExam?.Musculoskeletal?.normal
                    }
                    //errors={errors.physicalExam?.Musculoskeletal?.normal}
                    {...register("physicalExam.Musculoskeletal.normal")}
                    name="physicalExam.Musculoskeletal.normal"
                    type="radio"
                  />
                </Col>

                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //  label="Abnoraml"
                    value="false"
                    defaultChecked={
                      !history.physicalExam?.Musculoskeletal?.normal
                    }
                    {...register("physicalExam.Musculoskeletal.normal")}
                    name="physicalExam.Musculoskeletal.normal"
                    type="radio"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    //isInvalid={errors.physicalExam?.Musculoskeletal?.remark}
                    {...register("physicalExam.Musculoskeletal.remark")}
                    name="physicalExam.Musculoskeletal.remark"
                    type="text"
                  />
                </Col>
              </Row>
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">Neurological</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    value="true"
                    defaultChecked={history.physicalExam?.Neurological?.normal}
                    //isInvalid={errors.physicalExam?.Neurological?.normal}
                    {...register("physicalExam.Neurological.normal")}
                    name="physicalExam.Neurological.normal"
                    type="radio"
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    value="false"
                    defaultChecked={!history.physicalExam?.Neurological?.normal}
                    //isInvalid={errors.physicalExam?.Neurological?.normal}
                    {...register("physicalExam.Neurological.normal")}
                    name="physicalExam.Neurological.normal"
                    type="radio"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0"
                    isInvalid={errors.physicalExam?.Neurological?.remark}
                    {...register("physicalExam.Neurological.remark")}
                    name="physicalExam.Neurological.remark"
                    type="text"
                  />
                </Col>
              </Row>

              <hr className="mt-0 mb-3" />

              <hr className="mt-0 mb-3" />
            </div>
          </>
        </div>
        <Form.Group className="mb-3 d-flex align-items-center gap-3">
          <Form.Label className="text-nowrap fw-bold">plan :</Form.Label>
          <TextAreaInput
            errors={errors.plan}
            register={register}
            key="plan"
            name="plan"
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex align-items-center gap-3">
          <Form.Label className="text-nowrap fw-bold">assesement :</Form.Label>
          <TextAreaInput
            errors={errors.assesement}
            register={register}
            key="assesement"
            name="assesement"
          />
        </Form.Group>
        <div className="d-flex justifyContentEnd">
          <Col>
            <Button
              disabled={!history.status || isPending}
              variant="success"
              className="w-100"
              type="submit"
            >
              {isPending && <Spinner animation="border" size="sm" />}
              {history ? "+ Update" : "+ Add"}
            </Button>
          </Col>
        </div>
      </Form>
      <hr />
    </Container>
  );
};

export default PatientNoteLogic;
