import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CNavGroup,
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
} from "@coreui/react";
// import CIcon from "@coreui/icons-react";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// sidebar nav config
//import navigation from "../_nav";
import { Link, NavLink, useLocation } from "react-router-dom";
// import { cilPuzzle, cilSpeedometer } from "@coreui/icons";
import { changeSidebarShow } from "../store/sidebarSlice";
import { FaKitMedical } from "react-icons/fa6";
import { GiMedicalThermometer, GiUltrasound } from "react-icons/gi";
import {
  MdSpaceDashboard,
  MdAssignmentTurnedIn,
  MdAdminPanelSettings,
  MdOutlineMoneyOffCsred,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  // console.log(sidebarShow);
  const currentUser = useSelector((state) => state.auth.user);
  const navLink = (name, icon) => {
    return (
      <>
        {icon && icon}
        {name && name}
      </>
    );
  };
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(
          changeSidebarShow(visible) /* { type: "set", sidebarShow: visible } */
        );
      }}
    >
      <CSidebarBrand
        style={{ height: 60, backgroundColor: "#f3f4f7" }}
        className="d-none d-md-flex justify-content-center align-items-center"
        to="/"
      >
        Dr Subi Medium Clinic
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <CNavItem to="/" component={NavLink}>
            {/* <CIcon icon={cilSpeedometer} customClassName="nav-icon" /> */}
            <MdSpaceDashboard className="nav-icon" />
            Dashboard
          </CNavItem>
          <CNavGroup
            idx="patient"
            visible={location.pathname.startsWith("patients")}
            toggler={navLink(
              "Patients",

              <FaKitMedical className="nav-icon" />
              // </CIcon>
            )}
          >
            {currentUser.role?.name === "cashier" && (
              <CNavItem to="/patients/newpatient" component={NavLink}>
                Add Patient
              </CNavItem>
            )}

            <CNavItem to="/patients/patientlist" component={NavLink}>
              patient list
            </CNavItem>
          </CNavGroup>

          {currentUser.role?.name === "laboratorian" && (
            <CNavGroup
              idx="lab"
              visible={location.pathname.startsWith("lab")}
              toggler={navLink(
                "Lab",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <GiMedicalThermometer className="nav-icon" />
              )}
            >
              <CNavItem to="/lab/" component={NavLink}>
                Requested
              </CNavItem>
              <CNavItem to="/lab/completed" component={NavLink}>
                Completed
              </CNavItem>
            </CNavGroup>
          )}

          {currentUser.role?.name === "laboratorian" && (
            <CNavGroup
              idx="imaging"
              visible={location.pathname.startsWith("imaging")}
              toggler={navLink(
                "Imaging",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <GiUltrasound className="nav-icon" />
              )}
            >
              <CNavItem to="/imaging/" component={NavLink}>
                Requested
              </CNavItem>
              <CNavItem to="/imaging/completed" component={NavLink}>
                Completed
              </CNavItem>
            </CNavGroup>
          )}
          {(currentUser.role?.name === "doctor" ||
            currentUser.role?.name === "cashier") && (
            <CNavGroup
              idx="que"
              visible={location.pathname.startsWith("patientque")}
              toggler={navLink(
                "Assignments",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <MdAssignmentTurnedIn className="nav-icon" />
              )}
            >
              {currentUser.role?.name === "cashier" && (
                <CNavItem to="/patientque/addtoque" component={NavLink}>
                  Assign to ODP
                </CNavItem>
              )}

              <CNavItem to="/patientque/list" component={Link}>
                Assigned list
              </CNavItem>
            </CNavGroup>
          )}
          {currentUser.role === "cashier" && (
            <CNavGroup
              idx="billing"
              visible={location.pathname.startsWith("billings")}
              toggler={navLink(
                "Billing",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <MdOutlineMoneyOffCsred className="nav-icon" />
              )}
            >
              <CNavItem to="/billings/list" component={NavLink}>
                Invoices
              </CNavItem>

              {/* <CNavItem to="/billings/prices" component={NavLink}>
                Prices
              </CNavItem> */}
            </CNavGroup>
          )}
          {currentUser.role === "admin" && (
            <CNavGroup
              idx="administrations"
              visible={location.pathname.startsWith("administrations")}
              toggler={navLink(
                "Administration",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <MdAdminPanelSettings className="nav-icon" />
              )}
            >
              {" "}
              <CNavItem to="/administrations/services" component={NavLink}>
                Clinic Services
              </CNavItem>
              <CNavItem to="/administrations/user/userlist" component={NavLink}>
                Users
              </CNavItem>
              <CNavItem
                to="/administrations/setting/viewclinicinfo"
                component={NavLink}
              >
                Clinic Setting
              </CNavItem>
            </CNavGroup>
          )}
          {currentUser.role === "admin" && (
            <CNavItem to="/report/billreport" component={NavLink}>
              <TbReportAnalytics className="nav-icon" />
              Report
            </CNavItem>
          )}
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

const SidebarComponent = React.memo(Sidebar);

export default SidebarComponent;