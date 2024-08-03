import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import Card from "./CardApp";

const MyApplications = () => {
  const [apiURL, setApiURL] = useState([]);
  

  // const handleClick = async () => {
  //   try {
  //     const url = "http://127.0.0.1:8088/api/recommended-jobs/12";
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     const skills = await getUserSkills(); // Wait for getUserSkills to fetch the skills
     
      
  //     const data = {
  //       userSkills: skills, // Use the fetched skills array
  //     };

  //     const response = await axios.post(url, data, config);
  //     setPosts(response.data);
      
  //     const updatedURLs = posts.map((post) => `http://127.0.0.1:8080/api/employeur/recommendedJobs/${post}`);
  //     setApiURL(updatedURLs);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  
  const fetchData = async () => {
    try {
      const DemId = await getUserId();
      const url = `http://127.0.0.1:8000/api/demandeEmploi/${DemId}`;
      setApiURL(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getUserId = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("USER"));
      const email = user.email;

      const response = await axios.get(
        `http://127.0.0.1:8000/api/demandeur/getByEmail/${email}`
      );
      const userId = response.data.body.idDemandeur;

      console.log("userid" + userId);
      return userId; // Return the user data from the function
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  };

  // const getOffreId = async () => {
  //   try {
  //     const DemId = await getUserId();

  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/api/demandeEmploi/${DemId}`
  //     );
  //      setOffreId(response.data.body.idOffreEmploi);
  //      console.log("OFRREid" + offreId);

  //     return offreId; 
  //   } catch (error) {
  //     console.error("Error retrieving user data:", error);
  //     throw error;
  //   }
  // };

  return (
    <div className="home-container">
      <Navbar />
      <div className="cs">
        <div className="job-section-wrapper">
          <div className="job-section-top">
            <h1 className="primary-subheading">My Applications</h1>
          </div>
            <Card apiURL={apiURL} />      
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
