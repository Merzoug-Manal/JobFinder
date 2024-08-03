import React, { useState, useEffect } from "react";
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
import InfoIcon from '@mui/icons-material/Info';
import {
  Dialog,
  DialogTitle,
  Button,
} from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ApplicantsInfo = (props) => {
  const { idOffre } = props;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDel, setOpendel] = React.useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [status, setStatus] = useState("");

  let navigate = useNavigate();

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

  const handleOpenDialog = (applicationId) => {
    setSelectedAppId(applicationId);
    setOpendel(true);
  };

  const handleAppInfo = (idOffer) => {
    console.log("coldoo"+idOffer)
    navigate(`/AppInfo/${idOffer}`);
  };

  const removeHyphens = (value) => {
    return value.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const handleCloseDialog = () => {
    setSelectedAppId(null);
    setOpendel(false);
  };
  
  useEffect(() => {
    fetchApplicants();
  }, [idOffre]); // Only fetch applicants when idOffre changes



  const fetchApplicants = async () => {
    const url = `http://127.0.0.1:8080/api/employeur/offre/applications/${idOffre}`;

    try {
      const response = await axios.get(url);

      // const post = removeHyphens(response.data.body.poste);
      // const updatedJobDetails = { ...response.data.body, poste: post };
      setApplicants(response.data.body);
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
    const url = `http://127.0.0.1:8080/api/employeur/offre/application-status/${selectedAppId}`;
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
    <div className="job-info applicants-info">
      <ToastContainer />
      <h3> List of Applicants</h3>
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
                  (a, b) => new Date(b.dateCreation) - new Date(a.dateCreation)
                )
                .map((applicant, i) => (
                  <TableRow key={i}>
                    <TableCell>{applicant.idApplication}</TableCell>
                    <TableCell>{applicant.nom}</TableCell>
                    <TableCell align="center">{applicant.prenom}</TableCell>
                    <TableCell align="center">
                      {new Date(applicant.dateCreation).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">{applicant.email}</TableCell>
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
                          handleOpenDialog(applicant.idApplication)
                        }
                        sx={{ color: "grey" }}
                      />
                      <InfoIcon
                        onClick={() => handleAppInfo(applicant.idApplication)}
                        sx={{ color: "grey" }}
                      />
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

            <option value="Accepted">Accepted</option>
            <option value="Refused">Refused</option>
          </select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleChangeState}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApplicantsInfo;
