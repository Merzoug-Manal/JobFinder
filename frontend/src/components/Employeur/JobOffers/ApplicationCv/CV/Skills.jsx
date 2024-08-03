import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import "./AppInfo.css";
import { Position } from "@syncfusion/ej2-base";
import Button from "@mui/material/Button";
function Skills({ idOffer }) {

  const [skills, setSkills] = useState([]);

  const removeHyphens = (value) => {
    return value.map((skill) =>
      skill.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase())
    );
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/employeur/offre/application/${idOffer}`
      );
      const updatedSkills = removeHyphens(response.data.body.skills);
      
      setSkills(updatedSkills);
      
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [idOffer]);

  return (
    <div>
      <div className="skillApp">
        <div className="div4Skill">
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
        <hr className="appLine"></hr>
      </div>
    </div>
  );
}

export default Skills;
