import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import JobsList from "../AddOffer/JobsList";
import Secteur from "../AddOffer/Secteur";
import Wilayas from "../AddOffer/Wilayas";
import TypeContrat from "../AddOffer/TypeContrat";
import etudesList from "../AddOffer/etudesList";
import nivExperience from "../AddOffer/nivExperience";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../AddOffer/addOffer.css";

const UpdateForm = ({ idOffer, handleCloseDialog }) => {
  const errRef = useRef();
  

  const [typeContrat, setTypeContrat] = useState("");
  const [lieuTravail, setLieuTravail] = useState("");
  const [secteurActivite, setSecteur] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");
  const [nombrePostes, setNombrePostes] = useState("");
  const [poste, setPoste] = useState("");
  const [niveauEtude, setNiveauEtude] = useState("");
  const [minExperience, setExperience] = useState("");
  const [taches, setTaches] = useState("");
  const [errMsg, setErrMsg] = useState("");



  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/employeur/OffreById/${idOffer}`
        );
        const itemData = response.data.body;

        console.log(itemData);
        setPoste(itemData.poste);
        setSecteur(itemData.secteurActivite);
        setLieuTravail(itemData.lieuTravail);
        setDateExpiration(itemData.dateExpiration);
        setNombrePostes(itemData.nombrePostes);
        setTypeContrat(itemData.typeContrat);
        setNiveauEtude(itemData.niveauEtude);
        setExperience(itemData.minExperience);
        setTaches(itemData.taches);
      } catch (err) {
        console.log(err);
        setErrMsg("Failed to fetch item data");
      }
    };

    fetchItemData();
  }, [idOffer]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const JobData = {
        poste,
        lieuTravail,
        dateExpiration,
        secteurActivite,
        nombrePostes,
        typeContrat,
        niveauEtude,
        minExperience,
        taches,
      };

      const response = await axios.put(
        `http://127.0.0.1:8080/api/employeur/updateOffre/${idOffer}`,
        JobData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      handleCloseDialog();
      window.location.reload();
    } catch (err) {
      console.log(err.response);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Error 400");
      } else {
        setErrMsg("Failed updating job offer");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="auth-form updateForm">
      <ToastContainer />
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
            value={poste}
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
        </div>
        <div className="select">
          <select
            name="secteur"
            id="secteur"
            onChange={(e) => setSecteur(e.target.value)}
            value={secteurActivite}
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
        </div>
        <div className="select">
          <select
            name="wilaya"
            id="wilaya"
            onChange={(e) => setLieuTravail(e.target.value)}
            value={lieuTravail}
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
        </div>
        <div>
          <input
            className="input"
            onChange={(e) => setDateExpiration(e.target.value)}
            value={new Date(dateExpiration).toLocaleDateString()}
            type="date"
            placeholder="Date d'expiration"
            id="expiration"
          />
        </div>
        <div>
          <input
            className="input"
            type="number"
            onChange={(e) => setNombrePostes(e.target.value)}
            value={nombrePostes}
            id="nombrePoste"
            name="nombrePoste"
            placeholder="Nombre de Poste"
          />
        </div>
        <div className="select">
          <select
            name="typeContrat"
            id="typeContrat"
            onChange={(e) => setTypeContrat(e.target.value)}
            value={typeContrat}
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
        </div>
        <div className="select">
          <select
            name="etude"
            id="etude"
            onChange={(e) => setNiveauEtude(e.target.value)}
            value={niveauEtude}
          >
            <option value="DEFAULT" disabled>
              Niveau d'études
            </option>
            {etudesList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="select">
          <select
            name="experience"
            id="experience"
            onChange={(e) => setExperience(e.target.value)}
            required
            value={nivExperience}
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
        </div>
        <div>
          <textarea
            className="input"
            name="taches"
            id="taches"
            cols="30"
            rows="10"
            onChange={(e) => setTaches(e.target.value)}
            value={taches}
          />
        </div>
        <button className="btn" type="submit">
         Edit
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
