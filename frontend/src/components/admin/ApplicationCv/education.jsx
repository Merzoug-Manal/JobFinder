import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { TbFileDescription } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import "./CV.css";
import axios from "axios";
import { Dialog, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function Education( { idApp }) {
  const [posts, setPosts] = useState([]);
  const [ecole, ecolechange] = useState("");
  const [dateDebut, dateDebutchange] = useState("");
  const [dateFin, dateFinchange] = useState("");
  const [open, setOpen] = React.useState(false);
  const [experienceHeight, setExperienceHeight] = useState(200);
  const { idEducation } = useParams();
  const navigate = useNavigate();
  const [openUpdate, setOpenUpdate] = useState(false); // new state variable
  const [updateEducation, setUpdateEducation] = useState(null); // new state variable

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

  const getPosts = async () => {
    // const demandId = await getUserId();
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/demandeEmploiById/${idApp}`
    );
    setPosts(data.body.demandeur.educations);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="skill">
        <div className="div3">
          <h3>Educations</h3>
          <br />

          {posts.length > 0 ? (
            <table className="table">
              <tbody>
                {posts &&
                  posts.map((educ) => (
                    <tr key={educ.idEducation}>
                      <td className="table">
                        <div className="poste">
                          <h3 style={{ color: "#04030f", fontSize: "23px" }}>
                            {educ.ecole}
                          </h3>
                          <br />
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {" "}
                            &nbsp; &nbsp;
                            <AiOutlineCalendar
                              style={{
                                color: "#79787a",
                                fontSize: "20px",
                                marginRight: "6px",
                              }}
                            />{" "}
                            {new Date(educ.dateDebut).toLocaleDateString()}{" "}
                            <strong>&nbsp; À &nbsp;</strong>{" "}
                            {new Date(educ.dateFin).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p style={{ marginLeft: "60px", lineHeight: "3.5" }}>
              {" "}
              No educations available.
            </p>
          )}
        </div>{" "}
        <hr className="cvline"></hr>
      </div>
    </div>
  );
}

export default Education;
