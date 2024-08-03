import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import success from '../../assets/success.png'

const OfferSend= () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="success-content">
        <div className="auth-form">
            <img src={success} alt="" className="success" height={200} width={200} />
          <h2>Thank you for choosing to apply with us!</h2>
          <h3>We will provide a detailed response as soon as possible</h3>
          <div className="buttons">
            <button className="primary-button center"  onClick={() => { window.location.href = "/JobOffers"} } >Back to home</button>


          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OfferSend;
