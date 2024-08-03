import React, { useEffect, useState } from 'react';
import Experience from './experience';
import Education from './education';
import Skills from './skills';
import Language from './language';
import Navbar from "../Navbar";
import "./ProfileDemandeur.css"
import PersonalInformation from './PersonalInformation';
const ProfileDemandeur = () => {
  return (
    <div className="Profil">
      <Navbar/> 
       <PersonalInformation/> 
       <Experience/>
        <Education/> 
         <Skills/>
         <Language/>
         
    </div>
  )
}
export default ProfileDemandeur;