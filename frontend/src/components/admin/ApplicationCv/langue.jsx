import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { AiOutlinePlus, AiOutlineCalendar } from 'react-icons/ai';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import "./CV.css"
import Button from '@mui/material/Button';
function Language({idApp}) {
  const [open, setOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

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


  const getLanguages = async () => {
    // const demandId = await getUserId();
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/demandeEmploiById/${idApp}`);
      setLanguages(data.body.demandeur.langues);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

 

  return (
    <div>
    <div className='skill'>
    <div className="div5">
      <h3>Languages</h3><br />
        <br/>     

      {languages.length > 0 ? (
        <table style={{ marginLeft: '28px', lineHeight: '1.5' }}>
          <tbody>
          {languages.map((language, index) => (
            <tr key={index}>
              {language}
             
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginLeft: '60px', lineHeight: '3.5' }}  >  No languages available.</p>
      )}
</div><hr  className='cvline'></hr>
</div> 
      </div>
    
  
  )
 
}

export default Language;
