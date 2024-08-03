import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AppInfo.css";
import Experience from './experience';
import PersonalInformation from './infos';
import Education from './education';
import Language from './langue';
import Skills from './Skills';
import Diploma from './diploma'
import { useParams } from "react-router-dom";

const AppInfo = () => {
  const { idOffer } = useParams();
  console.log("idd" + idOffer);

  return (
    <div>
      <PersonalInformation idOffer={idOffer} />
      <Experience idOffer={idOffer}/>
      <Education idOffer={idOffer}/>
       <Skills idOffer={idOffer}/> 
      <Language idOffer={idOffer}/>
      <Diploma idOffer={idOffer}/> 
       </div>

  );
};

export default AppInfo;
