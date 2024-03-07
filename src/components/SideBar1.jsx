import React from "react";
import { FaKitMedical } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdSpaceDashboard,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import SimpleBar from "simplebar-react";

const SideBar1 = ({ showHandler, isVisibile }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const [subnav, setSubNav] = useState(null);
  const handleSubNavChange = (item) => {
    console.log(item);
    if (window.innerWidth < 768 && !item) showHandler(false);
    if (subnav) {
      setSubNav(null);
    } else {
      setSubNav(item);
    }
  };
  const SideBarData = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdSpaceDashboard size={20} />,
      iconOpen: <MdOutlineKeyboardArrowDown size={25} />,
      iconClose: <MdOutlineKeyboardArrowUp />,
      previlage: ["admin", "laboratorian", "cashier", "doctor"],
    },
    {
      title: "Patients",
      path: "/patients",
      icon: <FaKitMedical size={20} />,
      iconOpen: <MdOutlineKeyboardArrowDown size={20} />,
      iconClose: <MdOutlineKeyboardArrowUp size={20} />,
      previlage: ["admin", "laboratorian", "cashier", "doctor"],
      subNavs: [
        {
          title: "Add Patients ",
          path: "/patients/newpatient",
          // icon: <FaKitMedical />,
          previlage: ["cashier"],
        },
        {
          title: "Patients",
          path: "/patients/patientlist",
          // icon: <FaKitMedical />,
          previlage: ["admin", "laboratorian", "cashier", "doctor"],
        },
      ],
    },
    {
      title: "Lab",
      path: "/lab",
      icon: <FaKitMedical size={20} />,
      iconOpen: <MdOutlineKeyboardArrowDown size={20} />,
      iconClose: <MdOutlineKeyboardArrowUp size={20} />,
      previlage: ["laboratorian"],
      subNavs: [
        {
          title: "Requested",
          path: "/lab",
          // icon: <FaKitMedical />,
          previlage: ["laboratorian"],
        },
        {
          title: "Completed",
          path: "/lab/completed",
          // icon: <FaKitMedical />,
          previlage: ["laboratorian"],
        },
      ],
    },
    {
      title: "Assignments",
      path: "/patients",
      icon: <FaKitMedical size={20} />,
      iconOpen: <MdOutlineKeyboardArrowDown size={20} />,
      iconClose: <MdOutlineKeyboardArrowUp size={20} />,
      subNavs: [
        {
          title: "Add Patients ",
          path: "/patients/newpatient",
          // icon: <FaKitMedical />,
        },
        {
          title: "Patients",
          path: "/patients/patientlist",
          // icon: <FaKitMedical />,
        },
      ],
    },
  ];
  return (
    <div
      className="sidebar_container p-2"
      style={{
        width: "16rem",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: isVisibile ? "block" : "none",
        // display: showSideBar,
        transition: "0.05s",
        zIndex: 1000,
        backgroundColor: "white",
      }}
    >
      <div
        style={{ height: 60, backgroundColor: "#f3f4f7" }}
        className="d-none d-md-flex justify-content-center align-items-center"
        to="/"
      >
        Dr Subi Medium Clinic
      </div>
      <SimpleBar>
        <NavLink to="/" className="" component={NavLink}>
          <div className="d-flex align-items-center gap-2">
            <MdSpaceDashboard />
            Dashboard
          </div>{" "}
        </NavLink>
        {SideBarData.map(
          (item, index) =>
            item?.previlage?.some((t) => t === currentUser.role) && (
              <NavLink
                key={index}
                to={item.path}
                /*               onClick={() =>
                item.subNavs
                  ? handleSubNavChange(item)
                  : handleSubNavChange(null)
              } */
                className="sidebarNavGroup"
              >
                <div
                  className="d-flex align-items-center gap-2 px-4 py-3 sidebarNavGroup "
                  onClick={() =>
                    item.subNavs
                      ? handleSubNavChange(item)
                      : handleSubNavChange(null)
                  }
                >
                  {item.icon}
                  {item.title}
                  <div key={index + 1 * 10} className="ms-auto">
                    {item.subNavs && subnav?.title === item.title
                      ? item.iconOpen
                      : item.subNavs
                      ? item.iconClose
                      : null}
                  </div>
                </div>

                {subnav &&
                  item.title === subnav?.title &&
                  item?.subNavs?.map(
                    (item) =>
                      item?.previlage?.some((t) => t === currentUser.role) && (
                        <Link
                          key={item.title}
                          to={item.path}
                          onClick={() => {
                            if (window.innerWidth < 768) showHandler(false);
                          }}
                          className=""
                        >
                          <div className="d-flex align-items-center ps-5 p-2 gap-2 sidebarNavItem">
                            {item.title}
                          </div>
                        </Link>
                      )
                  )}
              </NavLink>
            )
        )}
      </SimpleBar>
    </div>
  );
};

export default SideBar1;
