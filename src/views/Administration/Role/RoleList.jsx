import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoles } from "./hooks/useGetRoles";
import { Container } from "react-bootstrap";

import RoleTable from "./RoleTable";
import DeactivateRoleModal from "./DeactivateRoleModal";
import ViewRoleDeatil from "./ViewRoleDeatil";

const RoleList = () => {
  const navigate = useNavigate();
  const { data: roles, isPending, isFetching } = useGetRoles();
  const [showDeactivateModal, setShowDeactivateModal] = useState({
    isShow: false,
    roleId: null,
  });
  const [showViewRole, setShowViewRole] = useState({
    isShow: false,
    role: null,
  });

  const rowData = useMemo(() => roles, [isPending, isFetching]);

  // if (isPending) {
  //   return <Spinner animation="border" />;
  // }
  // console.log(roles);
  return (
    <>
      <Container className="p-3">
        {/* <div>ViewEmployees</div> */}
        <div className=" border-bottom border-1 mb-1">
          {/* <h4 className="mb-2">View Employees</h4> */}
          <h4 className=" p-2 mb-0 fw-bold">Roles</h4>
        </div>
        <RoleTable
          roles={rowData}
          isPending={isPending}
          setShowDeactivateModal={setShowDeactivateModal}
          setShowViewRole={setShowViewRole}
        />
      </Container>
      {showDeactivateModal.isShow && (
        <DeactivateRoleModal
          show={showDeactivateModal.isShow}
          handleClose={setShowDeactivateModal}
          roleId={showDeactivateModal.roleId}
        />
      )}
      {showViewRole.isShow && (
        <ViewRoleDeatil
          show={showViewRole.isShow}
          handleClose={setShowViewRole}
          role={showViewRole.role}
        />
      )}
    </>
  );
};

export default RoleList;
