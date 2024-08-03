import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../../Navbar";
import axios from "axios";
import JobsList from "./JobsList";
import Secteur from "./Secteur";
import Wilayas from "./Wilayas";
import TypeContrat from "./TypeContrat";
import etudesList from "./etudesList";
import nivExperience from "./nivExperience";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./addOffer.css";

const AddOffer = () => {
  const userRef = useRef();
  const errRef = useRef();

  let navigate = useNavigate();

  const [typeContrat, setTypeContrat] = useState("");
  const [validContrat, setValidContrat] = useState(false);

  const [lieuTravail, setLieuTravail] = useState("");
  const [validLieu, setValidLieu] = useState(false);

  const [secteurActivite, setSecteur] = useState("");
  const [validSecteur, setValidSecteur] = useState(false);

  const [dateExpiration, setDateExpiration] = useState("");
  const [validExpiration, setValidExpiration] = useState(false);

  const [nombrePostes, setNombrePostes] = useState("");
  const [validNombrePostes, setValidNombrePostes] = useState(false);

  const [poste, setPoste] = useState("");
  const [validPoste, setValidPoste] = useState(false);

  const [niveauEtude, setNiveauEtude] = useState("");
  const [validNiveauEtude, setValidNiveauEtude] = useState(false);

  const [minExperience, setExperience] = useState("");
  const [validExperience, setValidExperience] = useState(false);

  const [taches, setTaches] = useState("");
  const [validTaches, setValidTaches] = useState(false);

  useEffect(() => {
    if (typeContrat !== "") {
      setValidContrat(typeContrat);
    }
  }, [typeContrat]);

  useEffect(() => {
    if (minExperience !== "") {
      setValidExperience(minExperience);
    }
  }, [minExperience]);

  useEffect(() => {
    if (dateExpiration !== "") {
      setValidExpiration(dateExpiration);
    }
  }, [dateExpiration]);

  useEffect(() => {
    if (lieuTravail !== "") {
      setValidLieu(lieuTravail);
    }
  }, [lieuTravail]);

  useEffect(() => {
    if (niveauEtude !== "") {
      setValidNiveauEtude(niveauEtude);
    }
  }, [niveauEtude]);

  useEffect(() => {
    if (nombrePostes !== "") {
      setValidNombrePostes(nombrePostes);
    }
  }, [nombrePostes]);

  useEffect(() => {
    if (poste !== "") {
      setValidPoste(poste);
    }
  }, [poste]);

  useEffect(() => {
    if (secteurActivite !== "") {
      setValidSecteur(secteurActivite);
    }
  }, [secteurActivite]);

  useEffect(() => {
    if (taches !== "") {
      setValidTaches(taches);
    }
  }, [taches]);

  const [errMsg, setErrMsg] = useState("");


  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("USER"));
      const email = user.email;

      const response = await axios.get(
        `http://127.0.0.1:8080/api/employeur/getByEmail/${email}`
      );
      const userId = response.data.body.idEmployeur;

      return userId; // Return the user data from the function
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = validContrat;
    const v2 = validExperience;
    const v3 = validExpiration;
    const v4 = validLieu;
    const v5 = validNiveauEtude;
    const v6 = validNombrePostes;
    const v7 = validPoste;
    const v8 = validSecteur;
    const v9 = validTaches;

    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7 || !v8 || !v9) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const emploId = await getUserId();
      console.log(emploId);
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); 

      const JobData = {
        poste,
        lieuTravail,
        dateCreation: formattedDate,
        dateExpiration,
        secteurActivite,
        nombrePostes,
        typeContrat,
        niveauEtude,
        minExperience,
        taches,
      };

      const response = await axios.post(
        `http://127.0.0.1:8080/api/employeur/createOffre/${emploId}`,
        JobData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/Employeur/MyJobOffers");
      toast.success("Creation successful!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.log(err.response);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Error 400");
      } else {
        setErrMsg("Failed creating job offer");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="main-content">
         <ToastContainer />
      <div>
     
      </div>
      <div className="auth-form">
        <h1>Add a job Offer</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="select">
            <select
              name="job"
              id="jobposition"
              onChange={(e) => setPoste(e.target.value)}
              required
              aria-invalid={validPoste ? "false" : "true"}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Job position
              </option>
              {JobsList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faCheck}
              className={validPoste ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPoste || !poste ? "hide" : "invalid"}
            />
          </div>
          <div className="select">
            <select
              name="secteur"
              id="secteur"
              onChange={(e) => setSecteur(e.target.value)}
              required
              aria-invalid={validSecteur ? "false" : "true"}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Job Sector
              </option>
              {Secteur.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faCheck}
              className={validSecteur ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validSecteur || !secteurActivite ? "hide" : "invalid"}
            />
          </div>
          <div className="select">
            <select
              name="wilaya"
              id="wilaya"
              onChange={(e) => setLieuTravail(e.target.value)}
              required
              aria-invalid={validLieu ? "false" : "true"}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Lieu du travail
              </option>
              {Wilayas.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faCheck}
              className={validLieu ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validLieu || !lieuTravail ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => setDateExpiration(e.target.value)}
              type="date"
              placeholder="Date d'expiration"
              id="expiration"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validExpiration ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validExpiration || !dateExpiration ? "hide" : "invalid"
              }
            />
          </div>

          <div>
            <input
              className="input"
              type="number"
              onChange={(e) => setNombrePostes(e.target.value)}
              required
              id="nombrePoste"
              name="nombrePoste"
              placeholder="Nombre de Poste"
              aria-invalid={validNombrePostes ? "false" : "true"}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validNombrePostes ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validNombrePostes || !nombrePostes ? "hide" : "invalid"
              }
            />
          </div>
          <div className="select">
            <select
              name="typeContrat"
              id="typeContrat"
              onChange={(e) => setTypeContrat(e.target.value)}
              required
              aria-invalid={validContrat ? "false" : "true"}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Type Contrat
              </option>
              {TypeContrat.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faCheck}
              className={validContrat ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validContrat || !typeContrat ? "hide" : "invalid"}
            />
          </div>
          <div className="select">
            <select
              name="etude"
              id="etude"
              onChange={(e) => setNiveauEtude(e.target.value)}
              required
              aria-invalid={validNiveauEtude ? "false" : "true"}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Niveau d'études
              </option>
              {etudesList.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faCheck}
              className={validNiveauEtude ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validNiveauEtude || !niveauEtude ? "hide" : "invalid"}
            />
          </div>
          <div className="select">
            <select
              name="experience"
              id="experience"
              onChange={(e) => setExperience(e.target.value)}
              required
              aria-invalid={validExperience ? "false" : "true"}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Minimum experience
              </option>
              {nivExperience.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faCheck}
              className={validExperience ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validExperience || !minExperience ? "hide" : "invalid"}
            />
          </div>
          <div>
            <textarea
              className="input"
              name="taches"
              id="taches"
              cols="30"
              rows="20"
              onChange={(e) => setTaches(e.target.value)}
              required
              aria-invalid={validTaches ? "false" : "true"}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validTaches ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validTaches || !taches ? "hide" : "invalid"}
            />
          </div>
          <button
            className="btn"
            disabled={
              !validContrat ||
              !validExperience ||
              !validExpiration ||
              !validLieu ||
              !validNiveauEtude ||
              !validNombrePostes ||
              !validPoste ||
              !validSecteur ||
              !validTaches
            }
          >
            Add job offer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
