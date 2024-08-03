import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { BsPencilFill } from "react-icons/bs";
import { Dialog } from "@mui/material";
import "./AppInfo.css";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import img from "../../.././../../assets/profile.png";
import { TailSpin } from "react-loader-spinner";

const PersonalInformation = ({ idOffer }) => {
  const [infos, setInfos] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(img);
  const [imageData, setImageData] = useState("");
 

  const getInfos = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/employeur/offre/application/${idOffer}`
      );
      setInfos(response.data.body);
     
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };


  useEffect(() => {
    getInfos();
  }, [idOffer]);

  const getPhoto = async () => {
    const demandId = infos.email;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/demandeur/getByEmail/${demandId}`
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
  }, [infos.email]);

  return (
    <div>
      <div className="skillApp">
        <div className="infosPerson">
          <h1>Overview of my CV</h1>
          <div className="image">
            {imageData ? (
              <img src={imageData} alt="User Photo" className="photo" />
            ) : (
              <img src={profilePhoto} alt="Profile" className="photo" />
            )}
            <div style={{ width: "500px", marginTop: "10px" }}>
                <h4
                  style={{
                    color: "#100D40",
                    fontSize: "25px",
                    marginLeft: "15px",
                    width: "400px",
                  }}
                >
                  {infos.nom} {infos.prenom}
                </h4>
            </div>
          </div>
            <h4
              style={{ color: "#79787a", fontSize: "15px", marginLeft: "20px" }}
            >
              {new Date(infos.dateNaissance).toLocaleDateString()} in{" "}
              {infos.placeNaissance}
            </h4>
          <div style={{ display: "flex" }}>
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
                {infos.adresse}
              </h4>
          </div>
          <br />
          <h4 style={{ color: "Black", fontSize: "17px", marginLeft: "10px" }}>
            Contact information
          </h4>
          <br />
          <div style={{ display: "flex", marginLeft: "25px" }}>
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
                {infos.phone}
              </h4>
           
          </div>
          <div style={{ display: "flex", marginLeft: "25px" }}>
           
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
                {infos.email}
              </h4>
          
          </div>
          <br />
          <hr className="appLine"/>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
