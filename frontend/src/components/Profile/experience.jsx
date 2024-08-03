import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { TbFileDescription } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfileDemandeur.css";
import axios from "axios";
import { Dialog } from "@mui/material";
import { Position } from "@syncfusion/ej2-base";
import Button from "@mui/material/Button";

function Experience(props) {
  const [posts, setPosts] = useState([]);
  const [poste, postechange] = useState("");
  const [description, descriptionchange] = useState("");
  const [dateDebut, dateDebutchange] = useState("");
  const [dateFin, dateFinchange] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [experienceHeight, setExperienceHeight] = useState(200);
  const navigate = useNavigate();
  const [openUpdate, setOpenUpdate] = useState(false); // new state variable
  const [updateExperience, setUpdateExperience] = useState(null); // new state variable

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
    const demandId = await getUserId();
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/demandeur/experience/${demandId}`
    );
    setPosts(data.body);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const saveExperience = async (e) => {
    const demandId = await getUserId();
    e.preventDefault();
    const data = {
      poste,
      description,
      dateDebut,
      dateFin,
    };
    axios
      .post(`http://127.0.0.1:8000/api/demandeur/experience/${demandId}`, data)
      .then((response) => {
        handleClose();
        setPosts();
        getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async (idExperience) => {
    await axios.delete(
      `http://127.0.0.1:8000/api/demandeur/experienceId/${idExperience}`
    );
    setPosts(posts.filter((post) => post.idExperience !== idExperience));
  };

  const editExperience = (e, idExperience) => {
    e.preventDefault();
    const data = {
      poste: updateExperience.poste,
      description: updateExperience.description,
      dateDebut: updateExperience.dateDebut,
      dateFin: updateExperience.dateFin,
    };
    posts.find((post) => post.idExperience === idExperience);
    axios
      .put(
        `http://127.0.0.1:8000/api/demandeur/experienceId/${idExperience}`,
        data
      )

      .then((response) => {
        handleCloseUpdate();
        getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClickOpenUpdate = (idExperience) => {
    setUpdateExperience(
      posts.find((post) => post.idExperience === idExperience)
    );
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setUpdateExperience(null);
    postechange("");
    descriptionchange("");
    dateDebutchange("");
    dateFinchange("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    postechange("");
    descriptionchange("");
    dateDebutchange("");
    dateFinchange("");
  };

  //  useEffect(() => {
  //    const height = posts.length * 110 + 150;
  //    setExperienceHeight(height);
  //  }, [posts]);
  return (
    <div>
      <div className="profile">
        <div
          className="experience"
          style={{ minHeight: `${experienceHeight}px` }}
        >
          <h3>Experiences</h3>
          <Button className="Add" variant="contained" onClick={handleClickOpen}>
            Add{" "}
          </Button>
       
            <table className="table">
              <tbody>
                {posts &&
                  posts.map((post) => (
                    <tr key={post.idExperience}>
                      <td className="table">
                        <div className="poste">
                          <h3
                            style={{
                              color: "#04030f",
                              fontSize: "23px",
                              paddingTop: "0px",
                            }}
                          >
                            {post.poste}
                          </h3>
                          <br />
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            &nbsp; &nbsp;
                            <TbFileDescription
                              style={{
                                color: "#79787a",
                                fontSize: "20px",
                                marginRight: "6px",
                              }}
                            />{" "}
                            {post.description}
                            <br />{" "}
                          </div>
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
                            {new Date(post.dateDebut).toLocaleDateString()}{" "}
                            <strong>&nbsp; À &nbsp;</strong>{" "}
                            {new Date(post.dateFin).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <BsPencilFill
                          style={{ color: "#100D40", fontSize: "20px" }}
                          onClick={() =>
                            handleClickOpenUpdate(post.idExperience)
                          }
                        />
                      </td>
                      <td>
                        <MdDelete
                          style={{ color: "#100D40", fontSize: "20px" }}
                          onClick={() => handleDelete(post.idExperience)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
         
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={saveExperience}>
          <DialogContent className="fenetre-experinece">
            <h2 className="titleProfile">Add your experience</h2>
            <label id="poste">
              Poste: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </label>
            <input
              className="profileInput"
              type="text"
              id="text"
              name="poste"
              onChange={(e) => postechange(e.target.value)}
              value={poste}
            ></input>
            <br />
            <label id="description">Description:</label>
            <textarea
              id="descriptionInput"
              name="description"
              onChange={(e) => descriptionchange(e.target.value)}
              value={description}
            ></textarea>
            <br />
            <label id="dateDebut">Start date:&nbsp;&nbsp;&nbsp;</label>
            <input className="profileInput"
              type="date"
              id="dateDebut"
              name="dateDebut"
              onChange={(e) => dateDebutchange(e.target.value)}
              value={dateDebut}
            ></input>
            <br />
            <label id="dateFin">End date:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input className="profileInput"
              type="date"
              id="dateFin"
              name="dateFin"
              onChange={(e) => dateFinchange(e.target.value)}
              value={dateFin}
            ></input>
            <br />
            <br />
            <br />
            <DialogActions>
              <button className="cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save
              </button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <form
          onSubmit={(e) => editExperience(e, updateExperience.idExperience)}
        >
          <DialogContent className="fenetre-experinece">
            <h2 className="titleProfile">Update your experience</h2>
            <label id="poste">
              Poste: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </label>
            <input className="profileInput"
              type="text"
              id="text"
              name="poste"
              value={updateExperience?.poste || ""}
              onChange={(e) =>
                setUpdateExperience({
                  ...updateExperience,
                  poste: e.target.value,
                })
              }
            ></input>
            <br />
            <label id="description">Description:</label>
            <textarea
              id="descriptionInput"
              name="description"
              value={updateExperience?.description || ""}
              onChange={(e) =>
                setUpdateExperience({
                  ...updateExperience,
                  description: e.target.value,
                })
              }
            ></textarea>
            <br />
            <label id="dateDebut">Start date:&nbsp;&nbsp;&nbsp;</label>
            <input className="profileInput"
              type="date"
              id="dateDebut"
              name="dateDebut"
              value={updateExperience?.dateDebut || ""}
              onChange={(e) =>
                setUpdateExperience({
                  ...updateExperience,
                  dateDebut: e.target.value,
                })
              }
            ></input>
            <br />
            <label id="dateFin">End date:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input className="profileInput"
              type="date"
              id="dateFin"
              name="dateFin"
              value={updateExperience?.dateFin || ""}
              onChange={(e) =>
                setUpdateExperience({
                  ...updateExperience,
                  dateFin: e.target.value,
                })
              }
            ></input>
            <br />
            <br />
            <br />
            <DialogActions>
              <button onClick={handleCloseUpdate} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save
              </button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default Experience;
