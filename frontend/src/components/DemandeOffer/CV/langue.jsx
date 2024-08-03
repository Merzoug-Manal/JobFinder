import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { AiOutlinePlus, AiOutlineCalendar } from 'react-icons/ai';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import "./CV.css"
import Button from '@mui/material/Button';
function Language() {
  const [open, setOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const getLanguages = async () => {
    const demandId = await getUserId();
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/demandeur/langue/${demandId}`);
      setLanguages(data.body);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  const saveLanguage = async() => {
    const data = [selectedLanguage];
    const demandId = await getUserId();
    axios.post(`http://127.0.0.1:8000/api/demandeur/langues/${demandId}`, data)
      .then(response => {
        console.log(response.data);
        getLanguages();
        setSelectedLanguages([...selectedLanguages,selectedLanguage]);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const handleDelete = async (selectedLanguage) => {
    const demandId = await getUserId();
    try {
      await axios.delete(`http://127.0.0.1:8000/api/demandeur/langue/${demandId}/${selectedLanguage}`);
      setLanguages(languages.filter((language) => language !== selectedLanguage));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLanguages("");
  };

  return (
    <div>
    <div className='skill'>
    <div className="div5">
      <h3>Languages</h3><br />
      <Button className='Add' variant='contained' onClick={handleClickOpen} >Add </Button>   <br/>     

      {languages.length > 0 ? (
        <table style={{ marginLeft: '28px', lineHeight: '1.5' }}>
          <tbody>
          {languages.map((language, index) => (
            <tr key={index}>
              {language}
              <MdDelete
                style={{
                  position: "absolute",
                 paddingLeft: "490px",
                  color: "#100D40",
                  fontSize: "20px"
                }}
                onClick={() => handleDelete(language)}
              />
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginLeft: '60px', lineHeight: '3.5' }}  >  No languages available.</p>
      )}
</div><hr  className='cvline'></hr>
</div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <form className="fenetre-skill" onSubmit={saveLanguage}>
          <DialogContent>
            <h2>Add your language</h2>
            <label id="poste" >Language: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
            <select id="skill" value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="Programming">Select_languages</option>
        
  <option value="Mandarin_chinese" selected>Mandarin Chinese</option>
  <option value="Spanish" selected>Spanish</option>
  <option value="English" selected>English</option>
  <option value="Hindi" selected>Hindi</option>
  <option value="Arabic" selected>Arabic</option>
  <option value="Portuguese" selected>Portuguese</option>
  <option value="Bengali" selected>Bengali</option>
  <option value="Russian" selected>Russian</option>
  <option value="Japanese" selected>Japanese</option>
  <option value="Punjabi" selected>Punjabi</option>
  <option value="German" selected>German</option>
  <option value="French" selected>French</option>
  <option value="Javanese" selected>Javanese</option>
  <option value="Chinese" selected>Chinese</option>
  <option value="Korean" selected>Korean</option>
  <option value="Telugu" selected>Telugu</option>
  <option value="Tamil" selected>Tamil</option>
  <option value="Marathi" selected>Marathi</option>
  <option value="Vietnamese" selected>Vietnamese</option>
  <option value="Turkish" selected>Turkish</option>
</select>



            <DialogActions>
              <button type='submit' className="skill-btn">Save</button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      </div>
    
  
  )
 
}

export default Language;
