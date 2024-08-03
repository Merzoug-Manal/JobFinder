import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const ExampleComponent = ({ idOffer }) => {
  const [files, setFiles] = useState([]);

  const getDiplome = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/employeur/offre/application/${idOffer}`
      );

      setFiles(response.data.body.diplomeStoragePath);
    } catch (error) {
      console.log(error.message);
    }
  };

  const affichDiplome = (fileName) => {
    const apiUrl = `http://127.0.0.1:8000/api/get-diplome/${fileName}`;
    window.open(apiUrl, '_blank');
  };

  useEffect(() => {
    getDiplome();
  }, [idOffer]);

  
  return (
    <div className="skillApp">
      <div className="divDiplom">
        <h3>Diplomas</h3>
        <br />
        <div>
          {files.length > 0 ? (
            <div>
              <table style={{ marginTop: '10px', marginLeft: '30px' }}>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index}>
                      <PictureAsPdfIcon onClick={() => affichDiplome(file)}/>
                      <td >{file}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ marginLeft: '60px', lineHeight: '3.5' }}>
              No diplomas available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExampleComponent;
