import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "../Employeur/JobOffers/jobInfos/JobInfo.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import dollar from "../../assets/dollar.png";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { useParams } from "react-router-dom";


const JobInfo = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
 

    const removeHyphens = (value) => {
    return value.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
  };


  useEffect(() => {
    // Fetch job details using Axios when the component mounts
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/employeur/OffreById/${jobId}`
        );

      const post = removeHyphens(response.data.body.poste);
      const formattedValue = removeHyphens(response.data.body.minExperience);
      const updatedJobDetails = { ...response.data.body, minExperience: formattedValue, poste: post };
      setJobDetails(updatedJobDetails);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }


  return (
    <div className="home-container">
      <Navbar />
      <div className="job-info-wrapper">
        <div className="job-info info">
          <div className="info-boxes-container">
            <img src={dollar} alt="" />
            <h2 style={{ display: "flex", alignItems: "center" }}>
              {jobDetails.poste}{" "}
            </h2>
          </div>

          <h4>{jobDetails.employeur.entreprise} </h4>
          <div className="JobInfocard">
            <div className="column">
              <p>
                <FmdGoodIcon />
                {jobDetails.lieuTravail}
              </p>
            </div>
            <div className="column">
              <Stack direction="row" spacing={3}>
                <Chip
                  label={`${jobDetails.nombrePostes} postes`}
                  color="primary"
                  style={{ backgroundColor: "#4fc3f7" }}
                />
                <Chip
                  label={`${jobDetails.minExperience}`}
                  color="secondary"
                  style={{ backgroundColor: "#ff8a80" }}
                />
                <Chip
                  label={`${jobDetails.niveauEtude}`}
                  color="secondary"
                  style={{ backgroundColor: "#b39ddb" }}
                />
              </Stack>
            </div>
          </div>

          <div className="line-horizontal"></div>
          <div className="JobInfocard">
            <div className="job-info-bottom">
              <p>
                <span className="info-label">Date d'expiration:</span>{" "}
                <span className="info-value">
                  {" "}
                  {new Date(jobDetails.dateExpiration).toLocaleDateString()}
                </span>
              </p>
              <p>
                <span className="info-label">Secteur Activite:</span>{" "}
                <span className="info-value">{jobDetails.secteurActivite}</span>
              </p>
              <p>
                <span className="info-label">Experience minimum:</span>{" "}
                <span className="info-value"> {jobDetails.minExperience}</span>
              </p>
            </div>

            <div className="job-info-bottom">
              <p>
                <span className="info-label">Type de contrat:</span>{" "}
                <span className="info-value">{jobDetails.typeContrat} </span>
              </p>
              <p>
                <span className="info-label">Niveau d'études : </span>{" "}
                <span className="info-value">{jobDetails.niveauEtude} </span>
              </p>
            </div>
          </div>

          <div className="line-horizontal"></div>

          <div className="job-info-bottom">
            <h3>Description</h3>
            <p>{jobDetails.taches}</p>
          </div>
        </div>

        <div className="job-info info-employer">
          <h2>Employer</h2>
          <p>
            <span className="info-label">Job position:</span>{" "}
            <span className="info-value">
              {jobDetails.employeur.functionEntreprise}{" "}
            </span>
          </p>
          <p>
            <span className="info-label">Nom:</span>{" "}
            <span className="info-value">{jobDetails.employeur.nom} </span>
          </p>
          <p>
            <span className="info-label">Prenom:</span>{" "}
            <span className="info-value">{jobDetails.employeur.prenom} </span>
          </p>
          <p>
            <span className="info-label">Email:</span>{" "}
            <span className="info-value">{jobDetails.employeur.email} </span>
          </p>
          <p>
            <span className="info-label">Phone:</span>{" "}
            <span className="info-value">{jobDetails.employeur.phone} </span>
          </p>
        </div>

    </div>
    </div>
  );
};

export default JobInfo
