import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CV.css";
import Experience from './experience';
import PersonalInformation from './infos';
import Education from './education';
import Language from './langue';
import Skills from './Skills';
import Diploma from './diploma'
import { useParams } from "react-router-dom";

const Cv = () => {
  const { idOffer } = useParams();
 
  return (
    <div >
       <PersonalInformation/>
      <Experience/>
      <Education/>
      <Skills/>
      <Language/>
      <Diploma idOffer={idOffer}/>
       </div>

  );
};

export default Cv;
