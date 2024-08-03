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
import { Dialog, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function Education(props) {
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

  const LoadEdit = (idEducation) => {
    setUpdateEducation(posts.find((post) => post.idEducation === idEducation));
    setOpenUpdate(true);
  };

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
      `http://127.0.0.1:8000/api/demandeur/education/${demandId}`
    );
    setPosts(data.body);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const saveEducation = async (e) => {
    const demandId = await getUserId();
    e.preventDefault();
    const data = {
      ecole,
      dateDebut,
      dateFin,
    };
    axios
      .post(`http://127.0.0.1:8000/api/demandeur/education/${demandId}`, data)
      .then((response) => {
        handleClose();
        setPosts([...posts, data]);
        getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async (idEducation) => {
    await axios.delete(
      `http://127.0.0.1:8000/api/demandeur/educationId/${idEducation}`
    );
    setPosts(posts.filter((post) => post.idEducation !== idEducation));
  };

  const editEducation = (e, idEducation) => {
    e.preventDefault();
    const data = {
      ecole: updateEducation.ecole,
      dateDebut: updateEducation.dateDebut,
      dateFin: updateEducation.dateFin,
    };
    posts.find((post) => post.idEducation === idEducation);
    axios
      .put(
        `http://127.0.0.1:8000/api/demandeur/educationId/${idEducation}`,
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
  const handleClickOpenUpdate = (idEducation) => {
    setUpdateEducation(posts.find((post) => post.idEducation === idEducation));
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setUpdateEducation(null);
    ecolechange("");
    dateDebutchange("");
    dateFinchange("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    ecolechange("");
    dateDebutchange("");
    dateFinchange("");
  };

  useEffect(() => {
    const height = posts.length * 110 + 150;
    setExperienceHeight(height);
  }, [posts]);
  return (
    <div>
      <div className="profile">
        <div
          className="education"
          style={{ minHeight: `${experienceHeight}px` }}
        >
          <h3>Educations</h3>
          <br />
          {/* <button className="Add" onClick={handleClickOpen}  >
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ color: 'white', fontSize: '22px' }}>Add</div>
  </div>
</button> */}
          <Button className="Add" variant="contained" onClick={handleClickOpen}>
            Add
          </Button>

          {posts.length > 0 ? (
            <table className="table">
              <tbody>
                {posts &&
                  posts.map((post) => (
                    <tr key={post.idEducation}>
                      <td className="table">
                        <div className="poste">
                          <h3
                            style={{
                              color: "#04030f",
                              fontSize: "23px",
                              paddingTop: "0px",
                            }}
                          >
                            {post.ecole}
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
                            handleClickOpenUpdate(post.idEducation)
                          }
                        />
                      </td>
                      <td>
                        <MdDelete
                          style={{ color: "#100D40", fontSize: "20px" }}
                          onClick={() => handleDelete(post.idEducation)}
                        />
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
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={saveEducation}>
          <DialogContent className="fenetre-experinece">
            <h2 className="titleProfile">Add your education</h2>
            <label id="ecole">
              Ecole: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </label>
            <input className="profileInput"
              type="text"
              id="text"
              name="ecole"
              onChange={(e) => ecolechange(e.target.value)}
              value={ecole}
            ></input>
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
        <form onSubmit={(e) => editEducation(e, updateEducation.idEducation)}>
          <DialogContent className="fenetre-experinece">
            <h2 className="titleProfile">Update your education</h2>
            <label id="ecole">
              Ecole: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </label>
            <input className="profileInput"
              type="text"
              id="text"
              name="ecole"
              value={updateEducation?.ecole || ""}
              onChange={(e) =>
                setUpdateEducation({
                  ...updateEducation,
                  ecole: e.target.value,
                })
              }
            ></input>
            <br />
            <label id="dateDebut">Start date:&nbsp;&nbsp;&nbsp;</label>
            <input className="profileInput"
              type="date"
              id="dateDebut"
              name="dateDebut"
              value={updateEducation?.dateDebut || ""}
              onChange={(e) =>
                setUpdateEducation({
                  ...updateEducation,
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
              value={updateEducation?.dateFin || ""}
              onChange={(e) =>
                setUpdateEducation({
                  ...updateEducation,
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
      </Dialog>{" "}
      ,
    </div>
  );
}

export default Education;
