import React from 'react'
import Navbar from '../Navbar';
import circle from '../../assets/circle.png';
import landing from '../../assets/landing.png';
import { Fade } from "react-awesome-reveal";

const Home = () => {
  return (
   
    <div className='home-container'>
      <Navbar/>
        <div className='container'> 
       
          <div className='home-banner-container'>
          <Fade right>
            <div className='home-bannerImage-container'>
                <img src={landing} alt="" />
            </div>
          </Fade>
          <Fade left>
            <div className='home-text-section'>
              <h1 className='primary-heading'> Shape your future 
              with the best recruitement.</h1>
              <p className='primary-text'>Find a new job and get your dream career with us. 
              Find a new job and get your dream career with us. </p>
              <button className='secondary-button' onClick={() => (window.location.href = "/login")}> Find a job!</button>
            </div>
          </Fade>
          </div>
         
        </div>
    </div>
  )
}

export default Home