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
import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";

function Experience({ idOffer }) {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/employeur/offre/application/${idOffer}`
      );
      setPosts(response.data.body.experiencPost);
      setDescription(response.data.body.experienceDescription);
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
        <div className="div1Exp">
          <h3>Experiences</h3>

          {posts.length > 0 ? (
            <div className="experiences">
            <table>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={i}>
                    <td className="table">
                      <div className="poste">
                        <h3 style={{ color: "#04030f" }}>
                          {post}
                        </h3>
                        <br />
                        <div
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <span
                            style={{
                              color: "#79787a",
                              marginRight: "6px",
                            }}
                          >
                            {description[i]}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <p style={{ marginLeft: "60px", lineHeight: "3.5" }}>
              No experiences available.
            </p>
          )}
        </div>{" "}
        <hr className="appLine"/>
      </div>
    </div>
  );
}

export default Experience;
