import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import "./AppInfo.css";
import Button from "@mui/material/Button";
function Language({ idOffer }) {

  const [languages, setLanguages] = useState([]);
  
 

  const getLanguages = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/employeur/offre/application/${idOffer}`
      );
      
      setLanguages(response.data.body.langues);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLanguages();
  }, [idOffer]);

  return (
    <div>
      <div className="skillApp">
        <div className="div5Lang">
          <h3>Languages</h3>
          <br />

          {languages.length > 0 ? (
            <table style={{ marginLeft: "28px", lineHeight: "1.5" }}>
              <tbody>
                {languages.map((language, index) => (
                  <tr key={index}>{language}</tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ marginLeft: "60px", lineHeight: "3.5" }}>
              {" "}
              No languages available.
            </p>
          )}
        </div>
        <hr className="appLine"></hr>
      </div>
    </div>
  );
}

export default Language;
