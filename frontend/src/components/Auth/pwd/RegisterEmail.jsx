import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import success from '../../../assets/success.png';
import { useNavigate } from "react-router-dom";

const RegisterEmail = () => {
  const [confirmationStatus, setConfirmationStatus] = useState('Confirming...');

  const { email } = useParams();
  console.log('Token value:', email);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/auth/confirm/${email}`);
        setConfirmationStatus('Confirmed');
        console.log(response.data); // Optional: Handle the response data if needed
        // Redirect to the login page or any other page
        // window.location.href = '/login';
      } catch (error) {
        console.error(error);
      }
    };

    confirmEmail();
  }, [email]);

  let navigate = useNavigate();

  const handleSkip = () => {
    navigate(`/`);
  };

  const handlelogin = () => {
    navigate(`/login`);
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="success-content">
        <div className="auth-form">
            <img src={success} alt="" className="success" height={200} width={200} />
          <h2>Your registration has been successfully confirmed !</h2>
          <h3>Do you want to login to your account ?</h3>
          <div className="buttons">
            <button
              onClick={() =>
                handleSkip()
              }
             className="primary-button left">Skip </button>
            <button 
             onClick={() =>
              handlelogin()
            }
             className="secondary-button right">Login</button>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RegisterEmail;
