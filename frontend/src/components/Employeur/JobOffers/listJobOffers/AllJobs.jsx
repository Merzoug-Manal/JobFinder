import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../Navbar";
import Card from "./JobCard/Card";
import Button from "@mui/material/Button";

const AllJobs = () => {
  const [posts, setPosts] = useState([]);
  const [apiURL, setApiURL] = useState([]);
  const fistUrl = "http://127.0.0.1:8080/api/employeur/Offres"
  let userSession = JSON.parse(localStorage.getItem("USER"));

  useEffect(() => {
    handleClick();
  }, []);



  const getUserSkills = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("USER"));
      const email = user.email;

      const response = await axios.get(
        `http://127.0.0.1:8000/api/demandeur/getByEmail/${email}`
      );
      const userSkills = response.data.body.skills;
      return userSkills; // Return the user data from the function

    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  };


  const handleClick = async () => {
    try {
      const url = "http://127.0.0.1:8088/api/recommended-jobs/12";
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (userSession && userSession.role === "Demandeur") {
        const skills = await getUserSkills(); // Wait for getUserSkills to fetch the skills
  
        const data = {
          userSkills: skills, // Use the fetched skills array
        };
  
        const response = await axios.post(url, data, config);
        setPosts(response.data);
  
        const updatedURLs = posts.map(
          (post) => `http://127.0.0.1:8080/api/employeur/recommendedJobs/${post}`
        );
        setApiURL(updatedURLs);
      } }
      catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="cs">
        <div className="job-section-wrapper">
          <div className="job-section-top">
            <h1 className="primary-subheading">Latest job offers</h1>
            <p>
              Browse the latest job offers and apply to the one most suited for
              your skills. Your dream career is here.
            </p>
          </div>

          {userSession && userSession.role === "Demandeur" && (
            <Button onClick={handleClick} variant="outlined" className="recBtn">
              Recommended for you
            </Button>
          )}

          {apiURL.length > 1 ? (
            apiURL.map((url, index) => <Card key={index} apiURL={url} />)
          ) : (
            <Card apiURL={fistUrl} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
