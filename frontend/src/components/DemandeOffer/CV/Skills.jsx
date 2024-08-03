import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { AiOutlinePlus, AiOutlineCalendar } from 'react-icons/ai';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import "./CV.css"
import { Position } from '@syncfusion/ej2-base';
import Button from '@mui/material/Button';
function Skills() {
  const [open, setOpen] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  
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

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const getSkills = async () => {
    const demandId = await getUserId();
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/demandeur/skill/${demandId}`);
      setSkills(data.body);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  const saveSkill = async() => {
    const data = [selectedSkill];
    const demandId = await getUserId();
    axios.post(`http://127.0.0.1:8000/api/demandeur/skills/${demandId}`, data)
      .then(response => {
        console.log(response.data);
        getSkills();
        setSelectedSkills([...selectedSkills, selectedSkill]);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const handleDelete = async (selectedSkill) => {
    const demandId = await getUserId();
    try {
      await axios.delete(`http://127.0.0.1:8000/api/demandeur/skill/${demandId}/${selectedSkill}`);
      setSkills(skills.filter((skill) => skill !== selectedSkill));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSkills("");
  };

  return (
    <div>
    <div className='skill'>
    <div className="div4">
      <h3>Skills</h3>
      <Button className='Add' variant='contained' onClick={handleClickOpen} >Add </Button>        
       <br/>
      {skills.length > 0 ? (
        <table style={{ marginLeft: '28px', lineHeight: '1.5' }}>
          <tbody>
          {skills.map((skill, index) => (
            <tr key={index} style={{paddingTop:'0px' }}  >
              {skill}
              <MdDelete
                style={{
                  position: "absolute",
                  left: "900px",
                  color: "#100D40",
                  fontSize: "20px"
                }}
                onClick={() => handleDelete(skill)}
              />
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginLeft: '60px', lineHeight: '3.5' }} >  No skills available.</p>
      )}
 </div><hr className='cvline' ></hr>
 </div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <form className="fenetre-skill" onSubmit={saveSkill}>
          <DialogContent>
            <h2>Add your skills</h2>
            <label id="poste"style={{ marginLeft: '20px', lineHeight: '5.5' }} >Skill: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
            <select id="skill" value={selectedSkill} onChange={handleSkillChange}>
              <option value="Programming">Select_skills</option>
            
  <option value="Hacking">Hacking</option>
  <option value="Networking">Networking</option>
  <option value="Operating_systems">Operating Systems</option>
  <option value="Cybersecurity">Cybersecurity</option>
  <option value="Programming">Programming</option>
  <option value="Software_engineering">Software Engineering</option>
  <option value="Problem_solving">Problem Solving</option>
  <option value="Database_management">Database Management</option>
  <option value="Software_testing">Software Testing</option>
  <option value="Web_development">Web Development</option>
  <option value="Mobile_development">Mobile Development</option>
  <option value="Creativity">Creativity</option>
  <option value="Git">Git</option>
  <option value="Web_design">Web Design</option>
  <option value="Mobile_design">Mobile Design</option>
  <option value="Data_analysis">Data Analysis</option>
  <option value="Data_science">Data Science</option>
  <option value="Machine_learning">Machine Learning</option>
  <option value="Deep_learning">Deep Learning</option>
  <option value="Cloud_computing">Cloud Computing</option>
  <option value="Statistics">Statistics</option>
  <option value="UI_design">UI Design</option>
  <option value="Design">Design</option>
  <option value="UX_design">UX Design</option>
  <option value="Design_thinking">Design Thinking</option>
  <option value="Graphic_design">Graphic Design</option>
  <option value="Communication">Communication</option>
  <option value="Leadership">Leadership</option>
  <option value="Project_management">Project Management</option>
  <option value="Quality_assurance">Quality Assurance</option>
  <option value="Time_management">Time Management</option>
  <option value="Marketing">Marketing</option>
  <option value="Teamwork">Teamwork</option>
  <option value="Content_creation">Content Creation</option>
  <option value="Customer_service">Customer Service</option>
  <option value="Strategic_thinking">Strategic Thinking</option>
  <option value="Finance">Finance</option>
  <option value="Decision_making">Decision Making</option>
  <option value="Negotiation">Negotiation</option>
  <option value="Risk_management">Risk Management</option>
  <option value="Budgeting">Budgeting</option>
  <option value="Human_resources_management">Human Resources Management</option>
  <option value="Administrative_skills">Administrative Skills</option>
  <option value="Coaching">Coaching</option>
  <option value="Conflict_resolution">Conflict Resolution</option>
  <option value="Planning">Planning</option>
  <option value="Recruitment">Recruitment</option>
  <option value="Reporting">Reporting</option>
  <option value="Active_listening">Active Listening</option>
  <option value="Adaptability">Adaptability</option>
  <option value="Multitasking">Multitasking</option>
  <option value="Sales">Sales</option>
  <option value="Agile_testing">Agile Testing</option>
  <option value="Technical_skills">Technical Skills</option>
  <option value="Testing_tools">Testing Tools</option>
  <option value="Critical_thinking">Critical Thinking</option>
  <option value="Research">Research</option>
  <option value="Grammar">Grammar</option>
  <option value="Editing">Editing</option>
  <option value="Technical_troubleshooting">Technical Troubleshooting</option>
  <option value="Software_installation">Software Installation</option>
  <option value="Hardware_setup">Hardware Setup</option>
  <option value="Contract_law">Contract Law</option>
  <option value="Corporate_law">Corporate Law</option>
  <option value="Employment_law">Employment Law</option>
  <option value="Data_entry">Data Entry</option>
  <option value="Data_visualization">Data Visualization</option>
  <option value="Hardware">Hardware</option>
  <option value="System_administration">System Administration</option>
  <option value="Network_security">Network Security</option>
  <option value="Firewall_configuration">Firewall Configuration</option>
  <option value="Trend_awareness">Trend Awareness</option>
  <option value="Branding">Branding</option>
  <option value="Social_media_advertising">Social Media Advertising</option>
  <option value="Supply_chain_technologies">Supply Chain Technologies</option>
  <option value="Database_design">Database Design</option>
  <option value="Data_backup">Data Backup</option>
  <option value="Database_troubleshooting">Database Troubleshooting</option>
  <option value="Event_planning">Event Planning</option>
  <option value="Illustration">Illustration</option>
  <option value="Image_editing">Image Editing</option>
  <option value="Public_speaking">Public Speaking</option>
  <option value="Security_auditing">Security Auditing</option>
  <option value="DevOps">DevOps</option>
  <option value="Cloud_security">Cloud Security</option>
  <option value="Debugging">Debugging</option>
  <option value="IoT">IoT</option>
  <option value="Prototyping">Prototyping</option>
  <option value="Brand_management">Brand Management</option>
  <option value="Typography">Typography</option>
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

export default Skills;
