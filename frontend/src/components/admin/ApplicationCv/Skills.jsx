import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import "./CV.css";
import Button from "@mui/material/Button";

function Skills({ idApp }) {
  const [open, setOpen] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

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

  const getSkills = async () => {
    // const demandId = await getUserId();
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/demandeEmploiById/${idApp}`
      );
      setSkills(data.body.demandeur.skills);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div>
      <div className="skill">
        <div className="div4">
          <h3>Skills</h3>        
          <br />
          {skills.length > 0 ? (
            <table style={{ marginLeft: "28px", lineHeight: "1.5" }}>
              <tbody>
                {skills.map((skill, index) => (
                  <tr key={index} style={{ paddingTop: "0px" }}>
                    {skill}
                    
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ marginLeft: "60px", lineHeight: "3.5" }}>
              {" "}
              No skills available.
            </p>
          )}
        </div>
        <hr className="cvline"></hr>
      </div>
    
    </div>
  );
}

export default Skills;
