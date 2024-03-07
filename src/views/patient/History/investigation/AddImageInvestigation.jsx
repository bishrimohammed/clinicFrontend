import { Button, Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { useGetImageCategory } from "../../hooks/useGetImageCategory";
import { useGetImagingStudiesTests } from "../../hooks/useGetImagingStudies";
import { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { useAddImagingOrder } from "./hooks/useAddImagingOrder";
import { toast } from "react-toastify";

const AddImageInvestigation = () => {
  const { data } = useGetImagingStudiesTests();
  const { data: imageCategory } = useGetImageCategory();
  const remarkref = useRef();
  const { historyId } = useParams();
  const [selectedTests, setSelectedTests] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    imageCategory && imageCategory[0]?._id
  );
  const { state } = useLocation();
  const { mutateAsync, isPending } = useAddImagingOrder();
  console.log(state.patientId);
  const imageTests = data
    ?.filter((imagetest) => imagetest.imaging_category === activeCategory)
    .map((labtest, index) => (
      <button
        style={{
          cursor: "pointer",
        }}
        className="bg-gredient width23 border-0  py-2 d-flex justify-content-center align-items-center"
        onClick={() => TestSelectHandler(labtest)}
        key={index}
        // disabled={selectedTests.includes(labtest._id)}
      >
        {selectedTests.includes(labtest._id) && <FaCheck color="green" />}{" "}
        {labtest.test_name}
      </button>
    ));

  const TestSelectHandler = (test) => {
    const index = selectedTests.findIndex((t) => t === test._id);
    if (index === -1) {
      setSelectedTests([...selectedTests, test._id]);
    } else {
      //   let panelgroup = test?.panelGroup.map((t) => t._id);
      //   console.log(panelgroup);
      setSelectedTests(selectedTests.filter((t) => t !== test._id));
      //   setIndirecSselectedTests(indirecSselectedTests.filter(t));
    }
  };

  const getTestName = (testId) => {
    let test = data?.find((t) => t._id === testId);
    if (test) {
      return test.test_name;
    }
    return "";
  };
  const removeTestFromSelectedTest = (testId) => {
    setSelectedTests(selectedTests.filter((t) => t !== testId));
  };

  const submitHandler = () => {
    if (remarkref.current.value === "") {
      toast.error(" clinical finding empty");
      return;
    }
    const Data = {
      historyId,
      investigations: selectedTests,
      clinical_finding: remarkref.current.value,
      patientId: state.patientId,
    };
    mutateAsync(Data).then((resData) => {
      if (resData.status === 201) {
        setSelectedTests([]);
        remarkref.current.value = "";
      }
    });
    // mutate(Data);
    // console.log(Data);
  };
  return (
    <>
      <h4 className="ps-2 bluewhite-bg py-1">order Imaging Investigation</h4>
      <Form className="d-flex flex-column m-2">
        <Form.Group>
          <Form.Label>Clinical Findings</Form.Label>
          <Form.Control
            ref={remarkref}
            as="textarea"
            required
            placeholder="Enter text here"
            className="border-2 w-75"
          />
        </Form.Group>
      </Form>
      <hr className="mt-0" />
      <Row className="py-2">
        <Col sm={7} md={9} className="pe-0">
          <div className="">
            <h6>Tests : </h6>
            <div className="d-flex  flex-wrap gap-2">{imageTests}</div>
            <div className="d-flex justify-content-between  gap-2 py-2 mt-2">
              <div
                style={{ width: "70%" }}
                className="border border-2 px-2 py-3 ms-2"
              >
                <h6>Selected Tests : </h6>
                <div className="d-flex  flex-wrap gap-2">
                  {selectedTests.map((testId, index) => (
                    <ListGroup.Item
                      as="li"
                      className=" d-flex gap-1 align-items-center p-1 "
                      key={index}
                    >
                      {getTestName(testId)}
                      <RxCross1
                        onClick={() => removeTestFromSelectedTest(testId)}
                        color="red"
                        size={20}
                        className="curserpointer"
                      />
                    </ListGroup.Item>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={5} md={3} className="ps-0">
          <div style={{ minHeight: 150 }} className="boxshadow">
            <ListGroup as="ul" className="border-bottom border-bottom-1">
              {imageCategory?.map((imagecategory) => (
                <ListGroup.Item
                  onClick={() => setActiveCategory(imagecategory._id)}
                  active={imagecategory._id === activeCategory}
                  key={imagecategory._id}
                  as="li"
                  className="curserpointer "
                >
                  {imagecategory.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
      <div className="mt-2 mb-1">
        <Button
          className="border-0 w-100"
          onClick={submitHandler}
          disabled={selectedTests.length === 0 || isPending}
        >
          {isPending && <Spinner animation="border" size="sm" />}
          Submit Tests
        </Button>
      </div>
    </>
  );
};

export default AddImageInvestigation;
