import React, { useState, useEffect, useCallback } from "react";
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
import EditIcon from '@mui/icons-material/Edit';
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
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";


const OffersList = () => {
  

    let navigate = useNavigate();
    const [offers, setOffers] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedOfferId, setselectedOfferId] = useState(null);
    const [openDel, setOpendel] = React.useState(false);
   
    
    const handleOpenDialog = (id) => {
      setselectedOfferId(id);
      setOpendel(true);
    };

    const handleCloseDialog = () => {
      setselectedOfferId(null);
      setOpendel(false);
    };
  

 

    useEffect(()=>{
      fetchOffers();
    }, [])

    
    const fetchOffers = async () => {
      const url = "http://127.0.0.1:8080/api/employeur/Offres";
      axios
        .get(url)
        .then((response) => {
          setOffers(response.data.body);
          console.log(response.data.body);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleClick = (offerId) => {
      navigate(`/admin/applications/${offerId}`);
    };
    
    
   

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
        <div>
      <ToastContainer />
    </div>
        <div className="listTitle"> List Job offers</div>
         <TableContainer component={Paper} className="table">
         
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Poste</TableCell>
                <TableCell >Secteur</TableCell>
                <TableCell align="center">Nombre Postes</TableCell>
                <TableCell align="center">Employeur</TableCell>
                <TableCell align="center">Entreprise</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow></TableRow>
                <TableRow></TableRow>
                <TableRow></TableRow>
                
              {loading ? ( 
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <TailSpin
                      height="80"
                      width="80"
                      color="blue"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      align="center"
                    />
                  </TableCell>
                  <TableRow></TableRow>
                <TableRow></TableRow>
                <TableRow></TableRow>
               
                </TableRow>
              ) : (
                offers.sort((a, b) => b.idOffre - a.idOffre)
                .map((offer, i) => (
                  <TableRow key={i}>
                    <TableCell>{offer.idOffre}</TableCell>
                    <TableCell>{offer.poste}</TableCell>
                    <TableCell>{offer.secteurActivite}</TableCell>
                    <TableCell align="center">{offer.nombrePostes} Postes</TableCell>
                    <TableCell align="center">{offer.employeur.email}</TableCell>
                    <TableCell align="center">{offer.employeur.entreprise}</TableCell>
                    <TableCell align="center">
                      <GroupIcon 
                        onClick={() => handleClick(offer.idOffre)}
                      sx={{ color: 'grey' }}/>                 
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Dialog
            open={openDel}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title">
              {"Deletion confirm"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this offer {selectedOfferId} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
              <Button color="error" variant="outlined" onClick= {() => handleStatusOffer(selectedOfferId)} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog> */}
      </div>
      </div>
    </div>
  );
};
export default OffersList