import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const ExampleComponent = ({ idOffer }) => {
  const [files, setFiles] = useState([]);
  const { jobId } = useParams();

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
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const newFiles = Array.from(selectedFiles);

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (files.length > 0) {
      const formData = new FormData();

      // Append each file to the FormData object
      files.forEach((file) => {
        formData.append("files", file);
      });

      const demandId = await getUserId();
      try {
        await axios.post(
          `http://127.0.0.1:8000/api/demandeEmploi/${idOffer}/${demandId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type for the request
            },
          }
        );
        window.location.href = "/OfferSend";
        console.log("Fichiers sauvegardés avec succès !");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des fichiers :", error);
      }
    }
  };

  return (
    <div className="skill">
      <div className="div6">
        <h3>Diplomas</h3>
        <br />
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="file" className="choose-btn">
              Choose your diplomas
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={handleFileChange}
              style={{ width: "100%", display: "none" }}
              id="file"
              name="file"
            />

            {files.length > 0 && (
              <div>
                <table style={{ marginTop: "10px", marginLeft: "30px" }}>
                  <tbody>
                    {files.map((file, index) => (
                      <tr key={index}>
                        <td>{file.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td>
                          <MdDelete
                            style={{ color: "#100D40", fontSize: "20px" }}
                            onClick={() => handleFileDelete(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="div7">
              <button type="submit" className="save">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExampleComponent;
