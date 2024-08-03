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
  const { idApp } = useParams();
 
  return (
    <div >
       <PersonalInformation idApp={idApp}/>
      <Experience idApp={idApp}/>
      <Education idApp={idApp}/>
      <Skills idApp={idApp}/>
      <Language idApp={idApp}/>
      <Diploma idApp={idApp}/>
       </div>

  );
};

export default Cv;
