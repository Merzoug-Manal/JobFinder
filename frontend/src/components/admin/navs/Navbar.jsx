import React from 'react'
import "./navbar.scss"
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../state/auth_slice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  let userSession = JSON.parse(localStorage.getItem("USER"));

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

  return (
    <div className='navbar'>
       <div className="wrapper">
        <div className="search">
        
        </div>
        <div className="items">
       
        
        
          <div className="item">
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
              <Menu sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              > 
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          </div>

        </div>
       </div>
    </div>
  )
}

export default Navbar