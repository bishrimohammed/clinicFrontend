/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useAddLabResult } from "../investigation/hooks/useAddLabResult";

const AddResult = ({ handleClose, lab, labId }) => {
  const [filledTest, setFilledTest] = useState([]);
  // const { historyId } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const resultValueRef = useRef();
  // const referenceRangeRef = useRef();
  // const unitRef = useRef();
  const commentRef = useRef();
  const selectedTestRef = useRef();
  const { mutateAsync, isPending } = useAddLabResult();
  console.log(labId);
  const submitHandler = async () => {
    if (filledTest.length !== 0) {
      //let allpres_medicine = []
      const isAll_Result_added = filledTest.length === lab.length;
      if (isAll_Result_added) {
        // console.log(filledTest);
        let Data = {
          testResult: filledTest,
          reportedBy: currentUser._id,
        };
        mutateAsync({ Data, labId }).then((res) => {
          // console.log(res);
          if (res.status === 201) {
            handleClose();
          }
        });
      } else {
        toast.error("fill all lab result");
      }
    }
  };
  const addto_List_ = (e) => {
    e.preventDefault();
    const resultValue = resultValueRef.current.value;
    // const referenceRange = referenceRangeRef.current.value;
    // const unit = unitRef.current.value;
    const comment = commentRef.current.value;
    const testId = selectedTestRef.current.value;

    if (!resultValue) {
      alert("add all field");
      return;
    }
    const result = {
      testId,
      //referenceRange,
      resultValue,
      // unit,
      comment,
    };

    setFilledTest([...filledTest, result]);
    selectedTestRef.current.value = "";
  };

  const findName = (id) => {
    const value = lab.filter((test) => test._id === id);
    return value[0].test_name;
  };

  return (
    <Container>
      <Form className="d-flex flex-column" onSubmit={addto_List_}>
        {/* <Row className="border-3 mb-3">
          <Col>
            <Form.Group className="">
              <Form.Label>Ordered Test</Form.Label>
              <Form.Select
                ref={selectedTestRef}
                aria-label="Default select example"
              >
                <option value="">Select Test</option>
                {lab?.map((investigation) => (
                  <option
                    key={investigation._id}
                    value={investigation._id}
                    disabled={filledTest.some((obj) =>
                      Object.values(obj).includes(investigation._id)
                    )}
                  >
                    {investigation.test_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="">
              <Form.Label>Result Value</Form.Label>
              <Form.Control
                ref={resultValueRef}
                type="text"
                placeholder="Enter..."
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formControlsTextarea">
              <Form.Label>Note</Form.Label>
              <Form.Control
                ref={commentRef}
                type="text"
                placeholder="Enter text here"
              />
            </Form.Group>
          </Col>
        </Row> */}
        <Row className="border-3 ">
          <Col>
            {/* <Form.Group className="">
              <Form.Label>Unit</Form.Label>

              <Form.Select ref={unitRef} aria-label="Default select example">
                <option value="">Select Unit</option>
                <option value="cells/μL">cells/μL</option>
                <option value="g/dL">g/dL</option>
                <option value="ng/dL">ng/dL</option>
                <option value="mg/dL">mg/dL</option>
              </Form.Select>
            </Form.Group> */}
          </Col>
          <Col>
            {/* <Form.Group className="">
              <Form.Label>Reference Range</Form.Label>
              <Form.Control
                ref={referenceRangeRef}
                type="text"
                placeholder="Enter..."
              />
            </Form.Group> */}
          </Col>
        </Row>

        {/* <div className="d-flex w-100 align-items-center">
          <div className="d-flex ms-2 align-self-end">
            <Button variant="success" type="submit">
              + Add
            </Button>
          </div>
        </div> */}
        <Row className="mb-3">
          <Col>
            {" "}
            <span className="fw-bold">Test</span>{" "}
          </Col>
          <Col className="fw-bold">Result value</Col>
          <Col className="fw-bold">Comment</Col>
        </Row>
        {lab.map((t) => (
          <>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    disabled={true}
                    value={t.test.service_name}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="">
                  {/* <Form.Label>Result Value</Form.Label> */}
                  <Form.Control
                    ref={resultValueRef}
                    type="text"
                    placeholder="Enter..."
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formControlsTextarea">
                  {/* <Form.Label>Note</Form.Label> */}
                  <Form.Control
                    ref={commentRef}
                    type="text"
                    placeholder="Enter text here"
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        ))}
      </Form>
      <hr />
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>test</th>
            <th>result</th>
            {/* <th>Ref. value</th> */}
            {/* <th>unit</th> */}
            <th>note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filledTest.length !== 0 &&
            filledTest.map((test, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{findName(test.testId)}</td>
                <td>{test.resultValue}</td>
                {/* <td>{test.referenceRange}</td> */}
                {/* <td>{test.unit}</td> */}
                <td>{test.comment}</td>
                <td>
                  <MdDelete
                    onClick={() => {
                      setFilledTest(
                        filledTest.filter(
                          (filled) => filled.testId !== test.testId
                        )
                      );
                    }}
                    size={20}
                    cursor="pointer"
                    color="red"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal.Footer style={{ justifyContent: "initial" }}>
        <div className="d-flex w-100  justify-content-end">
          <Button
            variant="primary"
            disabled={filledTest.length === 0 || isPending}
            className="w-100"
            onClick={submitHandler}
            type="button"
          >
            {isPending && <Spinner animation="border" size="sm" />}
            Submit Result
          </Button>
        </div>
      </Modal.Footer>
    </Container>
  );
};

const AddLabResultModal = (props) => {
  console.log(props);
  const closeModal = () => {
    props.handleClose();
  };
  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Laboratory Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddResult
          labId={props.labId}
          lab={props.lab}
          handleClose={closeModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddLabResultModal;
