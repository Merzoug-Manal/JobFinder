import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";
import dollar from "../../assets/dollar.png";
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
import Chip from "@mui/material/Chip";

const CardApp = ({ apiURL }) => {

  const [Application, setApplication] = useState([]);
  const [offreId, setOffreId] = useState([]);
  const [OffreEmploi, setOffreEmploi] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const [openDel, setOpendel] = React.useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  let userSession = JSON.parse(localStorage.getItem("USER"));


  const getStatusColor = (etat) => {
    switch (etat) {
      case "Accepted":
        return "success";
      case "Refused":
        return "error";
      case "Pending":
        return "warning";
      case "Not_enrolled":
        return "info";
      default:
        return "default";
    }
  };
  const formatLabel = (etat) => {
    if (etat === "Not_enrolled") {
      return "Not Enrolled";
    }
    return etat;
  };

  const handleOpenDialog = (appId) => {
    setSelectedApplication(appId);

    setOpendel(true);
  };

  const handleCloseDialog = () => {
    setSelectedApplication(null);
    setOpendel(false);
  };

  useEffect(() => {
    fetchApplications();
  }, [apiURL]);


  const removeHyphens = (value) => {
    return value.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(apiURL);
      const applications = response.data.body;
  
      // Extract an array of job offer IDs from the applications
      const offreIds = applications.map((application) => application.idOffreEmploi);
  
      // Fetch job offers for the extracted IDs
      const offreResponses = await Promise.all(
        offreIds.map((offreId) =>
          axios.get(`http://127.0.0.1:8080/api/employeur/OffreById/${offreId}`)
        )
      );
  
      // Extract the job offers from the responses
      const jobOffers = offreResponses.map((response) => response.data.body);
  
      // Combine the job offers with the applications
      const applicationsWithJobOffers = applications.map((application, index) => ({
        ...application,
        jobOffer: jobOffers[index],
      }));
  
      setApplication(applicationsWithJobOffers);
      console.log(applications[1]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteApplication = async (appId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/demandeEmploi/${appId}`);
      fetchApplications();
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


  const handleItemClick = (appId) => {
    navigate(`/InfoOfferDemandeur/${appId}`);
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
        Application?.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation))
        .map((data) => {
          const posteWithoutHyphens = removeHyphens(data.jobOffer.poste);
          return (
          <div className="job-section-info" key={data.idDemande}>
            <div className="info-boxes-container">
              <img src={dollar} alt="" />
              <h2>{posteWithoutHyphens}</h2>
            </div>
            <p>{data.jobOffer.secteurActivite}</p>
            <div className="info-boxes-details">
              <div>
                <FmdGoodIcon />
                {data.jobOffer.lieuTravail}
              </div>
              <div className="line"></div>
              <div className="date">
                {new Date(data.dateCreation).toLocaleDateString()}
              </div>
            </div>
            <div className="card-btns">  
            <Chip
                          variant="outlined"
                          label={formatLabel(data.etat)}
                          color={getStatusColor(data.etat)}
                        /> 
             
            { data.etat === "Not_enrolled" || data.etat === "Refused" ? (
               <DeleteIcon
               onClick={() => handleOpenDialog(data.idDemande)}
               sx={{ color: "grey" }}
             />
            ) : null }   
               
              <InfoIcon
                onClick={() => handleItemClick(data.idOffreEmploi
                  )}
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
            Are you sure you want to delete this job offer {selectedApplication} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleDeleteApplication(selectedApplication)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardApp;
