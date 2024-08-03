import React, { useState, useEffect } from "react";
import Sidebar from "./navs/sidebar";
import Navbar from "./navs/Navbar";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import Chip from "@mui/material/Chip";
import InfoIcon from "@mui/icons-material/Info";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  Button,
} from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const AppliList = () => {
  const { offerId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDel, setOpendel] = React.useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [status, setStatus] = useState("");

  const getStatusColor = (etat) => {
    switch (etat) {
      case "Accepted":
        return "success";
      case "Refused":
        return "error";
      case "Pending":
        return "warning";
      case "Not_enrolled":
        return "info";
      default:
        return "default";
    }
  };


  let navigate = useNavigate();

  const handleAppInfo = (idApp) => {
    navigate(`/AppInfoAdmin/${idApp}`);
  };

  const handleOpenDialog = (applicationId) => {
    setSelectedAppId(applicationId);
    setOpendel(true);
  };

  const handleCloseDialog = () => {
    setSelectedAppId(null);
    setOpendel(false);
  };

  useEffect(() => {
    fetchApplicants();
  }, [offerId]);

  const getUserId = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("USER"));
      const email = user.email;

      const response = await axios.get(
        `http://127.0.0.1:8000/api/demandeur/getByEmail/${email}`
      );
      const userId = response.data.body.idDemandeur;

      console.log("userid" + userId);
      return userId; // Return the user data from the function
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  };

  const fetchApplicants = async () => {
    const url = `http://127.0.0.1:8000/api/demandeEmploiByIdOffre/${offerId}`;

    try {
      const response = await axios.get(url);
      setApplicants(response.data.body);
      console.log( response.data.body)
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const formatLabel = (etat) => {
    if (etat === "Not_enrolled") {
      return "Not Enrolled";
    }
    return etat;
  };

  const handleChangeState = async () => {
    const url = `http://127.0.0.1:8000/api/demandeEmploi-status/${selectedAppId}`;
    axios
      .put(
        url,
        { etat: status }, // Update the request payload to include the status
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        fetchApplicants();
        handleCloseDialog();
        toast.success("Status changed successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <div>
            <ToastContainer />
          </div>
          <div className="listTitle"> List of Applicants</div>

          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell align="center">Prénom</TableCell>
                  <TableCell align="center">Date creation</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center" colSpan={6}>
                      <TailSpin
                        height="80"
                        width="80"
                        color="blue"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        align="center"
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ) : (
                  applicants
                    .sort(
                      (a, b) =>
                        new Date(b.dateCreation) - new Date(a.dateCreation)
                    )
                    .map((applicant, i) => (
                      <TableRow key={i}>
                        <TableCell>{applicant.idDemande}</TableCell>
                        <TableCell>{applicant.demandeur.nom}</TableCell>
                        <TableCell align="center">
                          {applicant.demandeur.prenom}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(
                            applicant.dateCreation
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          {applicant.demandeur.email}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            variant="outlined"
                            label={formatLabel(applicant.etat)}
                            color={getStatusColor(applicant.etat)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <EditIcon
                            onClick={() =>
                              handleOpenDialog(applicant.idDemande)
                            }
                            sx={{ color: "grey" }}
                          />
                          <InfoIcon  onClick={() => handleAppInfo(applicant.idDemande)}
                           sx={{ color: "grey" }} />
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            open={openDel}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Update Application Status
            </DialogTitle>
            <DialogContent>
              <select
                name="status"
                id="status"
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  Status
                </option>

                <option value="Pending">Pending</option>
                <option value="Refused">Refused</option>
              </select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleChangeState}>Update</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AppliList;
