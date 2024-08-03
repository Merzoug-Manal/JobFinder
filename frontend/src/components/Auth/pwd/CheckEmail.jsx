  import React from "react";
  import img from "../../../assets/email1.png"
  import Navbar from "../../Navbar";
  function CheckEmail(){
    return (
      <div className='home-container'>
      <Navbar/>
      <div className="main-content">
          
        <div className="resend-form">
            <img src={img}/>
            <h2>Check Your Email</h2><br/><br/>
            <p>Please check your email address for more instructions  </p><br/>
            
        </div>
        </div>
        </div>
    );
  }
  export default CheckEmail;
