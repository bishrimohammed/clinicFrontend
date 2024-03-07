import { Button, Spinner, Table } from "react-bootstrap";
import { useLaboratoryTestPricing } from "../../../patient/hooks/useGetLaboratoryTests";
import { useNavigate } from "react-router-dom";
import { UsePagination } from "../../../hooks/UsePagination";
import PaginationComponent from "../../../../components/PaginationComponent";
import { useLabCategory } from "../../../patient/hooks/useLabCategory";
import SearchInput from "../../../../components/inputs/SearchInput";
import { useState } from "react";

const LabServiceList = () => {
  const { data, isPending, isError, error } = useLaboratoryTestPricing();
  const [page, pageChangeHandler, totalPage, startIndex, endIndex] =
    UsePagination(
      //props.itemslength
      data?.length
    );

  useLabCategory();
  const navigate = useNavigate();
  if (isPending) return <Spinner animation="grow" />;
  if (isError) return <div>error : {error.message}</div>;
  console.log(data.length);
  return (
    <>
      <Table striped bordered className="mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>

            <th>Price</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.slice(startIndex, endIndex).map((lab, index) => (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() =>
                //console.log("hello")
                navigate(`/administrations/services/${lab._id}/editlab`, {
                  state: lab,
                })
              }
            >
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{lab.test_name}</td>
              <td>{lab.lab_category.name}</td>
              <td>{lab.price}</td>

              <td>
                <button className="btn btn-outline-success py-0">edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />

      <PaginationComponent
        page={page}
        totalPage={totalPage}
        pageChangeHandler={pageChangeHandler}
      />
      <div className="d-flex w-100 border-top border-1 p-1  justify-content-end">
        <Button
          variant="success"
          type="button"
          onClick={() => navigate("/administrations/services/createlabservice")}
        >
          + Add Lab Service
        </Button>
      </div>
    </>
  );
};

export default LabServiceList;
