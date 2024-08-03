import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const ExampleComponent = ({ idApp }) => {
  const [files, setFiles] = useState([]);

  // const getUserId = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("USER"));
  //     const email = user.email;

  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/api/demandeur/getByEmail/${email}`
  //     );
  //     const userId = response.data.body.idDemandeur;

  //     return userId; // Return the user data from the function
  //   } catch (error) {
  //     console.error("Error retrieving user data:", error);
  //     throw error;
  //   }
  // };

  const getDiplome = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/demandeEmploiById/${idApp}`
      );

      setFiles(response.data.body.diplomes);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDiplome();
  }, [idApp]);

  const affichDiplome = (fileName) => {
    const apiUrl = `http://127.0.0.1:8000/api/get-diplome/${fileName}`;
    window.open(apiUrl, "_blank");
  };

  return (
    <div className="skill">
      <div className="div6">
        <h3>Diplomas</h3>
        <br />
        <div>
          <div>
            <table style={{ marginTop: "10px", marginLeft: "30px" }}>
              <tbody>
                {files.map((file) => (
                  <tr key={file.idDiplome}>
                    <td >
                    <PictureAsPdfIcon onClick={() => affichDiplome(file.storagePath)} />
                    {file.storagePath}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleComponent;
