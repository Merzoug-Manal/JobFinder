import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { BsPencilFill } from "react-icons/bs";
import { Dialog } from "@mui/material";
import "./ProfileEmployer.css";
import { BiMap } from "react-icons/bi";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Navbar from "../Navbar";

function ProfileEmployer() {
  const [infos, setInfos] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(null);
  const inputFileRef = useRef(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

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

  const getInfos = async () => {
    const emplId = await getUserId();
    const { data } = await axios.get(
      `http://127.0.0.1:8080/api/employeur/getById/${emplId}`
    );
    setInfos(data.body);
  };

  useEffect(() => {
    getInfos();
  }, []);

  const handleClickOpenUpdate = () => {
    setUpdateProfile({
      nom: infos.nom,
      prenom: infos.prenom,
      wilaya: infos.wilaya,
      adresse: infos.adresse,
      phone: infos.phone,
      email: infos.email,
      entreprise: infos.entreprise,
      functionEntreprise: infos.functionEntreprise,
    });
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const editProfile = async (e) => {
    const demandId = await getUserId();
    e.preventDefault();
    const data = {
      nom: updateProfile.nom,
      prenom: updateProfile.prenom,
      wilaya: updateProfile.prenom,
      adresse: updateProfile.adresse,
      phone: updateProfile.phone,
      email: updateProfile.email,
      entreprise: updateProfile.entreprise,
      functionEntreprise: updateProfile.functionEntreprise,
    };
    axios
      .put(`http://127.0.0.1:8080/api/employeur/update-infos/${demandId}`, data)
      .then((response) => {
        handleCloseUpdate();
        localStorage.setItem("USER", JSON.stringify(data));
        getInfos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {" "}
      <Navbar />
      <div className="profile-employer">
        {infos && (
          <h4
            style={{
              paddingTop: "60px",
              color: "#100D40",
              fontSize: "30px",
              textAlign: "center",
              fontSize: "40px",
            }}
          >
            {infos.nom} {infos.prenom}{" "}
          </h4>
        )}
        <br />
        <br />
        <br />

        <div style={{ display: "flex", marginLeft: "25px" }}>
          {infos && (
            <h4
              style={{
                color: "#79787a",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              <BiMap
                style={{
                  color: "#79787a",
                  fontSize: "20px",
                  marginRight: "1px",
                }}
              />
              {infos.wilaya}{" "}
            </h4>
          )}
        </div>
        <br />

        <div style={{ display: "flex", marginLeft: "25px" }}>
          {infos && (
            <h4
              style={{
                color: "#79787a",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              <BiMap
                style={{
                  color: "#79787a",
                  fontSize: "20px",
                  marginRight: "1px",
                }}
              />
              {infos.adresse}{" "}
            </h4>
          )}
        </div>
        <br />

        <div style={{ display: "flex", marginLeft: "25px" }}>
          {infos && (
            <h4
              style={{
                color: "#79787a",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              <BsTelephoneInboundFill
                style={{
                  color: "#79787a",
                  fontSize: "20px",
                  marginRight: "6px",
                }}
              />
              {infos.phone}{" "}
            </h4>
          )}
        </div>
        <br />

        <div style={{ display: "flex", marginLeft: "25px" }}>
          {infos && (
            <h4
              style={{
                color: "#79787a",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              <MdEmail
                style={{
                  color: "#79787a",
                  fontSize: "20px",
                  marginRight: "6px",
                }}
              />
              {infos.email}{" "}
            </h4>
          )}
        </div>

        <div
          className="EditEmployer"
          onClick={handleClickOpenUpdate}
         
        >
          Edit
        </div>

        <div className="entreprise">
          <h2
            className="titleProfile"
            style={{
              color: "white",
              display: "flex",
              marginLeft: "25px",
              marginTop: "15px",
              fontSize: "29px",
            }}
          >
            Company
          </h2>
          {infos && (
            <p
              style={{
                color: "white",
                fontSize: "20px",
                marginLeft: "100px",
                marginTop: "10px",
              }}
            >
              {infos.entreprise}{" "}
            </p>
          )}
          <h3
            style={{
              color: "white",
              display: "flex",
              marginLeft: "23px",
              marginTop: "15px",
              fontSize: "25px",
            }}
          >
            Who are we?
          </h3>
          <br />
          <div style={{ display: "flex", marginLeft: "25px" }}>
            {infos && (
              <p
                style={{
                  color: "white",
                  fontSize: "20px",
                  marginLeft: "100px",
                  marginTop: "10px",
                }}
              >
                {infos.functionEntreprise}{" "}
              </p>
            )}
          </div>
        </div>

        <Dialog open={openUpdate} onClose={handleCloseUpdate}>
          <form onSubmit={editProfile}>
            <DialogContent>
              <h2 className="titleProfile">
                {" "}
                &nbsp; &nbsp; Update your informations
              </h2>
              <div className="signup-form">
                <input className="profileInput"
                  type="text"
                  id="text"
                  name="nom"
                  placeholder="First name"
                  value={updateProfile?.nom || ""}
                  onChange={(e) =>
                    setUpdateProfile({ ...updateProfile, nom: e.target.value })
                  }
                ></input>
                <br />

                <input className="profileInput"
                  type="text"
                  id="prenom"
                  name="prenom"
                  placeholder="Last name"
                  value={updateProfile?.prenom || ""}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      prenom: e.target.value,
                    })
                  }
                ></input>
                <br />

                <input className="profileInput"
                  type="text"
                  id="wilaya"
                  name="wilaya"
                  placeholder="Wilaya"
                  value={updateProfile?.wilaya || ""}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      wilaya: e.target.value,
                    })
                  }
                ></input>
                <br />

                <input className="profileInput"
                  type="text"
                  id="adresse"
                  name="adresse"
                  placeholder="Address"
                  value={updateProfile?.adresse || ""}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      adresse: e.target.value,
                    })
                  }
                ></input>
                <br />

                <input className="profileInput"
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={updateProfile?.phone || ""}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      phone: e.target.value,
                    })
                  }
                ></input>
                <br />

                <input className="profileInput"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={updateProfile?.email || ""}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      email: e.target.value,
                    })
                  }
                ></input>
                <br />

                <input className="profileInput"
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Name Company"
                  value={updateProfile?.entreprise || ""}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      entreprise: e.target.value,
                    })
                  }
                ></input>
                <br />

                <input className="profileInput"
                  type="text"
                  id="CompanyFunction "
                  name="CompanyFunction "
                  placeholder=" Company Function "
                  value={updateProfile?.functionEntreprise || ""}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      functionEntreprise: e.target.value,
                    })
                  }
                ></input>
                <br />
                <DialogActions>
                  <button
                    onClick={handleCloseUpdate}
                    className="cancel-btn"
                    style={{ top: " 730px", marginRight: "110px" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="save-btn"
                    style={{ top: " 730px", marginRight: "30px" }}
                  >
                    Save
                  </button>
                </DialogActions>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
}

export default ProfileEmployer;
