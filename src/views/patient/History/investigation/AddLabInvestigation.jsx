import { Button, Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { useLabCategory } from "../../hooks/useLabCategory";
import { useLaboratoryTestPricing } from "../../hooks/useGetLaboratoryTests";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddLabOrder } from "./hooks/useAddLabOrder";
const AddLabInvestigation = () => {
  const { data, error } = useLabCategory();
  const { data: laboratoryTests } = useLaboratoryTestPricing();
  const { mutateAsync, isPending } = useAddLabOrder();
  const remarkref = useRef();
  const { historyId } = useParams();
  const [selectedTests, setSelectedTests] = useState([]);
  const [indirecSselectedTests, setIndirecSselectedTests] = useState([]);

  // Add a handler to toggle a test selected state
  const [activeCategory, setActiveCategory] = useState(data && data[0]?._id);

  if (error) return "An error has occurred: " + error.message;

  const PanelsTests = laboratoryTests
    ?.filter((lab) => lab.isPanel && lab.lab_category._id === activeCategory)
    .map((labtest, index) => (
      <button
        style={{
          //   pointerEvents: selectedTests.includes(labtest._id)
          //     ? "visibleFill"
          //     : "painted",
          //   opacity: selectedTests.includes(labtest._id) ? 0.5 : 1,
          cursor: selectedTests.includes(labtest._id) ? "no-drop" : "pointer",
        }}
        className="bg-gredient width23 border-0  py-2 d-flex justify-content-center align-items-center"
        onClick={() => PanelSalect(labtest)}
        key={index}
        // disabled={selectedTests.includes(labtest._id)}
      >
        {selectedTests.includes(labtest._id) && <FaCheck color="green" />}{" "}
        {labtest.test_name}
      </button>
    ));

  const nonPanelsTests = laboratoryTests
    ?.filter(
      (lab) => lab.isPanel === false && lab.lab_category._id === activeCategory
    )
    ?.map((labtest, index) => (
      <button
        style={{
          fontSize: 13,
          cursor: indirecSselectedTests.some((t) => t._id === labtest._id)
            ? "no-drop"
            : "pointer",
        }}
        onClick={() => TestSelect(labtest)}
        className="bg-gredient width23 border-0  py-2 d-flex justify-content-center align-items-center"
        key={index}
        disabled={indirecSselectedTests.some((t) => t._id === labtest._id)}
      >
        {(selectedTests.includes(labtest._id) ||
          indirecSselectedTests.some((t) => t._id === labtest._id)) && (
          <FaCheck color="green" />
        )}
        {labtest.test_name}
      </button>
    ));

  const PanelSalect = (test) => {
    const index = selectedTests.findIndex((t) => t === test._id);
    console.log();
    if (index === -1) {
      setSelectedTests([...selectedTests, test._id]);
      setIndirecSselectedTests([...indirecSselectedTests, ...test.panelGroup]);
    } else {
      setSelectedTests(selectedTests.filter((t) => t !== test._id));
      let panelgroup = test.panelGroup.map((t) => t._id);
      setIndirecSselectedTests(
        indirecSselectedTests.filter((t) => {
          panelgroup.map((pg) => pg !== t._id);
        })
      );
      console.log(panelgroup);
    }
  };

  const TestSelect = (test) => {
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
    let test = laboratoryTests.find((t) => t._id === testId);
    if (test) {
      return test.test_name;
    }
    return "";
  };
  const removeTestFromSelectedTest = (testId) => {
    setSelectedTests(selectedTests.filter((t) => t !== testId));
    let panelgroup = laboratoryTests
      .find((t) => t._id === testId)
      ?.panelGroup.map((t) => t._id);
    setIndirecSselectedTests(
      indirecSselectedTests.filter((t) => {
        panelgroup.map((pg) => pg !== t._id);
      })
    );
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
    };
    mutateAsync(Data).then((resData) => {
      if (resData.status === 201) {
        setSelectedTests([]);
        setIndirecSselectedTests([]);
        remarkref.current.value = "";
      }
    });
    // mutate(Data);
    // console.log(Data);
  };
  return (
    <>
      <h4 className="ps-2 bluewhite-bg py-1">order Lab Investigation</h4>
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
            {PanelsTests?.length !== 0 && (
              <div className="mb-2">
                <h6>Panels : </h6>
                {PanelsTests}
              </div>
            )}

            <h6>Tests : </h6>
            <div className="d-flex  flex-wrap gap-2">{nonPanelsTests}</div>
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
          <ListGroup as="ul" className="boxshadow">
            {data?.map((labcategory) => (
              <ListGroup.Item
                onClick={() => setActiveCategory(labcategory._id)}
                active={labcategory._id === activeCategory}
                key={labcategory._id}
                as="li"
                className="curserpointer "
              >
                {labcategory.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      {/* <div className="d-flex justify-content-between  gap-2 py-2 mt-2">
        <div
          style={{ width: "70%" }}
          className="border border-2 px-2 py-3 ms-3"
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
      </div> */}
      <div className="d-flex justify-content-end align-self-end mt-2 mb-1">
        <Button
          className="border-0 w-100  "
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

export default AddLabInvestigation;
