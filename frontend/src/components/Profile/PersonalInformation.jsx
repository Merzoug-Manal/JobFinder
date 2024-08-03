import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { BsPencilFill } from "react-icons/bs";
import { Dialog } from "@mui/material";
import "./ProfileDemandeur.css";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import img from "../../assets/profile.png";
import Button from "@mui/material/Button";

function PersonalInformation() {
  const [infos, setInfos] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(img);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(null);
  const [imageData, setImageData] = useState("");
  const inputFileRef = useRef(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  
  const getUserId = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("USER"));
      const email = user.email;

      const response = await axios.get(
        `http://127.0.0.1:8000/api/demandeur/getByEmail/${email}`
      );
      const userId = response.data.body.idDemandeur;

      return userId; // Return the user data from the function
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  };

  const getInfos = async () => {
    const demandId = await getUserId();
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/demandeur/getById/${demandId}`
    );
    setInfos(data.body);
  };

  useEffect(() => {
    getInfos();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setShowSaveButton(true);
      setSelectedPhoto(file);
      setProfilePhoto(URL.createObjectURL(file));
    }
  };
  

  const editProfile = async (e) => {
    const demandId = await getUserId();
    e.preventDefault();
    const data = {
      nom: updateProfile.nom,
      prenom: updateProfile.prenom,
      dateNaissance: updateProfile.dateNaissance,
      placeNaissance: updateProfile.placeNaissance,
      adresse: updateProfile.adresse,
      phone: updateProfile.phone,
      email: updateProfile.email,
    };
    axios
      .put(`http://127.0.0.1:8000/api/demandeur/update-infos/${demandId}`, data)
      .then((response) => {
        handleCloseUpdate();
        getInfos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpenUpdate = () => {
    setUpdateProfile({
      nom: infos.nom,
      prenom: infos.prenom,
      dateNaissance: infos.dateNaissance,
      placeNaissance: infos.placeNaissance,
      adresse: infos.adresse,
      phone: infos.phone,
      email: infos.email,
    });
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleSave = async () => {
    if (selectedPhoto) {
      const formData = new FormData();
      formData.append("file", selectedPhoto);
      const demandId = await getUserId();
      axios
        .post(
          `http://127.0.0.1:8000/api/demandeur/photoCV/${demandId}`,
          formData
        )
        .then(() => {
          console.log("Photo uploaded successfully");
          getPhoto();
          setShowSaveButton(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getPhoto = async () => {
    const demandId = await getUserId();
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/demandeur/getById/${demandId}`
      );
      const { data } = response;
      if (data.body.pathPhotoId) {
        const imageResponse = await axios.get(
          `http://127.0.0.1:8000/api/demandeur/get-photo/${data.body.pathPhotoId}`,
          {
            responseType: "arraybuffer", // Set the response type to 'arraybuffer' to handle binary data
          }
        );
        const imageBase64 = btoa(
          new Uint8Array(imageResponse.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImageData(
          `data:${imageResponse.headers["content-type"]};base64,${imageBase64}`
        );
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };
  

  useEffect(() => {
    getPhoto();
  }, []);

  const handleClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="information-personal">
      <div className="profile-photo-container">
        {imageData ? (
          <React.Fragment>
            <img
              src={imageData}
              alt="User Photo"
              className="profile-photo"
              onClick={handleClick}
            />
            {showSaveButton && (
              <button onClick={handleSave} className="save-button">
                Save
              </button>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img
              src={profilePhoto}
              alt="Profile"
              className="profile-photo"
              onClick={handleClick}
            />
            {selectedPhoto && (
              <button onClick={handleSave} className="save-button">
                Save
              </button>
            )}
          </React.Fragment>
        )}
        <input className="profileInput"
          type="file"
          id="profile-photo"
          style={{ display: "none" }}
          ref={inputFileRef}
          onChange={handleImageUpload}
        />
      </div>
      {infos && (
        <h4
          style={{
            paddingTop: "230px",
            color: "Black",
            fontSize: "30px",
            textAlign: "center",
            fontSize: "40px",
          }}
        >
          {infos.nom} {infos.prenom}{" "}
        </h4>
      )}
      <br />

      {infos.dateNaissance && (
        <h4 style={{ color: "#79787a", fontSize: "15px", textAlign: "center" }}>
          {new Date(infos.dateNaissance).toLocaleDateString()} in{" "}
          {infos.placeNaissance}{" "}
        </h4>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {infos && (
          <h4
            style={{ color: "#79787a", fontSize: "15px", textAlign: "center" }}
          >
            <BiMap
              style={{ color: "#79787a", fontSize: "20px", marginRight: "6px" }}
            />
            {infos.adresse}{" "}
          </h4>
        )}
      </div>
      <br />
      <br />
      <h4 style={{ color: "Black", fontSize: "17px", marginLeft: "10px" }}>
        Contact information
      </h4>
      <br />

      <div style={{ display: "flex", marginLeft: "25px" }}>
        {infos && (
          <h4
            style={{ color: "#79787a", fontSize: "15px", textAlign: "center" }}
          >
            <BsTelephoneInboundFill
              style={{ color: "#79787a", fontSize: "20px", marginRight: "6px" }}
            />
            {infos.phone}{" "}
          </h4>
        )}
      </div>

      <div style={{ display: "flex", marginLeft: "25px" }}>
        {infos && (
          <h4
            style={{ color: "#79787a", fontSize: "15px", textAlign: "center" }}
          >
            <MdEmail
              style={{ color: "#79787a", fontSize: "20px", marginRight: "6px" }}
            />
            {infos.email}{" "}
          </h4>
        )}
      </div>

      <Button
        className="Edit-info"
        variant="contained"
        onClick={handleClickOpenUpdate}
      >
        Edit
      </Button>

      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <form onSubmit={editProfile}>
          <DialogContent>
            <h2 className="titleProfile"> &nbsp; &nbsp; Update your information</h2>
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
              />
              <br />

              <input className="profileInput"
                type="text"
                id="prenom"
                name="prenom"
                placeholder="Last name"
                value={updateProfile?.prenom || ""}
                onChange={(e) =>
                  setUpdateProfile({ ...updateProfile, prenom: e.target.value })
                }
              ></input>
              <br />

              <input className="profileInput"
                type="date"
                id="dateNaissance"
                name="dateNaissance"
                placeholder="Birthday"
                value={updateProfile?.dateNaissance || ""}
                onChange={(e) =>
                  setUpdateProfile({
                    ...updateProfile,
                    dateNaissance: e.target.value,
                  })
                }
              />
              <br />

              <input className="profileInput"
                type="text"
                id="placeNaissance"
                name="placeNaissance"
                placeholder="Place of birth"
                value={updateProfile?.placeNaissance || ""}
                onChange={(e) =>
                  setUpdateProfile({
                    ...updateProfile,
                    placeNaissance: e.target.value,
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
                  setUpdateProfile({ ...updateProfile, phone: e.target.value })
                }
              ></input>
              <br />

              <DialogActions>
                <button
                  onClick={handleCloseUpdate}
                  className="cancel-btn"
                  style={{ top: " 600px", marginRight: "110px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  style={{ top: " 600px", marginRight: "30px" }}
                >
                  Save
                </button>
              </DialogActions>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default PersonalInformation;
