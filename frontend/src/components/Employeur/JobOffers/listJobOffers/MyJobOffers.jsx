import React, { useState, useEffect} from 'react';
import Navbar from '../../../Navbar';
import axios from "axios";
import Card from "./JobCard/Card";

const MyJobOffers = () => {
  const [url, setUrl] = useState('');

  const fetchData = async () => {
    try {
      const emploId = await getUserId(); 
      const url = `http://127.0.0.1:8080/api/employeur/Offres/${emploId}`;
      setUrl(url)
     
    } catch (error) {
      console.error('Error:', error);
    }
    
  
  };
  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

 
  const getUserId = async () => {
    try {
      
      const user = JSON.parse(localStorage.getItem("USER"))
      const email = user.email;
      
      const response = await axios.get(`http://127.0.0.1:8080/api/employeur/getByEmail/${email}`);
      const userId = response.data.body.idEmployeur;
     
      return userId; // Return the user data from the function
    } catch (error) {
      console.error('Error retrieving user data:', error);
      throw error; 
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="cs">
        <div className="job-section-wrapper">
          <div className="job-section-top">
            <h1 className="primary-subheading">My job offers</h1>
            
          </div>
            <Card apiURL={url}/>
          
        </div>
      </div>
    </div>
  )
}

export default MyJobOffers