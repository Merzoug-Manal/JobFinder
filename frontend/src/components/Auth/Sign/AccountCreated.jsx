import React from "react";
import Navbar from '../../Navbar';
import success from '../../../assets/success.png'

const AccountCreated = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="success-content">
        <div className="auth-form">
            <img src={success} alt="" className="success" height={200} width={200} />
          <h2>Your account has been successfully created !</h2>
          <h3>Do you want to create your CV next ?</h3>
          <div className="buttons">
            <button className="primary-button left">Skip </button>
            <button className="secondary-button right">Create CV</button>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AccountCreated;
