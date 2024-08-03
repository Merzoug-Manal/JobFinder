import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from '@mui/icons-material/Business';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
//import { DarkModeContext } from "../../context/darkModeContext";
//import { useContext } from "react";

const Sidebar = () => {
//   const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">JobFinder</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to="/Statistics" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Statistics</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/AdminsList" style={{ textDecoration: "none" }}>
            <li>
              <PeopleIcon className="icon" />
              <span>Sub Administrator</span>
            </li>
          </Link>
          <Link to="/DemandeursList" style={{ textDecoration: "none" }}>
            <li>
              <ContactPageIcon className="icon" />
              <span>Applicants</span>
            </li>
          </Link>
          <Link to="/Employerslist" style={{ textDecoration: "none" }}>
            <li>
              <BusinessIcon className="icon" />
                <span>Employers</span>{" "}     
            </li>
          </Link>
          <Link to="/Admin/OffersList" style={{ textDecoration: "none" }}>
          <li>
            <WorkIcon className="icon" />
            <span>Job offers</span>
          </li>
          </Link>
        
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;