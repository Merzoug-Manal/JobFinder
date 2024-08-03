import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { BsPencilFill } from "react-icons/bs";
import { Dialog } from "@mui/material";
import "./CV.css";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import img from "../../../assets/profile.png";
import Button from "@mui/material/Button";

function PersonalInformation({ idApp }) {
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
      console.log("userid", userId);

      return userId; // Return the user data from the function
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  };
  useEffect(() => {
    getInfos();
  }, []);

 const getInfos = async () => {
  try {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/demandeEmploiById/${idApp}`
    );

    setInfos(data.body.demandeur);
    return data.body.demandeur.pathPhotoId;
  } catch (error) {
    console.error("Error retrieving user information:", error);
    return null;
  }
};

useEffect(() => {
  const fetchData = async () => {
    const pathPhotoId = await getInfos();
    if (pathPhotoId) {
      try {
        const imageResponse = await axios.get(
          `http://127.0.0.1:8000/api/demandeur/get-photo/${pathPhotoId}`,
          {
            responseType: "arraybuffer",
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
      } catch (error) {
        console.error("Error retrieving user photo:", error);
      }
    }
  };

  fetchData();
}, []);



  // useEffect(() => {
  //   getPhoto();
  // }, []);

  return (
    <div>
      <div className="skill">
        <div className="infos">
          <h1>Overview of my CV</h1>
          {imageData ? (
              <img src={imageData} alt="User Photo" className="photo" />
            ) : (
              <img src={profilePhoto} alt="Profile" className="photo" />
            )}
          {infos.dateNaissance && (
            <h4
              style={{ color: "#79787a", fontSize: "15px", marginLeft: "20px" }}
            >
              {new Date(infos.dateNaissance).toLocaleDateString()} in{" "}
              {infos.placeNaissance}{" "}
            </h4>
          )}
          <div style={{ display: "flex" }}>
            {infos && (
              <h4
                style={{
                  color: "#79787a",
                  fontSize: "15px",
                  marginLeft: "10px",
                }}
              >
                <BiMap
                  style={{
                    color: "#79787a",
                    fontSize: "20px",
                    marginLeft: "10px",
                  }}
                />
                {infos.adresse}{" "}
              </h4>
            )}
          </div>
          <br />
          <h4 style={{ color: "Black", fontSize: "17px", marginLeft: "10px" }}>
            Contact information
          </h4>{" "}
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
          </div>{" "}
          <br />
          <hr className="cvline"></hr>
        </div>
      </div>
          </div>
  );
}

export default PersonalInformation;
