import React, { useState,useEffect } from "react";
import logomini from "../assets/logo-mini.png";
import jobFinder from "../assets/logo_name.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  Box,
  ListItemText,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkIcon from "@mui/icons-material/Work";
import List from "@mui/material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./state/auth_slice";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { enableRipple } from "@syncfusion/ej2-base";

enableRipple(true);
const ht = 60;
const wd = 100;

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);


  let userSession = JSON.parse(localStorage.getItem("USER"));

  useEffect(() => {
  if (userSession) {
    dispatch(actions.setLogin(true));
  } else {
    dispatch(actions.setLogin(false));
  }
 }, [userSession]);

  const isLogged = useSelector((state) => state.isLogged);
  const logoutHandler = () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("token");
    dispatch(actions.setLogin(false));
    console.log("Logged out successfully !");
    navigate("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    if (userSession.role === "Demandeur") {
      navigate('/profileDemandeur');
    } else if (userSession.role === "Employeur") {
      navigate('/ProfileEmployer');
    }}

  const menuOptions = [
    {
      id: 0,
      text: "Home",
      icon: HomeIcon,
      to: "/",
    },
    {
      id: 1,
      text: "Browse Jobs",
      icon: WorkIcon,
      to: "/jobs",
    },
    {
      id: 2,
      text: "Applications",
      icon: ApartmentIcon,
      to: "/applications",
    },
    {
      id: 3,
      text: "About us",
      icon: PostAddIcon,
      to: "/about",
    },
  ];

  return (
    <nav>
      <div className="container">
        <div className="nav-logo-container">
          <img src={jobFinder} className="logo" alt="" height="50" width="60" />
        </div>
        <div className="navbar-links-container">
          <Link to="/">Home</Link>

          {!isLogged ? (
            <>
              <Link to="/">About Us</Link>
              <Link to="/">Contact Us</Link>
            </>
          ) : null}

          {isLogged ? <Link to="/JobOffers">Browse Jobs</Link> : null}

          {isLogged && userSession.role === "Employeur" ? (
            <Link to="/addOffer">Add job Offer</Link>
          ) : (
            isLogged &&
            userSession.role === "Demandeur" && (
              <Link to="/MyApplications">My applications</Link>
            )
          )}

          {isLogged && userSession.role === "Employeur" && (
            <Link to="/Employeur/MyJobOffers">My job Offers</Link>
          )}

          {!isLogged ? (
            <button
              className="primary-button"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          ) : (
            <div className="profileNav">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <p>{userSession.nom}</p>
                <AccountCircle />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </div>

        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          anchor="right"
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item) => (
                <ListItem
                  key={item.id}
                  disablePadding
                  component={Link}
                  to={item.to}
                >
                  <ListItemButton>
                    <ListItemIcon> {<item.icon />} </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {!isLogged ? (
                <ListItem disablePadding component={Link} to="/login">
                  <ListItemButton>
                    <ListItemIcon>
                      {" "}
                      <PersonIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem disablePadding onClick={() => logoutHandler()}>
                  <ListItemButton>
                    <ListItemIcon>
                      {" "}
                      <LogoutIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
