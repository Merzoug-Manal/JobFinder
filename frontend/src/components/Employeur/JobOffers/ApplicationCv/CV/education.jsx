import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { TbFileDescription } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import "./AppInfo.css";
import axios from "axios";
import { Dialog, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function Education({ idOffer }) {
  const [posts, setPosts] = useState([]);
 

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/employeur/offre/application/${idOffer}`
      );
      setPosts(response.data.body.educationEcole);
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
        <div className="div3Educ">
          <h3>Educations</h3>
          <br />
          {posts.length > 0 ? (
            <table className="tableEduc">
              <tbody>
                {posts &&
                  posts.map((educ,i) => (
                    <tr key={i}>
                      <td className="table">
                        <div className="poste">
                          <h3 style={{ color: "#04030f", fontSize: "23px" }}>
                            {educ}
                          </h3>
                          <br />                      
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
        <hr className="appLine"></hr>
      </div>
     
    </div>
  );
}

export default Education;
