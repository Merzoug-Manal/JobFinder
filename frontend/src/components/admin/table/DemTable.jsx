import React, { useState, useEffect, useCallback } from "react";
import "./demTable.scss";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper} from '@mui/material';
import Typography from '@mui/material/Typography'
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Chip from '@mui/material/Chip';



const url = "http://127.0.0.1:5000/api/getAll";



const DemTable = () => {


  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  const getStatusColor = active => { 
    return active === 'true' ? 'success' : 'error';
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        role: "Demandeur",
      },
    };
    

    axios.get(url, config)
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Typography variant="h5" component="h2" align="center">
        ApplicantsList
      </Typography>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  className="tableCell">Id</TableCell>
            <TableCell className="tableCell">First Name</TableCell>
            <TableCell  className="tableCell" align="right">Last Name</TableCell>
            <TableCell className="tableCell" align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell className="tableCell" align="center" colSpan={6}>
                <TailSpin
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  align="center"
                />
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, i) => (
              <TableRow key={i}>
                <TableCell className="tableCell" >{user.id}</TableCell>
                <TableCell className="tableCell">{user.nom}</TableCell>
                <TableCell className="tableCell" align="right">{user.prenom}</TableCell>
                <TableCell className="tableCell" align="right">  
                  <Chip
                    variant="outlined"
                    label={
                      user.active.toString() === "true" ? "Active" : "Inactive"
                    }
                    color={getStatusColor(user.active.toString())}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DemTable;
