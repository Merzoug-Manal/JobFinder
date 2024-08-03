import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";
import dollar from "../../../../../assets/dollar.png";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import InfoIcon from '@mui/icons-material/Info';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ apiURL }) => {

  const [OffreEmploi, setOffreEmploi] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const [openDel, setOpendel] = React.useState(false);
  const [selectedJobOffer, setSelectedJobOffer] = useState(null);
  let userSession = JSON.parse(localStorage.getItem("USER"));

  const handleOpenDialog = (jobId) => {
    setSelectedJobOffer(jobId);

    setOpendel(true);
  };

  const handleCloseDialog = () => {
    setSelectedJobOffer(null);
    setOpendel(false);
  };

  useEffect(() => {
    fetchjobOffers();
  }, [apiURL]);


  const removeHyphens = (value) => {
    return value.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
  };
  
  const fetchjobOffers = async () => {
    axios
      .get(apiURL)
      .then((response) => {
        setOffreEmploi(response.data.body);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteOffer = async (jobId) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/api/employeur/OffreById/${jobId}`);
      fetchjobOffers();
      handleCloseDialog();
      toast.success('Deletion successful!', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      console.error(error);
      toast.error('Deletion failed!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };


  const handleItemClick = (jobId) => {
    navigate(`/InfoOffer/${jobId}`);
  };

  return (
    

    <div className="job-section-bottom">
      
      <ToastContainer />

      {loading ? (
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
      ) : (
        OffreEmploi.sort((a, b) => b.idOffre - a.idOffre)
        .map((data) => {
          const posteWithoutHyphens = removeHyphens(data.poste);
          return (
          <div className="job-section-info" key={data.idOffre}>
            <div className="info-boxes-container">
              <img src={dollar} alt="" />
              <h2>{posteWithoutHyphens}</h2>
            </div>
            <p>{data.employeur.entreprise}</p>
            <div className="info-boxes-details">
              <div>
                <FmdGoodIcon />
                {data.lieuTravail}
              </div>
              <div className="line"></div>
              <div className="date">
                {new Date(data.dateExpiration).toLocaleDateString()}
              </div>
            </div>
            <div className="card-btns">
              
              {userSession.role === "Employeur" && (
                <DeleteIcon
                  onClick={() => handleOpenDialog(data.idOffre)}
                  sx={{ color: "grey" }}
                />
              )}
              <InfoIcon
                onClick={() => handleItemClick(data.idOffre)}
                sx={{ color: "grey" }}
              />
            </div>
          </div>
          )
})
      )}

      <Dialog
        open={openDel}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deletion confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this job offer {selectedJobOffer} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleDeleteOffer(selectedJobOffer)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Card;
