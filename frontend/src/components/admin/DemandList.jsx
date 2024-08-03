import React, { useState, useEffect } from "react";
import Sidebar from "./navs/sidebar";
import Navbar from "./navs/Navbar";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Chip from "@mui/material/Chip";
import DeleteIcon from '@mui/icons-material/Delete';

import InfoIcon from '@mui/icons-material/Info';
import "./css/home.scss"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DemandList = () => {
  
  const token = localStorage.getItem("token");
    
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openDel, setOpendel] = React.useState(false);
    const [openActiv, setOpenActiv] = React.useState(false);
    const [activeUser, setActiveUser] = React.useState(false);

    
    const handleOpenDialog = (id) => {
      setSelectedUserId(id);
      setOpendel(true);
    };
    const activateDialog = (id,actU) => {
          setSelectedUserId(id);
          setActiveUser(actU);
          setOpenActiv(true);
        }
        const closeActivateDialog = (id) => {
          setSelectedUserId(id);
          setOpenActiv(true);
        }
      
        // Function to close the dialog
        const handleCloseDialog = () => {
          setSelectedUserId(null);
          setOpendel(false);
        };
      
      
        const getStatusColor = (active) => {
          return active === "true" ? "success" : "error";
        };
      
      
        useEffect(()=>{
          fetchUsers();
        }, [])
      
        const fetchUsers = async () => {
          const url = "http://127.0.0.1:5000/api/getAll";
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              role: "Demandeur",
            },
          };
      
          axios.get(url, config).then((response) => {
              setUsers(response.data.users);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
            })
          }
      
      
      
        const handleDeleteUser = async (selectedUserId) => {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              active: "true",
            }, }
          axios.delete(`http://127.0.0.1:5000/api/deleteOne/${selectedUserId}`, config)
          .then((response) => {
            fetchUsers();
            handleCloseDialog();
            toast.success('Deletion successful!', {
              position: toast.POSITION.TOP_RIGHT
            });
          }).catch((error) => {
            console.error(error);
          });
        }
      
        const handleActivUser = async (selectedUserId,Uactive) => {
          const param = Uactive ? "false" : "true";
      
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              active: param,
            }
           }
           console.log("pram"+param);
          await axios.put(`http://127.0.0.1:5000/api/disableaccount/${selectedUserId}`, config)
          .then((response) => {
            console.log(response);
            fetchUsers();
            handleCloseDialog();
          }).catch((error) => {
            console.error(error);
          });
        }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
        <div>
      <ToastContainer />
    </div>
            <div className="listTitle"> Applicants List</div>
         <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <TailSpin
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      align="center"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.nom}</TableCell>
                    <TableCell align="right">{user.prenom}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                      <Chip
                        variant="outlined"
                        label={
                          user.active.toString() === "true"
                            ? "Active"
                            : "Inactive"
                        }
                        color={getStatusColor(user.active.toString())}
                      />
                    </TableCell>
                    <TableCell align="right">
                        {/* <PersonOffIcon onClick={() => activateDialog(user.id,user.active)} sx={{ color: "grey" }} /> */}
                        <DeleteIcon
                          onClick={() => handleOpenDialog(user.id)}
                          sx={{ color: "grey" }}
                        />
                       
                      </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
            open={openDel}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title">
              {"Deletion confirm"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this user {selectedUserId} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
              <Button color="error" variant="outlined" onClick= {() => handleDeleteUser(selectedUserId)} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openActiv}
            onClose={closeActivateDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
           <DialogTitle id="alert-dialog-title">
              {"activate user"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to activate this user {selectedUserId} ? </DialogContentText>            </DialogContent>
            <DialogActions>
              <Button  variant="outlined">Cancel</Button>
              <Button color="error" variant="outlined"
              onClick= {() => handleActivUser(selectedUserId,activeUser)}
               autoFocus>
                Activate
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      </div>
  );
};

export default DemandList